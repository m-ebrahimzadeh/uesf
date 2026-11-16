# Active Tasks Registry
* **Document ID**: UESF-MGMT-002
* **Canonical Path**: management/ACTIVE_TASKS.md
* **Version**: 0.2.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Track all active, pending, and recently completed UESF tasks with unique identifiers, assigned roles, autonomy levels, states, and verification evidence links.

## 2. Scope
Covers all tasks across UESF development phases (`protocols/TASK_CONTRACT_PROTOCOL.md`).

## 3. Rules and Requirements
1. **Task ID Format**: `TASK-XXX` for primary tasks; `TASK-XXX.Y` for bounded delegated sub-tasks.
2. **State Discipline**: No task may be marked `VERIFIED` or `ACCEPTED` without a linked Evidence Package (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`).

## 4. Current Task Registry
| Task ID | Title | Responsible Role | Reviewer Role | Target Workspace | Autonomy | State | Evidence / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TASK-000` | Mission 001: Project Initialization, Foundational Architecture, Policies, Protocols & Governance | CTO | Human Stakeholder / CTO | Strategic Workspace | `A2` | `VERIFIED (Strategic Workspace)` | `EV-TASK-000-01` (`management/validation/VALIDATION_REPORT_001.md`). All 25 documents created in Strategic Workspace & staged for Git commit. |
| `TASK-001` | Materialize UESF v0.1.0 Foundation in Local Git Repository | DevOps / Developer | CTO | Engineering Workspace (Antigravity / VS Code) | `A1` | `VERIFIED / ACCEPTED` | `HO-TASK-001-02` / `EV-TASK-001-01`. Committed on `main` (`288d6dc62a154cf41b0dff40f9e421f22e48f56e`). |
| `TASK-002` | Define Universal Role Skill Template & Protocol Templates (`templates/`) | Architect / Developer | CTO | Strategic / Engineering Workspace | `A1` | `IN_REVIEW (Committed on feat/TASK-002-universal-role-skills)` | Dispatched via `HO-TASK-002-01`; evidence via `EV-TASK-002-01`. |
| `TASK-003` | Author Core Governance & Design Role Skills (CTO, Architect, Documentation) | Architect / CTO / Documentation | CTO | Strategic / Engineering Workspace | `A1` | `IN_REVIEW (Committed on feat/TASK-002-universal-role-skills)` | Dispatched via `HO-TASK-002-01`; audited in `VALIDATION_REPORT_002.md`. |
| `TASK-004` | Author Implementation & Quality Role Skills (Developer, QA) | Architect / Developer / QA | CTO | Strategic / Engineering Workspace | `A1` | `IN_REVIEW (Committed on feat/TASK-002-universal-role-skills)` | Dispatched via `HO-TASK-002-01`; audited in `VALIDATION_REPORT_002.md`. |
| `TASK-005` | Author Infrastructure, Security & Reliability Role Skills (DevOps, Security, SRE) | Architect / Security / DevOps / SRE | CTO | Strategic / Engineering Workspace | `A1` | `IN_REVIEW (Committed on feat/TASK-002-universal-role-skills)` | Dispatched via `HO-TASK-002-01`; audited in `VALIDATION_REPORT_002.md`. |
| `TASK-006` | Cross-Role Interaction Dry-Run & Consistency Audit (`v0.2.0` Release Sign-Off) | CTO / QA | CTO | Strategic / Engineering Workspace | `A1` | `IN_REVIEW (Committed on feat/TASK-002-universal-role-skills)` | `EV-TASK-006-01` (`management/validation/VALIDATION_REPORT_002.md`) + `EV-TASK-002-01`. |
| `TASK-007` | Milestone M3: Platform Adapters (`v0.3.0`) | Architect / DevOps | CTO | Strategic / Engineering Workspace | `A2` | `PROPOSED` | Scheduled for Milestone M3 (`adapters/`). Blocked on Milestone M2 acceptance. |

## 5. Active Outbound Task Contract (`TASK-002`..`TASK-006`)
### `TASK-002`..`TASK-006` — Milestone M2: Universal Agent Role Skills & Templates (`v0.2.0`)
* **Task IDs**: `TASK-002`, `TASK-003`, `TASK-004`, `TASK-005`, `TASK-006`
* **Handoff ID**: `HO-TASK-002-01`
* **Objective**: Create feature branch `feat/TASK-002-universal-role-skills` from `main`, materialize the 6 reusable Markdown templates in `templates/` and 8 universal Agent Role Skills in `roles/<role>/SKILL.md`, write `management/validation/VALIDATION_REPORT_002.md`, update management registries to `v0.2.0`, verify all 40 canonical documents and cross-references, commit on the feature branch, and return `HO-TASK-002-02` (`EV-TASK-002-01`).
* **Responsible Role**: `Developer` / `DevOps` / `Documentation`
* **Reviewer Role**: `CTO` (Tier 2 Milestone Acceptance)
* **Target Environment**: Engineering Workspace (Antigravity in VS Code) requiring `CAP-FS`, `CAP-TERM`, `CAP-GIT`.
* **Autonomy Level**: `A1` (Bounded Execution)
* **Git Strategy**: Dedicated feature branch `feat/TASK-002-universal-role-skills` per `policies/GIT_POLICY.md`; do NOT merge to `main` prior to CTO Tier 2 acceptance.
* **Scope**:
  * **Inclusions**: Materializing `templates/*.md` (6 files), `roles/*/SKILL.md` (8 files), `management/validation/VALIDATION_REPORT_002.md`, updating `management/` registries (`PROJECT_PROFILE.md`, `ACTIVE_TASKS.md`, `KNOWLEDGE_MAP.md`, `RELEASE_HISTORY.md`, `IMPLEMENTATION_ROADMAP.md`), and removing obsolete `.gitkeep` files in `templates/` and `roles/*/`.
  * **Exclusions**: Do NOT modify `core/`, `policies/`, `protocols/`, `adapters/`, or `extensions/`.
* **Acceptance Criteria**:
  1. `TASK-001` baseline verified on `main` and branch `feat/TASK-002-universal-role-skills` created cleanly.
  2. All 40 canonical `.md` documents exist at exact paths matching `management/KNOWLEDGE_MAP.md`, and `.gitkeep` remains only in `adapters/` and `extensions/`.
  3. Zero broken cross-references or missing metadata headers.
  4. Commit created on `feat/TASK-002-universal-role-skills` with clean `git status`.
* **Verification Requirements**: File count check (40 `.md` + 2 `.gitkeep`), cross-reference audit, `git status`, and `git log -n 2 --stat` returned in `EV-TASK-002-01`.
* **Expected Deliverables**: Inbound handoff `HO-TASK-002-02` containing `EV-TASK-002-01`.

## 6. Relationships with Other Documents
* **Protocols**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Roadmap**: `management/IMPLEMENTATION_ROADMAP.md`
