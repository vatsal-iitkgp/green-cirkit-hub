# Updating greencirkit.com content

Every change pushed to `main` goes live in about 2 minutes. You can edit files on github.com (open the file → pencil icon → "Commit changes"), or just ask Claude.

## Post a news article
1. Go to `src/content/news/` → **Add file → Create new file**.
2. Name it `YYYY-MM-DD-short-title.md`, e.g. `2026-11-12-reliance-cuts-hdpe.md`.
3. Paste this and fill it in:

```
---
title: Your headline
date: 2026-11-12
category: Market        (or Regulation, Company, …)
summary: One or two sentences shown on the news list.
source: Where this came from
sourceUrl: https://link-to-original
---

Your article. Blank line between paragraphs.

## A subheading

- A bullet point
- **Bold text** and [a link](https://example.com)
```

To attach a PDF: upload it to `public/news/` and set `sourceUrl: /news/your-file.pdf`.

## Add this week's HDPE price
Open `src/content/prices.ts` and add a row at the bottom of `VIRGIN_HDPE_BM_DELHI`:

```
{ date: "2026-11-12", price: 140, source: "Polymerupdate" },
```

Only add prices you have actually seen in a source. You can also add producer moves to `PRODUCER_MOVES`, newest first.

## Jobs
Edit `src/content/jobs.ts`. Delete a block to close a role; copy one to add a role.

## Product grades
Edit `src/lib/grades.ts`. A new grade automatically gets its own card, TDS page and form option.

## Where leads go
All forms (quotes, samples, scrap, job applications, newsletter sign-ups, impact reports) go to the Formspree inbox linked to this site. Each email's subject shows its type, e.g. `[Subscribe]`.
