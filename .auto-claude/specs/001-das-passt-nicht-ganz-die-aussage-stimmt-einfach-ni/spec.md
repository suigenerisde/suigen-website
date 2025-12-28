# Quick Spec: Remove Fabricated Social Proof Banner

## Overview
Remove the false social proof banner from the Fokus-Check quiz intro that claims "1.247+ Unternehmer" and "+37% Produktivitätssteigerung". These claims are not backed by real data and should be removed for integrity.

## Workflow Type
Simple - Single file modification with cosmetic removal, no functional dependencies.

## Task Scope
### Files to Modify
- `src/components/fokus-check/FokusCheckQuiz.tsx` - Remove lines 429-438 (social proof div)

### Change Details
Remove the entire social proof `<div>` block that contains fabricated statistics:
- "1.247+ Unternehmer haben ihren Fokus-Score bereits berechnet"
- "Durchschnittliche Produktivitätssteigerung nach Fokus-Audit: +37%"

## Success Criteria
- [ ] Fokus-Check page loads without errors
- [ ] The false claims banner no longer appears on the quiz intro screen
- [ ] Layout remains intact (button and WhatsApp bonus teaser still display correctly)

## Notes
- There is also similar text in `ResultDisplay.tsx:333` - consider if this should also be removed
