# Unify Hero buttons to use Button component instead of .btn class

## Overview

The Hero component uses direct className .btn and .btn-primary for CTAs, while the rest of the application uses the <Button> component from ui/Button.tsx. This creates inconsistency.

## Rationale

Using a single Button component ensures consistent styling, easier maintenance, and uniform focus states/accessibility features across the app. The Button component already has proper focus ring styling.

---
*This spec was created from ideation and is pending detailed specification.*
