# Task Contract Template
* **Document ID**: UESF-TMPL-002
* **Canonical Path**: templates/TASK_CONTRACT_TEMPLATE.md
* **Version**: 0.2.1
* **Status**: Verified
* **Owner**: CTO
* **Target Layer**: Layer 3
* **Last Updated**: 2026-11-17

## 1. Purpose
Provide the standardized copy-paste Markdown template for creating primary Task Contracts (`TASK-XXX`) and bounded delegated subtasks (`TASK-XXX.Y`) per `protocols/TASK_CONTRACT_PROTOCOL.md`.

## 2. Canonical Template Block
```markdown
### Task Contract: TASK-XXX — <Concise Action-Oriented Title>
* **Task ID**: `TASK-XXX` (or `TASK-XXX.Y` for delegated subtask)
* **Parent Task ID**: `N/A` (or `TASK-XXX` if subtask)
* **Title**: <Title>
* **State**: `PROPOSED` | `APPROVED` | `IN_PROGRESS` | `BLOCKED` | `IN_REVIEW` | `VERIFIED` | `ACCEPTED` | `CANCELLED`
* **Objective**: <Single-paragraph measurable outcome statement>
* **Responsible Role**: `CTO` | `Architect` | `Developer` | `QA` | `DevOps` | `Security` | `SRE` | `Documentation`
* **Reviewer Role**: <Independent role distinct from Responsible Role> (`Tier 1` | `Tier 2` | `Tier 3`)
* **Target Environment & Capabilities**: <Strategic Workspace | Engineering Workspace> — Required: `CAP-*`
* **Autonomy Level**: `A0` | `A1` | `A2` | `A3` (Must not exceed Parent Task autonomy if subtask)
* **Git Strategy**: Branch `<type>/TASK-XXX-<short-slug>` (or explicit direct-to-`main` exception justification)
* **Scope**:
  * **Inclusions**:
    * <Explicit target files, directories, or components>
  * **Exclusions**:
    * <Explicitly off-limits files, layers, or actions>
* **Acceptance Criteria**:
  1. <Testable Criterion 1>
  2. <Testable Criterion 2>
* **Verification Requirements**: <Exact commands, tests, linters, or structural audits required per `policies/VERIFICATION_POLICY.md`>
* **Expected Deliverables**: <Files, commit SHAs, Handoff ID `HO-TASK-XXX-XX`, Evidence ID `EV-TASK-XXX-XX`>
```

## 3. Relationships with Other Documents
* **Governing Protocol**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/AGENT_COLLABORATION.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Registry**: `management/ACTIVE_TASKS.md`
