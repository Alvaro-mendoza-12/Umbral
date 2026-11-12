# UMBRAL — The Illuminated Threshold

**Find real opportunities. Understand the requirements. Take the next step.**

## Inspiration

Finding an opportunity is only the beginning. A person still needs to understand who it is for, what it offers, what conditions apply and how to prepare. That gap matters to students, jobseekers, people seeking training, entrepreneurs and households navigating public support.

UMBRAL began as guidance for Peru's household socioeconomic classification procedure, CSE. It now carries the same preparation approach into a bilingual international opportunity companion. “Umbral” means threshold: the project uses that idea to connect discovering a possibility with taking an informed next step.

## What it does

Users choose a country, explore categories and open specific opportunities with benefits, key conditions, eligibility, restrictions, costs, dates and official sources. English and Spanish are independent of country selection. The reviewed 11 November 2026 snapshot contains 31 concrete opportunities plus the Peru CSE procedure, including 15 jobs across Peru, the United States, Mexico, Colombia and Spain. International opportunities appear only for their listed eligible countries. Records include closed opportunities; the count is not a claim that every offer is open.

After reading the benefit and key condition, a person can save an opportunity to My Route without an account. They can mark preparation steps, add personal tasks, see progress, download a text copy and print. Full eligibility is available before continuing through the official application link. Saving does not apply, establish eligibility or guarantee an award.

The Peru CSE entry offers an early link to its five-step guide, eleven preparation checkboxes, resources and FAQs. It does not calculate CSE, submit a request, consult government registers, award a benefit or replace a ULE. Chiclayo office information applies only to that district.

The installable PWA supports cached reading after a first complete online load. Official external websites still require a connection. Personal preparation stays in the current browser, without cloud sync or account recovery.

## How we built it

UMBRAL uses React, TypeScript and Vite, with React Router, i18next/react-i18next and Vite PWA/Workbox. Typed editorial records separate opportunity facts and sources from status rules, country filtering, local state and presentation. Browser localStorage holds route and checklist progress. Vercel serves the static build; there is no runtime AI API or application backend.

Kiro created the initial MVP, including the CSE experience, bilingual implementation, PWA setup, initial tests and reports. Its original three Specs and five Steering files remain in `.kiro` with unchanged content. Codex independently audited and corrected the app, added accessibility and regression checks, expanded the catalogue and international experience, implemented the visual theme and later interaction fixes, and prepared publication. Those later contributions are attributed to Codex. We do not claim unobserved Agent Hooks, MCP, Crew or property-based testing.

## The Illuminated Threshold and Costume Contest

Our proposed category is Costume Contest. A mysterious night palette frames a warm illuminated threshold. Arch icons and gateway-like opportunity cards carry that metaphor into discovery; preparation progress carries it into My Route. The intent is to make the move from possibility to action visible while preserving clear information and usable controls.

The owner approved this visual direction. We present the functional design rationale and the actual interface, without claiming that its usability benefit has been measured or that it is a strong horror experience. Category acceptance remains the organisers' decision.

## Challenges

The main challenge was keeping opportunity information precise while avoiding an overwhelming first screen. We separated the benefit and key condition from detailed requirements, moved saving into the early preparation flow, and kept official application conditions visible in the detail experience. Country and language also needed separate state so that translation would not imply international eligibility.

Content freshness remains an operational challenge. UMBRAL is editorial rather than institution-connected. Published deadlines and overdue reviews can close or hide application actions; some job reviews are due on 14 November 2026 and become unconfirmed the following day if not refreshed. Sources must be rechecked before submission and judging. We mark unpublished facts rather than filling them with assumptions.

## Accomplishments

The working public product combines a bilingual country-aware catalogue, local preparation routes, source transparency and the preserved CSE guide. Recorded checks on 11 November 2026 include 49 unit tests, 484 local E2E passes and 86 production E2E passes on mobile and desktop layouts. The main Quality workflow also succeeded. These are software checks, not evidence of user outcomes or full accessibility certification.

## What we learned

The implementation reinforced the need to separate an opportunity's benefit, its conditions and the user's preparation. A saved item is an intention, not an application. A translated page is not a change in jurisdiction. A dated source review is useful evidence, but it is not a promise that an external listing remains available.

## What's next

Recheck dated catalogue sources before submission and judging, conduct real usability sessions, use their results to refine the flow, and expand verified country/category coverage. Future work should improve editorial maintenance and recovery/export options without overstating eligibility or exposing sensitive personal data. These are plans, not shipped features or measured results.

[Try UMBRAL](https://umbral-seven-khaki.vercel.app) · [Source and MIT licence](https://github.com/Alvaro-mendoza-12/Umbral) · [Evidence and testing](TESTING-INSTRUCTIONS-EN.md)
