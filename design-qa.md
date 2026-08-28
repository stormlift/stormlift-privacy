# StormLift Hero fidelity-pass design QA

## Comparison target

- Scope: home-page Hero only; the approved sticky header is included only to verify first-viewport fit.
- Full-composition visual truth: `/Users/cris/Desktop/home-1.jpg`, `/Users/cris/Desktop/home-2.jpg`, and `/Users/cris/Desktop/home-3.jpg`.
- Authoritative strip detail truth: `/Users/cris/Desktop/gradient-1.png`, `/Users/cris/Desktop/gradient-2.png`, and `/Users/cris/Desktop/gradient-3.png`.
- Rendered implementation: `http://127.0.0.1:4174/`.
- Desktop states: dumbbell man active, woman active, and phone man active.
- Approval capture viewport: 1233 × 720 CSS pixels at device pixel ratio 1, matching the visible in-app Browser surface.
- Density normalization: each 1920 × 1080 source crop was cropped to 1849 × 1080 and downsampled to 1233 × 720, producing the same pixels, aspect ratio, density, state, and content frame as the implementation capture.
- First-viewport geometry was also inspected at 1920 × 1080: 116px approved header + 964px Hero = 1080px; the wordmark terminates at the same edge with its intentional one-pixel crop.

## Evidence

- Final Hero states: `/private/tmp/stormlift-hero-pass-2/final/hero-state-1.jpg`, `/private/tmp/stormlift-hero-pass-2/final/hero-state-2.jpg`, and `/private/tmp/stormlift-hero-pass-2/final/hero-state-3.jpg`.
- Normalized full-view comparisons: `/private/tmp/stormlift-hero-pass-2/qa/comparison-state-1.jpg`, `/private/tmp/stormlift-hero-pass-2/qa/comparison-state-2.jpg`, and `/private/tmp/stormlift-hero-pass-2/qa/comparison-state-3.jpg`.
- Gradient details: `/private/tmp/stormlift-hero-pass-2/final/warm-strip.jpg`, `/private/tmp/stormlift-hero-pass-2/final/green-cyan-strip.jpg`, and `/private/tmp/stormlift-hero-pass-2/final/blue-purple-strip.jpg`.
- Focused strip comparisons: `/private/tmp/stormlift-hero-pass-2/qa/comparison-strip-warm.jpg`, `/private/tmp/stormlift-hero-pass-2/qa/comparison-strip-green-cyan.jpg`, and `/private/tmp/stormlift-hero-pass-2/qa/comparison-strip-blue-purple.jpg`.
- Store CTA and wordmark details: `/private/tmp/stormlift-hero-pass-2/final/store-cta.jpg` and `/private/tmp/stormlift-hero-pass-2/final/wordmark-blur.jpg`.
- Transition evidence: `/private/tmp/stormlift-hero-pass-2/transition/transition-contact-sheet.jpg` plus the five source frames in that directory.

## Required fidelity surfaces

- Fonts and typography: passed. Hero copy remains bundled Outfit with reference-aligned uppercase weight, scale, wrapping, and regular-weight second line. The copy moved upward by 8px at the measured desktop tier without changing its X position, width, size, or line breaks.
- Spacing and layout rhythm: passed. Main panels retain the 22.6% / 54.9% / 22.8% state map. At the 1233px approval viewport, each 77.06px strip uses `right: 0` inside its parent. Its right edge stays exactly 2px inside the main layer's intentional overdraw during all five transition samples. CTA group Y remained 171px during the full swap.
- Colors and visual tokens: passed. Warm, green/cyan, and blue/purple strip gradients remain in their corresponding families. Shadows are colored rather than black/gray. Green/cyan uses 0.94 opacity and the strongest aqua shadow so it remains visible against adjacent cyan panels.
- Image quality and asset fidelity: passed. The supplied athlete PNGs, store artwork, and StormLift SVG remain the source assets. Normalized comparisons confirm the reduced active and side scales and increased top breathing room requested in this pass.
- Copy and content: passed. All three supplied Hero headlines remain unchanged.
- Interactions and accessibility: passed. Store CTAs stay mounted and interpolate between mirrored X positions while the group itself remains fixed. Side subjects are labeled buttons, the active center uses z-index 6 against side z-index 5, controls remain hidden, mobile keeps one subject, and keyboard/swipe/reduced-motion behavior is preserved.
- Wordmark compositing: passed. The previous glow/drop-shadow and whole-word blur were removed. A StormLift-SVG-masked layer applies `backdrop-filter: blur(6px) saturate(.92)` only through the glyphs, with a separate crisp SVG above it.
- Responsiveness: passed at 1920 × 1080 geometry, the 1233 × 720 approval viewport, and 390 × 844 mobile. Mobile header + Hero reaches 844px exactly; the 308px CTA group stays inside the 390px viewport; document horizontal overflow is 0px.

## Comparison history

### Pass 1 — blocked

- [P2] Gradient architecture and seams: the baseline used single bands and exposed the black stage while bands reordered.
- [P2] Subject hierarchy: z-index depended on a shared low layer, and side subjects used visibly unequal scales.
- [P2] Center calibration: the dumbbell man and especially the woman read right-heavy.
- [P2] Badge treatment: white wrappers were tight and lacked the StormLift gradient outline/glow.
- [P2] Wordmark depth: one flat SVG layer did not reproduce the reference overlap softness.
- [P2] Interaction/UI: visible pagination controls did not match the artwork, and subjects were not direct accessible controls.

### Pass 2 — passed

- Rebuilt every subject background as an independently moving main panel and attached right strip, with a full-color stage underlay preventing black transition gaps.
- Applied active-subject z-index 6 versus side-subject z-index 5 and normalized side heights to within 6px at the 1920 reference viewport.
- Calibrated active button centers to approximately x=930px (dumbbell), x=975px (woman), and x=949px (phone), accounting for each supplied cutout.
- Expanded the store wrappers with CSS gradient borders, clean white interiors, comfortable padding, and colored glows.
- Added crisp and softly blurred wordmark layers, strengthened the copy depth transition, removed visible controls, and added labeled subject buttons.
- Post-fix full-view and focused comparisons show no actionable P0, P1, or P2 Hero mismatch.

### Strict second fidelity pass, iteration 1 — blocked

- [P2] Strip attachment: the initial refinement translated strips beyond the main-panel edge instead of locking them inside the right edge.
- [P2] Dumbbell-right clipping: the right-side dumbbell figure exceeded the 1280px viewport by approximately 11px.
- [P2] Athlete scale: normalized full-view comparison showed active subjects about 18px too high and side subjects about 12–17px too high at the visible desktop tier.
- [P2] Green/cyan distinction: the coach strip was still too close to its surrounding cyan tones.

### Strict second fidelity pass, iteration 2 — passed

- Anchored every strip with `right: 0`, removed strip translation, and verified a constant 2px main/strip edge delta throughout the transition.
- Replaced the dumbbell-right percentage offset with tiered viewport-relative `calc()` offsets that retain 13–28px clearance.
- Reduced active desktop scale to 0.94 at large desktop, 0.76–0.77 at mid desktop, and 0.67 at the approval tier; reduced side scale to 0.65–0.67, 0.55, and 0.47 respectively.
- Increased green/cyan strip contrast and colored-shadow strength without changing the core coach gradient family.
- Post-fix normalized full-view and focused comparisons show no actionable P0, P1, or P2 Hero mismatch.

## Runtime verification

- Subject click: passed for state 0 → 1 → 2.
- Keyboard navigation: passed; ArrowRight advanced state 0 → 1.
- Autoplay: passed; state 0 advanced to state 1 after the seven-second interval.
- Mobile swipe: passed; a left swipe advanced state 0 → 1.
- CTA swap: passed; both buttons stayed mounted, group Y stayed fixed, and individual transforms interpolated without reflow.
- Strip transition: passed at 0ms, 300ms, 650ms, 1050ms, and 1450ms; attachment delta remained constant and no black gap appeared.
- Dumbbell-right clearance: passed; 13.5px at the 1233px approval viewport, with 0px document overflow.
- Foreground order: passed; active z-index 6 and side z-index 5 in every measured state and transition sample.
- Wordmark: computed backdrop filter is `blur(6px) saturate(0.92)` and both visible layers have `filter: none`, confirming no glow/drop-shadow.
- Mobile subject controls: all disabled with `tabIndex=-1`; desktop side controls are enabled with labels and `tabIndex=0`.
- Reduced motion: inspected; the existing media query collapses Hero animation/transition durations to 0.01ms, and JavaScript suppresses the leaving-copy class when reduced motion is active.
- Browser console logs: none.
- Horizontal overflow: 0px at desktop and mobile.
- Static validation: `git diff --check` and JavaScript syntax check passed.
- Out-of-scope sections: no new changes were made to the header or any section after the Hero during this pass.

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up polish

- [P3] The visible in-app Browser surface is 1233px wide, so approval screenshots use a normalized 1233 × 720 comparison while the 1920 × 1080 design geometry is additionally verified through browser DOM measurement.

## Implementation checklist

- [x] Fit header plus Hero to the first viewport.
- [x] Keep the wordmark on the viewport/Hero bottom edge.
- [x] Implement independent main-panel/right-strip gradient pairs and chromatic shadows.
- [x] Prevent black transition seams.
- [x] Keep active subjects above equally scaled side subjects.
- [x] Calibrate each active subject independently.
- [x] Rebuild store badge wrappers and wordmark depth treatment.
- [x] Strengthen restrained copy motion and remove visible carousel UI.
- [x] Add accessible side-subject interaction and autoplay reset.
- [x] Preserve mobile swipe, reduced-motion handling, and all out-of-scope sections.
- [x] Lock each strip to the main panel's right edge and strengthen family-specific shadows.
- [x] Reduce active and side-subject scales and keep the dumbbell man inside the right edge.
- [x] Keep the CTA group vertically stable while buttons swap positions.
- [x] Replace wordmark halo/whole-text blur with masked backdrop blur plus a crisp layer.

## Narrow final-refinement pass

- Source visual truth: `/Users/cris/Desktop/home-1.jpg`, `/Users/cris/Desktop/home-2.jpg`, `/Users/cris/Desktop/home-3.jpg`, `/Users/cris/Desktop/gradient-1.png`, `/Users/cris/Desktop/gradient-2.png`, and `/Users/cris/Desktop/gradient-3.png`.
- Intended implementation capture: `http://127.0.0.1:4174/` at 1233 × 720 CSS pixels, DPR 1.
- Implementation screenshot: blocked; the controlled in-app Browser tab remained on its generated connection-error document after the preview server was restarted, and Browser URL policy rejected both refresh and direct navigation from that error document.
- Full-view comparison evidence: unavailable for this iteration because no post-change implementation screenshot could be captured.
- Focused comparison evidence: unavailable for this iteration for strip attachment, wordmark opacity, and CTA Y alignment for the same reason.
- Density normalization: not applicable until the missing post-change implementation capture is available.
- State: post-change states 1, 2, and 3 were not browser-rendered in this iteration.

### Implemented source-level corrections

- Gradient geometry: removed the main layer's independent 2px right overdraw. The main and strip now share the same parent edge (`inset: 0` and `right: 0`), so their right-edge relationship is mathematically constant while the parent moves and resizes.
- Wordmark compositing: preserved the masked `backdrop-filter: blur(6px) saturate(.92)` layer and reduced only the crisp front SVG opacity from 0.58 to 0.54.
- CTA alignment: moved the desktop group upward by 6px, from 88px to 82px at the 1233px approval tier and from the 104–118px clamp to 98–112px at larger desktop widths.
- CTA transition logic: replaced slide-index-specific coordinate selectors with a two-phase `.is-swapped` state. Every actual slide change advances the phase once, including modulo wraparound and reverse/manual paths.

### Static and preview-service validation

- `git diff --check`: passed.
- JavaScript syntax check: passed.
- Served `script.js` SHA-256 matches the working-tree file: `df4904de2eb188e40e9dd01092dd49ebece9f751b11365d7491faddc26d63548`.
- Served `styles.css` SHA-256 matches the working-tree file: `34b81dc5c51b1fac0af602bcb0193a06e4f896c3190317b9856195cf7515364a`.
- CTA phase simulation: passed for 1 → 2, 2 → 3, 3 → 1, direct manual 1 → 3, and the reverse cycle 1 → 3 → 2 → 1.
- Header markup remains unchanged in this iteration; its SHA-256 remains `e8c40b83d0f161b52d91d6ed9be4d4c9f712258c1018aa3a5e16419b26359458`.
- Markup from the App section onward remains unchanged in this iteration; its SHA-256 is `51254d70a7cbbf97f106d5594044543b64903f79e60d255c4aa3825a51d6b943`.
- JavaScript from the reveal-section boundary onward remains unchanged; its SHA-256 remains `5490fd068830a646acb01eb9f3da10147995bb5627120ca4c6e13bae75773613`.

### Blocking finding

- [P1] Post-change visual and runtime evidence is missing.
  Location: local Hero preview in the in-app Browser.
  Evidence: the local server is running and serving the latest working tree, but the controlled tab is still the browser-generated `ERR_CONNECTION_REFUSED` document and Browser policy blocks agent navigation away from it.
  Impact: strip alignment, opacity tuning, CTA visual alignment, computed animation interpolation, console errors, and overflow cannot be honestly approved for this iteration.
  Fix: manually refresh or reopen `http://127.0.0.1:4174/` in the in-app Browser, then rerun the full three-state and focused-crop capture/interaction pass.

final result: blocked

## Phone-spacing, production Play URL, and wordmark refinement

### Comparison target and evidence

- Scope: home-page Hero only.
- Source visual truth: `/Users/cris/Desktop/giusta.png` (2900 × 1360 pixels) and `/Users/cris/Desktop/sbagliata.png` (2656 × 1402 pixels).
- Rendered implementation: `http://127.0.0.1:4174/`.
- State: dumbbell-center Hero state (`data-slide="0"`). The supplied correct reference uses a different active subject, so the direct comparison is limited to the normalized spacing relationship the user identified; no same-state pixel-match claim is made.
- CSS measurement viewport: 1328 × 701 CSS pixels, DPR 1.
- Browser-rendered implementation screenshot: `/private/tmp/stormlift-hero-final-refinement/corrected-dumbbell-center.jpg` (1077 × 701 pixels, the visible in-app Browser capture surface).
- Full-view combined comparison: `/private/tmp/stormlift-hero-final-refinement/comparison-correct-wrong-implemented.jpg` (1328 × 2271 pixels). Each source is aspect-fit into a common 1328 × 701 panel without cropping or stretching; black letterboxing preserves the full frame.
- Focused wordmark evidence: `/private/tmp/stormlift-hero-final-refinement/wordmark-blur-closeup.jpg` (1077 × 191 pixels). A focused crop is required because the compositing difference is too small to judge reliably in the full-view comparison.

### Required fidelity surfaces

