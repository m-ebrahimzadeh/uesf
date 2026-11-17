# Architectural & Governance Decision Log
* **Document ID**: UESF-MGMT-003
* **Canonical Path**: management/DECISION_LOG.md
* **Version**: 0.6.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Maintain an immutable, auditable ledger of all confirmed stakeholder constraints, CTO architectural and governance decisions, adjudicated Knowledge Discovery Proposals (`KDP-*`), and resolved open questions.

## 2. Scope
Governs all structural, policy, protocol, role, adapter, and project extension decisions across UESF (`policies/GOVERNANCE_POLICY.md`).

## 3. Confirmed & Approved Decisions
| Decision ID | Category | Decision Summary | Status | Authority | Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DEC-001` | Role Topology | Establish exactly 8 initial universal engineering agent roles: `CTO`, `Architect`, `Developer`, `QA`, `DevOps`, `Security`, `SRE`, `Documentation`. Explicit role activation is required. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-002` | Task Acceptance | Use tiered task acceptance: routine low-risk tasks are accepted by the designated independent reviewer role; the CTO governs cross-functional milestones, foundational specs, and high-impact changes. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-003` | Git Governance | Branches are the default for all code/spec changes. Small, isolated, low-risk changes (and initial repo bootstrap) may commit directly to `main` only when explicitly authorized in the Task Contract and verified. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-004` | Hybrid Knowledge Backend | Use a hybrid arrangement combining the Project Git Repository and Connected Shared Workspace, with a strict Single Source of Truth per document registered in `management/KNOWLEDGE_MAP.md`. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-005` | Multi-Agent Collaboration | Permit bounded direct agent-to-agent subtask delegation within an approved Task Contract without mandatory CTO mediation; original task owner retains full accountability. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-006` | Knowledge Ownership | The CTO is the primary curator and sole approver of authoritative project knowledge. Documentation agents maintain approved artifacts but cannot redefine normative decisions. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-007` | Phased Delivery Strategy | Build the platform-independent universal foundation first (M1), followed by the 8 universal Role Skills (M2), platform adapters (M3), and project-specific extensions last (M4). | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-008` | Autonomy Model | Standardize on four autonomy levels: `A0` (Advisory), `A1` (Bounded Execution), `A2` (Autonomous Execution within scope), and `A3` (Human Approval Required). | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-009` | Six-Layer Directory Architecture | Organize the repository into `core/`, `policies/`, `protocols/`, `management/`, `roles/`, `adapters/`, `templates/`, and `extensions/` with strict unidirectional dependencies (`core -> policies -> protocols -> roles -> adapters -> extensions`). | Approved | CTO (`A2`) | 2026-11-16 |
| `DEC-010` | Strategic Workspace Staging & Repo Transition | Persist foundational specifications in the Strategic Workspace as `Approved (Staged)` and dispatch `TASK-001` (`HO-TASK-001-01`) to materialize the Git repository in Antigravity/VS Code. | Approved | CTO (`A2`) | 2026-11-16 |
| `DEC-011` | Milestone M1 (`v0.1.0`) & M2 (`v0.2.0`) Acceptance | Formally accept `TASK-001` (`288d6dc`) and `TASK-002`–`TASK-006` (`ff33485` / `8d46a45`) based on verified Evidence Packages `EV-TASK-001-01` and `EV-TASK-002-01`. | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-012` | Canonical GitHub Remote & Handoff Bridge (`OQ-001` & `OQ-002`) | Designate `https://github.com/m-ebrahimzadeh/uesf` (`c:/Users/user/Project/uesf`) as the canonical Git repository (`OQ-001`) and standardize on explicit Markdown Handoff Packages (`HO-TASK-XXX`) coupled with Layer 5 Platform Adapters (`OQ-002`). | Confirmed | Human Stakeholder / CTO | 2026-11-17 |
| `DEC-013` | Cross-Platform Line-Ending Normalization (`KDP-001`) & Layer 5 Adapter Suite | Adopt `.gitattributes` (`* text=auto eol=lf` for `.md`/`.sh`) per `KDP-001` and establish three canonical Layer 5 Platform Adapters (`antigravity-vscode`, `gemini-strategic-workspace`, `generic-cli-mcp`) governed by `templates/PLATFORM_ADAPTER_TEMPLATE.md`. | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-014` | Milestone M3 (`v0.3.0`) Acceptance & `KDP-003`/`KDP-004` Harmonization | Formally accept `TASK-007`–`TASK-010` (`f548df7` / `0fa8bbe`) based on `EV-TASK-007-01`, harmonize `CAP-WEB` in `adapters/` (`KDP-003`), and add explicit `* **Owner**: CTO` metadata headers to `VALIDATION_REPORT_001.md` and `VALIDATION_REPORT_002.md` (`KDP-004`). | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-015` | Layer 6 Project Extension Isolation & `v1.0.0` Full-Stack Baseline | Establish `templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`, and the vendor-neutral reference blueprint `extensions/example-web-service/EXTENSION.md` to complete all 6 architectural layers for `v1.0.0` without introducing external product lock-in. | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-016` | Milestone M4 Audit Harmonization (`KDP-005`–`KDP-007`) | Resolved `*XXX*` placeholder tokens (`KDP-006`) and normalized working-tree files to `w/lf` (`KDP-007`); initial template link stripping and `v1.0.0` tag superseded by `DEC-017` and `DEC-018`. | Superseded (Partially by `DEC-017`/`DEC-018`) | CTO (`A2`) | 2026-11-17 |
| `DEC-017` | Rollback of Premature `v1.0.0` Tag & Re-Versioning of M4 to `v0.4.0` | Delete tag `v1.0.0` locally and on `origin`, re-version Milestone M4 Layer 6 artifacts from `1.0.0` to `0.4.0`, designate Milestone M5 as `v0.5.0`, and reserve `v1.0.0` strictly for an explicit future `A3` Human Stakeholder release gate (`DSC-001` Q1). | Confirmed | Human Stakeholder (`A3`) | 2026-11-17 |
| `DEC-018` | Template Target-Layer Rule & Versioned Cumulative Audit Script | Define `* **Target Layer**: Layer N` metadata for all `templates/*.md` in `core/FRAMEWORK_ARCHITECTURE.md` (`0.2.0`) so templates targeting Layer `N` may link to canonical specs in Layers `<= N` (restoring `adapters/README.md` and `extensions/README.md` in `UESF-TMPL-007` and `UESF-TMPL-008`), and commit a cumulative verification script at `management/validation/audit.ps1` (`DSC-001` Q2). | Approved | CTO (`A2`) / Human Stakeholder | 2026-11-17 |
| `DEC-019` | Addition of 9th Universal Agent Role (`Discovery`) & Iterative Discovery Protocol | Expand `DEC-001` from 8 to 9 canonical roles by introducing `Discovery` (`roles/discovery/SKILL.md`), `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, and `templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md` with a hard `A0` zero-mutation gate requiring iterative refinement until explicit human confirmation (`DSC-001` Q3 — Option A). | Confirmed | Human Stakeholder (`A3`) | 2026-11-17 |
| `DEC-020` | Milestone M5 (`v0.5.0`) Acceptance & Merge to `main` | Formally accept `TASK-015`–`TASK-018` (`e7d8b2b`) based on verified Evidence Package `EV-TASK-015-01` (`MD_COUNT=54`, `ROLE_COUNT=9`, `V1_TAG_COUNT=0`, 0 audit failures across all 19 checks) and authorize merge of `feat/TASK-015-discovery-role-v0.5.0` into `main`. | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-021` | 12-Command Compiled Skill Distribution & Multi-Agent Installer (`DSC-002`) | Compile the 9 Universal Role Skills (`roles/*/SKILL.md`) and 3 Lifecycle Workflows (`workflows/{INIT,HANDOFF,STATUS}_WORKFLOW.md`) via `scripts/build-dist.ps1` into self-contained `dist/` packages (`skills/`, `commands/`, `gemini-cli/`, `manifest.json`) installed via `scripts/install.ps1` (atomic copy default, `-Check`, `-Link`), without an always-on Micro-Kernel and keeping MCP optional. | Confirmed | Human Stakeholder (`A3`) | 2026-11-17 |
| `DEC-022` | Three-Domain Knowledge Partitioning & Unified `/uesf:status` (`DSC-002`) | Separate Universal UESF Knowledge (`uesf/` & `dist/`), Permanent Project Documentation (native project `docs/` indexed by `.uesf/KNOWLEDGE_MAP.md`), and Operational Project State (`.uesf/{EXTENSION,KNOWLEDGE_MAP,ACTIVE_TASKS,DECISION_LOG,CONTEXT_SNAPSHOT}.md` using standard `TASK-XXX`/`DEC-XXX` IDs), with `/uesf:status` serving as the unified session-entry and context-reconstruction workflow and `/uesf:handoff` serving as the session-exit packaging workflow. | Confirmed | Human Stakeholder (`A3`) | 2026-11-17 |
| `DEC-023` | Automatic Machine-Generated `CONTEXT_SNAPSHOT.md` (`DSC-002` Refinement A) | Maintain `CONTEXT_SNAPSHOT.md` automatically via `scripts/sync-snapshot.*`, `.git/hooks/pre-commit`, and on-read refresh in `/uesf:status` (verified by `SNAPSHOT_DRIFT_ISSUES=0` in `management/validation/audit.ps1`), strictly separating `[VERIFIED_BY_GIT_AND_FS_PROBE]` facts from `[RECORDED_IN_LEDGER]` tables and `[DRIFT_CHECK]` alerts. | Confirmed | Human Stakeholder (`A3`) | 2026-11-17 |
| `DEC-024` | Milestone M6 (`v0.6.0`) Acceptance, `KDP-008` Approval & Merge to `main` | Formally accept `TASK-020`–`TASK-023` (`c6d894e`) based on verified Evidence Package `EV-TASK-020-01` (`MD_COUNT=58`, `WORKFLOW_COUNT=3`, `DIST_BUNDLE_ISSUES=0`, `SNAPSHOT_DRIFT_ISSUES=0`, 5 host agent targets `UP_TO_DATE`), approve `KDP-008` (PowerShell 5.1 ASCII/UTF-8 safety, `.uesf/scripts/` root resolution, and `100755` POSIX script modes), and authorize merge of `feat/TASK-020-skill-distribution-v0.6.0` into `main`. | Approved | CTO (`A2`) | 2026-11-17 |

## 4. Open Questions & Pending Human Decisions (`A3` / Clarification Items)
| Question ID | Topic | Resolution Summary | Status |
| :--- | :--- | :--- | :--- |
| `OQ-001` | Canonical Remote Git Hosting & Path | Resolved via `DEC-012`: Local path `c:/Users/user/Project/uesf` bound to GitHub remote `https://github.com/m-ebrahimzadeh/uesf`. | **Closed (Resolved)** |
| `OQ-002` | Automated vs. Manual Workspace-to-Repo Bridge | Resolved via `DEC-012`: Explicit Markdown Handoff Packages (`HO-TASK-XXX`) with Layer 5 Adapter profiles (`adapters/`). | **Closed (Resolved)** |

## 5. Responsibilities
* **CTO**: Records all architectural and governance rulings and adjudicates `KDP-*` proposals.

## 6. Relationships with Other Documents
* **Governance & Knowledge**: `policies/GOVERNANCE_POLICY.md`, `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `protocols/KNOWLEDGE_SYNCHRONIZATION.md`
* **Management**: `management/PROJECT_PROFILE.md`, `management/ACTIVE_TASKS.md`, `management/IMPLEMENTATION_ROADMAP.md`
