<div align="center">

# BattleCard

Build sales battle cards — short internal cheat sheets that help your sales team win deals.

[![Live][badge-site]][url-site]
[![HTML5][badge-html]][url-html]
[![CSS3][badge-css]][url-css]
[![JavaScript][badge-js]][url-js]
[![Claude Code][badge-claude]][url-claude]
[![License][badge-license]](LICENSE)

[badge-site]:    https://img.shields.io/badge/live_site-0063e5?style=for-the-badge&logo=googlechrome&logoColor=white
[badge-html]:    https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[badge-css]:     https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[badge-js]:      https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[badge-claude]:  https://img.shields.io/badge/Claude_Code-CC785C?style=for-the-badge&logo=anthropic&logoColor=white
[badge-license]: https://img.shields.io/badge/license-MIT-404040?style=for-the-badge

[url-site]:   https://battlecard.neorgon.com/
[url-html]:   #
[url-css]:    #
[url-js]:     #
[url-claude]: https://claude.ai/code

</div>

---

## Overview

BattleCard is a browser-based sales battle card builder. A battle card is a short, internal cheat sheet a sales team uses to win deals: positioning, "why we win", objection handling, competitor landmines, and pricing on one page.

Start from a template (including a full Neorgon demo card), lay out sections in five layouts (free text, numbered, columns, Q&A, objection → response), brand it with your logo, company name, and font, then export a PNG, download the card as JSON, re-import it later, or copy a share link that carries the whole card in the URL. No signup, nothing leaves the browser.

**Live:** battlecard.neorgon.com

---

## Features

- **Templates** — Neorgon demo card, SaaS head-to-head example, and a blank starter
- **Five section layouts** — free text, numbered, columns, Q&A, and objection → response pairs
- **Brand & personalization** — logo upload, company name, and font choice per card
- **Flexible grid** — add, duplicate, drag-reorder, resize (column/row span), 8 card themes
- **Export & import** — PNG (2×), JSON download/upload, and share links that carry the card in the URL
- **Private by default** — everything lives in the browser; no accounts, no backend

## Run locally

```bash
make serve   # http://localhost:8823
```

Or open `index.html` via a local HTTP server (ES modules require a server, not `file://`).
