# Add Loading State to Button Component

## Overview

Enhance the Button component with a built-in loading state that displays a spinner and disables interaction. Currently, loading states are handled inline in components like DeliveryChoice with 'Wird gesendet...' text. A standardized loading prop would ensure consistent loading UX across all buttons.

## Rationale

The Button component already has a disabled state with styling (opacity-50 cursor-not-allowed). Multiple components (DeliveryChoice, ContinueLaterModal, AccessRequestForm) implement loading states manually. The infrastructure for disabled states exists and can be extended to loading states.

---
*This spec was created from ideation and is pending detailed specification.*
