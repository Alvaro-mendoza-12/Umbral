# English testing instructions

## Public demo without installation

Open [UMBRAL production](https://umbral-seven-khaki.vercel.app). No login or key is required. Use a normal browser window if you want preparation state to persist.

1. Choose **English** and **Peru**. Confirm that the language change does not switch country and that the Peru CSE entry is visible.
2. Open discovery, select a category and inspect a specific opportunity. Read its benefit, audience and key condition. Use the availability filter if a particular dated record no longer appears.
3. Save the opportunity to **My Route** from the early summary area. Saving should not ask for documents or claim eligibility. Read full eligibility and restrictions before the official application step. The official action opens the institution's site; it does not submit an application through UMBRAL.
4. Open My Route. Mark a preparation step, add a nonsensitive task such as “Read the official conditions,” and mark the task complete. Confirm the progress changes.
5. Reload the page. With browser storage available, the saved entry and completed items should remain. Change country and language separately; neither should delete the saved route.
6. Download the text copy and open print preview. Confirm opportunity information, preparation state and source references are present. Cancel printing if a physical copy is not needed.
7. Return to Peru and open CSE. Its guide link is available early. Inspect the five-step guide, checklist, resources and FAQs. The content must not claim to calculate CSE or replace the ULE.
8. Check a mobile-sized window and keyboard navigation: menu, category/filter controls, opportunity detail, save and My Route.

Catalogue values are dated editorial records. Closed and unconfirmed entries are excluded from default discovery, and overdue reviews remove application actions. Some job reviews are due on **14 November 2026** and become unconfirmed the following day if not refreshed; do not treat a missing historical listing as proof of a navigation defect. Reverify sources before submission/judging and update demo choices to the actual current catalogue.

## Offline check

Load production completely while online and navigate the pages you intend to inspect. Allow service-worker installation to finish, then reload while still online if needed so it controls the page. Disable the network and confirm the cached application can be read and local preparation still works. Official external links require internet. Restore the network afterwards. Do not use an empty first visit offline or the Vite development server as the offline test.

## Reproduce locally

Prerequisites: Git, npm and **Node.js 26.x**. Node 24.15.0+ within 24.x also satisfies the engine. From the repository root:

```sh
npm ci
npm run lint
npm run test -- --run
npm run build
npm audit --omit=dev --audit-level=moderate
npx playwright install chromium
```

On Linux, browser OS dependencies may also be needed (`npx playwright install --with-deps chromium`). The lockfile resolves Playwright **1.65.0**; CI uses a matching Chromium container. Do not substitute an unrelated browser image when reproducing CI.

To preserve earlier tracked evidence, use fresh output directories before E2E. PowerShell example:

```powershell
$env:UMBRAL_RESULTS_DIR = 'test-results/submission-review'
$env:UMBRAL_SCREENSHOTS_DIR = 'test-results/submission-screenshots'
npm run test:e2e
```

POSIX shell equivalent:

```sh
UMBRAL_RESULTS_DIR=test-results/submission-review UMBRAL_SCREENSHOTS_DIR=test-results/submission-screenshots npm run test:e2e
```

`test:e2e` builds and launches a fresh local preview at `http://127.0.0.1:5186`; the configured server does not reuse an existing process. Leave that port available. The suite covers navigation, languages, country/catalogue behavior, local state, saving, export, printing, CSE, PWA resilience and automated accessibility checks. Standard projects emulate 360×640, 390×844, 768×1024 and 1440×900, with additional reflow coverage at 320 px.

To run a built preview manually:

```sh
npm run build
npm run preview
```

`UMBRAL_BASE_URL` can point browser tests at an existing deployment and disables the local preview server. It does not build or publish that deployment. Use the selected production test scope deliberately rather than assuming a full local suite is identical to a production subset.

## Recorded results and what they mean

| Check | Recorded result, 11 November 2026 | Evidence |
|---|---|---|
| Unit tests | 49 tests passed | [Quality evidence](evidence/quality-tests.json) |
| Full local browser suite | 484 passes | [Quality evidence](evidence/quality-tests.json) |
| Selected production browser suite | 86 passes, 390 px and 1440 px | [Production tests](evidence/production-tests.json) |
| Main Quality workflow | Completed successfully | [GitHub Actions run 43136483189](https://github.com/Alvaro-mendoza-12/Umbral/actions/runs/43136483189), [CI record](evidence/ci.json) |
| Published application | Commit `5c77941542c1b498c37639a2d03a26dd8fbfee42` | [Deployment record](evidence/production.json) |

These checks were recorded for the application before this documentation preparation. No new app test run is implied by the documentation changes. Local and production counts describe different scopes and must not be summed into a single coverage claim. Mobile coverage is browser emulation, not physical-device testing. Automated accessibility checks do not establish full WCAG conformance. No human interviews, successful applications, time savings or outcome study are claimed.
