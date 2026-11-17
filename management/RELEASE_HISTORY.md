# Release History
* **Document ID**: UESF-MGMT-005
* **Canonical Path**: management/RELEASE_HISTORY.md
* **Version**: 0.6.0
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
| `v0.2.0` | **M2: Universal Agent Role Skills & Templates** | 2026-11-16 | **Released & Accepted** (`ff33485` / `8d46a45` on `main`) | 6 reusable protocol/skill templates (`templates/`), 8 initial universal Agent Role Skills (`roles/<role>/SKILL.md`), `VALIDATION_REPORT_002.md`, and `0.2.0` management updates (40 `.md` files). | `EV-TASK-006-01`, `EV-TASK-002-01` (`HO-TASK-002-02`) |
| `v0.3.0` | **M3: Layer 5 Platform Adapters & Repo Hygiene** | 2026-11-17 | **Released & Accepted** (`f548df7` / `0fa8bbe` on `main`) | `.gitattributes` (`KDP-001`), `templates/PLATFORM_ADAPTER_TEMPLATE.md`, `adapters/README.md`, 3 concrete Platform Adapters (`antigravity-vscode`, `gemini-strategic-workspace`, `generic-cli-mcp`), `VALIDATION_REPORT_003.md`, and `0.3.0` management updates (46 `.md` files). | `EV-TASK-010-01`, `EV-TASK-007-01` (`HO-TASK-007-02`) |
| `v0.4.0` | **M4: Layer 6 Project Extensions & Harmonization** | 2026-11-17 | **Released & Accepted** (`bc931bf` / `e9f4e02` on `main`; re-versioned from premature `1.0.0` tag per `DEC-017`) | `templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`, `extensions/example-web-service/EXTENSION.md`, removal of `extensions/.gitkeep` (`GITKEEP_COUNT=0`), `KDP-003`–`KDP-007` harmonization, and `VALIDATION_REPORT_004.md` (50 `.md` files). | `EV-TASK-011-01` (`HO-TASK-011-02`), `EV-TASK-014-01` (`HO-TASK-014-02`) |
| `v0.5.0` | **M5: 9th Role (`Discovery`), Feature Discovery Protocol, Template Target-Layer Rule & Cumulative Audit** | 2026-11-17 | **Released & Accepted** (`e7d8b2b` merged to `main`) | Rollback of `v1.0.0` tag (`DEC-017`), Template Target-Layer architecture (`DEC-018`), `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md`, `roles/discovery/SKILL.md` (`DEC-019`), versioned `management/validation/audit.ps1`, `VALIDATION_REPORT_005.md`, and `0.5.0` registries (54 `.md` files). | `EV-TASK-015-01` (`HO-TASK-015-02`), `EV-TASK-019-01` (`HO-TASK-019-02`) |
| `v0.6.0` | **M6: 12 Compiled Skill/Command Bundles, Lifecycle Workflows (`init`, `handoff`, `status`) & Automatic `CONTEXT_SNAPSHOT.md`** | 2026-11-17 | **Released & Accepted** (`c6d894e` merged to `main`) | `workflows/{INIT,HANDOFF,STATUS}_WORKFLOW.md`, Three-Domain Knowledge Model (`DEC-022`), automatic `CONTEXT_SNAPSHOT.md` generator & `pre-commit` hook (`DEC-023`), `scripts/build-dist.*` compiling 12 bundles (`36` files + `manifest.json`) into `dist/`, `scripts/install.*` multi-agent installer (`DEC-021`), `KDP-008` cross-platform script hardening (`DEC-024`), `VALIDATION_REPORT_006.md`, and upgraded `audit.ps1` (58 canonical `.md` files). | `EV-TASK-020-01` (`HO-TASK-020-02`), `EV-TASK-024-01` (`HO-TASK-024-02`) |

## 4. Responsibilities
* **CTO**: Approves milestone release entries upon verifying Evidence Packages, and enforces the `A3` Human Stakeholder approval gate before any `v1.0.0` tag is created.
* **DevOps Role**: Executes Git merges, tags, and remote synchronization per `policies/GIT_POLICY.md`.

## 5. Relationships with Other Documents
* **Roadmap & Tasks**: `management/IMPLEMENTATION_ROADMAP.md`, `management/ACTIVE_TASKS.md`
* **Validations**: `management/validation/VALIDATION_REPORT_001.md`, `management/validation/VALIDATION_REPORT_002.md`, `management/validation/VALIDATION_REPORT_003.md`, `management/validation/VALIDATION_REPORT_004.md`, `management/validation/VALIDATION_REPORT_005.md`, `management/validation/VALIDATION_REPORT_006.md`
