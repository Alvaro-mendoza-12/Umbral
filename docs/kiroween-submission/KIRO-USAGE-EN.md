# How UMBRAL used Kiro

English submission draft, prepared on 11 November 2026 (Peru). The evidence supports Kiro's initial implementation and planning artifacts; subsequent Codex work is disclosed separately. This is a project account, not a reconstructed chat transcript.

## From a scoped problem to an implementation

UMBRAL began as a preparation guide for people making their first household socioeconomic classification (CSE) request in Chiclayo, Peru. Kiro's original requirements describe a bounded product: explain the process, guide preparation, remember a checklist locally, cite official sources, support Spanish and English, and remain readable offline after an initial online load. They explicitly exclude deciding eligibility, handling real applications, collecting identity documents, and promising a result.

The authentic Kiro evidence is the initial commit [`813c87ab57084010a8cff0e431344ad6193bd786`](https://github.com/Alvaro-mendoza-12/Umbral/commit/813c87ab57084010a8cff0e431344ad6193bd786), its application source and historical reports, and eight files in the root `.kiro` directory. [The attribution record](../../audit/ATTRIBUTION.md) records the owner's confirmation of Kiro implementation/publication and a historical observation of Kiro using Claude Sonnet 4.5 to correct configuration, run Vitest/Playwright, and produce screenshots. A full original session recording or prompt-by-prompt history is not available in this evidence package; Git alone cannot prove each tool interaction.

## Spec-driven development

The three original specs establish a useful review sequence:

| Original file | English account of its role |
| --- | --- |
| [requirements.md](../../.kiro/specs/umbral/requirements.md) | Defines audience, ten functional requirements, accessibility/privacy/quality goals, acceptance criteria, and exclusions. |
| [design.md](../../.kiro/specs/umbral/design.md) | Proposes React/TypeScript/Vite architecture, routing, reusable components, local state, translation, PWA, testing, and deployment structure. It records intended design, not proof that every detail shipped. |
| [tasks.md](../../.kiro/specs/umbral/tasks.md) | Breaks implementation into phases and tasks, including setup, UI, guide, checklist, sources, translation, offline behavior, tests, and delivery. Original unchecked boxes remain unchanged. |

This makes the initial intent inspectable next to the implementation: for example, a local preparation checklist matches the privacy boundary, while the explicit exclusion of classification prevents presenting the app as a government decision system. We do not claim a measured speed improvement or a controlled comparison with unstructured prompting. The documents demonstrate structure; the historical implementation account establishes the attributed Kiro work.

## Steering

Five authentic steering files describe the constraints available to the initial build:

| Original file | English account of its role |
| --- | --- |
| [product.md](../../.kiro/steering/product.md) | Informational purpose, official references, visible uncertainty, plain language, and no sensitive-data collection or eligibility promises. |
| [architecture.md](../../.kiro/steering/architecture.md) | Frontend structure, responsibilities, typed components, local state, translations, and maintainability conventions. |
| [quality.md](../../.kiro/steering/quality.md) | Code quality, testing, accessibility, performance, and acceptance expectations. These are targets, not certifications. |
| [security.md](../../.kiro/steering/security.md) | Privacy and browser security constraints for an informational application without an application backend. |
| [ux.md](../../.kiro/steering/ux.md) | Mobile use, clear navigation, progressive guidance, feedback, readable content, keyboard access, and touch targets. |

The strongest documented strategy is explicit scope and constraints: preparation rather than adjudication, verifiable information rather than invented local details, and local progress rather than a personal-data intake. We cannot establish which individual response consumed which steering file.

## What Kiro and Codex each contributed

Kiro is credited with the original React/TypeScript/Vite CSE MVP, initial Specs and Steering, and its historical QA reports. The original snapshot already includes seven views, guidance, checklist, Spanish/English content, resources, PWA assets, scripts, and tests. Those original reports describe Kiro's own results and are not independent verification of every claim.

Codex subsequently audited the implementation, reproduced mobile E2E failures, corrected software/content/accessibility defects, added regression and axe checks, updated affected dependencies, and prepared deployment and CI. Later Codex changes introduced The Illuminated Threshold visual direction, progressive disclosure, the opportunity catalogue and country-aware content, Mi Ruta improvements, and the CSE entry point. These later contributions are not attributed to Kiro. The current product therefore has a broader scope than the preserved CSE-focused specs.

All eight original `.kiro` files remain byte-identical to the initial commit, with matching SHA-256 values in [provenance-evidence.json](provenance-evidence.json). No tasks were retroactively checked and no session history was fabricated.

## Features not claimed

No evidence supports Kiro Agent Hooks, custom agents, MCP, Crew, Powers, or property-based testing in this project, so this submission claims none. React hooks are application code, not Kiro Agent Hooks. A proposed `hooks/` directory in a design tree is not a hook implementation. The record does not establish CLI/Web use or a comparison among Kiro interfaces. Vitest and Playwright results do not establish property-based testing.

The [official rules](https://kiroween.devpost.com/rules) ask for an account of effective Kiro use; their example features are not a reason to invent missing activity. Judge the documented initial contribution and the disclosed later work on their actual evidence.
