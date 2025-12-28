# Create API documentation for PDF generation endpoint

## Overview

The API route at /api/fokus-check/generate-pdf handles PDF generation via POST but has no documentation on request/response format, error codes, or integration with the frontend and n8n workflows.

## Rationale

This endpoint is called both from the frontend and potentially from n8n workflows. External integrators and future developers need to understand the expected payload structure and possible responses without reading source code.

---
*This spec was created from ideation and is pending detailed specification.*
