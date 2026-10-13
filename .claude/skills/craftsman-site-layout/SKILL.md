---
name: craftsman-site-layout
description: Reusable page-architecture/layout template extracted from the Schovinox reference site (a craftsman/manufacturer marketing site) — header/footer structure, section-by-section composition of every page type (home, services, about, projects, gallery, testimonials, pricing, contact, product detail), and recurring layout components (eyebrow labels, numbered index blocks, stats bar, alternating service blocks, timeline, card grids, CTA bands, pricing cards, forms with honeypot). Colors, fonts, and copy are intentionally excluded — only structure, hierarchy, and layout. Use whenever building a new site (especially craftsman/workshop/manufacturer/local trade or "one owner, real work, portfolio-driven" business) that should follow this proven structure, or when the user references "the Schovinox template/layout/skeleton". Also use to scaffold a multi-page marketing site with home, services, about, portfolio, and contact pages needing a solid default information architecture.
---

# Craftsman Site Layout (Schovinox template)

A content-agnostic, color-agnostic layout system extracted from analyzing `schovinox.vercel.app` (Zámečnictví/kovovýroba — a family metalworking workshop site). It captures **how the site is structured**, not what it says or what colors it uses. Use it as the skeleton for a new project; the user will supply their own palette, type, copywriting, and images.

## When to use this

- User wants a new marketing/portfolio site for a craft, trade, workshop, or small manufacturer business and wants a proven IA + layout, not a blank page.
- User explicitly references this template ("Schovinox layout", "stejná šablona jako minule", "ten skill co jsme dělali z rozvržení webu").
- User wants to scaffold pages (home, services, about, projects/portfolio, gallery, testimonials, pricing, contact) with consistent recurring components.

## How to use this skill

1. **Read `references/page-templates.md`** — full section-by-section breakdown of every page type (order, purpose of each block, what content slot goes where).
2. **Read `references/components.md`** — the recurring atomic layout patterns (eyebrow label, numbered index, card grid, CTA band, etc.) that get reused across multiple pages. These are the "design system of layout" — build them once, reuse everywhere.
3. **Use `assets/skeleton.html`** as a working, unstyled-but-structured starting point — real HTML/CSS with grayscale placeholder tokens (spacing/typography only, no brand colors) implementing the homepage plus every reusable component as commented sections. Copy the relevant blocks into the new project and restyle.
4. Before writing any page, ask the user (or infer from context) for: business type/name, page count needed (full 9-page IA or a trimmed subset), and whether it's a Next.js/React build or plain HTML — then adapt the skeleton's markup accordingly while **keeping the section order and hierarchy intact**.
5. Never carry over Schovinox's actual copy, photos, phone numbers, prices, or brand colors — those are placeholders only, to be replaced per project. Do carry over: section order, spacing rhythm, use of eyebrow labels, numbered indices, card/grid ratios, and the alternating-block pattern for services.

## Site-wide architecture

**Global container**: single centered content column with consistent horizontal padding/max-width across every page. Generous vertical whitespace between sections (this site reads as airy/minimal, not dense).

**Header** (same on every page):
- Logo/wordmark — far left
- Horizontal primary nav — center-right, one level, no dropdowns (8 items in the reference: story → services → flagship product → portfolio → testimonials → pricing → gallery → contact)
- One visually distinct primary CTA button (pill/rectangle, filled or outlined differently than nav links) — far right, always links to the contact/inquiry page
- No secondary utility bar, no search, no language switcher in the reference

**Footer** (same on every page), 3-column layout:
1. Brand mark + one-line mission/positioning sentence
2. "Sitemap" — plain link list mirroring the header nav
3. Contact block — phone / email / address as a stacked list
- Below the 3 columns: a thin bottom bar with social icon(s) left, copyright + legal/registration ID + "built by X" credit right

**Recurring page skeleton** (almost every interior page follows this exact 3-part shape):
1. **Page header**: small eyebrow/kicker word or phrase (page's category label) + one large H1 statement (short, declarative, 1–2 lines) — optionally + one supporting paragraph
2. **Body**: one or more of the reusable components (see `components.md`) — varies per page type
3. **Closing CTA band** (on conversion-relevant pages): centered short question (H2) + one supporting line + single button, right before the footer

## Page inventory & which components each uses

| Page | Key components used |
|---|---|
| Home | Full-bleed hero + eyebrow tags + H1 + 2 CTAs → Stats bar (4-col animated counters) → Numbered mission statement ("01" + paragraph) → "What you'll find" 4-card grid → Footer |
| Services (listing) | Page header → repeating alternating service blocks (image + numbered index "01/03" + label + H2 + paragraph + CTA link), last block variant has multiple sub-links instead of one CTA → Closing CTA band → Footer |
| About/Story | Page header → vertical numbered timeline (duration tag + H3 + paragraph, repeated) → portrait image + pull-quote + attribution → Footer |
| Projects/Portfolio | Page header → uniform image-card grid (image + "zoom" affordance + title + category tag, links to detail page) → Footer |
| Gallery | Page header → filter/category pill bar → dense uniform image grid (many items, each tagged by category) → Footer |
| Testimonials/References | Page header + short trust-framing paragraph → (existing testimonial cards, if any) → submission form (honeypot + name + optional company + text + optional photo upload + consent checkbox + submit) → Footer |
| Pricing | Page header + intro paragraph → 2–N pricing cards side by side (label + short description + big price/unit) → Closing CTA band → Footer |
| Contact | Page header → two-part layout: contact-info list (icon/label/value rows: phone, email, address, hours) + CTA button, alongside a map placeholder → full inquiry form (honeypot + name + email + phone + category select + message + consent + submit) → Footer |
| Product detail | Eyebrow + H1 + subhead + anchor CTA to pricing → image gallery/carousel with numbered thumbnails → "what is it" (image + paragraphs) → 3-item numbered feature list → "why it's different" section reusing the numbered-feature pattern for specs → pricing table grouped by series (each series = label + list of clickable size/price rows) → final CTA with button + phone → Footer |

See `references/page-templates.md` for the full detail on every page, and `references/components.md` for how to build each reusable block.
