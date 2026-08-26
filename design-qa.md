# StormLift website design QA

## Comparison target

- Source visual truth: `/Users/cris/Desktop/home-1.jpg` (primary), with `/Users/cris/Desktop/home-2.jpg` and `/Users/cris/Desktop/home-3.jpg` for alternate hero states.
- Rendered implementation: `http://127.0.0.1:4173/`.
- State: dark marketing homepage, hero state 1, Workouts, Focus, FAQ expanded, benefits, CTA, tablet and mobile hero states.
- Browser/CSS viewports: 1280 × 960, 768 × 960 and 390 × 844 at device pixel ratio 1. The browser content captures are 1280 × 861, 768 × 780 and 390 × 780 pixels because browser chrome is excluded.
- Source pixels: 1920 × 8027 at density 1. Focused source crops were normalized to the matching implementation capture size before comparison; this avoids treating the source's wider 1920-pixel desktop canvas as a defect at the 1280-pixel implementation viewport.

## Evidence

- Full-view/hero comparison: `/private/tmp/stormlift-site-qa/comparison-hero-final.jpg`
- Focused Workouts comparison: `/private/tmp/stormlift-site-qa/comparison-workouts-final.jpg`
- Focused Focus comparison: `/private/tmp/stormlift-site-qa/comparison-focus-final.jpg`
- Final desktop captures: `/private/tmp/stormlift-site-qa/homepage-1280-final-v2.png`, `/private/tmp/stormlift-site-qa/homepage-1280-workouts-final-v3.png`, `/private/tmp/stormlift-site-qa/homepage-1280-focus-final.png`, `/private/tmp/stormlift-site-qa/homepage-1280-faq-open.png`, `/private/tmp/stormlift-site-qa/homepage-1280-benefits.png`, `/private/tmp/stormlift-site-qa/homepage-1280-cta-final.png`
- Final responsive captures: `/private/tmp/stormlift-site-qa/homepage-768-final.png`, `/private/tmp/stormlift-site-qa/homepage-390-final-v2.png`, `/private/tmp/stormlift-site-qa/homepage-390-workouts.png`, `/private/tmp/stormlift-site-qa/homepage-390-focus.png`, `/private/tmp/stormlift-site-qa/homepage-390-faq.png`, `/private/tmp/stormlift-site-qa/privacy-390.png`

## Required fidelity surfaces

- Fonts and typography: passed. The implementation uses the product's bundled Outfit family in regular through extra-bold weights. Headline scale, uppercase treatment, body hierarchy, wrapping and optical weight remain aligned with the reference across the checked widths.
- Spacing and layout rhythm: passed. Section ordering, black negative space, card grids, alternating feature composition, radii and desktop/mobile rhythm match the visual target without overlap or horizontal overflow.
- Colors and visual tokens: passed. Warm, coach, focus and rainbow gradients are centralized as CSS tokens and retain the source palette, contrast and dark-background balance.
- Image quality and asset fidelity: passed. All supplied StormLift product, athlete, store-badge, phone, FAQ and footer assets are used directly at their intended aspect ratios. No visible source asset was replaced with a placeholder, emoji, CSS drawing or handcrafted SVG.
- Copy and content: passed. Marketing copy follows the supplied source and brief. Current legal text is preserved on dedicated pages, and unsupported App Store/social destinations are disabled instead of fabricated.
- Interactions and accessibility: passed. Hero controls, autoplay, keyboard arrow navigation, mobile swipe, hash navigation, FAQ expansion, visible focus treatment, semantic buttons, alt text and reduced-motion paths were checked. Console errors/warnings: none.

## Comparison history

### Pass 1 — blocked

- [P1] The initial desktop hero left an exposed dark gap in hero state 1. Fixed by aligning the focus, warm and coach band stops into a contiguous 0–30%, 30–72%, 72–100% composition. Post-fix evidence: `homepage-1280-final-v2.png` and `comparison-hero-final.jpg`.
- [P1] The final CTA heading overlapped the phone artwork at desktop width. Fixed by reducing the responsive headline ceiling while preserving the source hierarchy. Post-fix evidence: `homepage-1280-cta-final.png`.
- [P1] Tablet and mobile hero badges, controls and wordmark collided. Fixed with breakpoint-specific bottom positions and 44-pixel touch targets. Post-fix evidence: `homepage-768-final.png` and `homepage-390-final-v2.png`.
- [P1] Mobile side-phone positioning created clipped composition/overflow risk. Fixed by pinning the side phones to the section edges and preserving the center-phone hierarchy. Post-fix evidence: responsive captures and zero-overflow measurements at 320–1920 CSS pixels.
- [P2] Desktop section proportions and card sizing were too large at intermediate widths. Fixed with clamp-based section, artwork, badge and card sizing. Post-fix evidence: desktop and focused comparison captures.
- [P2] The legacy same-tab legal fragment path did not reroute after a hash changed without a reload. Fixed with a `hashchange` route handler. Post-fix behavior: `/#privacy`, `/#terms` and `/#contact` resolve to the canonical legal pages.

### Pass 2 — passed

- Re-captured the corrected desktop, tablet and mobile layouts at the same states.
- Compared the normalized reference and implementation together for hero, Workouts and Focus.
- No actionable P0, P1 or P2 mismatch remains.

## Findings

No actionable P0, P1 or P2 findings remain.

## Follow-up polish

- [P3] The implementation intentionally adapts the 1920-pixel reference proportions at narrower desktop widths, so exact subject positions and gradient stops vary slightly while preserving the same hierarchy and art direction.
- [P3] Platform-level reduced-motion preference was verified in code but not emulated at the operating-system setting during this pass.

## Implementation checklist

- [x] Match the supplied assets, layout, palette and typography.
- [x] Verify desktop, tablet and mobile responsive states.
- [x] Verify core hero, FAQ and fragment-routing interactions.
- [x] Confirm no broken images, console errors or horizontal overflow.
- [x] Preserve the current legal content and canonical routes.

final result: passed