- Fonts and typography: passed. Hero copy family, weight, scale, line height, wrapping, and content were not modified in this pass.
- Spacing and layout rhythm: passed. The reference's adjacent side/active subject visual-center gap is 30.41% of viewport width. The wrong example measures 27.29%. The corrected implementation measures 403.829px at the 1328px CSS viewport, or 30.4088%. The phone figure remains fully visible with a measured 92.96px left clearance in the calibration capture.
- Colors and visual tokens: passed. Existing Hero gradients, CTA treatment, and subject color families were preserved. The front wordmark opacity changed only from 0.54 to 0.52.
- Image quality and asset fidelity: passed. Existing supplied athlete cutouts, store artwork, and StormLift SVG remain in use. The phone figure's scale was preserved; only its X position changed in the dumbbell-center desktop state.
- Copy and content: passed. Hero copy was unchanged.
- Icons and store artwork: passed. Existing official badge artwork remains in use. The Play destination is centralized in `SITE_LINKS.playStore` and resolves to the production `com.stormlift.app` listing.
- States and interactions: passed. Subject click, seven-second autoplay, mobile swipe, and CTA position swapping were browser-tested. Both CTAs remain mounted and visible throughout 1 → 2 → 3 → 1 and direct 1 → 3 transitions.
- Responsiveness and accessibility: passed. Desktop states and 390 × 844 mobile were tested with 0px document overflow. Mobile retains one visible subject, disabled hidden subject controls, and an in-viewport CTA group. Existing reduced-motion handling remains present.

### Comparison history

#### Iteration 1 — blocked

- [P2] Phone figure spacing in the dumbbell-center state was too tight relative to the intended composition. The supplied wrong example's normalized side/active visual-center gap was 27.29%, versus 30.41% in the supplied correct reference.

#### Iteration 2 — passed

- Moved only `.home-page .hero-slider[data-slide="0"] .hero-person--focus` from `--person-x: 12.5vw` to `7vw` in the desktop fidelity block; scale values and every other Hero-state selector were unchanged.
- Post-fix browser geometry measures a 30.4088% normalized visual-center gap, matching the 30.41% target within rounding and leaving the phone figure unclipped.
- Increased the SVG-masked backdrop blur from 6px to 8px and reduced the crisp wordmark layer from 0.54 to 0.52 opacity. Computed `filter` and `box-shadow` remain `none` on both wordmark layers, so no glow or halo was introduced.
- Post-fix combined full-view and focused wordmark evidence shows no actionable P0, P1, or P2 mismatch within this narrow scope.

### Runtime and source validation

- Production Play destination: passed. Browser DOM href is `https://play.google.com/store/apps/details?id=com.stormlift.app`, and direct browser navigation loaded the `StormLift - Apps on Google Play` listing.
- Obsolete package audit: passed. `com.cris.ptapp` no longer appears in download-destination code; the production URL appears once in the centralized site-link configuration.
- CTA swap: passed at the midpoint and endpoint for 1 → 2, 2 → 3, 3 → 1, and direct 1 → 3. Both buttons remained mounted with opacity 1.
- Autoplay: passed; state 0 advanced to state 1 after the seven-second interval.
- Subject click: passed across desktop states.
- Mobile swipe: passed at 390 × 844; state 0 advanced to state 1.
- Other-state regression: passed. Active subjects remain z-index 6 and side subjects z-index 5; unchanged state-1/state-2 subject positions remain in frame. State 2's right dumbbell retains 20.5px clearance at the measured desktop viewport.
- Gradient attachment: passed. Main/strip right-edge delta remained 0px in all three rest states and during transition sampling.
- Computed wordmark values: `backdrop-filter: blur(8px) saturate(0.92)`, front opacity `0.52`, and `filter: none` / `box-shadow: none`.
- Browser console warnings/errors: none.
- Horizontal overflow: 0px in all tested desktop states and at 390 × 844 mobile.
- `git diff --check`: passed.
- JavaScript syntax check: passed.
- Served asset integrity: served `script.js` SHA-256 `84649b43c78b5bc681fdd96dc00ad58f39ef31a705a1cee5e79b2d7dd70b18f7` and served `styles.css` SHA-256 `578b0fdc50c9e02c1499ed4a46b4eee4214b4ffdbba221ab9ae76551aa564f46` match the working tree.
- Out-of-scope integrity: header markup SHA-256 remains `e8c40b83d0f161b52d91d6ed9be4d4c9f712258c1018aa3a5e16419b26359458`; markup from the App section onward remains `51254d70a7cbbf97f106d5594044543b64903f79e60d255c4aa3825a51d6b943`; JavaScript from `const revealElements` onward remains `5490fd068830a646acb01eb9f3da10147995bb5627120ca4c6e13bae75773613`.

### Findings

No actionable P0, P1, or P2 findings remain in this narrow Hero pass.

### Remaining test gap

- The supplied correct reference depicts a different active Hero subject than the dumbbell-center implementation state. The spacing decision is therefore validated by normalized subject-center geometry and the three-panel full-view comparison, not by a same-state pixel overlay.

final result: passed

## Benefits, Final CTA, and footer refinement

### Comparison target and evidence

- Scope: Benefits, Final CTA, and footer only.
- Benefits source visual truth: `/Users/cris/Desktop/Screenshot 2026-08-28 at 13.41.12.png` (2932 × 762 px, @2x; 1466 × 381 CSS px).
- CTA/footer source visual truth: `/Users/cris/Desktop/Screenshot 2026-08-28 at 13.40.40.png` (2940 × 1140 px, @2x; 1470 × 570 CSS px).
- Rendered implementation: `http://127.0.0.1:4174/?approval=closing-motion-2#benefits`.
- Desktop comparison viewport: 1470 × 900 CSS px at DPR 1. Because the visible in-app Browser capture surface exposes the left 1243px of this emulated viewport, the source images were normalized to CSS density and cropped to the identical x=0–1243 region before comparison.
- Benefits desktop-left implementation: `/private/tmp/stormlift-closing-qa/benefits-final-desktop-left-1470.jpg` (1243 × 380 px).
- CTA/footer desktop-left implementation: `/private/tmp/stormlift-closing-qa/cta-footer-final-desktop-left-1470.jpg` (1243 × 570 px).
- Combined same-region comparisons: `/private/tmp/stormlift-closing-qa/comparison-benefits-desktop-left.jpg` and `/private/tmp/stormlift-closing-qa/comparison-cta-footer-desktop-left.jpg`.
- Complete responsive resting-state evidence: `/private/tmp/stormlift-closing-qa/benefits-final-1024.jpg` (1024 × 462 px) and `/private/tmp/stormlift-closing-qa/cta-footer-final-1024.jpg` (1024 × 540 px).
- Motion evidence: `/private/tmp/stormlift-closing-qa/benefits-mid-1024.jpg` and `/private/tmp/stormlift-closing-qa/cta-mid-1024.jpg`.
- Additional responsive evidence: `/private/tmp/stormlift-closing-qa/tablet-final-768-v2.jpg` and `/private/tmp/stormlift-closing-qa/mobile-final-390-v2.jpg`.

### Required fidelity surfaces

- Fonts and typography: passed. Bundled Outfit, existing weights, desktop sizes, line heights, copy, and hierarchy remain unchanged. CTA wrapping changes only below 1181px to keep the approved copy clear of the phone composition.
- Spacing and layout rhythm: passed. Benefits geometry is unchanged. The desktop CTA background, height, container, phone sizes, phone positions, and footer alignment remain unchanged. Scoped tablet/mobile placement prevents text/phone collisions without increasing CTA height.
- Colors and visual tokens: passed. The CTA retains the existing canonical Hero-related segmented gradient. Benefits icon/headline colors remain unchanged. Footer legal links now compute to pure white (`rgb(255, 255, 255)`).
- Image quality and asset fidelity: passed. Existing Benefits SVGs, CTA phone PNGs, StormLift footer logo, and social assets remain unchanged. Rear/front phone z-index is explicit while preserving the supplied overlap.
- Copy and content: passed. Benefits, CTA, footer legal copy, and destinations are unchanged.
- Motion: passed. Each Benefits group enters icon → heading → body, with group bases staggered left-to-right by 110ms. The captured mid-state shows icon opacities 0.86/0.55/0.05/0.00, headings 0.54/0.02/0.00/0.00, and only the first body beginning at 0.07. CTA mid-state shows headline 0.83, subtitle 0.59, rear phone 0.04, and front phone 0.00, confirming text → rear → front ordering. Footer uses one restrained 14px fade/translate entrance.
- Reduced motion: passed by code inspection. The media query forces Benefits parts, CTA text/phones, and footer to final opacity/geometry with no transition; JavaScript also composes all staged sections immediately when the preference is active.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS px. Every width reports 0px document overflow, fitting headline/subtitle content, pure-white footer links, and no geometric intersection between either text element and either phone image.

### Comparison history

#### Iteration 1 — blocked

- [P2] At 1024px and 768px, the rear phone overlapped the CTA headline; at 390/360/320px, the front phone intruded into the subtitle area.

#### Iteration 2 — passed

- Scoped the CTA copy to 42% and moved the phone composition right at 901–1180px and at 641–900px.
- Below 641px, reduced the phone composition height from 76% to 64% and lowered its bottom crop from -10px to -36px.
- Post-fix browser geometry reports `[false, false, false, false]` for headline/rear, headline/front, subtitle/rear, and subtitle/front intersections at every requested width.
- Post-fix 768px and 390px screenshots show readable text, intentional bottom/right phone cropping, unchanged CTA height, and no horizontal overflow.

### Runtime and static validation

- Benefits, CTA, and footer staged observers trigger once and remain composed after scroll-out/scroll-in.
- Benefits and CTA transition-delay ordering matches the requested sequence.
- CTA background remains full viewport width with no black side margins.
- Browser console warnings/errors: none.
- `git diff --check`: passed.
- JavaScript syntax check: passed.
- No commit, push, or deployment was performed.

No actionable P0, P1, or P2 findings remain in this scope.

final result: passed

## FAQ natural-flow and feature-block radius correction

### Comparison target and evidence

- Reported bug source: `/Users/cris/Desktop/Screenshot 2026-08-28 at 12.33.30.png` (2874 × 1230 px).
- Baseline reproduction: `/private/tmp/stormlift-faq-flow-correction/before-all-expanded-overlap-1470x1000.png` (1470 × 1000 CSS px, DPR 1).
- Corrected FAQ states: `/private/tmp/stormlift-faq-flow-correction/approval-faq-collapsed-1470x1000.png`, `/private/tmp/stormlift-faq-flow-correction/approval-faq-one-expanded-1470x1000.png`, `/private/tmp/stormlift-faq-flow-correction/approval-faq-multiple-expanded-1470x1000.png`, and `/private/tmp/stormlift-faq-flow-correction/approval-benefits-pushed-below-faq-1470x1000.png` (1470 × 1000 CSS px, DPR 1).
- Desktop edge evidence: `/private/tmp/stormlift-faq-flow-correction/approval-faq-feature-edge-comparison-1470x1000.png`.
- Feature-block evidence: `/private/tmp/stormlift-faq-flow-correction/approval-focus-reference-closeup.png`, `/private/tmp/stormlift-faq-flow-correction/approval-track-small-block-closeup.png`, `/private/tmp/stormlift-faq-flow-correction/approval-coach-small-block-closeup.png`, and `/private/tmp/stormlift-faq-flow-correction/approval-small-block-radius-comparison.png`.
- Before/after comparison: `/private/tmp/stormlift-faq-flow-correction/design-qa-flow-comparison.png`.

### Findings and root cause

- [P1] At desktop widths, `.home-page .faq-section` used a fixed `height: var(--fidelity-faq)` (650px at the 1470px reference viewport). With General, Workouts, and Training & Progress expanded, FAQ content extended 156.44px beyond the section and beneath Benefits.
- [P2] The FAQ inherited the 40px global content gutter while the approved feature sections used 118px, producing mismatched desktop edges.
- [P2] The smallest Track and Adaptive Coach blocks computed to a 52px radius at 110 × 110px, while the authoritative Focus block used 34px.

### Implemented correction

- Replaced the desktop fixed FAQ height with `height: auto` and retained `min-height: var(--fidelity-faq)` only for the collapsed visual footprint. The accordion remains in normal flow; no fixed offset, oversized margin, z-index mask, clipping, or overflow workaround was added.
- Added a scoped desktop `--faq-content-gutter: 118px` and computed the FAQ width from that gutter. The global `--content-gutter` remains 40px at the reference viewport.
- Reused Focus's exact desktop responsive radius rule, `clamp(34px, 2.1875vw, 42px)`, for the smallest Track and Adaptive Coach blocks. Width, height, position, gradients, shadows, and motion declarations were not changed.

### Required fidelity surfaces

- Fonts and typography: passed; no FAQ or feature copy changed.
- Spacing and layout rhythm: passed. FAQ and feature sections both compute to x=118px, width=1234px, right edge=1352px at 1470px.
- Colors and visual tokens: passed. General, Workouts, Training & Progress, and Data & App retain their approved canonical gradients.
- Copy and content: passed; all four category labels, twelve questions, and twelve answers are unchanged.
- States and interactions: passed. Collapsed, one-group, two-group, three-group, and all-four-group states retain the existing accordion transitions and button wiring.
- Accessibility: passed within scope. Native buttons, plus/minus assets, `aria-expanded`, panel visibility, focus handling, and keyboard code are unchanged.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS px with all four groups expanded. No document, card, or FAQ text horizontal overflow was detected; Benefits remained below the FAQ at every width.

### Browser measurements

- Collapsed desktop FAQ retains its 650px minimum visual height.
- All four groups expanded: FAQ height 1071.05px; Benefits top equals FAQ bottom; final Data & App card clears Benefits by 8px; overlap 0px.
- Responsive all-expanded FAQ/Benefits clearances: 198px at 1024, 148px at 768, and 128px at 430/390/360/320.
- Responsive effective FAQ gutters: 28px at 1024/768 and 18px at 430/390/360/320.
- Focus, Track, and Adaptive Coach smallest blocks all compute to 110 × 110px with a 34px radius at 1470px. Track and Coach were 52px before this correction.

### Validation

- Latest local preview: `http://127.0.0.1:4174/?approval=faq-flow-1#faqs`.
- Served stylesheet: `styles.css?v=faq-flow-1`.
- Desktop collapsed, one-group, multiple-group, and all-group states: passed.
- FAQ/Benefits natural document flow: passed; no overlap or clipping.
- FAQ/feature desktop edge parity: passed at x=118px and right=1352px.
- FAQ gradient mappings: passed via refreshed computed styles.
- Browser console warnings/errors: none.
- `git diff --check`: passed after repository synchronization.

No actionable P0, P1, or P2 findings remain in this narrow corrective scope.

final result: passed

## Focus, Track, and Adaptive Coach — centered geometry and reversible square motion

### Comparison target and evidence

