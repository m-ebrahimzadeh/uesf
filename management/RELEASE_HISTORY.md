# Release History
* **Document ID**: UESF-MGMT-005
* **Canonical Path**: management/RELEASE_HISTORY.md
* **Version**: 0.3.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Maintain an immutable chronological record of UESF milestone releases, commit baselines, and verification evidence references.

## 2. Scope
Covers all tagged and milestone releases of UESF (`management/IMPLEMENTATION_ROADMAP.md`).

## 3. Release Ledger
| Version | Milestone | Release Date | Status | Summary of Included Deliverables | Verification Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `v0.1.0` | **M1: Foundational Architecture & Governance** | 2026-11-16 | **Released & Accepted** (`main` @ `288d6dc`) | 25 foundational Markdown documents (`README.md`, 3 `core/`, 7 `policies/`, 7 `protocols/`, 6 `management/`, `VALIDATION_REPORT_001.md`) and reserved layer directories. | `EV-TASK-000-01`, `EV-TASK-001-01` (`HO-TASK-001-02`) |
| `v0.2.0` | **M2: Universal Agent Role Skills & Templates** | 2026-11-16 | **Released & Accepted** (`ff33485` merged to `main`) | 6 reusable protocol/skill templates (`templates/`), 8 universal Agent Role Skills (`roles/<role>/SKILL.md`), `VALIDATION_REPORT_002.md`, and `0.2.0` management updates (40 `.md` files). | `EV-TASK-006-01`, `EV-TASK-002-01` (`HO-TASK-002-02`) |
| `v0.3.0` | **M3: Layer 5 Platform Adapters & Repo Hygiene** | 2026-11-17 | **Staged on `feat/TASK-007-platform-adapters` (In Review)** | `.gitattributes` (`KDP-001`), `templates/PLATFORM_ADAPTER_TEMPLATE.md`, `adapters/README.md`, 3 concrete Platform Adapters (`antigravity-vscode`, `gemini-strategic-workspace`, `generic-cli-mcp`), `VALIDATION_REPORT_003.md`, and `0.3.0` management updates including `DECISION_LOG.md` (`KDP-002`, `OQ-001`/`OQ-002` resolved; 46 `.md` files). | `EV-TASK-010-01` (`VALIDATION_REPORT_003.md`), `EV-TASK-007-01` |

## 4. Responsibilities
* **CTO**: Approves milestone release entries upon verifying Evidence Packages.
* **DevOps Role**: Executes Git merges, tags, and remote synchronization per `policies/GIT_POLICY.md`.

## 5. Relationships with Other Documents
* **Roadmap & Tasks**: `management/IMPLEMENTATION_ROADMAP.md`, `management/ACTIVE_TASKS.md`
* **Validations**: `management/validation/VALIDATION_REPORT_001.md`, `management/validation/VALIDATION_REPORT_002.md`, `management/validation/VALIDATION_REPORT_003.md`
