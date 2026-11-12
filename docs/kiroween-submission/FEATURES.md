# Implemented features

The working production is [UMBRAL](https://umbral-seven-khaki.vercel.app). This list describes the app reviewed on **11 November 2026**, not a future roadmap.

| Feature | Actual behavior | Important condition |
|---|---|---|
| Country-aware discovery | Peru, United States, Mexico, Colombia and Spain; qualified international entries | Country selection is independent of language and does not establish eligibility. |
| Six categories | Employment, education, training, entrepreneurship, technology and family support | Coverage varies; empty states are meaningful. |
| Concrete catalogue | 31 concrete opportunities plus CSE; 15 job records distributed PE 4 / US 2 / MX 3 / CO 3 / ES 3 | The snapshot includes closed records and supplementary portals; not all offers are open. |
| Filters and status | Country, region, category, audience and availability | Default results exclude closed/unconfirmed records and supplementary portals. |
| Opportunity details | Benefit, audience, key condition, location, eligibility, restrictions, costs/dates where published, official links | Unknown/unpublished information is labelled. Full eligibility remains before official application. |
| Early save | Save after the benefit and key condition | It records interest; it is not an application or eligibility assessment. |
| My Route | Saved entries, preparation steps, personal tasks, next step and progress | Stored in the browser; no account, sync or recovery service. |
| Export and print | UTF-8 text download and printable preparation sheet with sources | They contain preparation information, not an official application receipt. |
| Peru CSE | Home entry in Peru, early guide link, five steps, eleven checkboxes, resources and FAQs | District guidance for Chiclayo is local; UMBRAL does not replace any ULE. |
| English and Spanish | Product content and language preference persistence | Translations do not modify jurisdiction or restrictions. |
| PWA and offline reading | Installable manifest and service-worker precache | Requires first complete online load; external sites need a connection. |
| Responsive and accessible controls | Keyboard/focus behavior, semantic controls, reduced motion and automated axe checks | Browser-emulated mobile coverage; no full WCAG certification or physical-device study. |
| The Illuminated Threshold | Night palette, warm threshold, arch icons, gateway cards and progress | Owner-approved design direction; usability improvement is unmeasured. |

## Editorial maintenance

The catalogue merges typed records and dated sources in [`data/catalog.ts`](../../src/features/opportunities/data/catalog.ts). Status rules in [`domain/catalog.ts`](../../src/features/opportunities/domain/catalog.ts) use published deadlines and editorial review dates. Overdue review changes a record to unconfirmed and removes the official application action. There is no automatic institutional feed or deadline notification. Some job reviews are due on **14 November 2026** and become unconfirmed the following day if not refreshed; a source recheck is needed before submission and judging.

## Deliberate limits

There is no runtime AI API, personalised AI recommendation, automatic eligibility assessment, application submission, document upload, government-register query, cloud synchronisation or guaranteed benefit. The CSE guide is preparation guidance, not a classification calculator. Saved progress and checked boxes do not certify fulfilment of official requirements.

For architecture and testing, see [technical architecture](TECHNICAL-ARCHITECTURE.md) and [testing instructions](TESTING-INSTRUCTIONS-EN.md).