- Scope: Focus, Track, and Adaptive Coach only.
- Source visual truth: the exact refinement brief at `/Users/cris/.codex/attachments/3ff787b1-d93f-45ab-931c-ce891fccefa0/pasted-text.txt` plus the previously approved normalized Focus reference at `/private/tmp/stormlift-feature-gutter-qa/giusta-normalized-1470x729.png`.
- Rendered implementation: `http://127.0.0.1:4174/#focus`.
- Final desktop screenshots: `/private/tmp/stormlift-feature-motion-qa/focus-final-1470x904.png`, `/private/tmp/stormlift-feature-motion-qa/track-final-1470x904.png`, and `/private/tmp/stormlift-feature-motion-qa/adaptive-coach-final-1470x904.png`.
- Focused seam evidence: `/private/tmp/stormlift-feature-motion-qa/focus-seam-closeup-1470x904.png`.
- Motion evidence: `/private/tmp/stormlift-feature-motion-qa/focus-early-large-square-zoom-1470x904.png` and `/private/tmp/stormlift-feature-motion-qa/focus-mid-floating-square-slide-1470x1600.png`.
- Combined source/implementation comparison: `/private/tmp/stormlift-feature-motion-qa/focus-source-implementation-comparison.png`.
- Viewport and normalization: final captures use a 1470 × 904 CSS viewport at DPR 1. The approved Focus source and final implementation were normalized to 1470 × 729 pixels and placed in one 2940 × 729 comparison image.
- State: final captures use the natural completed scroll-linked state with both large squares at scale 1 and both floating squares at their authored position.

### Full-view and focused comparison evidence

- The side-by-side Focus comparison preserves the approved 118px content gutter, alternating composition, typography, copy, CTA treatment, gradients, imagery, radii, and final square positions. The requested centered article alignment moves both wrappers to the section midpoint without introducing independent top offsets.
- The seam crop shows the Focus athlete overlapping the large square edge with no visible black line after the +2px resting Y correction.
- The early-scroll capture records outer/inner scales of 0.9601/0.9205 at progress 0.295. The mid-scroll capture records the right block at +4.99px/0.743 opacity and the left block at -14.28px/0.488 opacity at progress 0.350.

### Required fidelity surfaces

- Fonts and typography: passed. Outfit, weights, heading gradients, body copy, wrapping, and CTA typography are unchanged.
- Spacing and layout rhythm: passed. Desktop articles compute `align-items: center`; text and art wrappers compute `margin-top: 0px`; wrapper centers are within 0.6px of their article center. The 118px feature gutter and alternating layout are unchanged.
- Colors and visual tokens: passed. All three canonical feature gradients, opacity values, glow colors, CTA borders, and CTA shadows are unchanged.
- Image quality and asset fidelity: passed. The existing three grayscale athlete PNGs remain unchanged. Focus receives only a +2px resting Y offset; no scale or horizontal-position change was introduced.
- Copy and content: passed. Headings, descriptions, and CTA text are unchanged.
- States and interactions: passed. Outer/inner square scales scrub from 0.90/0.87 to 1 across progress 0.00–0.52 and 0.07–0.60. Floating blocks use 32px desktop/tablet travel, 24px mobile travel, 0→1 reveal progress with ranges 0.14–0.42 and 0.20–0.48, and a 0.96→1 scale. A down/up/down scroll check returned the exact same intermediate values, confirming natural reversal without snapping.
- Accessibility: passed by source verification. The existing reduced-motion CSS and JavaScript branches now also force both square scales, both orb X offsets, both orb scales, and both orb opacities to their final values. Runtime media emulation was unavailable in the in-app Browser.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS pixels. Each width measured equal document/client width, separated copy/art rectangles, in-viewport athletes, in-viewport floating blocks, and in-viewport feature articles. The 320px visual capture is `/private/tmp/stormlift-feature-motion-qa/focus-320x900.png`.

### Comparison history

#### Iteration 1 — blocked

- [P2] At 430px and below, the new 32px left/right entry translations pushed Track and Adaptive Coach floating blocks 6–8px beyond the viewport during their earliest scroll state.

#### Iteration 2 — passed

- Reduced the narrow-screen travel to 24px and moved the authored mobile orb anchors inward to 8px. Final relative left/right placement remains intact, and the full 1024/768/430/390/360/320 sweep now reports zero horizontal overflow.
- The post-fix full-view comparison, seam crop, motion-state captures, exact reversal check, responsive geometry sweep, and console check show no actionable P0, P1, or P2 issue in the requested feature-only scope.

### Validation

- Focus rest transform: `translateY(0px)` → effective `translateY(2px)`; final computed transform Y = 2.02px with scroll scale 0.9999.
- Canonical floating-square sizes at 1470px: 130.156 × 130.156px and 110 × 110px for Focus, Track, and Adaptive Coach.
- Final large-square scales: 1.0000/1.0000 in all three sections.
- Final floating-square offsets/opacities: 0px and 0.88 authored opacity in all three sections.
- Responsive overflow: 0px at 1024, 768, 430, 390, 360, and 320.
- Browser console warnings/errors: none.
- Served assets: `styles.css?v=feature-motion-1` and `script.js?v=feature-motion-1`.
- `git diff --check`: passed.
- Bundled Node syntax check for `script.js`: passed.

### Findings

No actionable P0, P1, or P2 findings remain in the requested Focus/Track/Adaptive Coach scope.

final result: passed

## Focus, Track, and Adaptive Coach — scoped 118px gutter refinement

### Comparison target and evidence

- Scope: the horizontal boundary of the complete Focus, Track, and Adaptive Coach compositions only.
- Source visual truth: `/Users/cris/Desktop/giusta.png` (correct, 2940 × 1458 pixels at 2× density) and `/Users/cris/Desktop/sbagliata.png` (current incorrect spacing, 2932 × 1342 pixels).
- Normalized source: `/private/tmp/stormlift-feature-gutter-qa/giusta-normalized-1470x729.png` (1470 × 729 pixels).
- Rendered implementation: `http://127.0.0.1:4174/`.
- Focus implementation: `/private/tmp/stormlift-feature-gutter-qa/focus-1470x729-final.png` at a 1470 × 729 CSS viewport, DPR 1.
- Track implementation: `/private/tmp/stormlift-feature-gutter-qa/track-1470x904.png` at a 1470 × 904 CSS viewport, DPR 1.
- Adaptive Coach implementation: `/private/tmp/stormlift-feature-gutter-qa/adaptive-coach-1470x904.png` at a 1470 × 904 CSS viewport, DPR 1.
- State: settled production scroll-motion state. The Focus source and implementation were opened together at equal 1470 × 729 pixel dimensions. The source is a section-only capture while the browser implementation includes the existing sticky header; the feature-content comparison excludes that out-of-scope header surface.

### Full-view and focused comparison evidence

- The normalized correct source and the final Focus browser capture were compared in the same visual input. The text boundary resolves to x=118px and the complete feature article resolves to x=118px through x=1352px, matching the authoritative 118px section gutter.
- The Focus gradient composition, athlete, copy, and CTA retain the previous internal geometry. Track and Adaptive Coach keep the alternating visual/copy order and the same internal treatments.
- A focused region crop was not required: the source and implementation are equal-size desktop frames and the requested horizontal boundary is clearly legible in the full-view comparison.

### Existing gutter architecture

- The global `.content-container` uses `--content-gutter` with a 1592px maximum content width.
- The global desktop `--content-gutter` remains 40px; its existing 28px tablet and 18px mobile values are unchanged.
- The three features share a single `.features.content-container` wrapper, so the scoped override belongs on that wrapper rather than on each article or an inner column.

### Scoped implementation

- At `min-width: 1181px`, `.home-page .features` now defines `--feature-content-gutter: 118px` and uses `width: min(calc(100% - (var(--feature-content-gutter) * 2)), var(--content-max-width))`.
- This replaces the feature wrapper's effective global width without stacking 118px on top of the global gutter.
- No feature-copy, feature-art, square, orb, athlete, CTA, type, gradient, or animation selector changed.

### Required fidelity surfaces

- Fonts and typography: passed. Outfit, title/body sizes, line heights, weights, wrapping, and CTA artwork are unchanged.
- Spacing and layout rhythm: passed. Focus, Track, and Adaptive Coach each compute to 1234px wide with 118px left/right boundaries at the 1470px reference viewport. Their internal percentage grid and alternating order are unchanged.
- Colors and visual tokens: passed. Feature heading gradients, square gradients, and glow treatments are unchanged.
- Image quality and asset fidelity: passed. The three existing grayscale athlete assets remain unchanged in source, size rules, anchoring, and positioning rules.
- Copy and content: passed. No copy changed.
- States and interactions: passed. The existing scroll-motion variables continue updating in the live page; `script.js` is byte-identical to the pre-refinement working tree.
- Accessibility: passed within scope. Semantics, links, focus behavior, and reduced-motion handling are unchanged.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS pixels with 0px horizontal overflow and no copy/art overlap. The 118px token is absent below 1181px; existing 28px/18px responsive gutters remain active.

### Wide-screen verification

- 1920px: feature wrapper 1592px, centered at x=164px.
- 2200px: feature wrapper 1592px, centered at x=304px.
- 2500px: feature wrapper 1592px, centered at x=454px.
- 2560px: feature wrapper 1592px, centered at x=484px.
- The existing 1592px cap prevents indefinite stretching and no feature copy/art overlap or document overflow was found at any wide-screen check.

### Out-of-scope integrity

- At the 1470px reference viewport, Workouts remains x=40px / 1390px wide and FAQs remains x=40px / 1390px wide.
- Final CTA keeps its 1390px underlying content width; the existing reveal transform accounts for the transient rendered inset.
- Footer keeps its existing 40px desktop inline padding.
- Global `--content-gutter` remains 40px and the feature token does not inherit into Workouts, FAQs, Final CTA, or Footer.

### Comparison history

#### Iteration 1 — blocked

- [P2] The feature wrapper inherited the global 40px desktop gutter at the 1470px reference viewport, placing the complete Focus/Track/Coach compositions too close to both viewport edges.

#### Iteration 2 — passed

- Added the scoped 118px feature token to the shared feature wrapper and preserved the existing 1592px maximum-width behavior.
- Post-fix computed styles show exact 118px feature boundaries at the reference viewport, unchanged out-of-scope gutters, 0px overflow, and no feature copy/art collisions across the requested wide and responsive widths.
- The normalized full-view Focus comparison shows no actionable P0, P1, or P2 mismatch in the requested horizontal-gutter scope.

### Runtime and source validation

- Local preview files are byte-identical to the working tree for `index.html`, `styles.css`, and `script.js`.
- Browser console warnings/errors: none.
- `git diff --check`: passed.
- Bundled Node syntax check for `script.js`: passed.
- No commit, push, or deployment was performed.

### Findings

No actionable P0, P1, or P2 findings remain in this narrow feature-gutter refinement.

final result: passed

## Focus, Track, and Adaptive Coach — final fidelity pass

### Comparison target and evidence

- Scope: Focus, Track, and Adaptive Coach only.
- Source visual truth: `/private/tmp/stormlift-parity-audit/reference-focus-grid.jpg`, `/private/tmp/stormlift-parity-audit/reference-track-grid.jpg`, and `/private/tmp/stormlift-parity-audit/reference-coach-grid.jpg`.
- Rendered implementation: `http://127.0.0.1:4174/` from `/private/tmp/stormlift-fidelity-v2.367eag/repo`.
- Final section captures: `/private/tmp/stormlift-features-step4/approval-focus.jpg`, `/private/tmp/stormlift-features-step4/approval-track.jpg`, and `/private/tmp/stormlift-features-step4/approval-coach.jpg`.
- Focused evidence: `/private/tmp/stormlift-features-step4/approval-visual-closeup.jpg` and `/private/tmp/stormlift-features-step4/approval-cta-closeup.jpg`.
- Desktop measurement viewport: 1920 × 1200 CSS pixels at DPR 1. Approval captures use the in-app Browser's 1280 × 1100 desktop capture surface.

### Full-view and focused comparison evidence

- Each reference and its implementation capture were opened together in one comparison input. The alternating copy/visual composition, two concentric unrotated squares, two boundary-crossing blocks, bottom-anchored grayscale athlete, and section-specific gradient family are preserved.
- Focused visual evidence confirms Track's athlete is centered on the outer square, bottom anchored, visibly overflows the top edge, and is not clipped on the left.
- Focused CTA evidence confirms the official artwork, white inner pill, rounded gradient outline, restrained colored shadow, compact feature sizing, and copy-aligned placement.

### Required fidelity surfaces

- Typography and copy: passed. Headings and all copy are unchanged. Both body paragraphs compute to `rgb(255, 255, 255)`, 32px, and 46.72px line-height at 1920px.
- Geometry: passed. At 1920px all three outer squares are 670px and all three inner squares are 520px. Outer and inner transforms have zero rotation. Athlete bottom/outer bottom delta is 0px; top overflow is 40px Focus, 42.73px Track, and 50.05px Adaptive Coach.
- Alignment: passed. Track and Adaptive Coach athlete center delta from the outer square is 0px. Focus retains its screenshot-calibrated 15px optical offset.
- Colors: passed. Computed gradients are exactly Focus `rgb(150,236,255) → rgb(227,185,248) → rgb(255,159,164)`, Track `rgb(255,160,161) → rgb(255,237,150)`, and Adaptive Coach `rgb(142,255,187) → rgb(144,199,255)`.
- CTAs: passed. Google Play resolves to `https://play.google.com/store/apps/details?id=com.stormlift.app`; the unavailable App Store target remains intentionally disabled. No `com.cris.ptapp` URL is used by the implementation.
- Motion: passed by source inspection and settled-state runtime measurement. Shape, inner square, person, text, orbs, and CTA use restrained staggered scale/translate/opacity progress with reversible scroll updates; no rotation, bounce, or elastic easing was introduced. The reduced-motion branch resolves every motion variable to the final visible geometry.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS pixels. Every width reports 0px document overflow, no copy/art collision, horizontally safe athletes/shapes/CTA links, and pure-white body copy.

### Validation

- `git diff --check`: passed.
- Bundled Node syntax check for `script.js`: passed.
- Browser runtime/computed-style checks: passed.
- No commit, push, or deployment performed.

### Findings

No actionable P0, P1, or P2 findings remain in the requested three-section scope.

final result: passed

## Workouts section — authoritative desktop geometry refinement

### Comparison target and evidence

- Scope: Workouts section only.
- Source visual truth: the previously approved desktop Workouts capture at `/private/tmp/stormlift-workouts-refine4/approval-desktop-workouts.jpg` together with the user's exact desktop CSS specification in the current task.
- Rendered implementation: `http://127.0.0.1:4174/#workouts`.
- Implementation screenshot: `/private/tmp/stormlift-workouts-authoritative/approval-desktop-workouts.png`.
- Viewport and normalization: source and implementation are both 1920 × 1200 pixels from a 1920 × 1200 CSS viewport at DPR 1. No density resampling was required.
- State: desktop at >=1181px with the Workouts reveal fully settled.

