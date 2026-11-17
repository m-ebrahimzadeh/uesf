# Active Tasks Registry
* **Document ID**: UESF-MGMT-002
* **Canonical Path**: management/ACTIVE_TASKS.md
* **Version**: 0.2.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

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
| `TASK-002` | Define Universal Role Skill Template & Protocol Templates (`templates/`) | Architect / Developer | CTO | Strategic / Engineering Workspace | `A1` | `VERIFIED / ACCEPTED` | `HO-TASK-002-02` / `EV-TASK-002-01`. Merged to `main` (`ff33485dc7a583e523b700be7a45d23e5afb84fd`). |
| `TASK-003` | Author Core Governance & Design Role Skills (CTO, Architect, Documentation) | Architect / CTO / Documentation | CTO | Strategic / Engineering Workspace | `A1` | `VERIFIED / ACCEPTED` | `EV-TASK-002-01` / `management/validation/VALIDATION_REPORT_002.md`. Merged to `main` (`ff33485dc7a583e523b700be7a45d23e5afb84fd`). |
| `TASK-004` | Author Implementation & Quality Role Skills (Developer, QA) | Architect / Developer / QA | CTO | Strategic / Engineering Workspace | `A1` | `VERIFIED / ACCEPTED` | `EV-TASK-002-01` / `management/validation/VALIDATION_REPORT_002.md`. Merged to `main` (`ff33485dc7a583e523b700be7a45d23e5afb84fd`). |
| `TASK-005` | Author Infrastructure, Security & Reliability Role Skills (DevOps, Security, SRE) | Architect / Security / DevOps / SRE | CTO | Strategic / Engineering Workspace | `A1` | `VERIFIED / ACCEPTED` | `EV-TASK-002-01` / `management/validation/VALIDATION_REPORT_002.md`. Merged to `main` (`ff33485dc7a583e523b700be7a45d23e5afb84fd`). |
| `TASK-006` | Cross-Role Interaction Dry-Run & Consistency Audit (`v0.2.0` Release Sign-Off) | CTO / QA | CTO | Strategic / Engineering Workspace | `A1` | `VERIFIED / ACCEPTED` | `EV-TASK-006-01` (`management/validation/VALIDATION_REPORT_002.md`) + `EV-TASK-002-01`. Merged to `main` (`ff33485dc7a583e523b700be7a45d23e5afb84fd`). |
| `TASK-007` | Milestone M3: Platform Adapters (`v0.3.0`) | Architect / DevOps | CTO | Strategic / Engineering Workspace | `A2` | `PROPOSED` | Scheduled for Milestone M3 (`adapters/`). Eligible to begin following M2 (`v0.2.0`) acceptance; not yet started. |

## 5. Active Outbound Task Contracts
* No active outbound Task Contract is currently dispatched.
* **Recently Closed Milestone M2 Contract (`TASK-002`..`TASK-006` / `HO-TASK-002-01`)**: Accepted and merged to `main` at commit `ff33485dc7a583e523b700be7a45d23e5afb84fd` (`HO-TASK-002-02`, `EV-TASK-002-01`, `EV-TASK-006-01` in `management/validation/VALIDATION_REPORT_002.md`).
* **Next Eligible Work (`TASK-007` / Milestone M3 `v0.3.0`)**: Platform Adapters (`adapters/`) is eligible to begin upon CTO Task Contract dispatch; work has not started.

## 6. Relationships with Other Documents
* **Protocols**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Roadmap**: `management/IMPLEMENTATION_ROADMAP.md`
