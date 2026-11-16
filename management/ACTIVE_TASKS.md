# Active Tasks Registry
* **Document ID**: UESF-MGMT-002
* **Canonical Path**: management/ACTIVE_TASKS.md
* **Version**: 0.1.0
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
| `TASK-001` | Materialize UESF v0.1.0 Foundation in Local Git Repository | DevOps / Developer | CTO | Engineering Workspace (Antigravity / VS Code) | `A1` | `IN_REVIEW` (Upon Local Commit) | Dispatched via `HO-TASK-001-01`. Requires `CAP-FS`, `CAP-TERM`, `CAP-GIT`. |
| `TASK-002` | Define Universal Role Skill Template & Metadata Schema | Architect | CTO | Strategic / Engineering Workspace | `A2` | `PROPOSED` | Scheduled for Milestone M2 (Blocked on `TASK-001` completion). |
| `TASK-003` | Author Core Governance & Design Role Skills (CTO, Architect, Documentation) | Architect / CTO | CTO | Strategic / Engineering Workspace | `A2` | `PROPOSED` | Scheduled for Milestone M2. |
| `TASK-004` | Author Execution & Verification Role Skills (Developer, QA, DevOps, Security, SRE) | Architect / Security / QA | CTO | Strategic / Engineering Workspace | `A2` | `PROPOSED` | Scheduled for Milestone M2. |

## 5. Active Outbound Task Contract (`TASK-001`)
### `TASK-001` — Materialize UESF v0.1.0 Foundation in Local Git Repository
* **Task ID**: `TASK-001`
* **Handoff ID**: `HO-TASK-001-01`
* **Objective**: Initialize the canonical `uesf` Git repository in the Engineering Workspace (Antigravity / VS Code), create the canonical directory hierarchy defined in `core/FRAMEWORK_ARCHITECTURE.md`, write the 25 foundational `.md` documents from the Strategic Workspace (`UNIVERSAL ENGINEERING SKILLS` Notebook / Mission 001 output), verify file integrity, and create the initial baseline commit on `main`.
* **Responsible Role**: `DevOps` (or `Developer` acting in repository bootstrap capacity)
* **Reviewer Role**: `CTO`
* **Target Environment**: Engineering Workspace (Antigravity in VS Code) requiring `CAP-FS`, `CAP-TERM`, `CAP-GIT`.
* **Autonomy Level**: `A1` (Bounded Execution — create exact directory structure and write the 25 approved v0.1.0 files without altering normative policies).
* **Git Strategy**: Initial repository bootstrap commit directly to `main` is explicitly authorized under `policies/GIT_POLICY.md` Section 3.2 (`chore(foundation): initialize UESF v0.1.0 foundational architecture and governance [TASK-001]`). All subsequent tasks MUST use branches by default.
* **Scope**:
  * **Inclusions**: Creating `README.md`, `core/*`, `policies/*`, `protocols/*`, `management/*`, `management/validation/VALIDATION_REPORT_001.md`, and empty `.gitkeep` placeholders in `roles/{cto,architect,developer,qa,devops,security,sre,documentation}/`, `adapters/`, `templates/`, and `extensions/`.
  * **Exclusions**: Do NOT author the 8 role Skills (`roles/*`), platform adapters (`adapters/*`), or project-specific extensions (`extensions/*`).
* **Acceptance Criteria**:
  1. Git repository initialized cleanly with default branch `main`.
  2. All 25 foundational Markdown documents written at their exact canonical paths matching `management/KNOWLEDGE_MAP.md`.
  3. Zero broken relative cross-references or missing metadata headers.
  4. Clean `git status` after initial commit `chore(foundation): initialize UESF v0.1.0 foundational architecture and governance [TASK-001]`.
* **Verification Requirements**: Run directory tree check, file count check (25 `.md` files + directory placeholders), and `git log -n 1 --stat`, returning outputs in `EV-TASK-001-01`.
* **Expected Deliverables**: Inbound handoff `HO-TASK-001-02` containing `EV-TASK-001-01` with commit SHA, `git status`, and directory tree listing.

## 6. Relationships with Other Documents
* **Protocols**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Roadmap**: `management/IMPLEMENTATION_ROADMAP.md`
