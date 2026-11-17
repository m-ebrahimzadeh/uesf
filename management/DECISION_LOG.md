# Architectural & Governance Decision Log
* **Document ID**: UESF-MGMT-003
* **Canonical Path**: management/DECISION_LOG.md
* **Version**: 1.0.0
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
| `DEC-014` | Milestone M3 (`v0.3.0`) Acceptance & `KDP-003`/`KDP-004` Harmonization | Formally accept `TASK-007`–`TASK-010` (`f548df7`) based on `EV-TASK-007-01`, authorize merge of `feat/TASK-007-platform-adapters` into `main`, harmonize `CAP-WEB` in `adapters/` (`KDP-003`), and add explicit `* **Owner**: CTO` metadata headers to `VALIDATION_REPORT_001.md` and `VALIDATION_REPORT_002.md` (`KDP-004`). | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-015` | Layer 6 Project Extension Isolation & `v1.0.0` Full-Stack Baseline | Establish `templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`, and the vendor-neutral reference blueprint `extensions/example-web-service/EXTENSION.md` to complete all 6 architectural layers for `v1.0.0` without introducing external product lock-in. | Approved | CTO (`A2`) | 2026-11-17 |

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
