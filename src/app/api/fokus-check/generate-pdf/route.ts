import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { FokusReportPDF } from '@/components/fokus-check/pdf/FokusReportPDF';
import type { GeneratePDFRequest } from '@/types/fokus-check';

/**
 * Generates a PDF report for the Fokus-Check assessment.
 *
 * This endpoint accepts the user's quiz results and answers, then returns a
 * professionally formatted PDF document containing the assessment analysis.
 *
 * @route POST /api/fokus-check/generate-pdf
 *
 * @param request - The incoming request containing the JSON body with result and answers
 *
 * @returns {Promise<NextResponse>} The response containing either:
 *   - **200 OK**: Binary PDF data with `Content-Type: application/pdf` and
 *     `Content-Disposition: attachment; filename="fokus-report.pdf"`
 *   - **400 Bad Request**: JSON error `{ error: "Missing required fields: result and answers" }`
 *     when required fields are not provided
 *   - **500 Internal Server Error**: JSON error `{ error: "Failed to generate PDF" }`
 *     when PDF generation fails (check server logs for details)
 *
 * @example
 * // Request body structure
 * {
 *   "result": {
 *     "score": 35,
 *     "maxScore": 50,
 *     "category": "good",
 *     "title": "Gut aufgestellt",
 *     "description": "Du hast bereits einen guten Fokus auf dein Geschäft."
 *   },
 *   "answers": [
 *     { "questionId": 1, "value": 4, "answeredAt": "2024-01-15T10:30:00.000Z", "timeSpent": 8 }
 *   ],
 *   "userName": "Max Mustermann",
 *   "painPoint": "Zeitmanagement ist meine größte Herausforderung"
 * }
 *
 * @see {@link file://./docs/api/fokus-check-generate-pdf.md} for complete API documentation
 * @see {@link GeneratePDFRequest} for the request body interface
 * @see {@link FokusCheckResult} for the result object structure
 * @see {@link Answer} for the answer object structure
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
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

    // PDF als Response zurückgeben (Buffer zu Uint8Array konvertieren)
    return new NextResponse(new Uint8Array(pdfBuffer), {
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