### Full-view and focused comparison evidence

- The source and implementation were opened together in one comparison input at matching dimensions. The implementation preserves the approved centered 3+2 hierarchy, gradients, grayscale athletes, pill treatment, and copy while applying the exact shorter-card geometry.
- A separate focused crop was not required: at original 1920 × 1200 resolution every card title, all description lines, both pill edges, and all five athlete/card intersections are legible in the full-view comparison. Exact computed-style and bounding-box checks supplied the component-level evidence.

### Required fidelity surfaces

- Fonts and typography: passed. Outfit and the existing hierarchy remain unchanged. Desktop titles compute to 30px with the exact `4px 0 12px` margin and `white-space: nowrap`. Descriptions compute to 23px/30.36px, remain smaller than titles, and fit in three lines with 12.9px bottom clearance.
- Spacing and layout rhythm: passed. Desktop grid width computes to 1280px with exact 68px row and 50px column gaps. Cards compute to 393.3 × 180px with 24px padding and 36px radius at 1920px. Bottom-row cards remain centered in columns 2–3 and 4–5.
- Colors and visual tokens: passed. Canonical card-specific gradients, 0.90-alpha pill surfaces, and colored shadows are unchanged.
- Image quality and asset fidelity: passed. Existing grayscale PNG athletes remain bottom anchored and extend above the card top by 18/34/40/26/26px. No assets were replaced or filtered.
- Copy and content: passed. All five previously approved balanced descriptions remain unchanged and fully contained.
- Icons and controls: not applicable; the Workouts cards contain no controls or icons.
- States and interactions: passed. The existing title/subtitle/card/pill reveal sequence remains intact. Ten pill surfaces retain distinct durations and delays with restrained 2–4px asynchronous drift and no rotation or bounce.
- Accessibility: passed within scope. The existing `prefers-reduced-motion` override disables ambient pill animation and collapses reveal transitions to the final state.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS pixels. Each viewport had 0px document overflow, no card-to-card collision, all titles and descriptions contained inside their cards, and the existing tablet/mobile card heights remained independent of the desktop 180px rule.

### Comparison history

#### Iteration 1 — blocked

- [P2] Applying the exact 180px desktop height exposed a four-line Home & Travel description that extended 17.4px below its card and intersected the athlete's visible area.

#### Iteration 2 — passed

- Expanded only the Home & Travel desktop text safe area and shifted/scaled only that athlete within the fixed card. The description now uses three lines with 12px bottom clearance and no visible athlete collision.
- Recalibrated the remaining desktop athlete heights proportionally to preserve their prior top-edge overflow while keeping the exact 180px card height.
- The post-fix full-view comparison and required breakpoint sweep show no actionable P0, P1, or P2 issue in scope.

### Validation

- Authoritative desktop computed styles: grid width 1280px; gap 68px 50px; card height 180px; card padding 24px; title margin 4px 0 12px; title white-space nowrap.
- Five-card placement: passed as 3+2 in the six-column grid.
- Description containment: passed; all five desktop descriptions use three lines with positive bottom clearance.
- Athlete top-edge overflow: passed for all five cards.
- Responsive overflow and containment: passed at 1024, 768, 430, 390, 360, and 320.
- Browser console warnings/errors: none.

### Findings

No actionable P0, P1, or P2 findings remain in the requested Workouts-only refinement.

final result: passed

## Workouts section — fourth typography and ambient-pill refinement

### Comparison target and evidence

- Scope: Workouts section only.
- Source visual truth: `/Users/cris/Desktop/Screenshot 2026-08-27 at 22.09.58.png` and the exact fourth-refinement brief at `/Users/cris/.codex/attachments/8536f771-a416-4d90-af26-5405a9b407ef/pasted-text.txt`.
- Rendered implementation: `http://127.0.0.1:4174/#workouts`.
- Final desktop evidence: `/private/tmp/stormlift-workouts-refine4/approval-desktop-workouts.jpg`.
- Focused evidence: `/private/tmp/stormlift-workouts-refine4/approval-journey-closeup.jpg`, `/private/tmp/stormlift-workouts-refine4/approval-body-text-closeup.jpg`, `/private/tmp/stormlift-workouts-refine4/approval-text-athlete-separation.jpg`, and `/private/tmp/stormlift-workouts-refine4/approval-ambient-pill-a.jpg` plus `approval-ambient-pill-b.jpg`.
- Responsive evidence: `/private/tmp/stormlift-workouts-refine4/approval-responsive-320.jpg` and the 1024/768/430/390/360/320 geometry sweep.
- Viewport and normalization: the source is 2678 × 1192 pixels. The final implementation is 1920 × 1200 CSS pixels at DPR 1. Because the brief explicitly preserves the already-approved smaller card/grid geometry, comparison used proportional full-view and focused card crops rather than treating the source card dimensions as a pixel-clone target.
- State: staged reveal fully settled; ambient-pill frames were captured 2.2 seconds apart at the same scroll position.

### Full-view and focused comparison evidence

- The supplied source and final desktop implementation were opened together in one comparison input. The approved centered 3+2 composition, five gradients, athlete assets, card dimensions, pill dimensions, and pill opacity remain intact.
- Focused Journey evidence confirms a single-line desktop title. Quick evidence confirms the larger, airier description treatment. Travel evidence confirms a clean text/athlete separation despite the longer copy.
- Matched ambient frames and computed style samples confirm independent inner-surface movement while the outer pill wrappers remain responsible for the staged reveal.

### Required fidelity surfaces

- Fonts and typography: passed. Outfit and title sizing remain unchanged. Desktop title top offset changed from 24px to 30px. Description typography changed from 22px/28.16px to 23px/30.36px. All desktop titles remain visually consistent, and Workout Journey is one line at 1920px.
- Spacing and layout rhythm: passed. The approved 1280px grid, 402.7 × 200px cards, 36px column gap, 48px row gap, radii, and pill edge offsets are unchanged. Description wrapping stays inside every card.
- Colors and visual tokens: passed. Canonical card gradients, 0.90 pill surfaces, colored shadows, and black section background are unchanged.
- Image quality and asset fidelity: passed. The same five PNG cutouts remain in use. Desktop athlete dimensions, bottom anchoring, and top overflow are unchanged. The only athlete adjustment is Home & Travel `right: -4px` to `-16px` at <=380px to protect the text safe area.
- Copy and content: passed. The exact requested five descriptions are present and each contains nine whitespace-delimited words.
- Icons and controls: not applicable; the Workouts cards contain no controls or icons.
- States and interactions: passed. The existing card → top pill → bottom pill reveal remains on the outer wrappers. Ten inner surfaces use five 2–4px drift patterns, 0.988–1.012 scale limits, 10.8–15.2 second durations, and staggered post-reveal delays. No rotation or bounce is used.
- Accessibility: passed within scope. The existing reduced-motion media query exposes all cards/pills at their final state and disables the ambient inner-surface animation.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS pixels. Copy remains inside every card, athlete bottoms stay anchored, pill motion creates no document overflow, and narrow titles/copy remain readable.

### Comparison history

#### Iteration 1 — blocked

- [P2] Home & Travel initially wrapped to five desktop lines and extended 26px below the approved 200px card.
- Fix: widened only its desktop text safe area, reduced the title/body gap from 12px to 10px, and retained the increased 23px body size with a still-larger-than-before 30.36px line height.

#### Iteration 2 — blocked

- [P2] At 320px, Workout Journey and Home & Travel copy exceeded the card height and visually entered the athlete zone.
- Fix: added <=380px text-safe widths, retained the 17px responsive body size, kept narrow titles on one 18px line, and moved only the Home & Travel athlete 12px right without changing its size or bottom anchor.

#### Iteration 3 — passed

- All five desktop titles and descriptions fit the approved card dimensions, the Journey title remains one line, and the requested 320px copy/athlete separations are visibly clean.
- No actionable P0, P1, or P2 issue remains in the requested Workouts-only scope.

### Validation

- Exact five descriptions and nine-word counts: passed.
- Desktop title offset, typography, card geometry, athlete anchoring, and pill geometry: passed.
- Responsive geometry at 1024/768/430/390/360/320: passed with 0px horizontal overflow.
- Ambient computed movement: 2–4px translation, 0.988–1.012 scale, 10.8–15.2 second durations, asynchronous delays; passed.
- Reduced-motion CSS final-state/no-loop branch: source-verified; runtime media emulation was unavailable in the in-app Browser.
- Browser console warnings/errors: none.
- `git diff --check`: passed.
- Bundled Node syntax check for `script.js`: passed; `script.js` is byte-identical to the synchronized repository.

### Findings

No actionable P0, P1, or P2 findings remain in the requested Workouts-only fourth refinement.

final result: passed

## Workouts section — second geometry and readability refinement

### Comparison target and evidence

- Scope: Workouts section only.
- Source visual truth: `/private/tmp/stormlift-parity-audit/reference-workouts-grid.jpg` and the previously approved implementation capture `/private/tmp/stormlift-workouts-step3/workouts-final-desktop.jpg`, interpreted through the refinement brief at `/Users/cris/.codex/attachments/012e42a6-c57f-4d31-8f1f-0bd049087bbe/pasted-text.txt`.
- Rendered implementation: `http://127.0.0.1:4174/`.
- Final desktop implementation screenshot: `/private/tmp/stormlift-workouts-refine2/approval-desktop-workouts.jpg`.
- Focused implementation evidence: `/private/tmp/stormlift-workouts-refine2/approval-top-card.jpg`, `/private/tmp/stormlift-workouts-refine2/approval-bottom-card.jpg`, and `/private/tmp/stormlift-workouts-refine2/approval-pill-height.jpg`.
- Responsive evidence: `/private/tmp/stormlift-workouts-refine2/approval-responsive-390.jpg`; narrowest post-fix evidence: `/private/tmp/stormlift-workouts-refine2/narrow-320-final.jpg`.
- Viewport and density: desktop source and implementation are 1920 × 1200 pixels. The implementation used a 1920 × 1200 CSS viewport at DPR 1, so no density normalization was required. The responsive approval image is 390 × 1500 pixels from a 390 × 1500 CSS viewport at DPR 1.
- State: the one-shot Workouts reveal was fully settled for all final comparisons.

### Full-view and focused comparison evidence

- The 1920 × 1200 source and final implementation were opened together in a single comparison input. The approved five-card 3+2 reading order, centered bottom row, athlete treatment, gradient mapping, two-pills-per-card system, and black section field remain intact.
- Focused top-card, bottom-card, and pill crops confirm that the more compact cards retain clean title/body hierarchy, that athlete cutouts remain bottom anchored with controlled top overflow, and that the taller pills remain horizontally inset while crossing exactly half their height over the relevant edge.
- The 390px approval capture and the 320px post-fix capture confirm the existing 2-column/tablet and stacked/mobile behavior without clipped card copy or athlete collisions.

### Required fidelity surfaces

- Fonts and typography: passed. Outfit, heading weights, letter spacing, and copy are unchanged. Desktop description text increased from 20px/25px to 22px/28.16px; responsive description text computes to 17px/22.1px. Text-width constraints were tuned per card so the larger copy remains readable and inside each surface.
- Spacing and layout rhythm: passed. Desktop cards changed from 494.7 × 230px to 452 × 218px. Desktop column gap changed from 54px to 42px and row gap from 67px to 56px. The grid is capped at 1440px and centered, preserving the 3+2 composition and centered bottom row.
- Colors and visual tokens: passed. The five approved canonical gradients and their family-colored shadows were not changed.
- Image quality and asset fidelity: passed. The five existing grayscale PNG cutouts remain in use without replacement, filters, or compression changes. Desktop heights were reduced proportionally to 236/252/284/244/244px; the <=380px overrides reduce and shift the cutouts only enough to prevent text collisions.
- Copy and content: passed. No card or section copy changed.
- Icons and controls: not applicable; the cards contain no controls or icons.
- States and interactions: passed. The existing title → subtitle → cards → top pill → bottom pill sequence was not modified. Card start delays remain 220/340/460/580/700ms, preserving the 120ms stagger; pill delays remain +45ms/+90ms per card.
- Accessibility: passed within scope. Semantic markup, reduced-motion final-state rules, contrast, and focus behavior were not changed.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS pixels. Copy stayed within every card and final document overflow was 0px at all requested widths.

### Comparison history

#### Iteration 1 — blocked

- [P2] The first desktop refinement left the Custom Workout copy box 0.6px beyond the bottom edge because the larger description wrapped to four lines.
- [P2] At 320px, the unchanged mobile athlete sizes produced visible copy/athlete collisions on Import and Custom; the first narrow fix also introduced 2px of document overflow through the Journey cutout.

#### Iteration 2 — passed

- Increased the Custom copy width to 62% and moved its desktop athlete 4px right, yielding a compact one-line title and two-line body with clear separation.
- Added <=380px proportional athlete sizes/offsets for all five cards and reduced the Journey offset by 2px. Post-fix evidence shows readable copy, controlled image overflow, and 0px document overflow at 360 and 320.
- The post-fix desktop/full-view comparison, focused closeups, and requested responsive sweep show no actionable P0, P1, or P2 finding in the requested Workouts-only scope.

### Validation

- Five cards and ten pills: passed.
- Desktop geometry: 452 × 218px cards, 42px column gap, 56px row gap.
- Desktop pill geometry: 96 × 34px top; 116 × 36px bottom. Mobile pill geometry: 72 × 28px top; 84 × 30px bottom.
- Browser geometry at 1024, 768, 430, 390, 360, and 320: passed; all copy remained within card bounds and final document overflow was 0px.
- `git diff --check`: passed.
- Bundled Node syntax check for `script.js`: passed.
- Direct console-message collection was not exposed by the in-app Browser binding; no page dialog, navigation, or evaluation failure occurred during the responsive and screenshot runs.

### Findings

No actionable P0, P1, or P2 findings remain in the requested Workouts-only refinement.

final result: passed

## Phone-section zoom, pill transparency, and ambient-motion refinement

### Comparison target and evidence

- Scope: APP / three-phone section only.
- Source visual truth: `/private/tmp/stormlift-phone-step2/reference-phone-content-1920x1000.jpg` plus the narrow refinement brief at `/Users/cris/.codex/attachments/bfd7b519-26e2-46be-a28d-0a080c34a65b/pasted-text.txt`.
- Rendered implementation: `http://127.0.0.1:4174/`.
- Final implementation comparison: `/private/tmp/stormlift-phone-step2/implementation-phone-refine-1920x1000.jpg`.
- Motion-state evidence: `/private/tmp/stormlift-phone-step2/phone-refine-early.jpg` at progress 0.350, `/private/tmp/stormlift-phone-step2/phone-refine-mid.jpg` at progress 0.550, and `/private/tmp/stormlift-phone-step2/phone-refine-final.jpg` at progress 1.000.
- Focused evidence: `/private/tmp/stormlift-phone-step2/phone-refine-center-pill.jpg` shows the center phone and its revised lower pill.
- Viewport and normalization: browser render at 1920 × 1200 CSS pixels, DPR 1. The final render was cropped without rescaling to a 1920 × 1000 content region to match the 1920 × 1000 normalized source comparison.
- State: final resting geometry for the source/implementation comparison; early and mid scroll states for motion inspection.

