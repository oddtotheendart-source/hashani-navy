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
- [ ] **Specialisation alias pop-out (future):** explain and optionally generate client-specific aliases for saved point allocations by duty. Include per-rank/cumulative SPP costs (now shown beside rank descriptions). Verify the artefact name/help, exact change command, docked-location restriction reported by the project owner, and client syntax before providing runnable aliases. Teacher-based changes and artefact changes must be distinguished.
- [ ] **Voyage details:** populate the Voyage Board from the exact voyages, voyagelist, and bounties records. Add source-backed conditions, requirements, and rewards; do not imply that a bounty is currently active without evidence.
- [ ] **Trade calculator:** establish inputs and formulas from trademath, tradecargo, tradedealchart, traderewards, and traderouteguide. Keep user-entered prices distinct from source figures, state units and rounding, and verify calculations against recorded examples before publication.
- [x] **Elius portrait:** integrated into the approved banner. Ticca placement remains to be decided.
- [x] **Admiral provenance:** supplied CLAN MEMBERS output records Admiral Elius Mor'akova (clan head).
- [ ] **Original scrolls:** CITYSHIPS, CHELP NAVALPOLICY, and Rhydian's captain command list (crediting Ilsefi) are supplied and preserved. The command list is provisionally indexed under basiccommands because its pasted source omits the topic heading. HARBOURDIRECTIONS and the provisionally identified HARBOURS scroll are also supplied, with searchable land-route cards and preserved fee/service tables. SHIPS is also supplied, with seven vessel IDs and an explicit comparison against CITYSHIPS. WELCOME, WHATNOW, PROGRESSION, and SEAFARING are supplied with first-step guidance, five Navy roles, lesson/SPP tables, and specialisation charts. All seven Watch Bill scrolls are supplied: COMMAND, DECKHAND, HELM, SPECIALISATIONS, SPECIALISTS, WATCH, and WEAPONS. The other 35 planned CLHELP topics await exact output.
- [ ] **Missing targetlist:** obtain the helpfile; do not invent targets.
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

This is a buildless static site; no dependency installation is required.
