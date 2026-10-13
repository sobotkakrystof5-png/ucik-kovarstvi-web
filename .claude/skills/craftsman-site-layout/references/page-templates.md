# Page-by-page templates

Full composition of every page type observed on the reference site. Each is a straight top-to-bottom list of sections in order. Component names refer to `components.md`. Content in [brackets] is a placeholder slot — fill with the new project's own content, never the reference site's.

---

## 1. Home

1. Header (site-wide, see SKILL.md)
2. **Full-bleed hero** (`components.md #2`): background photo, eyebrow tag list, H1 (core value proposition, 2 lines), supporting paragraph, 2 CTAs (primary = "make an inquiry", secondary = "see the work/portfolio")
3. **Stats bar** (`#3`): 4 counters — e.g. [years of experience], [completed projects], [% satisfied customers], [years under this brand name]
4. **Numbered mission statement** (`#4`): "01" + one paragraph explaining the brand's positioning/philosophy
5. Section heading ("What you'll find here" style) + subheading
6. **4-card grid** (`#5`): links to → About/Story, Services, Flagship product, Portfolio/Projects
7. Footer (site-wide)

## 2. Services (listing)

1. Header
2. Page header (`#1`): eyebrow "Services" + H1 statement about the range of offerings
3. **Alternating service block** (`#6`) × N — once per service. Last block = flagship/product-line variant with a sub-link bullet list instead of single CTA.
4. **Closing CTA band** (`#12`): "Not sure where your job fits?" style question → button to contact
5. Footer

## 3. About / Story

1. Header
2. Page header (`#1`): eyebrow "About" + H1 (e.g. a generational/legacy statement)
3. **Vertical numbered timeline** (`#7`): 4–6 milestones, each tagged with a duration/date, H3 title, paragraph
4. Portrait + pull-quote block: large photo, blockquote, attribution (name + role)
5. Footer

## 4. Projects / Portfolio (listing)

1. Header
2. Page header (`#1`): eyebrow "Portfolio/Realizations" + H1 stating volume/pride in work
3. **Card grid** (`#5`, portfolio variant): 6–8 cards, image + zoom affordance + title + category tag, each linking to its own detail page
4. Footer

*(Each card links to a **project detail page** — not fully captured in the reference crawl, but should follow the general pattern: hero image, project title, category, then a photo gallery + short case description. Build this as a simple image-gallery + description page reusing the product-detail gallery pattern at a lighter weight.)*

## 5. Gallery

1. Header
2. Page header (`#1`): eyebrow "Gallery" + H1
3. **Filter pill bar** (`#8`): "All" + category pills
4. **Dense media grid** (`#9`): large uniform grid of many images, category-tagged for filtering, opens lightbox on click
5. Footer

## 6. Testimonials / References

1. Header
2. Page header (`#1`): eyebrow "References" + H1 + one short trust-framing paragraph (e.g. "these are real, unedited")
3. (If testimonials exist: card grid of quotes — quote text + name + optional company/photo)
4. Section heading ("Did we work with you?" style) + short instruction paragraph
5. **Testimonial submission form** (`#10`)
6. Footer

## 7. Pricing

1. Header
2. Page header (`#1`): eyebrow "Pricing" + H1 + intro paragraph explaining the pricing philosophy (e.g. flat rate + custom quotes for large jobs)
3. **Pricing cards** (`#11`) × 2+: e.g. one flat hourly-rate card, one "quoted individually for large projects" card
4. **Closing CTA band** (`#12`): "Want an exact price for your job?" → button
5. Footer

## 8. Contact

1. Header
2. Page header (`#1`): eyebrow "Contact" + H1 (e.g. "Ask, no obligation")
3. **Contact info list** (`#13` left/top half): phone, email, address, opening hours rows + "Call now" button
4. Map placeholder (right/bottom half, alongside the info list)
5. Section heading ("Send an inquiry" style)
6. **Full inquiry form** (`#13` bottom): honeypot, name, email, phone, inquiry-type select, message, consent, submit
7. Footer

## 9. Product detail (flagship product / product line)

1. Header
2. Eyebrow ("Own product") + H1 (product name + short claim) + subhead + anchor CTA down to pricing
3. **Image gallery/carousel** (`#14`): numbered thumbnails, zoomable, arrow-navigable, with hint caption
4. Primary CTA repeated here too (e.g. "order" mailto action)
5. Section heading ("What it is") + image + 1–2 descriptive paragraphs
6. **3-item numbered feature list** (`#14`): index + H3 + paragraph × 3 (benefit-framed)
7. Section heading ("Why it's different") + eyebrow + intro paragraph
8. **Numbered/labeled spec list** (`#14`, reused): index/label + H3 + paragraph × 3 (technical/material-framed)
9. Section heading ("Pricing") + intro/legal note paragraph (e.g. "prices include tax, custom sizes quoted separately")
10. **Grouped pricing table** (`#14`): repeated per series — H3 series label + list of clickable [size/variant — price] rows
11. Final CTA: button + direct phone link, no card needed, simple centered close
12. Footer

---

## Notes on adapting page count

Not every project needs all 9 page types. Common trims:
- **Small business, single service**: merge Services into Home as a section; drop the dedicated Product-detail page pattern unless there's a real flagship product.
- **No physical portfolio to show yet**: drop Projects/Gallery, keep Testimonials + Contact + Services + About.
- **No fixed pricing (quote-only business)**: replace the Pricing page with a single line in the Services page's closing CTA band instead of a dedicated page.

Whatever subset is used, keep the **header/footer**, the **eyebrow+H1 page-header pattern**, and the **closing CTA band on conversion pages** — these three are the structural backbone that makes the whole site feel like one coherent system.
