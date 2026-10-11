# StormLift website asset manifest

- `header/`: compact header mark.
- `hero-slider/`: three reusable grayscale people, store badges, and the large STORMLIFT wordmark artwork. Athlete artwork uses responsive AVIF files with the original PNG files retained as fallbacks.
- `app-phones/`: left Progress, center Workouts (including Quick Start), and right Create Workout phone renders. Canonical PNG sources and all responsive AVIF variants use the October 2026 product artwork. CSS retains the approved phone composition dimensions independently of source resolution.
- `workouts/`: Instant, Journey, Home & Travel, Import, and Custom cut-outs. Existing internal filenames are retained; AVIF files are served with PNG fallbacks.
- `faqs/`: accessible accordion plus and minus icons.
- `icons/`: 100% Free, No Ads, No Subscriptions, and Your Data benefit icons.
- `final-cta/`: small Progress and large Workouts phone renders, refreshed from the October 2026 PNG sources. AVIF files are served with PNG fallbacks; the original display aspect ratios are reserved in CSS.
- `footer/`: StormLift lockup, Instagram icon, and X icon.
- `fonts/`: Outfit Regular, Medium, SemiBold, Bold, and ExtraBold, reused from the StormLift brand assets. WOFF2 is the primary web format; the original TTF files remain as fallbacks.

The Focus, Track, and Adaptive Coach sections reuse the three hero people. Their gradient panels, glows, pills, and floating blocks are CSS-generated.

Quick Start is a separate manual-training section between Workouts and Focus. Its violet gradient and frosted-glass square are CSS-generated, with a decorative inline lightning SVG; it adds no phone imagery or JavaScript.
