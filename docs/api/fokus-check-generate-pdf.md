# Fokus-Check Generate PDF API

## Endpoint Overview

| Property | Value |
|----------|-------|
| **URL** | `/api/fokus-check/generate-pdf` |
| **Method** | `POST` |
| **Content-Type** | `application/json` |
| **Response Type** | `application/pdf` (binary) |

## Description

This endpoint generates a PDF report for the Fokus-Check assessment. It accepts the user's quiz results and answers, then returns a professionally formatted PDF document containing the assessment analysis.

The generated PDF includes:
- User's Fokus score and category
- Detailed analysis of each answer
- Personalized recommendations based on results
- Optional user information (name, pain points)

## Base URL

| Environment | Base URL |
|-------------|----------|
| Production | `https://yourdomain.com` |
| Development | `http://localhost:3000` |

## Authentication

**No authentication required.**

This endpoint is publicly accessible and does not require any authentication headers or API keys. It is designed to be called from:
- Frontend applications (via n8n webhook integration)
- n8n workflows for automated PDF generation
- External integrations requiring PDF generation

> **Note:** While the endpoint is public, it should be protected at the infrastructure level (rate limiting, CORS) in production environments.

## Quick Reference

### Request

```http
POST /api/fokus-check/generate-pdf HTTP/1.1
Content-Type: application/json

{
  "result": { ... },
  "answers": [ ... ],
  "userName": "Max Mustermann",
  "painPoint": "..."
}
```

### Response

