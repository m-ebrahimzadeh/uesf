---
name: uesf-handoff
description: "UESF Session-Exit Handoff Workflow (/uesf-handoff - Package Work & Evidence)"
---

* **Activation Banner Rule**: Begin your first response with: `**[UESF v0.8.0 | Active: uesf-handoff | Autonomy: A0/A1]**`

## UESF Embedded Core & Policy Invariants (`v0.8.0`)
1. **Autonomy Tiers (`policies/AUTONOMY_POLICY.md`)**:
   * `A0` (Advisory & Discovery — Read-Only, zero file writes/edits, zero task contracting).
   * `A1` (Bounded Execution — execute only explicitly contracted steps within file boundaries).
   * `A2` (Autonomous Execution — make routine technical/governance decisions within approved scope).
   * `A3` (Human Approval Required — mandatory pause for destructive git actions, security/secret changes, scope overrides, transitioning out of Feature Discovery, or tagging `v1.0.0`).
2. **Epistemic Discipline (`policies/VERIFICATION_POLICY.md`)**:
   * Distinguish all claims into: `Verified` (reproducible tool/test/git output in current session), `Observed` (seen in state without full lifecycle test), `Reported` (from handoff/remote ledger), `Inferred` (logically deduced), and `Unknown` (inaccessible in current runtime). Never fabricate tool execution or file edits.
3. **Capability Probing & Three-Domain Knowledge Lookup (`core/CAPABILITY_MODEL.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`)**:
   * Probe available capabilities (`CAP-FS`, `CAP-TERM`, `CAP-GIT`, `CAP-WS`, `CAP-WEB`, `CAP-MCP`, `CAP-AGENT`) before acting.
   * If working in a downstream project with `.uesf/`, read operational state from `.uesf/{EXTENSION.md, KNOWLEDGE_MAP.md, ACTIVE_TASKS.md, DECISION_LOG.md, CONTEXT_SNAPSHOT.md}` and permanent project documentation from native `docs/` paths indexed in `.uesf/KNOWLEDGE_MAP.md`. If working in the UESF repository itself, read `management/`.
4. **Risk-Gated Proportional Execution (`protocols/TASK_CONTRACT_PROTOCOL.md`)**:
   * Unambiguous, single-concern, low-risk tasks in a single workspace may use the `Fast-Path` inline contract (registering `IN_PROGRESS` in `ACTIVE_TASKS.md` on disk before code edits, running `Verified` checks, and updating the row to `IN_REVIEW`/`ACCEPTED` before committing with `[TASK-XXX]`). Any task touching auth, secrets, deletion logic, policies, multi-module interfaces, or `A3` gates requires the `Standard-Contract` track (or immediate `IN_PROGRESS -> BLOCKED` Track Promotion if discovered mid-task).

---
## Canonical Specification (`workflows/HANDOFF_WORKFLOW.md`)

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
---
## Embedded Canonical Output Templates

### Template Source: `templates/HANDOFF_PACKAGE_TEMPLATE.md`
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

### Template Source: `templates/EVIDENCE_PACKAGE_TEMPLATE.md`
```markdown
### Evidence Package: EV-TASK-XXX-01
* **Evidence ID**: `EV-TASK-XXX-01`
* **Task ID**: `TASK-XXX`
* **Submitting Role**: <Role>
* **Execution Environment & Verified Capabilities**: <Workspace> (`CAP-*`)
* **Date**: YYYY-MM-DD

#### 1. Epistemic Classification Table
| Epistemic State | Summary of Claims in This State | Supporting Artifact / Reason |
| :--- | :--- | :--- |
| **Verified** | <Claims directly confirmed via reproducible tool/command execution in this session> | <Command output, exit code, commit SHA, file check> |
| **Observed** | <Claims seen in environment state without full lifecycle test> | <Observation details> |
| **Reported** | <Claims inherited from prior handoff or external report> | <Source Handoff / Doc ID> |
| **Inferred** | <Logically deduced claims> | <Reasoning chain> |
| **Unknown / Pending** | <Checks not executable in current environment> | <Missing `CAP-*` and follow-up Task ID> |

#### 2. Acceptance Criteria Mapping Table
| Criterion # | Acceptance Criterion | Epistemic Status | Verification Method | Concrete Evidence / Output |
| :--- | :--- | :--- | :--- | :--- |
| 1 | <Criterion 1> | `Verified` | <Command / Audit> | <Output snippet / Hash> |
| 2 | <Criterion 2> | `Verified` | <Command / Audit> | <Output snippet / Hash> |

#### 3. Limitations & Deferred Verifications
* <Explicitly list any unexecuted checks and the follow-up task responsible>
```

<!-- UESF-BUNDLE-METADATA: bundle=uesf-handoff command=/uesf-handoff source=workflows/HANDOFF_WORKFLOW.md version=0.8.0 sha256=542d4afc67ba5ebb63d14c3c4633d1db7cdd850e57a4d3fc4aa54a98f1630443 short_sha256=542d4afc67ba -->
