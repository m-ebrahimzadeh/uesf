# Active Tasks Registry
* **Document ID**: UESF-MGMT-002
* **Canonical Path**: management/ACTIVE_TASKS.md
* **Version**: 1.0.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Track all active, pending, and completed UESF tasks with unique identifiers, assigned roles, autonomy levels, states, and verification evidence links.

## 2. Scope
Covers all tasks across UESF development phases (`protocols/TASK_CONTRACT_PROTOCOL.md`).

## 3. Rules and Requirements
1. **Task ID Format**: `TASK-XXX` for primary tasks; `TASK-XXX.Y` for bounded delegated sub-tasks.
2. **State Discipline**: No task may be marked `VERIFIED` or `ACCEPTED` without a linked Evidence Package (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`).

## 4. Current Task Registry
| Task ID | Title | Responsible Role | Reviewer Role | Target Workspace | Autonomy | State | Evidence / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TASK-000` | Mission 001: Project Initialization, Foundational Architecture, Policies, Protocols & Governance | CTO | Human Stakeholder / CTO | Strategic Workspace | `A2` | `ACCEPTED` | `EV-TASK-000-01` (`management/validation/VALIDATION_REPORT_001.md`). |
| `TASK-001` | Materialize UESF v0.1.0 Foundation in Local Git Repository | DevOps / Developer | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-001-01` (`HO-TASK-001-02`, commit `288d6dc` on `main`). Accepted via `DEC-011`. |
| `TASK-002` | Define Universal Role Skill Standard Schema & Reusable Protocol Templates (`templates/`) | Architect | CTO | Strategic & Engineering | `A2` | `ACCEPTED` | `EV-TASK-002-01` (`HO-TASK-002-02`, commit `ff33485` / `8d46a45`). Accepted via `DEC-011`. |
| `TASK-003` | Author Governance, Architecture & Knowledge Role Skills (`CTO`, `Architect`, `Documentation`) | Architect / CTO | CTO | Strategic & Engineering | `A2` | `ACCEPTED` | `EV-TASK-002-01` (`HO-TASK-002-02`, commit `ff33485`). Accepted via `DEC-011`. |
| `TASK-004` | Author Implementation & Quality Role Skills (`Developer`, `QA`) | Architect / QA | CTO | Strategic & Engineering | `A2` | `ACCEPTED` | `EV-TASK-002-01` (`HO-TASK-002-02`, commit `ff33485`). Accepted via `DEC-011`. |
| `TASK-005` | Author Infrastructure, Security & Reliability Role Skills (`DevOps`, `Security`, `SRE`) | Architect / Security | CTO | Strategic & Engineering | `A2` | `ACCEPTED` | `EV-TASK-002-01` (`HO-TASK-002-02`, commit `ff33485`). Accepted via `DEC-011`. |
| `TASK-006` | Cross-Role Interaction Dry-Run & Consistency Audit (`v0.2.0` Release Sign-Off) | CTO / QA | CTO | Strategic & Engineering | `A2` | `ACCEPTED` | `EV-TASK-006-01` (`management/validation/VALIDATION_REPORT_002.md`) & `EV-TASK-002-01`. |
| `TASK-007` | Define Platform Adapter Template (`templates/PLATFORM_ADAPTER_TEMPLATE.md`), Layer 5 Index (`adapters/README.md`) & `.gitattributes` (`KDP-001`) | Architect / DevOps | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-007-01` (`HO-TASK-007-02`, commit `f548df7` / `0fa8bbe`). Accepted via `DEC-014`. |
| `TASK-008` | Author Antigravity / VS Code Engineering Workspace Adapter (`adapters/antigravity-vscode/ADAPTER.md`) | DevOps / Developer | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-007-01` (`HO-TASK-007-02`, commit `f548df7`). Accepted via `DEC-014`. |
| `TASK-009` | Author Gemini Strategic Workspace & Generic CLI/MCP Adapters (`adapters/gemini-strategic-workspace/ADAPTER.md`, `adapters/generic-cli-mcp/ADAPTER.md`) | Architect / DevOps | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-007-01` (`HO-TASK-007-02`, commit `f548df7`). Accepted via `DEC-014`. |
| `TASK-010` | Milestone M3 Layer-Isolation Audit (`VALIDATION_REPORT_003.md`) & `v0.3.0` Registry Synchronization (`KDP-002`) | CTO / QA | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-010-01` (`management/validation/VALIDATION_REPORT_003.md`) & `EV-TASK-007-01`. |
| `TASK-011` | Author Layer 6 Project Extension Template (`templates/PROJECT_EXTENSION_TEMPLATE.md`), Registry (`extensions/README.md`) & Reference Blueprint (`extensions/example-web-service/EXTENSION.md`) | Architect / Developer | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-011-01` (`HO-TASK-011-02`, commit `bc931bf`). Accepted via `DEC-016`. |
| `TASK-012` | Harmonize `CAP-WEB` Capability Tokens (`KDP-003`) & Strict `* **Owner**:` Validation Report Headers (`KDP-004`) | Documentation / DevOps | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-011-01` (`HO-TASK-011-02`, commit `bc931bf`). Accepted via `DEC-016`. |
| `TASK-013` | Execute Full-Stack Layers 1–6 Validation (`VALIDATION_REPORT_004.md`) & Synchronize Registries for `v1.0.0` Release | CTO / QA | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-011-01` & `EV-TASK-014-01` (`management/validation/VALIDATION_REPORT_004.md`). Accepted via `DEC-016`. |
| `TASK-014` | Pre-Merge Audit Harmonization (`KDP-005`–`KDP-007`), Working-Tree LF Normalization & `v1.0.0` Merge/Tag Closure | DevOps / QA | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-014-01` (`HO-TASK-014-02`, `v1.0.0` merged & tagged on `main` per `DEC-016`). |

## 5. Active Outbound Task Contract Queue
* All planned tasks for Milestones M1 (`v0.1.0`), M2 (`v0.2.0`), M3 (`v0.3.0`), and M4 (`v1.0.0`) are **COMPLETED, VERIFIED, AND ACCEPTED**. Future downstream project onboarding tasks will begin at `TASK-015`.

## 6. Relationships with Other Documents
* **Protocols**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Roadmap & Decisions**: `management/IMPLEMENTATION_ROADMAP.md`, `management/DECISION_LOG.md`