**Success (200):**
- Returns binary PDF data
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="fokus-report.pdf"`

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `500 Internal Server Error` - PDF generation failed

---

## Request Body Schema

### GeneratePDFRequest

The request body must be a JSON object with the following structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `result` | `FokusCheckResult` | ✅ Yes | The calculated result from the Fokus-Check assessment |
| `answers` | `Answer[]` | ✅ Yes | Array of all user answers to the quiz questions |
| `userName` | `string` | ❌ No | Optional user name for personalization |
| `painPoint` | `string` | ❌ No | Optional pain point/challenge text entered by the user |

### FokusCheckResult

The result object contains the assessment score and categorization:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `score` | `number` | The user's achieved score | `35` |
| `maxScore` | `number` | Maximum possible score | `50` |
| `category` | `string` | Result category based on score | `"good"` |
| `title` | `string` | Human-readable result title | `"Gut aufgestellt"` |
| `description` | `string` | Detailed result description | `"Du hast bereits..."` |

**Category Values:**

| Category | Description |
|----------|-------------|
| `excellent` | Excellent focus score (highest tier) |
| `good` | Good focus score |
| `moderate` | Moderate focus score (room for improvement) |
| `weak` | Weak focus score (significant challenges) |
| `critical` | Critical focus score (needs immediate attention) |

### Answer

Each answer object represents the user's response to a single question:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `questionId` | `number` | ✅ Yes | ID of the answered question | `1` |
| `value` | `number` | ✅ Yes | Selected answer value | `4` |
| `answeredAt` | `string` (ISO 8601) | ✅ Yes | Timestamp when question was answered | `"2024-01-15T10:30:00.000Z"` |
| `timeSpent` | `number` | ✅ Yes | Time spent on question in seconds | `12` |
| `followUp` | `FollowUpAnswer` | ❌ No | Optional follow-up answer if triggered | See below |

> **Note:** The `answeredAt` field should be an ISO 8601 formatted date string. The API will parse it to a Date object internally.

### FollowUpAnswer

Some questions may trigger follow-up questions based on the user's answer. The follow-up answer structure varies by type:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `questionId` | `string` | ✅ Yes | ID of the follow-up question | `"q2_followup"` |
| `parentQuestionId` | `number` | ✅ Yes | ID of the parent question | `2` |
| `textValue` | `string` | ❌ No | Text response (for text type follow-ups) | `"Mehr Zeit für Familie"` |
| `sliderValues` | `object` | ❌ No | Dual slider values (current and desired) | `{ "current": 45, "desired": 30 }` |
| `singleValue` | `number` | ❌ No | Single choice value | `3` |

**Slider Values Object:**

| Field | Type | Description |
|-------|------|-------------|
| `current` | `number` | Current state value |
| `desired` | `number` | Desired state value |

---

## Example Request Body

### Minimal Request (Required Fields Only)

```json
{
  "result": {
    "score": 35,
    "maxScore": 50,
    "category": "good",
    "title": "Gut aufgestellt",
    "description": "Du hast bereits einen guten Fokus auf dein Geschäft. Mit ein paar Optimierungen kannst du noch mehr erreichen."
  },
  "answers": [
    {
      "questionId": 1,
      "value": 4,
      "answeredAt": "2024-01-15T10:30:00.000Z",
      "timeSpent": 8
    },
    {
      "questionId": 2,
      "value": 3,
      "answeredAt": "2024-01-15T10:30:15.000Z",
      "timeSpent": 15
    },
    {
      "questionId": 3,
      "value": 5,
      "answeredAt": "2024-01-15T10:30:25.000Z",
      "timeSpent": 10
    }
  ]
}
```

### Complete Request (All Fields)

```json
{
  "result": {
    "score": 28,
    "maxScore": 50,
    "category": "moderate",
    "title": "Verbesserungspotenzial",
    "description": "Es gibt einige Bereiche, in denen du deinen unternehmerischen Fokus verbessern kannst."
  },
  "answers": [
    {
      "questionId": 1,
      "value": 4,
      "answeredAt": "2024-01-15T10:30:00.000Z",
      "timeSpent": 8
    },
    {
      "questionId": 2,
      "value": 2,
      "answeredAt": "2024-01-15T10:30:15.000Z",
      "timeSpent": 15,
      "followUp": {
        "questionId": "q2_followup",
        "parentQuestionId": 2,
        "sliderValues": {
          "current": 50,
          "desired": 35
        }
      }
    },
    {
      "questionId": 3,
      "value": 3,
      "answeredAt": "2024-01-15T10:30:35.000Z",
      "timeSpent": 20,
      "followUp": {
        "questionId": "q3_followup",
        "parentQuestionId": 3,
        "textValue": "Ich verbringe zu viel Zeit mit administrativen Aufgaben"
      }
    },
    {
      "questionId": 4,
      "value": 5,
      "answeredAt": "2024-01-15T10:30:50.000Z",
      "timeSpent": 15
    },
    {
      "questionId": 5,
      "value": 2,
      "answeredAt": "2024-01-15T10:31:10.000Z",
      "timeSpent": 20,
      "followUp": {
        "questionId": "q5_followup",
        "parentQuestionId": 5,
        "singleValue": 1
      }
    }
  ],
  "userName": "Max Mustermann",
  "painPoint": "Ich schaffe es nicht, mich auf das Wesentliche zu konzentrieren und verliere mich in operativen Tätigkeiten."
}
```

---

## Type Definitions (TypeScript)

For TypeScript integrations, here are the complete type definitions:

```typescript
interface GeneratePDFRequest {
  result: FokusCheckResult;
  answers: Answer[];
  userName?: string;
  painPoint?: string;
}

interface FokusCheckResult {
  score: number;
  maxScore: number;
  category: 'excellent' | 'good' | 'moderate' | 'weak' | 'critical';
  title: string;
  description: string;
}

interface Answer {
  questionId: number;
  value: number;
  answeredAt: Date | string; // ISO 8601 string accepted
  timeSpent: number; // seconds
  followUp?: FollowUpAnswer;
}

interface FollowUpAnswer {
  questionId: string;
  parentQuestionId: number;
  textValue?: string;
  sliderValues?: { current: number; desired: number };
  singleValue?: number;
}
```

---

## Response Formats

### Success Response (200 OK)

On successful PDF generation, the API returns a binary PDF file.

**Response Headers:**

| Header | Value | Description |
|--------|-------|-------------|
| `Content-Type` | `application/pdf` | Indicates the response is a PDF document |
| `Content-Disposition` | `attachment; filename="fokus-report.pdf"` | Suggests the file should be downloaded with this filename |

**Response Body:**

The response body contains raw binary PDF data. This is **not** JSON - it is the actual PDF file bytes that can be saved directly to a file or displayed in a PDF viewer.

**Example Response (HTTP headers):**

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="fokus-report.pdf"
Content-Length: 45238

[Binary PDF data...]
```

