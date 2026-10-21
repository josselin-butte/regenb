# Map of the landing page (read-only) and proposed order of changes

## 1. Landing page, top to bottom
French at `/`, English at `/en`. Both use the same page, `src/pages/Index.tsx`.
1. `Header.tsx`: logo, menu, Boussole link
2. `HeroSection.tsx`: ridge drawing, H1, two sentences, element icons, Contact and Boussole buttons, photo
3. `AboutSection.tsx`: portrait, four principles, three paragraphs
4. `OfferSection.tsx`: two service entries and the REGEN link
5. Landscape photo, placed directly in `Index.tsx`
6. `NewsletterSection.tsx`: photo, Continuo form (`ContinuoSignup.tsx`, needs consent) and Substack button
7. `WaitlistSection.tsx`
8. `Footer.tsx`
Also on every page: `RouteSeo.tsx` (page titles), `ConsentManager.tsx` (cookie banner), `MetaPixel.tsx` (no visible output).

## 2. Where the texts live
All French and English texts are in one file: `src/contexts/LanguageContext.tsx`. Each key holds both `{ fr, en }`.
Landing page keys: `tagline`, `hero.*`, `element.*`, `image.*`, `nav.*`, `about.*` (with `about.guide.1-4.*`), `offer.*` (`c1`, `c2`, `regen`), `letter.*`, `waitlist.*`, `footer.*`.
Page titles are in `RouteSeo.tsx`. Search-engine data (prices) is in `src/lib/structured-data.ts`. Legal texts are in `src/lib/legal.ts`.

## 3. Where the listed terms appear
- "Butte" without the accent: nowhere. "Butté" with the accent is used throughout.
- "£", "GBP", "PT6H", "Nature-Aligned Values": nowhere on this site.
- "Nature Values Compass": `LanguageContext.tsx` (`compass.cta.text` EN, `legal.cgv.order.text`), `RouteSeo.tsx` lines 58-59 (terms pages), and a code comment in `Compass.tsx` line 6.
- "77": `LanguageContext.tsx` `compass.price` ("77 € TTC" / EN equivalent) and `structured-data.ts` line 63 (price 77 EUR, "€77 incl. VAT").
- **Conflict:** `legal.ts` lines 124 and 141 (terms of sale) say "77 € HT, i.e. 92.40 € TTC". The Boussole page says 77 € TTC. This conflict is still open.

## 4-7. Checkout, webhook, orders, /admin/sales, sample lesson, emails
None of these exist in this website project. The only backend function here is `forward-to-crm`, which sends form entries to the CRM. This site has no Stripe code, webhook, orders table, `/admin/sales` page, sample lesson or welcome/reminder emails.
The "Buy" buttons on the Boussole page link out to `https://valuescourse.regenb.com/`, a separate project.
The answers about the Stripe session, price ID vs. inline amount, the secret, the access event, the `amount_total` check, stored amounts, `/admin/sales`, the sample lesson and emails can only come from reading the **valuescourse.regenb.com project**. Under the guardrails, I can read it but must not edit it.

## 8. Analytics and tracking
- Meta Pixel `2072978403507203`: it sends PageView only after you accept "advertising". It never runs on admin, learning, login or checkout pages.
- Contact form Lead: sent once, only after the CRM confirms the message arrived, and only with advertising consent. No form data is sent with it.
- Continuo newsletter form: it loads only with "external content" consent. No event is tracked from it.
- Consent is handled in `src/lib/consent.ts`. Every cookie is listed in `src/lib/trackers.ts`. No Google Analytics or other tools are installed.

## Proposed safest order for your next changes
1. Settle the open price conflict (77 € TTC vs. 77 € HT / 92.40 € TTC) before any copy change.
2. If needed, do a read-only check of the course project (Stripe price, webhook amount check, emails), so the site never shows a price the checkout doesn't charge.
3. Text-only changes in `LanguageContext.tsx`, French and English together, one section at a time, in page order.
4. Matching updates to page titles and price data (`RouteSeo.tsx`, `structured-data.ts`).
5. Legal terms (`legal.ts`) last, and only with your explicit approval.
6. Layout or component changes only after the text is approved.
7. After each step: run the tests, check FR and EN on desktop and mobile, and do not publish.
