# Reusable layout components

These are the atomic building blocks that repeat across pages. Build each once as a component/partial and compose pages from them. No colors or copy specified here — only structure, order of elements, and relative sizing/hierarchy.

---

## 1. Eyebrow + H1 page header
Used at the top of **every interior page**.

- Small label line above the heading (single word or short phrase naming the page's category, e.g. category of the page). Visually small, spaced out from the H1.
- H1: short, declarative, 1–2 lines max. Largest text on the page.
- Optional: one supporting paragraph (1–2 sentences) directly under the H1, lighter weight than H1.

```
[eyebrow label]
# [H1 statement]
[optional supporting paragraph]
```

## 2. Full-bleed hero (homepage only)
- Full-width/full-bleed background image (or video) behind the content, dark enough for white/light text overlay.
- Eyebrow line: short list of category tags separated by a middle-dot ("·"), sitting above H1.
- H1: 2-line, large, bold statement — this is the single largest text element on the entire site.
- Supporting paragraph: 1–2 sentences.
- Two CTAs side by side: one primary (filled/solid button), one secondary (outline or text link with arrow).

## 3. Stats bar
- 4-column grid (collapses to 2×2 on mobile), directly below the hero.
- Each column: one large number (can be an animated count-up from 0) + one short label underneath describing what it counts.
- No icons, no borders between columns — pure whitespace separation.

## 4. Numbered intro / mission statement
- A large index number (e.g. "01") placed beside (or above, on mobile) a single paragraph of mission/positioning copy.
- Used as a transitional, breathing section between the stats bar and the main content grid — not a full section with its own heading, just number + paragraph.
- This same "large index number as a design device" motif reappears later in numbered feature lists and the services listing — treat it as a signature recurring device, not a one-off.

## 5. Card grid (content pillars / portfolio)
- Grid of cards, each identical in structure:
  - Image (top, fixed aspect ratio)
  - Title (below image)
  - One-line description
  - Whole card is a link to a detail/subpage
- On the homepage: 4 cards representing the site's main content pillars (about, services, flagship product, portfolio) — this doubles as a visual sitemap.
- On the portfolio/projects page: N cards (6–8), each with a small category tag instead of a description, plus a "zoom/enlarge" hover affordance since the image is the primary content.

## 6. Alternating service block (repeating "offer" pattern)
Used on the services listing page, once per service offered (3 in the reference).

- Image (large, on one side)
- Small numbered index in "current/total" format (e.g. "01/03") + a constant label word identifying the block type (e.g. "Service")
- H2: service name
- Paragraph: what it covers, how the process works
- CTA: single text/button link ("learn more") — OR, for a flagship/product-line service, a **short bullet list of links** to sub-products instead of one generic CTA (this variant signals "this offering has its own sub-catalog").
- Blocks stack vertically down the page; consider alternating image left/right per block for visual rhythm, though the reference stacks them uniformly.

## 7. Vertical numbered timeline (about/story page)
- Ordered list, each item:
  - Small tag (a duration or date, e.g. "14 let" / "Today") acting as the index marker instead of a plain number
  - H3: milestone title
  - Paragraph: milestone description
- Items read top-to-bottom in chronological order, each visually indented/marked as a list item (numbered or tagged, not bulleted).
- Followed by a **portrait + pull-quote** block: large photo + a single blockquote-style quote + an attribution line (name + role) underneath. This is the emotional/human close of the about page.

## 8. Filter/category pill bar (gallery page)
- Row of pill/tab buttons: "All" + one pill per category.
- Sits directly below the page header, above the grid.
- Selecting a pill filters the grid below (client-side).

## 9. Dense media grid (gallery page)
- Large uniform grid (e.g. 4 columns desktop) of many images, each internally tagged with a category (used by the filter bar above).
- No titles or captions on the grid itself — purely visual; captions/detail appear on click/lightbox only.

## 10. Testimonial submission form
- Short trust-building paragraph above the form explaining why testimonials are genuine/moderated.
- Form fields in order:
  1. Hidden honeypot field (spam trap, invisible to real users)
  2. Name (required)
  3. Company (optional)
  4. Testimonial text (required, multi-line)
  5. Photo upload (optional, with file-type/size hint text)
  6. Consent checkbox (required) — permission to publish name/text/photo
  7. Submit button
- If existing testimonials exist, they'd render as a card grid (quote + name + optional company/photo) above this form — the reference site currently has none live, but the layout should accommodate it.

## 11. Pricing cards
- 2 to N cards, side by side (stack on mobile).
- Each card: short label/heading, 1-line description, then a large price/value display (big number + unit, e.g. "rate / hour") — or a non-numeric value like "quoted individually" for custom/large-scope tiers.
- No feature-comparison checklists in the reference — kept deliberately simple/sparse, not a SaaS-style feature matrix.

## 12. Closing CTA band
Used at the bottom of conversion-relevant pages (services, pricing, product detail), right before the footer.

- Centered, short H2 phrased as a question ("Not sure where your job fits?")
- One supporting line
- Single button (links to contact)
- Visually set apart from the rest of the page (e.g. its own contained/banded section, more whitespace around it).

## 13. Contact page layout
- Two zones side by side (stack on mobile):
  - **Contact info list**: repeating rows of [icon/label] + value — phone, email, address, opening hours — followed by a single "Call now" style button.
  - **Map placeholder**: a map embed area.
- Below both: the **full inquiry form**:
  1. Honeypot field
  2. Name (required)
  3. Email (required)
  4. Phone (optional)
  5. Inquiry type — select/radio (required) — categories should mirror the services offered
  6. Message (required, multi-line)
  7. Consent checkbox (required)
  8. Submit button

## 14. Product detail page pattern (for a flagship product/product line)
- Eyebrow ("Own product" style label) + H1 + subhead paragraph + one anchor-link CTA scrolling down to the pricing section.
- Image gallery/carousel: numbered thumbnails (01, 02, 03…), with hint text that images are clickable/zoomable and arrow-navigable.
- "What is it" section: no eyebrow, H2 + one image + 1–2 paragraphs of descriptive copy.
- **3-item numbered feature list** (reuses the numbered-index motif from component #4/#6): each item = 2-digit index + H3 + short paragraph, laid out as 3 columns or 3 stacked rows.
- "Why it's different" section: eyebrow + H2 + intro paragraph, then a **second numbered/labeled list** of specs — same visual pattern as the feature list above but framed around technical differentiators (material, finish, process) rather than benefits. Treat these two lists as the same component reused with different content framing.
- Pricing table: grouped by series/variant (H3 per group), each group listing its size/variant options as clickable rows showing [dimension/variant] + [price] — clicking opens a pre-filled order action (e.g. mailto with subject/body prefilled).
- Final CTA: one prominent button + a direct phone link next to it.

---

## Cross-cutting notes

- **Numbered-index motif**: the single strongest recurring visual device across this whole site — large index numbers ("01", "02/03") are used at least 5 different times (mission statement, service blocks, timeline, feature lists, spec lists). Treat it as the site's signature layout device, not decoration to skip.
- **Eyebrow labels**: every page and most major sections use a small label word above the heading. Keep this consistent site-wide.
- **CTA hierarchy**: exactly one primary filled-button style + one secondary (outline/text) style, used consistently — never more than 2 button visual styles on a page.
- **Whitespace over borders/cards-with-shadows**: sections are separated by vertical spacing and typography scale, not boxes, dividers, or drop shadows.
- **Forms always start with a honeypot field** and always end with a required consent checkbox before submit — carry this pattern into any new form on the new site (GDPR-style consent + basic spam protection).
