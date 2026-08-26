# StormLift website design QA

## Comparison target

- Source visual truth: `/Users/cris/Desktop/home-1.jpg` (primary collapsed-FAQ state), with `/Users/cris/Desktop/home-2.jpg` and `/Users/cris/Desktop/home-3.jpg` for alternate hero states.
- Rendered implementation: `http://127.0.0.1:4174/`.
- Primary comparison state: 1920-pixel desktop, hero state 0, collapsed FAQ.
- Source pixels: 1920 × 8027. Implementation viewport: 1920 × 960 at device pixel ratio 1, stitched to 1920 × 8027 from consecutive in-app Browser captures.
- Stable comparison captures temporarily neutralized reveal/autoplay motion without changing layout. The final Track comparison uses the production motion code after animations settled.

## Evidence

- Full source/implementation comparison: `/private/tmp/stormlift-fidelity-v2.367eag/qa/comparison-full-home1-vs-implementation.jpg`
- Hero comparison: `/private/tmp/stormlift-fidelity-v2.367eag/qa/comparison-hero-home1-vs-implementation.jpg`
- Feature comparison: `/private/tmp/stormlift-fidelity-v2.367eag/qa/comparison-features-home1-vs-implementation.jpg`
- Ending comparison: `/private/tmp/stormlift-fidelity-v2.367eag/qa/comparison-ending-home1-vs-implementation.jpg`
- Final production-motion Track comparison: `/private/tmp/stormlift-fidelity-v2.367eag/qa/comparison-track-final-home1-vs-implementation.jpg`
- Final implementation: `/private/tmp/stormlift-fidelity-v2.367eag/qa/stormlift-1920-full-stitched.jpg`
- Responsive captures: `/private/tmp/stormlift-fidelity-v2.367eag/qa/stormlift-1440-hero.jpg`, `/private/tmp/stormlift-fidelity-v2.367eag/qa/stormlift-1280-hero.jpg`, `/private/tmp/stormlift-fidelity-v2.367eag/qa/stormlift-1024-hero.jpg`, `/private/tmp/stormlift-fidelity-v2.367eag/qa/stormlift-768-hero.jpg`, `/private/tmp/stormlift-fidelity-v2.367eag/qa/stormlift-390-hero.jpg`.

## Required fidelity surfaces

- Fonts and typography: passed. Bundled Outfit weights, headline hierarchy, line breaks, wordmark scale and body copy match the reference closely.
- Spacing and layout rhythm: passed. The primary desktop section map now follows the 8027-pixel source: header 116, hero 964, app 1120, Workouts 1000, three 1000-pixel feature sections, FAQ 750, benefits 414, CTA 454 and footer 209 pixels.
- Colors and visual tokens: passed. Reference gradient bands, dark surfaces, pastel card palette, glows and button treatments are preserved.
- Image quality and asset fidelity: passed. Supplied StormLift phone, athlete, store-badge, icon and logo assets are used directly at source-appropriate proportions; no placeholders were introduced.
- Copy and content: passed. The reference marketing copy and legal-route behavior are preserved. Unsupported App Store and social destinations remain disabled rather than linking to fabricated targets.
- Interactions and accessibility: passed. Hero autoplay, direct controls, keyboard arrows, mobile swipe, FAQ disclosure, anchor offsets, focus states and disabled-link semantics were verified. Reduced-motion handling was inspected in code.

## Comparison history

### Pass 1 — blocked

- [P1] Desktop geometry diverged from the 1920-pixel reference: the header and hero were short, gradient bands and athletes were underscaled, the phone composition was too small, and the page extended to roughly 8440 pixels. Fixed with a reference-mapped desktop layout and exact major-section heights.
- [P2] Workouts cards, alternating feature compositions, FAQ grid, benefits, CTA and footer were offset or proportionally inconsistent. Fixed with localized desktop geometry, source-derived card sizing and per-section art placement.
- [P2] Hero navigation named the first destination “App” instead of “The App,” and the primary heading did not preserve the reference line hierarchy. Fixed in markup and typography rules.

### Pass 2 — blocked

- Re-captured the full desktop and compared source and implementation in the same images.
- [P2] Track artwork remained too tall and its athlete too narrow. Fixed with a localized Track art size and horizontal subject-scale adjustment.
- [P2] Final CTA copy sat about 30 pixels above the source alignment. Fixed by removing the residual vertical translation.

### Pass 3 — passed

- Re-captured the corrected full page and final production-motion Track section.
- Compared source and implementation together at 1920 pixels, then checked responsive captures at 1440, 1280, 1024, 768 and 390 pixels.
- No actionable P0, P1 or P2 mismatch remains.

## Findings

No actionable P0, P1 or P2 findings remain.

## Follow-up polish

- [P3] Minor anti-aliasing and gradient-stop differences remain between the browser render and the raster reference.
- [P3] Narrower breakpoints intentionally reflow the 1920-pixel composition while preserving hierarchy; exact subject positions therefore vary from the desktop source.
- [P3] The reduced-motion branch was inspected but the operating-system preference was not emulated during runtime QA.

## Implementation checklist

- [x] Match the supplied desktop composition and all three hero states.
- [x] Verify 1920, 1440, 1280, 1024, 768 and 390-pixel layouts with no horizontal overflow.
- [x] Verify hero autoplay, direct controls, keyboard arrows and swipe.
- [x] Verify FAQ, anchored navigation, legacy legal fragments and canonical legal routes.
- [x] Confirm no broken page images or console errors.
- [x] Preserve legal content and avoid Android/iOS application changes.

final result: passed
