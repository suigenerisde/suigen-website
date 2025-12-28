# Documentation

This directory contains project documentation including API references, guides, and integration examples.

## API Documentation

| Endpoint | Method | Description |
|----------|--------|-------------|
| [/api/fokus-check/generate-pdf](./api/fokus-check-generate-pdf.md) | POST | Generate PDF report from Fokus-Check assessment results |

## API Quick Links

- **[Fokus-Check PDF Generation](./api/fokus-check-generate-pdf.md)** - Complete documentation for the PDF generation API including:
  - Request/response schemas
  - TypeScript type definitions
  - cURL, JavaScript, and n8n integration examples
  - Error handling patterns

## Directory Structure

```
docs/
├── README.md           # This file - documentation index
└── api/
    └── fokus-check-generate-pdf.md   # PDF generation API documentation
```

## Contributing

When adding new API documentation:

1. Create a new markdown file in the `docs/api/` directory
2. Follow the existing documentation format in `fokus-check-generate-pdf.md`
3. Update this index file to include the new endpoint
4. Ensure all request/response schemas are documented
5. Include practical code examples for common use cases
