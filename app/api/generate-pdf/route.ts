import { NextRequest, NextResponse } from 'next/server';
import React, { type ReactElement } from 'react';
import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer';
import { CMAPdfDocument } from '@/components/cma-pdf';
import type { SubjectProperty } from '@/components/cma-pdf';
import type { Comp, ValuationSummary } from '@/app/api/comps/route';

interface GeneratePdfRequest {
  subjectProperty: SubjectProperty;
  comps: Comp[];
  valuationSummary: ValuationSummary;
  agentName?: string;
}

export async function POST(req: NextRequest) {
  let body: GeneratePdfRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { subjectProperty, comps, valuationSummary, agentName } = body;
  if (!subjectProperty || !comps || !valuationSummary) {
    return NextResponse.json(
      { error: 'subjectProperty, comps, and valuationSummary are required' },
      { status: 400 }
    );
  }

  const reportDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await renderToBuffer(
    React.createElement(CMAPdfDocument, {
      subjectProperty,
      comps,
      valuationSummary,
      agentName: agentName ?? '[Agent Name]',
      reportDate,
    }) as ReactElement<DocumentProps>
  );

  const addressSlug = (subjectProperty.address || 'cma-report')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${addressSlug}.pdf"`,
      'Content-Length': buffer.length.toString(),
    },
  });
}