### Error Response: 400 Bad Request

Returned when required fields are missing from the request body.

**Response Headers:**

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |

**Error Schema:**

| Field | Type | Description |
|-------|------|-------------|
| `error` | `string` | Human-readable error message |

**Example Response:**

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Missing required fields: result and answers"
}
```

**Common Causes:**

| Missing Field | Description |
|---------------|-------------|
| `result` | The `result` object is not provided or is `null`/`undefined` |
| `answers` | The `answers` array is not provided or is `null`/`undefined` |
| Both fields | Neither required field is present in the request body |

### Error Response: 500 Internal Server Error

Returned when the PDF generation process fails internally.

**Response Headers:**

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |

**Error Schema:**

| Field | Type | Description |
|-------|------|-------------|
| `error` | `string` | Human-readable error message |

**Example Response:**

```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "Failed to generate PDF"
}
```

**Possible Causes:**

| Cause | Description |
|-------|-------------|
| Invalid data format | The `result` or `answers` data has an unexpected structure |
| Date parsing error | An `answeredAt` field contains an invalid date string |
| Rendering failure | The PDF rendering library encountered an error |
| Memory constraints | The server ran out of memory during PDF generation |

> **Note:** When a 500 error occurs, check the server logs for detailed error information. The client-facing error message is intentionally generic for security purposes.

### Response Summary Table

| Status Code | Content-Type | Body | Description |
|-------------|--------------|------|-------------|
| `200 OK` | `application/pdf` | Binary PDF data | PDF generated successfully |
| `400 Bad Request` | `application/json` | `{ "error": "..." }` | Missing required fields |
| `500 Internal Server Error` | `application/json` | `{ "error": "..." }` | PDF generation failed |

### Error Handling Best Practices

When integrating with this API, implement proper error handling:

```typescript
async function generatePDF(data: GeneratePDFRequest): Promise<Blob | null> {
  const response = await fetch('/api/fokus-check/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    // Success: response is binary PDF
    return await response.blob();
  }

  // Error: response is JSON
  const error = await response.json();

  if (response.status === 400) {
    console.error('Validation error:', error.error);
    // Handle missing fields - check your request data
  } else if (response.status === 500) {
    console.error('Server error:', error.error);
    // Handle server error - retry or notify user
  }

  return null;
}
```

---

## Integration Examples

### cURL

Use cURL for command-line testing or shell script integration.

**Basic Request:**

```bash
curl -X POST "https://yourdomain.com/api/fokus-check/generate-pdf" \
  -H "Content-Type: application/json" \
  -d '{
    "result": {
      "score": 35,
      "maxScore": 50,
      "category": "good",
      "title": "Gut aufgestellt",
      "description": "Du hast bereits einen guten Fokus auf dein Geschäft."
    },
    "answers": [
      {"questionId": 1, "value": 4, "answeredAt": "2024-01-15T10:30:00.000Z", "timeSpent": 8},
      {"questionId": 2, "value": 3, "answeredAt": "2024-01-15T10:30:15.000Z", "timeSpent": 15}
    ]
  }' \
  --output fokus-report.pdf
```

**With Optional Fields:**

```bash
curl -X POST "https://yourdomain.com/api/fokus-check/generate-pdf" \
  -H "Content-Type: application/json" \
  -d '{
    "result": {
      "score": 28,
      "maxScore": 50,
      "category": "moderate",
      "title": "Verbesserungspotenzial",
      "description": "Es gibt einige Bereiche, in denen du deinen Fokus verbessern kannst."
    },
    "answers": [
      {"questionId": 1, "value": 4, "answeredAt": "2024-01-15T10:30:00.000Z", "timeSpent": 8},
      {"questionId": 2, "value": 2, "answeredAt": "2024-01-15T10:30:15.000Z", "timeSpent": 15}
    ],
    "userName": "Max Mustermann",
    "painPoint": "Ich schaffe es nicht, mich auf das Wesentliche zu konzentrieren."
  }' \
  --output fokus-report.pdf
