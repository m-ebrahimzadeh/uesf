# Handoff Package Template
* **Document ID**: UESF-TMPL-003
* **Canonical Path**: templates/HANDOFF_PACKAGE_TEMPLATE.md
* **Version**: 0.2.1
* **Status**: Verified
* **Owner**: CTO
* **Target Layer**: Layer 3
* **Last Updated**: 2026-11-17

## 1. Purpose
Provide the standardized Outbound and Inbound Handoff Package templates (`HO-<TASK-ID>-<SEQ>`) for cross-environment and cross-role transfers per `protocols/HANDOFF_PROTOCOL.md`.

## 2. Outbound Handoff Template (Dispatching Work)
```markdown
# UESF OUTBOUND HANDOFF PACKAGE — HO-TASK-XXX-01
* **Handoff ID**: `HO-TASK-XXX-01`
* **Task ID**: `TASK-XXX`
* **Source Role & Environment**: <Role> — <Workspace>
* **Target Role & Environment**: <Role> — <Workspace>
* **Autonomy Level**: `A0` | `A1` | `A2` | `A3`
* **Capability Prerequisites**: `CAP-*`
* **Embedded Task Contract**: <Insert full Task Contract block from `templates/TASK_CONTRACT_TEMPLATE.md`>
* **Authoritative Context & Payloads**: <Canonical paths + versions, or full inline file contents>
* **Return Instructions**: Return Inbound Handoff `HO-TASK-XXX-02` with attached Evidence Package `EV-TASK-XXX-01`.
```

## 3. Inbound Handoff Template (Returning Results)
```markdown
# UESF INBOUND HANDOFF PACKAGE — HO-TASK-XXX-02
* **Handoff ID**: `HO-TASK-XXX-02`
* **Task ID**: `TASK-XXX`
* **Source Role & Environment**: <Implementing Role> — <Workspace>
* **Target Role & Environment**: <Reviewer Role / CTO> — <Workspace>
* **Execution Status**: `COMPLETED_FOR_REVIEW` | `PARTIAL` | `BLOCKED` | `FAILED`
* **Deliverables Summary**:
  * **Branch / Commit SHA**: `<branch>` @ `<commit-sha>`
  * **Files Created / Modified**: `<list of canonical paths>`
* **Attached Evidence Package**: <Insert full `EV-TASK-XXX-01` block from `templates/EVIDENCE_PACKAGE_TEMPLATE.md`>
* **Knowledge Discoveries / Escalations**: `None` (or attach `KDP-XXX` / `ESC-TASK-XXX-XX`)
```

## 4. Relationships with Other Documents
* **Governing Protocol**: `protocols/HANDOFF_PROTOCOL.md`, `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`