### Full-view and focused comparison evidence

- The normalized source and final implementation were opened together in the same comparison input. The approved 2 / 3 / 2 phone-and-pill composition, phone resting geometry, gradient-family mapping, dark background, and colored pill separation remain intact.
- The focused center crop confirms that only the large lower center pill moved vertically: its CSS `top` changed from 91.5% to 90.3%, with horizontal position, dimensions, gradient, and shadow unchanged.
- The early and mid captures show a restrained, continuously interpolated scale change. Scrolling from final back to the measured mid position reproduced the same phone variables and pill opacities as the downward pass.

### Required fidelity surfaces

- Fonts and typography: passed. No font, copy, text sizing, weight, line-height, tracking, or wrapping rule changed.
- Spacing and layout rhythm: passed. Final phone X/Y positions and final scale remain unchanged. The single requested center lower-pill adjustment is approximately 10px upward at the 1920px comparison viewport.
- Colors and visual tokens: passed. Pill gradient definitions and shadow colors/strengths are unchanged. Surface fill opacity is consistently 0.88 through an inner pseudo-element, allowing slight transparency without reducing the outer colored box shadows.
- Image quality and asset fidelity: passed. The existing phone artwork, crop, scale, source paths, masks, and compression are unchanged.
- Copy and content: passed. No user-facing content changed.
- Icons and controls: passed. No icon or interaction control changed.
- States and interactions: passed. Phone motion remains a continuous scroll-progress function with the original stagger, easing, offsets, and Y ranges. Downward and upward passes match at the same progress; there is no threshold, snap, bounce, or one-shot state.
- Accessibility: passed within scope. The existing reduced-motion path still forces phones and pills to their final static state and disables pill surface animation.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS pixels. All widths retained pill counts 2 / 3 / 2, had 0px document overflow, and kept all pill bounds inside the viewport. A 320px early-progress sample also had 0px overflow.

### Comparison history

- Iteration 1: passed. The first post-change combined source/implementation comparison and focused center crop found no actionable P0, P1, or P2 difference within this narrowly approved scope, so no follow-up visual fix was made.

### Findings

No actionable P0, P1, or P2 findings remain in the requested Phone-section scope.

### Runtime and source validation

- Starting scales changed from center 0.93 / left 0.91 / right 0.92 to center 0.89 / left 0.87 / right 0.88. Final scale remains exactly 1 for all phones.
- Y ranges remain center 32px, left 44px, and right 38px to 0px.
- Pill surface opacity changed from 1 to 0.88; colored outer shadows remain unchanged.
- Center lower-pill `top` changed from 91.5% to 90.3%; final rendered movement is approximately 9.9px upward at the desktop comparison viewport.
- Ambient keyframe peaks changed from 4px / -3px, -3px / 3px, and 2px / 4px to 6px / -4px, -5px / 5px, and 3px / 6px. Existing per-pill durations, delays, and directions remain asynchronous.
- Reverse-scroll equality: passed at the measured mid state.
- Browser console warnings/errors after the final working-tree refresh: none.
- `git diff --check`: passed before synchronization.
- Bundled Node syntax check for `script.js`: passed before synchronization.
- Reduced-motion behavior: source-verified; the in-app Browser did not expose a media-preference emulation control for an independent runtime capture.

final result: passed

## App / three-phone section — Step 2 final fidelity pass

### Comparison target and evidence

- Source visual truth: `/Users/cris/Desktop/StormLift website/home-2.jpg` and `/Users/cris/Desktop/StormLift website/home-3.jpg` at 1920 × 8484 pixels, plus the corrective brief at `/Users/cris/.codex/attachments/1ba3c094-7a45-4fe4-9f20-6b07df935460/pasted-text.txt`.
- Normalized source region: `/private/tmp/stormlift-phone-step2/reference-phone-content-1920x1000.jpg` at 1920 × 1000 pixels.
- Normalized rendered implementation: `/private/tmp/stormlift-phone-step2/implementation-phone-content-1920x1000.jpg` at 1920 × 1000 pixels.
- CSS viewport: 1920 × 1200 at DPR 1. Both comparison regions were normalized to equal 1920 × 1000 pixel crops; no density resampling was required.
- State: final resting scroll progress `1.000`, all three phones at scale `1`, Y `0px`, opacity `1`, and all seven pills fully visible.
- Full-view evidence: the normalized source and implementation content regions were opened together and compared for composition, phone hierarchy, pill count, positions, gradients, definition, and surrounding negative space.
- Focused evidence: `/private/tmp/stormlift-phone-step2/phone-left-detail.jpg`, `/private/tmp/stormlift-phone-step2/phone-center-detail.jpg`, and `/private/tmp/stormlift-phone-step2/phone-right-detail.jpg` show the final phone-specific pill placements at readable scale.
- Motion evidence: `/private/tmp/stormlift-phone-step2/phone-entrance-progress.jpg` at progress `0.450` and `/private/tmp/stormlift-phone-step2/phone-resting-progress.jpg` at progress `1.000`.

### Required fidelity surfaces

- Fonts and typography: passed. Phone artwork assets, text rendering, labels, weights, line height, and wrapping were not modified.
- Spacing and layout rhythm: passed. At 1920px the final phone boxes are 354.4 × 704.9px, 411.9 × 820px, and 354.4 × 704.9px. Their final X positions are 243.8px, 754.1px, and 1308.4px, preserving center dominance and matching the source's narrower phone grouping after the requested modest size reduction.
- Colors and visual tokens: passed. Left pills use `--gradient-red-yellow`, center pills use `--gradient-cyan-lilac-pink`, and right pills use `--gradient-green-cyan`; no approximate gradient was introduced.
- Image quality and asset fidelity: passed. All three supplied phone PNGs remain unchanged and render at their native aspect ratios without replacement, recropping, or generated substitutes.
- Copy and content: passed. No copy, labels, order, or downstream content changed.
- Icons and controls: passed. Phone artwork and all embedded icons remain source assets; no control or icon was modified.
- States and interactions: passed. Continuous progress produced distinct phone transforms and pill reveals at `0.450`, reached exact resting geometry at `1.000`, and returned to the same `0.450` values after scrolling upward.
- Accessibility: passed within scope. Decorative pills remain hidden from assistive technology. The existing reduced-motion path sets phones and pills to final geometry, keeps them visible, disables ambient animation, and skips scroll scrubbing.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320px. Pill count stayed 7, all pills stayed attached to their phone groups, and document overflow remained 0px at every tested width.

### Comparison history

- Iteration 1: [P2] The first post-build comparison showed the reduced side phones anchored too far toward the outer edges, making the group wider than the final artwork. The desktop left/right unit offsets were calibrated to `2.25%` and `3.15%` of the existing composition without changing its container.
- Iteration 2: passed. The normalized post-fix comparison showed phone X positions and outer pill bounds aligned with the source composition; no actionable P0, P1, or P2 mismatch remains.

### Findings

No actionable P0, P1, or P2 findings remain in the requested Phone-section scope.

### Runtime and source validation

- Exact pill count: left 2, center 3, right 2, total 7.
- Scroll reversal: passed; the same progress value produced identical scale, Y, opacity, and pill-opacity values in both directions.
- Browser console warnings/errors: none.
- `git diff --check`: passed.
- Bundled Node syntax check for `script.js`: passed.
- Final served assets: `styles.css?v=phone-step2-3` and `script.js?v=phone-step2-3`.

### Remaining test gap

- Reduced-motion behavior was verified from the active media-query and JavaScript final-state paths. The selected in-app Browser did not expose media emulation for a separate runtime screenshot.

final result: passed

## Hero true-full-width and left-biased strip-shadow correction

### Comparison target and evidence

- Scope: Hero stage coverage above 1920px and the horizontal direction of the three existing colored strip shadows only.
- Authoritative requirements: `/Users/cris/.codex/attachments/8c48f729-e2eb-41bc-b471-26613c7363c8/pasted-text.txt`.
- Source visual truth: `/Users/cris/Desktop/StormLift website/giusta.png` (2900 × 1360 pixels) plus the supplied strip-shadow references in the task history.
- Rendered implementation: `http://127.0.0.1:4174/`.
- Browser implementation evidence: `/private/tmp/stormlift-hero-wide-fix/hero-1920-left-final.png` and `/private/tmp/stormlift-hero-wide-fix/hero-2560-left-final.png` (both 1657 × 1200-pixel visible in-app Browser surfaces while responsive CSS viewports were 1920 × 1200 and 2560 × 1200 at DPR 1).
- Combined source/implementation comparison input: `/private/tmp/stormlift-hero-wide-fix/source-vs-implementation.png` (3314 × 1022 pixels). The left panel is the source reference normalized to the implementation crop height; the right panel is the matching visible implementation crop with browser chrome removed.
- Focused strip evidence: `/private/tmp/stormlift-hero-wide-fix/strip-warm-closeup-browser.png`, `/private/tmp/stormlift-hero-wide-fix/strip-coach-closeup-browser.png`, and `/private/tmp/stormlift-hero-wide-fix/strip-focus-closeup-browser.png`.
- Geometry evidence: browser-rendered CSS measurements at 1920, 2200, 2500, 2560, 1440, and 1280 pixels. The in-app Browser wide clip compositor repeats tiles beyond its visible surface, so the decisive edge-to-edge proof is live DOM geometry plus the clean visible-surface and focused screenshots.
- State: slide 1 (`Import a workout`) with the Hero transition fully settled. The scoped correction does not change static subject, copy, CTA, or wordmark geometry.

### Required fidelity surfaces

- Fonts and typography: passed. No font, weight, size, line-height, tracking, copy, or wrapping rule changed.
- Spacing and layout rhythm: passed. The Hero stage is exactly viewport-wide with `max-width: none` and zero inline margins at 1920, 2200, 2500, and 2560. The approved shared section container remains `1592px` with `40px` desktop gutters.
- Colors and visual tokens: passed. Canonical warm, green/cyan, and cyan/lilac/pink gradients are unchanged. Each shadow retains its original gradient-family RGBA colors.
- Image quality and asset fidelity: passed. No image, SVG, crop, scale, mask, compression, or source path changed.
- Copy and content: passed. No user-facing text changed.
- Icons and controls: passed. CTA assets, button geometry, hover styles, and behavior are unchanged.
- States and interactions: passed. Side-subject click changed slide 0 → 1; App Store hover held slide 1 for 7.4 seconds; autoplay advanced after hover ended and a fresh interval elapsed.
- Accessibility: passed within scope. Semantic controls, labels, keyboard handlers, focus rules, and reduced-motion handling are unchanged.
- Responsiveness: passed. Hero/stage widths equaled the viewport at 1920, 2200, 2500, 2560, 1440, and 1280; document overflow was 0px. Header stayed full-width and sticky with computed top `0px` after scrolling.

### Comparison history

#### Iteration 1 — blocked

- [P2] At 2200, 2500, and 2560, `.hero-stage` remained 1920px wide with centered margins of 140px, 290px, and 320px respectively, exposing the Hero's black background as side gutters.
- [P2] Warm and green/cyan strip shadows used a primary positive X offset of `18px`; the cyan/lilac/pink strip inherited a positive `14px` primary X offset, placing the strongest depth to the right.

#### Iteration 2 — passed

- Removed only the Hero stage's `max-width: 1920px` and auto inline margins. Width remains `100%`, so the stage, gradients, and wordmark now resolve to the viewport while existing internal `vw` positioning continues independently.
- Changed the primary warm shadow X offset from `18px` to `-18px`, green/cyan from `18px` to `-18px`, and cyan/lilac/pink from `14px` to `-14px`. Secondary negative offsets, colors, blur, spread, strip widths, opacity, and right-edge attachment remain unchanged.
- Post-fix stage measurements were 1920/1920, 2200/2200, 2500/2500, and 2560/2560 CSS pixels with left/right edges `0/viewport width`; the rightmost gradient intentionally overlaps the edge by about 0.1% while document overflow remains 0px.
- The combined source/implementation comparison and focused strip captures show no actionable P0, P1, or P2 mismatch within this narrow corrective scope. Pre-existing Hero internal composition differences were explicitly excluded by the brief and were not changed.

### Findings

No actionable P0, P1, or P2 findings remain in the requested scope.

### Runtime and source validation

- Wide-screen Hero coverage: passed at 1920, 2200, 2500, and 2560.
- Standard desktop regression: passed at 1920, 1440, and 1280.
- Header full-width/sticky: passed.
- Shared content-container tokens and downstream section boundaries: unchanged.
- Strip attachment: each strip right edge still equals its parent gradient right edge.
- Browser console warnings/errors: none.
- `git diff --check`: passed.
- Final served stylesheet: `styles.css?v=hero-wide-fix-5`.

final result: passed

## General gradient-token and content-container pass

### Comparison target and evidence

- Scope: canonical StormLift gradient definitions, Hero gradient color usage, and the outer horizontal boundaries of Workouts, Focus, Track, Adaptive Coach, FAQs, and the final CTA content only.
- Authoritative requirements: `/Users/cris/.codex/attachments/1cb131b5-a0e9-41e2-b2b1-2ab68b0faa23/pasted-text.txt`.
- Approved pre-pass Hero visual evidence: `/private/tmp/stormlift-hero-pass-2/qa/comparison-state-1.jpg`, `/private/tmp/stormlift-hero-pass-2/qa/comparison-state-2.jpg`, and `/private/tmp/stormlift-hero-pass-2/qa/comparison-state-3.jpg`.
- Pre-pass implementation capture: `/private/tmp/stormlift-general-before-1920.png` at 1920 × 8042 pixels.
- Rendered implementation: `http://127.0.0.1:4174/`.
- Primary browser layout verification: 1920 × 1080 CSS pixels at DPR 1.
- Clean desktop approval captures: `/private/tmp/stormlift-general-step1-desktop-hero-1200.jpg`, `/private/tmp/stormlift-general-step1-workouts-1200.jpg`, `/private/tmp/stormlift-general-step1-focus-1200.jpg`, `/private/tmp/stormlift-general-step1-track-1200.jpg`, `/private/tmp/stormlift-general-step1-adaptive-coach-1200.jpg`, `/private/tmp/stormlift-general-step1-faqs-1200.jpg`, and `/private/tmp/stormlift-general-step1-cta-footer-1200.jpg`. The CSS viewport was 1200 × 900 at DPR 1; the in-app Browser surface returned 1200 × 869-pixel viewport captures.
- Responsive evidence: browser-rendered layout measurements at 1920, 1440, 1280, 1024, 768, 430, 390, 360, and 320 CSS pixels.
- State: all reveal sections were rendered before capture; the Hero remained in its normal animated state. Density normalization was unnecessary for the boundary checks because browser CSS geometry was measured directly.