```

**Using Environment Variables (Development):**

```bash
# Set base URL
export API_BASE_URL="http://localhost:3000"

# Generate PDF
curl -X POST "${API_BASE_URL}/api/fokus-check/generate-pdf" \
  -H "Content-Type: application/json" \
  -d @request-body.json \
  --output fokus-report.pdf

# Check if request was successful
if [ $? -eq 0 ]; then
  echo "PDF saved to fokus-report.pdf"
else
  echo "Failed to generate PDF"
fi
```

**Checking Response Status:**

```bash
# Get HTTP status code and save PDF
HTTP_STATUS=$(curl -X POST "http://localhost:3000/api/fokus-check/generate-pdf" \
  -H "Content-Type: application/json" \
  -d '{"result": {...}, "answers": [...]}' \
  -o fokus-report.pdf \
  -w "%{http_code}" \
  -s)

if [ "$HTTP_STATUS" = "200" ]; then
  echo "Success! PDF saved."
elif [ "$HTTP_STATUS" = "400" ]; then
  echo "Bad Request - check required fields"
  cat fokus-report.pdf  # Contains JSON error
else
  echo "Error: HTTP $HTTP_STATUS"
fi
```

---

### JavaScript / Fetch API

Use the Fetch API for browser or Node.js integrations.

**Basic Example (Browser):**

```javascript
async function generateFokusCheckPDF(result, answers, userName, painPoint) {
  const response = await fetch('/api/fokus-check/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      result,
      answers,
      userName,
      painPoint,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate PDF');
  }

  // Return PDF as Blob
  return await response.blob();
}

