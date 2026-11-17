# Layer 6: Project-Specific Extensions Architecture & Registry
* **Document ID**: UESF-EXT-001
* **Canonical Path**: extensions/README.md
* **Version**: 1.0.0
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose
Define the Layer 6 Project-Specific Extensions architecture and registry (`extensions/`), establishing how UESF is applied to concrete downstream software engineering projects without contaminating universal Layers 1–5.

## 2. Scope
Applies to all project-specific overlays, domain rules, and reference implementations stored under `extensions/` (`core/FRAMEWORK_ARCHITECTURE.md`).

## 3. Rules and Requirements
1. **Strict Layer 6 Isolation (`DEC-007`, `DEC-009`)**:
   * Layers 1–5 (`core/`, `policies/`, `protocols/`, `roles/`, `adapters/`) and `templates/` constitute the reusable, project-agnostic framework core.
   * All target-application domain models, language/framework conventions, repository build commands, and custom compliance rules MUST reside exclusively inside `extensions/<project-slug>/`.
   * No file in `core/`, `policies/`, `protocols/`, `roles/`, `adapters/`, or `templates/` may import or reference any file under `extensions/`.
2. **Additive Governance Inheritance**:
   * Every Layer 6 extension inherits all normative policies (`policies/*.md`) and interaction protocols (`protocols/*.md`).
   * Extensions MAY add stricter domain verification commands (e.g., language-specific compilers, SAST scanners, SLO thresholds) under `policies/VERIFICATION_POLICY.md`, but MUST NEVER bypass Separation of Duties or `A3` Human Approval triggers.
3. **Canonical Extension Registry (`v1.0.0`)**:
   | Extension ID | Canonical Path | Target Project / Purpose | Status |
   | :--- | :--- | :--- | :--- |
   | `UESF-EXT-002` | `extensions/example-web-service/EXTENSION.md` | Canonical reference blueprint demonstrating a clean Layer 6 overlay for a modular web service project | Verified |

## 4. Responsibilities
* **CTO**: Approves onboarding of new project extensions and governs cross-project isolation.
* **Architect**: Designs project extension specifications conforming to `templates/PROJECT_EXTENSION_TEMPLATE.md`.
* **QA & Security**: Audit extensions to confirm zero policy dilution and zero upward dependency leaks.

## 5. Relevant Workflows
1. **Downstream Project Initialization**: Activate UESF core (`README.md`) -> select runtime adapter (`adapters/README.md`) -> load target project overlay (`extensions/<project-slug>/EXTENSION.md`) -> execute tasks via `protocols/TASK_CONTRACT_PROTOCOL.md`.

## 6. Relationships with Other Documents
* **Core & Architecture**: `README.md`, `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/FRAMEWORK_ARCHITECTURE.md`
* **Templates & Adapters**: `templates/PROJECT_EXTENSION_TEMPLATE.md`, `adapters/README.md`
* **Registered Extensions**: `extensions/example-web-service/EXTENSION.md`
