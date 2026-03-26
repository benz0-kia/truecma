import { NextRequest, NextResponse } from 'next/server';

const SPARK_API_URL = 'https://sparkapi.com/v1/listings';
const SPARK_TOKEN = 'b36rvxt7nqlsi96iy5dckn5ng';

export async function POST(req: NextRequest) {
  let body: { address: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { address } = body;
  if (!address || typeof address !== 'string' || !address.trim()) {
    return NextResponse.json({ error: 'address is required' }, { status: 400 });
  }

  const params = new URLSearchParams({
    _filter: `UnparsedAddress Eq '${address.trim()}'`,
    _limit: '1',
    _standardFields: 'UnparsedAddress,BuildingAreaTotal,BedsTotal,BathsFull,BathsHalf,YearBuilt',
  });

  let sparkRes: Response;
  try {
    sparkRes = await fetch(`${SPARK_API_URL}?${params}`, {
      headers: {
        Authorization: `Bearer ${SPARK_TOKEN}`,
        Accept: 'application/json',
      },
    });
  } catch {
    return NextResponse.json({ found: false });
  }

  if (!sparkRes.ok) {
    return NextResponse.json({ found: false });
  }

  const data = await sparkRes.json();
  const listings = data?.D?.Results ?? [];

  if (listings.length === 0) {
    return NextResponse.json({ found: false });
  }

  const f = listings[0].StandardFields;
  const bathsFull: number | null = f.BathsFull ?? null;
  const bathsHalf: number = f.BathsHalf ?? 0;
  const baths = bathsFull != null ? bathsFull + bathsHalf * 0.5 : null;

  return NextResponse.json({
    found: true,
    beds: f.BedsTotal ?? null,
    baths,
    sqft: f.BuildingAreaTotal ?? null,
    yearBuilt: f.YearBuilt ?? null,
  });
}