// Usage
const pdfBlob = await generateFokusCheckPDF(
  {
    score: 35,
    maxScore: 50,
    category: 'good',
    title: 'Gut aufgestellt',
    description: 'Du hast bereits einen guten Fokus auf dein Geschäft.',
  },
  [
    { questionId: 1, value: 4, answeredAt: new Date().toISOString(), timeSpent: 8 },
    { questionId: 2, value: 3, answeredAt: new Date().toISOString(), timeSpent: 15 },
  ],
  'Max Mustermann',
  'Zeitmanagement ist meine größte Herausforderung'
);
```

**Download PDF in Browser:**

```javascript
async function downloadPDF(result, answers, userName, painPoint) {
  try {
    const response = await fetch('/api/fokus-check/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result, answers, userName, painPoint }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    // Create blob and trigger download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fokus-report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('PDF download failed:', error.message);
    // Handle error (show toast, notification, etc.)
  }
}
```

**Open PDF in New Tab:**

```javascript
async function openPDFInNewTab(data) {
  const response = await fetch('/api/fokus-check/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to generate PDF');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  window.open(url, '_blank');
}
```

**Node.js Example (with fs):**

```javascript
import fs from 'fs';

async function generateAndSavePDF(data, outputPath = './fokus-report.pdf') {
  const response = await fetch('http://localhost:3000/api/fokus-check/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`PDF generation failed: ${error.error}`);
  }

  // Get buffer from response
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Save to file
  fs.writeFileSync(outputPath, buffer);
  console.log(`PDF saved to ${outputPath}`);

  return outputPath;
}

// Usage
await generateAndSavePDF({
  result: {
    score: 35,
    maxScore: 50,
    category: 'good',
    title: 'Gut aufgestellt',
    description: 'Du hast bereits einen guten Fokus auf dein Geschäft.',
  },
  answers: [
    { questionId: 1, value: 4, answeredAt: '2024-01-15T10:30:00.000Z', timeSpent: 8 },
    { questionId: 2, value: 3, answeredAt: '2024-01-15T10:30:15.000Z', timeSpent: 15 },
  ],
  userName: 'Max Mustermann',
});
```

**TypeScript with Full Type Safety:**

```typescript
import type { FokusCheckResult, Answer } from '@/types/fokus-check';

interface GeneratePDFRequest {
  result: FokusCheckResult;
  answers: Answer[];
  userName?: string;
  painPoint?: string;
}

interface PDFGenerationError {
  error: string;
}

async function generatePDF(request: GeneratePDFRequest): Promise<Blob> {
  const response = await fetch('/api/fokus-check/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error: PDFGenerationError = await response.json();
    throw new Error(error.error);
  }

  return response.blob();
}
```

---

### n8n HTTP Request Node

Configure n8n workflows to call the PDF generation endpoint.

#### Node Configuration

**HTTP Request Node Settings:**

| Setting | Value |
|---------|-------|
| **Method** | `POST` |
| **URL** | `https://yourdomain.com/api/fokus-check/generate-pdf` |
| **Authentication** | `None` |
| **Send Body** | `Yes` |
| **Body Content Type** | `JSON` |
| **Response Format** | `File` |

#### Basic Configuration (JSON)

```json
{
  "method": "POST",
  "url": "https://yourdomain.com/api/fokus-check/generate-pdf",
  "authentication": "none",
  "sendBody": true,
  "bodyContentType": "json",
  "body": {
    "result": {
      "score": "={{ $json.score }}",
      "maxScore": 50,
      "category": "={{ $json.category }}",
      "title": "={{ $json.title }}",
      "description": "={{ $json.description }}"
    },
    "answers": "={{ $json.answers }}",
    "userName": "={{ $json.userName }}",
    "painPoint": "={{ $json.painPoint }}"
  },
  "options": {
    "response": {
      "response": {
        "responseFormat": "file"
      }
    }
  }
}
```

#### Step-by-Step Setup

1. **Add HTTP Request Node**
   - Drag "HTTP Request" node into your workflow

2. **Configure Request**
   - **Method:** Select `POST`
   - **URL:** Enter `https://yourdomain.com/api/fokus-check/generate-pdf`

3. **Set Headers**
   - Click "Add Header"
   - **Name:** `Content-Type`
   - **Value:** `application/json`

4. **Configure Body**
   - **Send Body:** Toggle ON
   - **Body Content Type:** Select `JSON`
   - **Specify Body:** Select `Using Fields Below` or `Using JSON`

5. **Add Body Fields (Using Fields):**

   | Name | Value |
   |------|-------|
   | `result.score` | `{{ $json.score }}` |
   | `result.maxScore` | `50` |
   | `result.category` | `{{ $json.category }}` |
   | `result.title` | `{{ $json.title }}` |
   | `result.description` | `{{ $json.description }}` |
   | `answers` | `{{ $json.answers }}` |
   | `userName` | `{{ $json.userName }}` |
   | `painPoint` | `{{ $json.painPoint }}` |

6. **Configure Response Handling**
   - **Response Format:** Select `File`
   - This ensures the binary PDF response is handled correctly

#### Using Expressions for Dynamic Data

When receiving data from a previous node (e.g., Webhook or Form Trigger):

```javascript
// In JSON body field
{
  "result": {
    "score": {{ $json.quizResult.score }},
    "maxScore": {{ $json.quizResult.maxScore }},
    "category": "{{ $json.quizResult.category }}",
    "title": "{{ $json.quizResult.title }}",
    "description": "{{ $json.quizResult.description }}"
  },
  "answers": {{ JSON.stringify($json.answers) }},
  "userName": "{{ $json.user.name }}",
  "painPoint": "{{ $json.user.painPoint }}"
}
```

#### Sending PDF via Email (Complete Workflow)

```
[Webhook Trigger] → [HTTP Request (PDF)] → [Send Email (with attachment)]
```

**Send Email Node Configuration:**

| Setting | Value |
|---------|-------|
| **Attachments** | `Binary Property: data` |
| **File Name** | `fokus-report.pdf` |

**Full Workflow Example (n8n JSON):**

```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "httpMethod": "POST",
        "path": "generate-fokus-pdf",
        "responseMode": "responseNode"
      }
    },
    {
      "name": "Generate PDF",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://yourdomain.com/api/fokus-check/generate-pdf",
        "sendBody": true,
        "bodyContentType": "json",
        "body": "={{ JSON.stringify({ result: $json.result, answers: $json.answers, userName: $json.userName, painPoint: $json.painPoint }) }}",
        "options": {
          "response": {
            "response": {
              "responseFormat": "file"
            }
          }
        }
      }
    },
    {
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "={{ $('Webhook').item.json.email }}",
        "subject": "Dein Fokus-Check Report",
        "text": "Anbei findest du deinen persönlichen Fokus-Check Report.",
        "attachments": "data"
      }
    }
  ]
}
```

#### Error Handling in n8n

Add an IF node after the HTTP Request to check for errors:

**IF Node Configuration:**

| Condition | Expression |
|-----------|------------|
| HTTP Status | `{{ $json.statusCode === 200 }}` |

**Error Branch Actions:**
- Log the error to a database
- Send notification to admin
- Return error response to webhook caller

#### Testing in n8n

1. **Use Execute Node** to test with sample data:

```json
{
  "result": {
    "score": 35,
    "maxScore": 50,
    "category": "good",
    "title": "Gut aufgestellt",
    "description": "Du hast bereits einen guten Fokus."
  },
  "answers": [
    {"questionId": 1, "value": 4, "answeredAt": "2024-01-15T10:30:00.000Z", "timeSpent": 8}
  ]
}
```

2. **Check Output:**
   - The HTTP Request node should output binary data
   - View the PDF by clicking on the binary output
   - Verify file size and content

---

## Handling Binary PDF Response

### Response Detection

The API returns different content types based on success or failure:

| Status | Content-Type | Body |
|--------|--------------|------|
| 200 | `application/pdf` | Binary PDF data |
| 400, 500 | `application/json` | Error object |

### JavaScript Pattern for Mixed Responses

```javascript
async function callPDFEndpoint(data) {
  const response = await fetch('/api/fokus-check/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  // Check content type to determine response format
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/pdf')) {
    // Success: Binary PDF
    return {
      success: true,
      pdf: await response.blob(),
    };
  } else {
    // Error: JSON response
    const error = await response.json();
    return {
      success: false,
      error: error.error,
      status: response.status,
    };
  }
}

// Usage
const result = await callPDFEndpoint(myData);

if (result.success) {
  // Handle PDF blob
  const url = URL.createObjectURL(result.pdf);
  window.open(url);
} else {
  // Handle error
  console.error(`Error ${result.status}: ${result.error}`);
}
```

### Converting Binary Response

**To Base64 (for embedding/email):**

```javascript
async function pdfToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Usage
const pdfBlob = await generatePDF(data);
const base64PDF = await pdfToBase64(pdfBlob);
```

**To ArrayBuffer (for processing):**

```javascript
const pdfBlob = await generatePDF(data);
const arrayBuffer = await pdfBlob.arrayBuffer();
const uint8Array = new Uint8Array(arrayBuffer);
```

**To Node.js Buffer:**

```javascript
const response = await fetch(url, options);
const arrayBuffer = await response.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

// Save to file
fs.writeFileSync('output.pdf', buffer);
```

---

## Common Integration Patterns

### React Hook Example

```typescript
import { useState, useCallback } from 'react';

interface UsePDFGeneratorOptions {
  onSuccess?: (blob: Blob) => void;
  onError?: (error: string) => void;
}

export function usePDFGenerator(options: UsePDFGeneratorOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePDF = useCallback(async (data: GeneratePDFRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/fokus-check/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      const blob = await response.blob();
      options.onSuccess?.(blob);
      return blob;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      options.onError?.(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  return { generatePDF, isLoading, error };
}

// Usage in component
function FokusCheckResult({ result, answers }) {
  const { generatePDF, isLoading, error } = usePDFGenerator({
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
  });

  return (
    <button
      onClick={() => generatePDF({ result, answers })}
      disabled={isLoading}
    >
      {isLoading ? 'Generating...' : 'Download PDF'}
    </button>
  );
}
```

### Retry Pattern

```javascript
async function generatePDFWithRetry(data, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('/api/fokus-check/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.blob();
      }

      // Don't retry client errors
      if (response.status === 400) {
        const { error } = await response.json();
        throw new Error(error);
      }

      // Retry server errors
      const { error } = await response.json();
      lastError = new Error(error);
    } catch (err) {
      lastError = err;
    }

    // Wait before retry (exponential backoff)
    if (attempt < maxRetries) {
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt - 1)));
    }
  }

  throw lastError;
}
```
