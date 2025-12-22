import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { FokusReportPDF } from '@/components/fokus-check/pdf/FokusReportPDF';
import type { Answer, FokusCheckResult } from '@/types/fokus-check';

interface GeneratePDFRequest {
  result: FokusCheckResult;
  answers: Answer[];
  userName?: string;
  painPoint?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: GeneratePDFRequest = await request.json();

    // Validierung
    if (!body.result || !body.answers) {
      return NextResponse.json(
        { error: 'Missing required fields: result and answers' },
        { status: 400 }
      );
    }

    // PDF generieren
    const pdfBuffer = await renderToBuffer(
      FokusReportPDF({
        result: body.result,
        answers: body.answers.map((a) => ({
          ...a,
          answeredAt: new Date(a.answeredAt),
        })),
        userName: body.userName,
        painPoint: body.painPoint,
        createdAt: new Date(),
      })
    );

    // PDF als Response zurückgeben
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="fokus-report.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
