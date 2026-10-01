# Hashani Navy

A task-based player reference for Achaea, with visual topic guides, readable editorial explanations, and a separate catalogue for original Navy scrolls.

**Website:** https://oddtotheendart-source.github.io/hashani-navy/

## Completed
- Responsive homepage with the saved sunrise, seastrider, and Navy crest.
- Animated header with pause control and reduced-motion support.
- Doubled crest anchored at the upper right, with separation from the ship.
- Admiral Elius Mor'akova banner feature.
- Quarterdeck, Watch Bill, Ship's Book, Chartroom, Battle Stations, Hunting Chart, Merchant's Ledger, Voyage Board, Navy Ranks, and All Navy Scrolls.
- Searchable catalogue of 51 planned scroll topics.
- GitHub Pages publication from main.

## Remaining work
- [ ] **Voyage details:** populate the Voyage Board from the exact voyages, voyagelist, and bounties records. Add source-backed conditions, requirements, and rewards; do not imply that a bounty is currently active without evidence.
- [ ] **Trade calculator:** establish inputs and formulas from trademath, tradecargo, tradedealchart, traderewards, and traderouteguide. Keep user-entered prices distinct from source figures, state units and rounding, and verify calculations against recorded examples before publication.
- [ ] **Portrait integration:** review the newly uploaded Elius and Ticca images, select Elius's front-facing portrait for the lower-left Admiral feature, and determine Ticca's placement. The uploaded files are available; the banner still uses an initial-letter placeholder.
- [ ] **Admiral provenance:** attach the exact log excerpt naming Elius Mor'akova as Admiral.
- [ ] **Original scrolls:** add verbatim successful CLHELP output with recorded attribution. All 51 catalogue entries currently reserve space for source text.
- [ ] **Missing targetlist:** obtain the helpfile; do not invent targets.
- [ ] **Navy ranks:** supply the exact rank order and advancement requirements.
- [ ] **Navy member roster:** supply names, ranks, and assignments.
- [ ] **Operational references:** derive verified ship-readiness references, maps/routes, crew duties, combat procedures, hunting details, and trade tables from the source scrolls.
- [ ] **Final content review:** check editorial explanations against originals and review desktop/mobile presentation after the content and portraits are integrated.

## Source rules
Visual quick-reference first; editorial explanation second; exact original scroll underneath or linked. Never present a planning summary as an original helpfile. Discard failed manually typed help commands. Do not infer missing Navy facts.

See [CONTENT.md](CONTENT.md) for provenance and the section/topic map, and [PAGES.md](PAGES.md) for publishing and editing details.

## Site files
- index.html — banner, page layout, and naval-record placeholders.
- styles.css — navy/brass/parchment styling, responsive layouts, header animation.
- site.js — task sections, scroll catalogue, search, and header pause control.

This is a buildless static site; no dependency installation is required.
