# Lifecycle Workflow — Session-Exit & Cross-Agent Handoff (`/uesf:handoff`)
* **Document ID**: UESF-WKFL-002
* **Canonical Path**: workflows/HANDOFF_WORKFLOW.md
* **Workflow Trigger**: /uesf:handoff
* **Version**: 0.8.0
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-18

## 1. Purpose & Command Trigger
Define the standardized session-exit workflow for `/uesf:handoff` (`@uesf-handoff`), packaging completed work, verification evidence, remaining tasks, decisions, and next steps into a self-contained Handoff Package (`HO-TASK-XXX`) and Evidence Package (`EV-TASK-XXX`) while refreshing `CONTEXT_SNAPSHOT.md`.

## 2. Scope & Autonomy Profile
* **Scope**: Used at the conclusion of a planning or implementation session whenever transferring work between roles, sessions, or workspaces (`protocols/HANDOFF_PROTOCOL.md`).
* **Autonomy Level**: `A0` (when generating a copy-paste handoff block in chat) or `A1` (when refreshing `CONTEXT_SNAPSHOT.md` and updating task state in `ACTIVE_TASKS.md`).

## 3. Capability Detection & Environment Modes
Per `core/CAPABILITY_MODEL.md`:
* **Engineering Workspace (`CAP-FS`, `CAP-TERM`, `CAP-GIT` Available)**: Inspects live `git status -sb`, `git diff --stat`, `git log -n 3 --stat`, and test/audit outputs; runs `sync-snapshot` to ensure `CONTEXT_SNAPSHOT.md` is current; and emits an **Inbound Handoff & Evidence Package (`HO-TASK-XXX-02` / `EV-TASK-XXX-01`)**.
* **Strategic Workspace (`CAP-FS` Unavailable)**: Synthesizes approved specifications and task contracts (`protocols/TASK_CONTRACT_PROTOCOL.md`) into an **Outbound Handoff Package (`HO-TASK-XXX-01`)** ready for execution in a coding agent.

## 4. Step-by-Step Execution Workflow
1. **Determine Handoff Direction**:
   * **Outbound (`Strategic -> Engineering` or `Lead -> Delegate`)**: Package an approved Task Contract (`TASK-XXX`) with exact file paths, scope boundaries, autonomy level, Git branch strategy, and acceptance criteria (`templates/TASK_CONTRACT_TEMPLATE.md` and `templates/HANDOFF_PACKAGE_TEMPLATE.md`).
   * **Inbound / Session-Exit (`Engineering -> Strategic` or `Session -> Next Session`)**: Package completed deliverables, commit SHAs, verification outputs, epistemic classifications, and any Knowledge Discovery Proposals (`KDP-XXX`) (`templates/HANDOFF_PACKAGE_TEMPLATE.md` and `templates/EVIDENCE_PACKAGE_TEMPLATE.md`).
2. **Refresh Context Snapshot (When `CAP-FS` Available)**:
   * Execute `scripts/sync-snapshot.ps1` (or `.uesf/scripts/sync-snapshot.ps1`) so `CONTEXT_SNAPSHOT.md` reflects the latest ledger state before ending the session.
3. **Emit Structured Handoff & Evidence Block**:
   * Output the complete Markdown handoff package conforming to `protocols/HANDOFF_PROTOCOL.md` and `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`.
4. **Apply Recency Ordering & Context Budgeting**: Keep handoffs focused on task-relevant files and place active blockers, exact verification commands, and the immediate next action at the very end of the handoff block.

## 5. Epistemic & Output Formatting Rules
* Begin the response with: `**[UESF v0.8.0 | Active: /uesf:handoff | Autonomy: A0/A1]**`
* Every Inbound Handoff MUST include the 5-state **Epistemic Classification Table** (`Verified`, `Observed`, `Reported`, `Inferred`, `Unknown / Pending`) and the **1-to-1 Acceptance Criteria Mapping Table** (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`).

## 6. Guardrails & Non-Overlap Boundaries
* **Distinct from `/uesf:status`**: `/uesf:handoff` is a **session-exit producer** that packages deliverables and evidence for transfer or review; `/uesf:status` (`workflows/STATUS_WORKFLOW.md`) is a **session-entry consumer** that reconstructs context when opening a workspace or starting a fresh chat.
* **Zero Fabricated Evidence**: Never mark an acceptance criterion `Verified` without concrete command or inspection output from the current session (`policies/VERIFICATION_POLICY.md`).
* **Anti-Rationalization Guardrails**: Never bury blocking action items or required verification gates in the middle of a long narrative section.

## 7. Relationships with Other Documents
* **Policies**: `policies/AUTONOMY_POLICY.md`, `policies/GIT_POLICY.md`, `policies/VERIFICATION_POLICY.md`
* **Protocols**: `protocols/HANDOFF_PROTOCOL.md`, `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`, `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Templates & Workflows**: `templates/HANDOFF_PACKAGE_TEMPLATE.md`, `templates/EVIDENCE_PACKAGE_TEMPLATE.md`, `workflows/STATUS_WORKFLOW.md`