### Full-view and focused comparison evidence

- Full-view comparison: the 1920px pre-pass and post-pass full-page captures were opened together. The Browser full-page compositor produced the same horizontal stitching artifact in both images, so final approval does not rely on those stitched pixels alone.
- Focused comparison: clean viewport captures were inspected for Workouts, each of the three feature rows, FAQs, and final CTA. These are the decisive visual evidence because the requested change concerns horizontal boundaries and exact gradient colors, not internal section redesign.
- Footer alignment was additionally measured after reveal animation settled: footer logo left edge 164px, social group right edge 1756px, shared content left/right edges 164px/1756px at 1920.

### Required fidelity surfaces

- Fonts and typography: passed. No font, weight, size, line-height, letter-spacing, copy, or text wrapping rule changed.
- Spacing and layout rhythm: passed. One `content-container` now resolves to 1592px at 1920, 1360px at 1440, 1200px at 1280, 968px at 1024, 712px at 768, and 394/354/324/284px at 430/390/360/320. Workouts, Features, FAQs, and final CTA content have identical layout edges at every tested width.
- Colors and visual tokens: passed. Exactly five canonical 135deg tokens use the supplied uppercase HEX values and color order. Hero warm, coach, and focus panels and their attached strips reference the red/yellow, green/cyan, and cyan/lilac/pink tokens respectively. Section-specific card, FAQ, phone-glow, feature-square, header, final-CTA, benefits, and footer gradients were not remapped.
- Image quality and asset fidelity: passed. No image, SVG, crop, scale, compression, mask, or source path changed.
- Copy and content: passed. No user-facing copy changed.
- Icons and controls: passed. No icon or control styling changed.
- States and interactions: passed. Hero subject click changed slide 0 → 1; autoplay changed slide 0 → 1 after the existing interval with the pointer away from pause targets; FAQ Workouts expanded successfully.
- Accessibility: passed within scope. Semantic markup, labels, focus styles, reduced-motion rules, and interaction targets were unchanged.
- Responsiveness: passed. All nine requested widths reported document `scrollWidth === clientWidth`; the shared boxes were aligned; the final CTA background stayed exactly viewport-wide; representative card, feature, FAQ, and CTA-copy boxes remained inside the viewport.

### Comparison history

- Iteration 1: passed. The first post-change rendered comparison found no actionable P0, P1, or P2 issue within the requested general-pass scope, so no visual fix was made after the comparison.

### Findings

No actionable P0, P1, or P2 findings remain in this general pass.

### Follow-up polish

- [P3] The in-app Browser full-page compositor repeats a narrow horizontal tile at wide desktop overrides. Clean viewport screenshots and browser CSS geometry were used for approval; this is a capture-surface artifact, not page overflow.

### Validation

- Exactly five canonical gradient declarations: passed.
- Exact HEX values, supplied order, and 135deg top-left-to-bottom-right direction: passed.
- Shared container alignment and full-width final CTA background at all nine requested widths: passed.
- Browser console warnings/errors: none.
- `git diff --check`: passed.
- Bundled Node syntax check for `script.js`: passed.
- Latest served stylesheet: confirmed in Browser as `styles.css?v=general-fidelity-1`, with live computed canonical token values matching the working tree.

final result: passed

## Hero hover-pause, vertical CTA swap, and strip-depth refinement

### Comparison target and evidence

- Scope: home-page Hero only.
- Source visual truth retained from the user-supplied references: `/private/tmp/stormlift-hero-final-refinement/comparison-correct-wrong-implemented.jpg`, `/private/tmp/stormlift-hero-pass-2/qa/comparison-strip-warm.jpg`, and `/private/tmp/stormlift-hero-pass-2/qa/comparison-strip-green-cyan.jpg`.
- Rendered implementation: `http://127.0.0.1:4174/`.
- Desktop interaction viewport: 1280 × 720 CSS pixels at DPR 1.
- Phone-left implementation capture: `/private/tmp/stormlift-hero-refinement-2/hero-state-a-phone-left.jpg` (1077 × 720 visible in-app Browser surface while the responsive CSS viewport was 1280 × 720).
- CTA state captures: `/private/tmp/stormlift-hero-refinement-2/cta-full-state-a-900.jpg` and `/private/tmp/stormlift-hero-refinement-2/cta-full-state-b-900.jpg` (900 × 720 CSS pixels, DPR 1). The 900px capture width keeps both complete pills visible; vertical-only motion was separately measured at the 1280px desktop interaction viewport.
- Full-view combined phone comparison: `/private/tmp/stormlift-hero-refinement-2/comparison-phone-left-before-after.jpg` (1280 × 1450 pixels). Both panels are aspect-fit without stretching; the implementation panel retains expected black letterboxing because the Browser surface and reference aspect ratios differ.
- Focused strip comparison: `/private/tmp/stormlift-hero-refinement-2/comparison-strip-shadows.jpg` (1000 × 700 pixels).
- Focused CTA comparison: `/private/tmp/stormlift-hero-refinement-2/comparison-cta-vertical-states.jpg` (350 × 540 pixels).

### Required fidelity surfaces

- Fonts and typography: passed. Hero family, weights, sizes, line height, wrapping, and copy were not changed.
- Spacing and layout rhythm: passed. The phone subject's desktop left-state X offset changed from `7vw` to `4.5vw`; at 1280px its rendered left edge moved to 57.6px while scale remained 0.47. Its center and right-side selectors were not modified. CTA outer width remains 166px at the measured desktop tier, with fixed X lanes at 858.875px and 1042.875px.
- Colors and visual tokens: passed. Warm and green/cyan strip colors are unchanged. Only their family-colored depth shadows increased; the blue/purple strip keeps the previous shadow.
- Image quality and asset fidelity: passed. Existing 151 × 43 App Store and 155 × 45 Google Play PNGs remain in use. Hero rendering at the measured desktop tier changed from 124px to 114px, below native width with no transform or sharpening filter. The outer pill dimensions, border, radius, fill, and shadow are unchanged.
- Copy and content: passed. No Hero text changed.
- Icons and artwork: passed. No assets were replaced or fabricated.
- States and interactions: passed. CTA hover, side-subject hover, click-to-center, center hover, autoplay restart, full CTA swap cycle, and mobile swipe were browser-tested.
- Accessibility: passed within scope. Existing semantic buttons, labels, disabled-center state, keyboard handlers, and reduced-motion behavior remain. Store and side-subject `focusin`/`focusout` pause parity was added through the same unified pause model; focus handlers were source-inspected but the in-app Browser did not expose a reliable programmatic focus trigger for the disabled App Store placeholder.
- Responsiveness: passed for the requested behavior at 1280 × 720 desktop and 390 × 844 mobile. Document overflow remained 0px and mobile swipe still produced exactly one visible subject.

### Comparison history

#### Iteration 1 — blocked

- [P2] Phone-left breathing room remained insufficient at `7vw`.
- [P2] CTA swaps animated both X and Y because both buttons shared `left: 0` and exchanged a combined `translate3d(x,y,0)` transform.
- [P2] Warm and green/cyan strip depth remained too subtle against adjacent gradient panels.
- [P2] Store artwork rendered at 124px in the measured desktop tier, leaving less internal white space than requested.

#### Iteration 2 — passed

- Moved only the phone subject's dumbbell-center/left-side desktop selector to `4.5vw`, preserving the 0.47 measured tier scale, its center state, its right state, gradient association, and z-index.
- Assigned each CTA a fixed `left` lane and changed the animated transform to `translateY(...)` only. Browser midpoint and endpoint matrices for 1 → 2, 2 → 3, and 3 → 1 all retained X translation `0`, while lane positions remained 858.875px and 1042.875px.
- Added stronger chromatic warm and green/cyan shadows without changing strip dimensions, right-edge attachment, overlap, or the blue/purple treatment.
- Decoupled inner image width from the outer pill sizing basis. Measured inner artwork is 114px at the 1280px desktop tier while the 166px pill width remains unchanged.
- Post-fix full-view and focused comparisons show no actionable P0, P1, or P2 mismatch within this narrow Hero scope.

### Runtime and source validation

- Google Play CTA hover: passed. State 0 remained stable after 7.4 seconds; leaving both CTAs kept state 0 immediately and advanced only after a fresh seven-second interval.
- App Store CTA hover: passed. State 0 remained stable after 7.4 seconds.
- Right-side subject hover: passed. State 0 remained stable after 7.4 seconds.
- Left-side phone subject hover: passed. State 0 remained stable after 7.4 seconds.
- Side click → center hover: passed. The hovered side subject transitioned to center; hovering it in the center state no longer paused, and autoplay advanced after seven seconds.
- CTA vertical cycle: passed at midpoints and endpoints for 1 → 2, 2 → 3, and 3 → 1. Both fixed X coordinates remained unchanged and every computed transform matrix had X translation `0`.
- State regression: passed. Active subject z-index remains 6 versus side subject z-index 5 in all three states. Phone center/right positions and all other subject positions/scales remain unchanged.
- Strip attachment: passed. Main-panel/strip right-edge delta remained 0px in all three Hero states.
- Mobile swipe: passed at 390 × 844; state 0 advanced to state 1, exactly one subject remained visible, all subject controls stayed disabled, and overflow was 0px.
- Browser console warnings/errors: none.
- Reduced motion: source-inspected; the existing 0.01ms transition/animation override remains unchanged.

### Findings

No actionable P0, P1, or P2 findings remain in the requested Hero-only scope.

### Remaining test gap

- Pointer hover behavior was manually browser-tested. Focus pause parity is implemented with the same pause-state model and source-inspected, but the in-app Browser did not provide a reliable focus-only trigger for the disabled App Store placeholder without introducing a navigation side effect.

final result: passed

## Latest QA status — General Step 1

- Source visual truth: approved Hero comparisons in `/private/tmp/stormlift-hero-pass-2/qa/` plus the exact gradient and container brief at `/Users/cris/.codex/attachments/1cb131b5-a0e9-41e2-b2b1-2ab68b0faa23/pasted-text.txt`.
- Implementation screenshot set: `/private/tmp/stormlift-general-step1-desktop-hero-1200.jpg`, `/private/tmp/stormlift-general-step1-workouts-1200.jpg`, `/private/tmp/stormlift-general-step1-focus-1200.jpg`, `/private/tmp/stormlift-general-step1-track-1200.jpg`, `/private/tmp/stormlift-general-step1-adaptive-coach-1200.jpg`, `/private/tmp/stormlift-general-step1-faqs-1200.jpg`, and `/private/tmp/stormlift-general-step1-cta-footer-1200.jpg`.
- Viewport and density: primary geometry 1920 × 1080 CSS pixels at DPR 1; clean approval captures used a 1200 × 900 CSS viewport at DPR 1 and returned a 1200 × 869 visible Browser surface.
- State: all reveal sections rendered; Hero remained in its normal animated state.
- Full-view evidence: pre/post 1920px captures were compared together, with clean focused viewport captures used as the decisive evidence because the Browser full-page compositor introduced the same stitching artifact in both full-page images.
- Focused evidence: Workouts, Focus, Track, Adaptive Coach, FAQs, and final CTA captures were inspected; footer alignment was additionally verified by settled browser geometry at 164px/1756px.
- Findings: no actionable P0, P1, or P2 mismatch remains. Fonts, copy, assets, icons, section internals, header, benefits, footer styling, and legal pages were not changed in this pass.
- Comparison history: the first rendered post-change comparison passed, so no visual fix was made afterward.
- Primary interactions tested: Hero side-subject click, Hero autoplay, and FAQ expansion.
- Browser console errors/warnings: none.
- Responsive checks: passed at 1920, 1440, 1280, 1024, 768, 430, 390, 360, and 320 with aligned shared containers, a viewport-wide final CTA background, and no document overflow.

final result: passed

## Workouts section — Step 3 final fidelity pass

### Comparison target and evidence

- Scope: Workouts section only.
- Source visual truth: `/private/tmp/stormlift-parity-audit/reference-workouts-grid.jpg`, cropped from the supplied final StormLift design, plus the exact Step 3 brief at `/Users/cris/.codex/attachments/89aaa14b-3781-4192-806f-4c51fe1b9fd8/pasted-text.txt`.
- Rendered implementation: `http://127.0.0.1:4174/`.
- Final implementation screenshot: `/private/tmp/stormlift-workouts-step3/workouts-final-desktop.jpg`.
- Staged reveal evidence: `/private/tmp/stormlift-workouts-step3/workouts-staged-animation.jpg`.
- Focused card evidence: `/private/tmp/stormlift-workouts-step3/card-quick.jpg`, `/private/tmp/stormlift-workouts-step3/card-journey.jpg`, `/private/tmp/stormlift-workouts-step3/card-travel.jpg`, `/private/tmp/stormlift-workouts-step3/card-import.jpg`, and `/private/tmp/stormlift-workouts-step3/card-custom.jpg`.
- Viewport and density: source and implementation are both 1920 × 1200 pixels. The implementation used a 1920 × 1200 CSS viewport at DPR 1, so no density resampling was required.
- State: Workouts reveal fully settled for the source/final comparison; approximately 570ms into the one-shot reveal for the staged evidence.

### Full-view and focused comparison evidence

- The 1920 × 1200 final-design source and 1920 × 1200 implementation were opened together in the same comparison input. The five-card reading order, approved grid structure, card proportions, canonical color families, athlete subjects, two-pills-per-card composition, and black section background remain faithful.
- The implementation retains the provisionally approved global content container, so its horizontal card span follows the current approved site system rather than overriding the container to match the wider raster reference.
- Focused card crops confirm that every athlete is bottom-anchored, its upper portion crosses the top edge in a controlled way, both pills cross the intended card edge while remaining inset horizontally, and the pill gradient matches its card.

### Required fidelity surfaces

