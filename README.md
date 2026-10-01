# Hashani Navy

A task-based player reference for Achaea, with visual topic guides, readable editorial explanations, and a separate catalogue for original Navy scrolls.

**Website:** https://oddtotheendart-source.github.io/hashani-navy/

## Completed
- Responsive homepage with the saved sunrise, seastrider, and Navy crest.
- Animated header with pause control and reduced-motion support.
- Doubled crest anchored at the upper right, with separation from the ship.
- Admiral Elius Mor'akova banner feature.
- Quarterdeck, Watch Bill, Ship's Book, Chartroom, Battle Stations, Hunting Chart, Merchant's Ledger, Voyage Board, Navy Ranks, and All Navy Scrolls.
- Complete searchable registry of **51 / 51 captured HN scroll topics**, preserving the original headings: Basics, Specialisations, Combat, Activities, Guides, and Misc.
- Interactive Navy calendar for announced sailings and events; empty dates remain empty until an event is supplied.
- Searchable TARGETLIST reference with the exact source archived separately.
- GitHub Pages publication from main.

## Remaining work
- [ ] **Specialisation alias pop-out (future):** explain and optionally generate client-specific aliases for saved point allocations by duty. Include per-rank/cumulative SPP costs (now shown beside rank descriptions). Verify the artefact name/help, exact change command, land-location rule in DEEPSEADIVING versus earlier dock-only note, and client syntax before providing runnable aliases. Teacher-based changes and artefact changes must be distinguished.
- [x] **Voyage details:** populate the Voyage Board from the exact voyages, voyagelist, and bounties records. Add source-backed conditions, requirements, and rewards; do not imply that a bounty is currently active without evidence.
- [x] **Trade quantity calculator:** two editable exchange ratios use the supplied formula. Tested 12 → 9 → 6, fractional/zero quantities, and invalid ratios. Fractional outputs are flagged; game rounding is not assumed. Fees, capacity, profit, and multi-leg route planning remain future enhancements.
- [x] **Elius portrait:** integrated into the approved banner. Ticca placement remains to be decided.
- [x] **Admiral provenance:** supplied CLAN MEMBERS output records Admiral Elius Mor'akova (clan head).
- [x] **HN source capture:** all 51 indexed HN topics are captured. Individual repository extraction remains pending for 12 topics that are still held in the supplied 1 October session log rather than separate `records/<topic>.txt` files.
- [x] **TARGETLIST:** Aurola, 18 Mayan 974 AF, archived in `records/targetlist.txt` and presented as a searchable table without treating every listed vessel as hostile.
- [x] **Navy roles:** PROGRESSION supplies five role descriptions and access requirements. Numbered rank order and member assignments remain unconfirmed.
- [x] **Navy member roster:** 60 recorded ACTIVE members added with exact source output. Navy rank assignments remain outstanding.
- [ ] **Operational references:** derive verified ship-readiness references, maps/routes, crew duties, combat procedures, hunting details, and trade tables from the source scrolls.
- [ ] **Final content review:** check editorial explanations against originals and review desktop/mobile presentation after the content and portraits are integrated.

## Source rules
Visual quick-reference first; editorial explanation second; exact original scroll underneath or linked. Never present a planning summary as an original helpfile. Discard failed manually typed help commands. Do not infer missing Navy facts.

See [CONTENT.md](CONTENT.md) for provenance and the section/topic map, and [PAGES.md](PAGES.md) for publishing and editing details.

## Site files
- index.html — banner, page layout, and naval-record placeholders.
- styles.css — navy/brass/parchment styling, responsive layouts, header animation.
- site.js — task sections, scroll catalogue, search, and header pause control.
- registry.js — 51-scroll HN master registry, source-heading map, and TARGETLIST presentation.
- events.js — Navy calendar data/rendering and suggested Voyage Board activities.

This is a buildless static site; no dependency installation is required.

## Calendar and suggested Navy events
The site includes a month-by-month Navy calendar. Dated entries are added only when an event is actually announced; suggested activities are kept separate from scheduled events.

## Suggested Navy events
Voyage Board includes voyage learning, sea trade, and Ship Arena suggestions supplied by Ticca, with in-game mail to Elius for availability. Dates, times, meeting places, and participation details remain to be announced; these are not scheduled events.
