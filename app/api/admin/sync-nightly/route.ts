import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { analyzeCondition } from '@/lib/condition';

export const maxDuration = 300;

const SPARK_API_URL = 'https://sparkapi.com/v1/listings';
const SPARK_TOKEN = 'b36rvxt7nqlsi96iy5dckn5ng';
const BATCH_SIZE = 1000;
const DB_BATCH_SIZE = 100;

const STANDARD_FIELDS = [
  'UnparsedAddress', 'StreetNumber', 'StreetName', 'City', 'PostalCode',
  'BedsTotal', 'BathsFull', 'BathsHalf', 'BuildingAreaTotal',
  'LotSizeArea', 'LotSizeSquareFeet', 'YearBuilt', 'GarageSpaces',
  'ClosePrice', 'ListPrice', 'CloseDate', 'DaysOnMarket',
  'SubdivisionName', 'Latitude', 'Longitude', 'PublicRemarks',
  'ModificationTimestamp', 'MlsStatus',
].join(',');

interface SparkListing {
  Id: string;
  StandardFields: {
    UnparsedAddress?: string;
    StreetNumber?: string;
    StreetName?: string;
    City?: string;
    PostalCode?: string;
    BedsTotal?: number;
    BathsFull?: number;
    BathsHalf?: number;
    BuildingAreaTotal?: number;
    LotSizeArea?: number;
    LotSizeSquareFeet?: number;
    YearBuilt?: number;
    GarageSpaces?: number;
    ClosePrice?: number;
    ListPrice?: number;
    CloseDate?: string;
    DaysOnMarket?: number;
    SubdivisionName?: string;
    Latitude?: number;
    Longitude?: number;
    PublicRemarks?: string;
  };
}

function buildAddress(f: SparkListing['StandardFields']): string {
  if (f.UnparsedAddress) return f.UnparsedAddress;
  return [f.StreetNumber, f.StreetName].filter(Boolean).join(' ') || 'Unknown';
}

function mapListing(listing: SparkListing) {
  const f = listing.StandardFields;
  const bathsFull = f.BathsFull ?? 0;
  const bathsHalf = f.BathsHalf ?? 0;
  return {
    mlsId: listing.Id,
    address: buildAddress(f),
    city: f.City ?? null,
    zip: f.PostalCode ?? null,
    beds: f.BedsTotal ?? null,
    baths: bathsFull > 0 ? bathsFull + bathsHalf * 0.5 : null,
    sqft: f.BuildingAreaTotal ?? null,
    lotSize: f.LotSizeSquareFeet ?? f.LotSizeArea ?? null,
    yearBuilt: f.YearBuilt ?? null,
    garageSpaces: f.GarageSpaces ?? null,
    closePrice: f.ClosePrice ?? null,
    listPrice: f.ListPrice ?? null,
    closeDate: f.CloseDate ?? null,
    daysOnMarket: f.DaysOnMarket ?? null,
    subdivision: f.SubdivisionName ?? null,
    latitude: f.Latitude ?? null,
    longitude: f.Longitude ?? null,
    publicRemarks: f.PublicRemarks ?? null,
    conditionSignal: analyzeCondition(f.PublicRemarks),
  };
}

async function fetchPage(
  filter: string,
  page: number
): Promise<{ listings: SparkListing[]; totalPages: number }> {
  const params = new URLSearchParams({
    _filter: filter,
    _limit: String(BATCH_SIZE),
    _pagination: '1',
    _page: String(page),
    _standardFields: STANDARD_FIELDS,
  });

  const res = await fetch(`${SPARK_API_URL}?${params}`, {
    headers: {
      Authorization: `Bearer ${SPARK_TOKEN}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Spark API error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return {
    listings: data?.D?.Results ?? [],
    totalPages: data?.D?.Pagination?.TotalPages ?? 1,
  };
}

async function upsertBatch(records: ReturnType<typeof mapListing>[]) {
  await prisma.$transaction(
    records.map((r) =>
      prisma.soldListing.upsert({
        where: { mlsId: r.mlsId },
        create: r,
        update: r,
      })
    )
  );
}

export async function POST() {
  // Determine the cutoff: last completed sync (nightly or historical), or 30 days ago
  const lastSync = await prisma.syncLog.findFirst({
    where: { status: 'completed' },
    orderBy: { completedAt: 'desc' },
  });

  const cutoff = lastSync?.completedAt
    ? lastSync.completedAt.toISOString()
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const syncLog = await prisma.syncLog.create({
    data: { type: 'nightly', status: 'running' },
  });

  // Pull all closed listings modified since the cutoff, regardless of whether
  // they were previously synced (upsert handles duplicates).
  const filter =
    `MlsStatus Eq 'Closed' AND ModificationTimestamp Gt '${cutoff}'`;

  let totalProcessed = 0;

  try {
    const { listings: firstPage, totalPages } = await fetchPage(filter, 1);

    for (let i = 0; i < firstPage.length; i += DB_BATCH_SIZE) {
      await upsertBatch(firstPage.slice(i, i + DB_BATCH_SIZE).map(mapListing));
    }
    totalProcessed += firstPage.length;

    for (let page = 2; page <= totalPages; page++) {
      const { listings } = await fetchPage(filter, page);
      for (let i = 0; i < listings.length; i += DB_BATCH_SIZE) {
        await upsertBatch(listings.slice(i, i + DB_BATCH_SIZE).map(mapListing));
      }
      totalProcessed += listings.length;
    }

    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: 'completed',
        completedAt: new Date(),
        recordsProcessed: totalProcessed,
      },
    });

    return NextResponse.json({ ok: true, recordsProcessed: totalProcessed });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: 'failed',
        completedAt: new Date(),
        recordsProcessed: totalProcessed,
        error: message,
      },
    });
    return NextResponse.json(
      { error: message, recordsProcessed: totalProcessed },
      { status: 502 }
    );
  }
}
