# Dynamic import @react-pdf/renderer to reduce client bundle

## Overview

The @react-pdf/renderer package (~400KB) is currently bundled with client-side code even though it's only used in the server-side API route. Using dynamic imports would ensure this heavy package is only loaded when needed on the server.

## Rationale

@react-pdf/renderer is one of the largest dependencies in the project but is only used in the /api/fokus-check/generate-pdf route. The current import pattern may cause Next.js to include parts of this package in client bundles, increasing initial load time.

---
*This spec was created from ideation and is pending detailed specification.*