- Fonts and typography: passed. Outfit, title treatment, card headings, body copy, alignment, wrapping, and weights remain unchanged. The Workouts subtitle now computes to pure `rgb(255, 255, 255)` with no opacity reduction and 22px at the desktop comparison viewport.
- Spacing and layout rhythm: passed. Approved card dimensions, radii, grid order, and global container remain unchanged. Pills use per-card horizontal insets and cross the relevant edge by 13px. Athlete canvases are bottom-aligned at a 0px delta.
- Colors and visual tokens: passed. Quick uses `--gradient-red-yellow`; Journey uses `--gradient-cyan-lilac-pink`; Home & Travel uses `--gradient-red-orange-pink`; Import uses `--gradient-yellow-cyan-lilac`; Custom uses `--gradient-green-cyan`. Both pills inherit the exact same token as their card, and every shadow uses colors from that family.
- Image quality and asset fidelity: passed. The existing five supplied grayscale PNGs remain in use without replacement, stretching, filters, or compression changes. Per-card heights and X offsets account for different transparent bounds.
- Copy and content: passed. All card names and body copy are unchanged.
- Icons and controls: not applicable; the Workouts cards contain no interactive controls or iconography.
- States and interactions: passed. Title starts first, subtitle follows after 100ms, cards start in reading order at 220/340/460/580/700ms, and each card's top/bottom pills start 45ms/90ms after that card. The section composes once and is unobserved after entry, preventing scroll-jitter retriggers.
- Accessibility: passed within scope. With reduced motion enabled, CSS forces the title, subtitle, cards, and pills to the final visible state, suppresses transitions, and disables ambient pill motion; JavaScript also marks the section composed.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS pixels. Every width retained 10 pills, bottom-anchored athletes, pills inside the viewport horizontally, readable card text, and 0px document overflow. Existing layout behavior remains 3/2 cards at 1024, 2/2/1 at 768, and a five-card stack at mobile widths.

### Comparison history

#### Iteration 1 — blocked

- [P2] Subtitle color/scale: the subtitle used the gray muted token and was visually undersized.
- [P2] Gradient mapping: Home & Travel shared the warm card token, Import used an approximate yellow/green gradient, and every decorative pill used the generic rainbow gradient.
- [P2] Athlete geometry: negative bottom offsets kept several athletes inside the card top and produced inconsistent visual sizes.
- [P2] Pill fidelity: each card had only one bottom pill, so the required ten-pill top/bottom composition was missing.
- [P2] Reveal hierarchy: cards relied on a subtle generic reveal and did not sequence card-specific pills.

#### Iteration 2 — passed

- Applied the exact five canonical gradient tokens to both cards and associated pills.
- Added one inset top-crossing pill and one inset bottom-crossing pill per card with family-colored shadows and asynchronous 2–3px ambient drift.
- Calibrated all five existing PNGs individually and anchored their canvases to the card bottom while allowing controlled top overflow.
- Added the title/subtitle → card → per-card pills staged sequence with 120ms card-start intervals and reduced-motion final-state handling.
- The post-fix full-view comparison, five focused crops, staged capture, and required responsive checks show no actionable P0, P1, or P2 mismatch in the requested scope.

### Runtime and source validation

- Subtitle computed color and size: `rgb(255, 255, 255)` and 21.9994px at 1920px.
- Exact pill count: 10 total, two per card.
- Card/pill gradient equality: passed for all five cards from computed browser styles.
- Athlete bottom anchor: 0px card/image bottom delta for all cards at desktop and every requested responsive width.
- Responsive overflow: 0px at 1024, 768, 430, 390, 360, and 320.
- Browser console warnings/errors: none.
- Served assets: `styles.css?v=workouts-step3-3` and `script.js?v=workouts-step3-3`.
- `git diff --check`: passed.
- Bundled Node syntax check for `script.js`: passed.
- Reduced-motion runtime emulation was unavailable in the in-app Browser; both the CSS override and JavaScript final-state branch were source-verified.

### Findings

No actionable P0, P1, or P2 findings remain in the requested Workouts-only scope.

final result: passed

## Latest QA status — Workouts second refinement

- Complete report: `Workouts section — second geometry and readability refinement` above.
- Source visual truth: `/private/tmp/stormlift-parity-audit/reference-workouts-grid.jpg` and `/private/tmp/stormlift-workouts-step3/workouts-final-desktop.jpg`.
- Final desktop evidence: `/private/tmp/stormlift-workouts-refine2/approval-desktop-workouts.jpg` at 1920 × 1200 CSS pixels, DPR 1.
- Focused evidence: `/private/tmp/stormlift-workouts-refine2/approval-top-card.jpg`, `/private/tmp/stormlift-workouts-refine2/approval-bottom-card.jpg`, and `/private/tmp/stormlift-workouts-refine2/approval-pill-height.jpg`.
- Responsive evidence: `/private/tmp/stormlift-workouts-refine2/approval-responsive-390.jpg` plus the 1024/768/430/390/360/320 geometry sweep.
- Result: no actionable P0, P1, or P2 findings remain after the desktop copy and narrow-screen athlete-clearance fixes.

final result: passed

## Workouts section — third compactness and pill-surface refinement

### Comparison target and evidence

- Scope: Workouts section only.
- Source visual truth: `/private/tmp/stormlift-parity-audit/reference-workouts-grid.jpg`, the previously approved `/private/tmp/stormlift-workouts-refine3/workouts-before.jpg`, and the exact refinement brief at `/Users/cris/.codex/attachments/6a2500b9-c533-46f9-b583-eba2a1681dfc/pasted-text.txt`.
- Rendered implementation: `http://127.0.0.1:4174/`.
- Final desktop implementation screenshot: `/private/tmp/stormlift-workouts-refine3/approval-desktop-workouts.jpg`.
- Focused evidence: `/private/tmp/stormlift-workouts-refine3/approval-top-row.jpg`, `/private/tmp/stormlift-workouts-refine3/approval-bottom-row.jpg`, `/private/tmp/stormlift-workouts-refine3/overflow-quick.jpg`, `/private/tmp/stormlift-workouts-refine3/overflow-journey.jpg`, `/private/tmp/stormlift-workouts-refine3/overflow-travel.jpg`, `/private/tmp/stormlift-workouts-refine3/overflow-import.jpg`, `/private/tmp/stormlift-workouts-refine3/overflow-custom.jpg`, and `/private/tmp/stormlift-workouts-refine3/approval-transparent-pill.jpg`.
- Responsive evidence: `/private/tmp/stormlift-workouts-refine3/approval-responsive-390.jpg` and `/private/tmp/stormlift-workouts-refine3/narrow-320-final.jpg`.
- Viewport and normalization: source and implementation are 1920 × 1200 pixels. The implementation used a 1920 × 1200 CSS viewport at DPR 1, so no density resampling was required. The responsive approval image is 390 × 1500 pixels from a 390 × 1500 CSS viewport at DPR 1.
- State: the staged Workouts reveal was fully settled for final comparisons.

### Full-view and focused comparison evidence

- The final-design source and final implementation were opened together in one comparison input at matching 1920 × 1200 dimensions. The user-requested narrower interpretation intentionally adds side breathing room while preserving the approved centered 3+2 reading order, color mapping, athlete assets, and staged motion language.
- Focused top-row and bottom-row crops confirm that the 200px card height contains the unchanged enlarged copy without clipping or crowding. Per-card image crops confirm that all five athlete canvases and visible subjects cross their card top edge while remaining bottom anchored.
- The pill crop confirms that the surface uses the same gradient stop colors at 90% alpha, while the existing full-strength family-colored box shadows remain unchanged.

### Required fidelity surfaces

- Fonts and typography: passed. Outfit, title weight/scale, description scale, 22px/28.16px desktop description treatment, copy, and hierarchy are preserved. Import and Custom desktop titles use `white-space: nowrap` only to retain clean hierarchy inside the narrower cards.
- Spacing and layout rhythm: passed. Internal desktop grid width changed from 1440px to 1280px. Card size changed from 452 × 218px to 402.7 × 200px. Column/row gaps changed from 42/56px to 36/48px. The 3+2 layout and centered bottom row remain intact.
- Colors and visual tokens: passed. The five canonical card gradients are unchanged. Pills reproduce those exact stop colors at 0.90 alpha; their previous colored shadows retain their full opacity and dimensions.
- Image quality and asset fidelity: passed. All five supplied PNG cutouts remain in use without filters, replacement, or compression changes. Desktop heights are 218/234/266/226/226px with measured top overflow of 18/34/66/26/26px and 0px bottom-anchor delta.
- Copy and content: passed. No copy was added, removed, or edited.
- Icons and controls: not applicable; the Workouts cards contain no controls or icons.
- States and interactions: passed. The title/subtitle reveal, 120ms card-start stagger, card → top pill → bottom pill sequence, and ambient pill keyframes were not changed.
- Accessibility: passed within scope. Existing markup, contrast, and reduced-motion final-state behavior remain unchanged.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS pixels. Mobile card dimensions were not globally reduced. Copy stayed inside all cards, pills remained attached, all athlete canvases remained bottom anchored, and document overflow remained 0px. At 320px, controlled top overflow measures 10/5/25/10/10px.

### Comparison history

#### Iteration 1 — blocked

- [P2] The initial 1280px grid pass left Home & Travel, Import, and Custom copy boxes extending 12.6px below the new 200px card height.
- [P2] The existing <=380px athlete collision overrides kept Journey, Import, and Custom exactly flush with the card top, contrary to the all-five controlled-overflow requirement.

#### Iteration 2 — passed

- Increased Home & Travel's desktop copy width to 54%, moved its athlete 2px right, and kept the Import/Custom desktop titles on one line. All copy now remains inside the 200px cards with positive bottom clearance.
- Recalibrated <=380px Journey/Import/Custom heights and offsets. At 320px every athlete crosses the card top, no text collision is visible, and document overflow remains 0px.
- The post-fix full-view comparison, focused crops, and requested breakpoint sweep show no actionable P0, P1, or P2 issue within the requested Workouts-only scope.

### Validation

- Five cards and ten pills: passed.
- Desktop geometry: 1280px grid, 402.7 × 200px cards, 36px column gap, 48px row gap.
- Desktop pills: 96 × 34px top and 116 × 36px bottom; edge offsets remain -17px/-18px.
- Responsive geometry: passed at 1024, 768, 430, 390, 360, and 320; final horizontal overflow is 0px.
- `git diff --check`: passed.
- Bundled Node syntax check for `script.js`: passed.
- Script comparison against the synchronized repository: unchanged.
- Browser console warnings/errors after the final Workouts refresh: none.

### Findings

No actionable P0, P1, or P2 findings remain in the requested Workouts-only third refinement.

final result: passed

## Latest QA status — Workouts fourth refinement

- Complete report: `Workouts section — fourth typography and ambient-pill refinement` above.
- Final evidence: `/private/tmp/stormlift-workouts-refine4/approval-desktop-workouts.jpg` plus the Journey, body-text, athlete-separation, ambient-pill, and 320px focused captures.
- Result: the exact nine-word descriptions, one-line desktop Journey title, enlarged typography, safe text/athlete separation, delayed asynchronous ambient drift, reduced-motion override, and requested responsive widths pass without P0/P1/P2 findings.

final result: passed

## Latest QA status — Workouts authoritative desktop geometry

- Complete report: `Workouts section — authoritative desktop geometry refinement` above.
- Final evidence: `/private/tmp/stormlift-workouts-authoritative/approval-desktop-workouts.png` at 1920 × 1200 CSS pixels, DPR 1.
- Result: the exact locked desktop grid, card, and title values; balanced description safe areas; athlete top overflow; asynchronous pill motion; and all requested responsive widths pass without P0/P1/P2 findings.

final result: passed

## Latest QA status — Focus, Track, and Adaptive Coach final fidelity

- Complete report: `Focus, Track, and Adaptive Coach — final fidelity pass` above.
- Final evidence: `/private/tmp/stormlift-features-step4/approval-focus.jpg`, `/private/tmp/stormlift-features-step4/approval-track.jpg`, `/private/tmp/stormlift-features-step4/approval-coach.jpg`, `/private/tmp/stormlift-features-step4/approval-visual-closeup.jpg`, and `/private/tmp/stormlift-features-step4/approval-cta-closeup.jpg`.
- Result: exact desktop geometry, canonical gradients, pure-white refined copy, production Google Play URL, CTA-system parity, restrained reversible motion, reduced-motion final state, and all requested responsive widths pass without P0/P1/P2 findings.

final result: passed

## Latest QA status — Focus, Track, and Adaptive Coach centered motion refinement

- Complete report: `Focus, Track, and Adaptive Coach — centered geometry and reversible square motion` above.
- Final evidence: `/private/tmp/stormlift-feature-motion-qa/focus-final-1470x904.png`, `/private/tmp/stormlift-feature-motion-qa/track-final-1470x904.png`, `/private/tmp/stormlift-feature-motion-qa/adaptive-coach-final-1470x904.png`, the Focus seam close-up, and the early/mid scroll captures.
- Result: the +2px Focus seam correction, canonical shared orb sizes, centered wrappers, reversible two-stage square motion, reduced-motion final-state rules, and all requested responsive widths pass without P0/P1/P2 findings.

final result: passed

## FAQ section — final fidelity pass

### Comparison target and evidence

- Source visual truth: `/Users/cris/Desktop/StormLift website/home-2.jpg`; focused FAQ crop: `/private/tmp/stormlift-faq-step5/reference-faq-source.png` (1920 × 1390 px).
- Browser-rendered implementation states: `/private/tmp/stormlift-faq-step5/approval-general-1470x1000.png`, `/private/tmp/stormlift-faq-step5/approval-workouts-1470x1000.png`, `/private/tmp/stormlift-faq-step5/approval-training-progress-1470x1000.png`, and `/private/tmp/stormlift-faq-step5/approval-data-app-1470x1000.png` (1470 × 1000 CSS px each, DPR 1).
- Expanded-item evidence: `/private/tmp/stormlift-faq-step5/approval-expanded-item-data-1470.png` (471 × 185 px).
- Combined comparison input: `/private/tmp/stormlift-faq-step5/design-qa-comparison.png`; the source's four visible rows are compared with the implementation's four isolated accordion states.
- State: one category expanded at a time, matching the existing accordion presentation; General is the default expanded state.

### Findings

No actionable P0, P1, or P2 differences remain in the requested FAQ-only gradient mapping.

### Required fidelity surfaces

- Fonts and typography: passed. Existing Outfit hierarchy, weights, sizes, line heights, wrapping, and copy are unchanged.
- Spacing and layout rhythm: passed. FAQ section dimensions, container width, cards, gaps, padding, radii, headings, and density are unchanged.
- Colors and visual tokens: passed. General uses `--gradient-yellow-cyan-lilac`; Workouts uses `--gradient-cyan-lilac-pink`; Training & Progress uses `--gradient-green-cyan`; Data & App uses `--gradient-red-orange-pink`. Computed styles confirm all three cards in each category use the same canonical 135deg gradient. Dark text is unchanged at `rgb(11, 11, 11)`; the lowest measured stop contrast is 8.09:1.
- Image quality and asset fidelity: not applicable; FAQ cards contain no imagery. Existing plus/minus SVG assets are unchanged.
- Copy and content: passed. All four category names, twelve questions, and twelve answers are unchanged.
- States and interactions: passed within scope. Pointer expansion/collapse, `aria-expanded`, panel `hidden`, plus/minus icon switching, and the existing animation were browser-verified. The gradient remains identical in collapsed and expanded computed states with no background transition or fallback. Native button markup and the existing event wiring were not changed; synthetic keyboard activation was not reliable in the in-app driver, so that is retained as a non-code test limitation rather than a regression.
- Accessibility: passed within scope. Dark text exceeds AA contrast, semantic buttons and ARIA controls are unchanged, focus styling is preserved, and no reduced-motion rules were modified.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS px. All twelve visible-card checks reported zero document/section horizontal overflow, zero card content overflow, and text contained within card bounds.

