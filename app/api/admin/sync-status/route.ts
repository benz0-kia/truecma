import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const [totalRecords, recentLogs, lastCompleted] = await Promise.all([
    prisma.soldListing.count(),
    prisma.syncLog.findMany({
      orderBy: { startedAt: 'desc' },
      take: 10,
    }),
    prisma.syncLog.findFirst({
      where: { status: 'completed' },
      orderBy: { completedAt: 'desc' },
    }),
  ]);

  return NextResponse.json({
    totalRecords,
    lastSyncDate: lastCompleted?.completedAt ?? null,
    recentLogs,
  });
}