### Comparison history

#### Iteration 1 — passed

- Replaced the four legacy per-card background variants with four category-level selectors that reference the existing canonical tokens.
- The first refreshed computed-style pass confirmed the exact mapping across 3 cards per category. No visual fix loop was required because the localized implementation introduced no P0/P1/P2 mismatch.

### Validation

- Local preview: `http://127.0.0.1:4174/?approval=faq-step5#faqs`.
- Served stylesheet: `styles.css?v=faq-gradients-1`.
- Browser console warnings/errors: none.
- Responsive widths: 1024, 768, 430, 390, 360, 320 passed.
- `git diff --check`: passed.
- Bundled Node syntax check for `script.js`: passed.

final result: passed

## Latest QA status — FAQ natural flow and feature-block radius correction

- Complete report: `FAQ natural-flow and feature-block radius correction` above.
- Final flow evidence: `/private/tmp/stormlift-faq-flow-correction/approval-benefits-pushed-below-faq-1470x1000.png` and `/private/tmp/stormlift-faq-flow-correction/design-qa-flow-comparison.png`.
- Final edge/radius evidence: `/private/tmp/stormlift-faq-flow-correction/approval-faq-feature-edge-comparison-1470x1000.png` and `/private/tmp/stormlift-faq-flow-correction/approval-small-block-radius-comparison.png`.
- Result: content-driven FAQ height, 118px desktop edge parity, canonical gradient preservation, Focus-matched Track/Coach block radii, and all requested responsive widths pass without P0/P1/P2 findings.

final result: passed

## FAQ-to-Benefits constant bottom-gap correction

### Comparison target and evidence

- Source visual truth: the current all-collapsed FAQ state before this correction, captured at `/private/tmp/stormlift-faq-gap/approval-source-collapsed-1440x1000.png` (1440 × 1000 CSS px, DPR 1). Its computed FAQ-content-to-Benefits gap is the authoritative reference.
- Corrected approval states: `/private/tmp/stormlift-faq-gap/approval-collapsed-1440x1000.png`, `/private/tmp/stormlift-faq-gap/approval-one-expanded-1440x1000.png`, `/private/tmp/stormlift-faq-gap/approval-multiple-expanded-1440x1000.png`, and `/private/tmp/stormlift-faq-gap/approval-maximum-expanded-1440x1000.png` (1440 × 1000 CSS px, DPR 1).
- Same-state source/implementation comparison: `/private/tmp/stormlift-faq-gap/design-qa-collapsed-comparison.png`.
- Focused four-state spacing comparison: `/private/tmp/stormlift-faq-gap/approval-gap-state-comparison.png`.
- All four approval screenshots use the same viewport and are framed to show the final FAQ content, the reserved gap, and the Benefits boundary.

### Findings and root cause

- [P2] The desktop gap was not a spacing token. It was unused space inside `min-height: var(--fidelity-faq)`. At 1440px it measured 284.80px collapsed, 108.80px with one group open, and 0px with two or more groups open.
- The prior natural-flow fix prevented overlap, but expanding panels still consumed the collapsed section's unused minimum-height space before increasing the section height.

### Implemented correction

- Converted the collapsed reference remainder into a viewport-responsive `--faq-benefits-gap` on `.home-page .faq-section`.
- Set the desktop FAQ to `min-height: 0` and applied the token as section-level `padding-bottom`. Accordion panels remain in normal document flow; their changing height now moves Benefits without consuming the reserved gap.
- The token is derived from the existing desktop fidelity height, heading size, heading margin, toggle heights, and category gaps. It reproduces the approved collapsed spacing curve without depending on expanded panel content.
- No FAQ card, gradient, copy, gutter, animation, accessibility, Benefits, or feature-section rule changed.

### Required fidelity surfaces

- Fonts and typography: passed; no typography declarations changed.
- Spacing and layout rhythm: passed. At 1440px, collapsed, one, two, three, and all-four states each compute the same 284.796875px gap. The collapsed FAQ remains exactly 650px high, matching the source state.
- Colors and visual tokens: passed; all FAQ gradients and Benefits colors are unchanged.
- Image quality and asset fidelity: passed by source integrity; FAQ and Benefits assets are unchanged.
- Copy and content: passed; no category, question, answer, or Benefits copy changed.
- States and interactions: passed. Existing pointer behavior, `aria-expanded`, plus/minus icons, panel visibility, and Web Animations code are unchanged.
- Accessibility: passed within scope; native buttons, focus handling, keyboard behavior, and reduced-motion branches are unchanged.
- Responsiveness: passed at 1920, 1440, 1280, 1024, 768, 430, 390, 360, and 320 CSS pixels with zero horizontal/text overflow and zero FAQ/Benefits overlap.

### Comparison history

#### Iteration 1 — blocked

- The baseline gap at 1440px shrank from 284.80px collapsed to 108.80px with one group open and 0px with two, three, or all four groups open.

#### Iteration 2 — passed

- Replaced the content-consumable minimum height with explicit section-level bottom padding. The post-fix browser pass reports a 0px state-to-state gap delta at all requested widths.
- During sampled 360ms expansion and 300ms collapse animations, every frame retained the same 284.796875px desktop gap with 0px overlap.

### Responsive measurements

- 1920px: 338px collapsed and maximum-expanded.
- 1440px: 284.796875px collapsed and maximum-expanded.
- 1280px: 284.796875px collapsed and maximum-expanded.
- 1024px: 190px collapsed and maximum-expanded.
- 768px: 140px collapsed and maximum-expanded.
- 430/390/360/320px: 120px collapsed and maximum-expanded.
- Every measured state delta is 0px.

### Validation

- Local preview: `http://127.0.0.1:4174/?approval=faq-gap-1#faqs`.
- Served stylesheet: `styles.css?v=faq-gap-1`.
- Desktop 118px FAQ horizontal gutter: unchanged.
- FAQ gradients, content, interaction, and Benefits internals: unchanged.
- Browser console warnings/errors: none.
- `git diff --check`: passed after final repository synchronization.

No actionable P0, P1, or P2 findings remain in this narrow FAQ-spacing scope.

final result: passed

## Latest QA status — FAQ-to-Benefits constant gap

- Complete report: `FAQ-to-Benefits constant bottom-gap correction` above.
- Approval evidence: `/private/tmp/stormlift-faq-gap/approval-gap-state-comparison.png`.
- Result: the collapsed reference spacing is now explicit, responsive, constant through every supported FAQ state and animation frame, and clear of Benefits at all requested widths.

final result: passed

## Benefits motion, Hero-style Final CTA, and Footer geometry refinement

### Comparison target and evidence

- Scope: Benefits entrance timing, Final CTA background/content/phone composition, and Footer geometry only.
- Supplied CTA/Footer visual reference: preserved normalized crop `/private/tmp/stormlift-closing-qa/cta-footer-reference-desktop-left-1470.jpg` (1243 × 570 px, DPR 1), derived from the supplied 2940 × 1140 @2x screenshot.
- Approved Hero source: `/Users/cris/Desktop/StormLift website/home-1.jpg` plus the current Hero implementation's panel geometry, canonical gradient variables, strip opacity, and colored shadows.
- Browser-rendered implementation: `http://127.0.0.1:4174/?approval=closing-refine-2#benefits`.
- Final resting evidence: `/private/tmp/stormlift-closing-refine-2/benefits-final-1024.jpg`, `/private/tmp/stormlift-closing-refine-2/cta-final-1024.jpg`, `/private/tmp/stormlift-closing-refine-2/cta-gradient-closeup-1024.jpg`, `/private/tmp/stormlift-closing-refine-2/cta-phones-closeup-1024.jpg`, and `/private/tmp/stormlift-closing-refine-2/footer-final-desktop-1181.jpg`.
- Motion evidence: `/private/tmp/stormlift-closing-refine-2/benefits-mid-1024.png` and `/private/tmp/stormlift-closing-refine-2/cta-mid-1024.png`.
- Responsive evidence: `/private/tmp/stormlift-closing-refine-2/final-responsive-768.png` and `/private/tmp/stormlift-closing-refine-2/final-responsive-390.png`.
- Same-input comparison: `/private/tmp/stormlift-closing-refine-2/comparison-cta-source-implementation.jpg` places the source and refreshed implementation together.

### Findings

No actionable P0, P1, or P2 differences remain in the requested scope.

### Required fidelity surfaces

- Fonts and typography: passed. Outfit, CTA copy, Benefits hierarchy, Footer legal text, font sizes, weights, line heights, and copy remain unchanged. Responsive CTA wrapping is retained where needed below the desktop breakpoint.
- Spacing and layout rhythm: passed. At 1470px the Final CTA content and Footer both compute to 118px left/right gutters. Phone widths reduce from 257/318px to 200/248px; the Footer logo reduces from 148 × 40.16px to 112 × 30.39px. CTA and Footer heights are unchanged.
- Colors and tokens: passed. The CTA uses only the canonical `--gradient-cyan-lilac-pink`, `--gradient-red-yellow`, and `--gradient-green-cyan` tokens at 135deg. Footer legal links compute to pure white.
- Image quality and assets: passed. The existing phone PNGs, Benefits SVGs, Footer vector logo, and social icons are unchanged. No replacement artwork or generated placeholder was introduced.
- Copy and content: passed. All Benefits, CTA, Footer, legal, and social content and destinations are unchanged.
- Motion: passed. Benefits retain icon → title → body sequencing with internal offsets reduced from 125/215ms to 64/112ms and group bases reduced from 0/110/220/330ms to 0/72/144/216ms. Icons resolve from opacity 0, scale .88, and translateY 16px; titles use 12px and bodies 10px. The captured live mid-state confirms overlapping, connected staging. CTA retains headline → subtitle → rear phone → front phone. Gradient panels have `animation-name: none` and `transition-duration: 0s`.
- Reduced motion: passed by code inspection. Existing media-query and JavaScript branches force Benefits, CTA text/phones, and Footer directly to final visible geometry with transitions disabled.
- Responsiveness: passed at 1024, 768, 430, 390, 360, and 320 CSS px. Every width has 0px document overflow and zero headline/subtitle-to-phone intersections. Existing below-desktop gutter logic remains active; 118px is scoped only to desktop.

### Hero architecture reuse

- Panel tracks match the approved Hero percentages: 0/22.6%, 22.5/54.9%, and 77.3/22.8%.
- Each CTA region contains a full-height main layer and a right-aligned strip. At 1470px every strip computes to 91.875px, the same responsive width as Hero.
- Focus shadow: `-14px 0 30px -10px rgba(132,157,239,.62), -7px 0 22px -12px rgba(132,157,239,.62)`.
- Strength shadow: `-18px 0 38px -7px rgba(255,126,103,.78), -10px 0 28px -9px rgba(255,190,102,.52)`.
- Coach shadow: `-18px 0 40px -7px rgba(52,210,218,.88), -10px 0 30px -9px rgba(65,224,175,.56)`.
- The CTA backdrop remains viewport-wide and static; the inner text/phone container alone uses the scoped gutter.

### Comparison history

#### Iteration 1 — blocked

- [P2] The CTA used one flat 90deg gradient rather than Hero's three two-layer 135deg panels.
- [P2] CTA and Footer desktop gutters computed to 40px instead of 118px.
- [P2] Desktop phones computed to 257/318px and visually dominated the CTA; the Footer logo computed to 148px.
- [P2] Benefits used 125/215ms internal offsets and 110ms group steps, creating a mechanical wait pattern.

#### Iteration 2 — passed

- Replaced the flat CTA background with the static Hero-derived three-panel main/strip composition and exact colored shadow families.
- Scoped CTA and Footer desktop gutters to 118px, reduced phones to 200/248px, anchored their right edge to the content boundary with an 18px bottom crop, and reduced the Footer logo to 112px.
- Reduced Benefits internal offsets to 64/112ms and group steps to 72ms while preserving separate icon/title/body motion and left-to-right order.
- Post-fix browser screenshots, computed styles, responsive geometry, and console checks show no remaining P0/P1/P2 issue.

### Regression and static validation

- Hero markup hash is unchanged before/after this pass: `886c4614fd7dc613bec9e01d796317b62028b3ae0433a173471e38ee79e72239`.
- App, Workouts, Focus, Track, Adaptive Coach, and FAQ markup hash is unchanged: `58aaf41608de46de2007cac2baaabe4dd55c2c414fd25378d0e10e7541fd4d86`.
- Benefits markup hash is unchanged: `09e561fdc321ca075a0413699f227c9fb059d9a4a95b9622fb64aacc1aacc0d3`.
- `script.js` is byte-identical to the pre-pass file.
- Browser console warnings/errors: none.
- Served stylesheet: `styles.css?v=closing-refine-2`.
- `git diff --check`: passed.
- No commit, push, or deployment was performed.

final result: passed

## Final compact availability mode QA — 2026-08-28

- The homepage `body` is the single availability/layout control surface. Current values are: `data-ios-store-available="false"`, `data-show-hero-store-buttons="false"`, `data-show-feature-store-buttons="false"`, `data-show-final-store-buttons="false"`, `data-show-social-accounts="false"`, `data-show-compact-header-play="true"`, and `data-footer-legal-layout="right"`.
- The current prominent download action is the compact Header Google Play CTA. It resolves to `https://play.google.com/store/apps/details?id=com.stormlift.app`, uses safe external-link attributes, and is shown from 901px upward; the existing mobile Header hierarchy is preserved at 900px and below.
- Hero and Feature store wrappers have no rendered box or pointer interception in the current mode. Their eight original links, dual-button geometry, vertical Hero swap selectors, hover-pause listeners, assets, and paired Feature layout remain in source.
- Footer social markup/assets/configuration remain in source but hidden. The temporary Footer uses the approved gutter with the logo left and legal navigation right in the former social area; the Header-derived hover and `:focus-visible` underline plus keyboard outline remain active.
- Full restore checklist: populate `SITE_LINKS.appStore`, `SITE_LINKS.x`, and `SITE_LINKS.instagram`; set the iOS/Hero/Feature/Final/Social body flags to `"true"`; set `data-footer-legal-layout="center"`; and set `data-show-compact-header-play="false"`. With iOS and Hero enabled, the dual-button Hero swap and CTA hover-pause resume automatically after reload.
- Responsive browser QA passed at 1920, 1440, 1280, 1024, 768, 430, 390, 360, and 320px with unchanged Header heights, zero horizontal overflow, no Header/nav/CTA collision, and no Footer logo/legal collision.
- Functional browser QA passed for sticky Header behavior, compact CTA URL/safe-link behavior, Hero autoplay and athlete selection without store controls, hidden Feature CTA spacing, Footer hover/focus, legal routes, and retained restoration markup.
