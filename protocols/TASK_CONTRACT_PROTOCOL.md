# Task Contract Protocol
* **Document ID**: UESF-PROT-001
* **Canonical Path**: protocols/TASK_CONTRACT_PROTOCOL.md
* **Version**: 0.3.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-18

## 1. Purpose
Standardize the intake prerequisite, structure, required fields, and lifecycle states of every UESF Task Contract so work is bounded, verifiable, and unambiguous across agent environments.

## 2. Scope
Applies to all engineering, architectural, governance, verification, and documentation tasks executed within UESF.

## 3. Rules and Requirements
1. **Two-Track Intake Prerequisite (`DEC-019`)**:
   * **Track 1 (Discovery-Gated Tasks)**: Any task introducing a new feature, new role/adapter/extension, architectural change, or previously ambiguous requirement MUST first complete iterative alignment and receive explicit human approval (`DISCOVERY_APPROVED`) under `protocols/FEATURE_DISCOVERY_PROTOCOL.md` before a Task Contract is approved or dispatched.
   * **Track 2 (Direct Tasks)**: Routine bug fixes, deterministic `KDP-*` hygiene patches, and bounded maintenance work with already-explicit requirements may be contracted directly by the CTO.
2. **No Uncontracted Execution**: Every non-trivial state-modifying activity MUST be governed by an explicit Task Contract recorded in `management/ACTIVE_TASKS.md`.
3. **Mandatory Task Contract Fields**:
   * `Task ID`: Unique identifier (`TASK-XXX`, e.g., `TASK-001`).
   * `Title`: Concise action-oriented summary.
   * `Originating Discovery Brief`: `DSC-XXX` reference (for Track 1 tasks) or `Direct Track (Track 2)`.
   * `Objective`: Clear outcome statement.
   * `Responsible Role`: Primary accountable UESF role (`Discovery`, `CTO`, `Architect`, `Developer`, `QA`, `DevOps`, `Security`, `SRE`, `Documentation`).
   * `Reviewer Role`: Independent role responsible for verification and acceptance (`protocols/TASK_ACCEPTANCE_PROTOCOL.md`).
   * `Target Environment`: Execution workspace (Strategic Workspace vs. Engineering Workspace) and required capabilities (`CAP-*`).
   * `Autonomy Level`: `A0`, `A1`, `A2`, or `A3` per `policies/AUTONOMY_POLICY.md`.
   * `Git Strategy`: Branch pattern (`<type>/<task-id>-<slug>`) or explicit direct-to-`main` authorization per `policies/GIT_POLICY.md`.
   * `Scope (Inclusions & Exclusions)`: Explicit boundaries of allowed changes and prohibited areas.
   * `Acceptance Criteria`: Testable, objective conditions required for completion.
   * `Verification Requirements`: Specific checks required per `policies/VERIFICATION_POLICY.md`.
   * `Expected Deliverables`: Concrete files, reports, or commits to be produced.
4. **Canonical Task Lifecycle States**:
   * `PROPOSED` -> `APPROVED` -> `IN_PROGRESS` -> `BLOCKED` (optional) -> `IN_REVIEW` -> `VERIFIED` -> `ACCEPTED` (or `CANCELLED`).
5. **Risk-Gated Proportional Execution & Fast-Path Lifecycle (`DEC-030`)**:
   * **Four Mandatory Fast-Path Eligibility Gates**: A task may use the **Fast-Path Track (`Inline Contract`)** only when all four conditions hold:
     1. *Unambiguous Intent*: Requirements are clear without unresolved architectural trade-offs (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`).
     2. *Localized Blast Radius*: Changes are confined to a single module, script, or documentation concern without altering cross-module interfaces or architectural layers.
     3. *Low Risk Surface (Complexity != Risk)*: The change does **not** touch authentication, authorization, secret handling, file/data deletion logic, external network execution, normative UESF specifications (`core/`, `policies/`, `protocols/`), or any `A3` human-gated operation (`policies/AUTONOMY_POLICY.md`, `policies/SECURITY_POLICY.md`). Any high-risk change—even a single-line edit—requires the `Standard-Contract` track and independent review.
     4. *Single-Workspace Execution*: The task is executed and verified within the active workspace without cross-environment delegation.
   * **Fast-Path Inline Contract Format (In-Session)**:
     * `Task ID & Track`: `TASK-XXX` (`Fast-Path` — All 4 Eligibility Gates Verified)
     * `Objective & Scope`: `<Single-sentence objective>` | `Inclusions`: `<files>` | `Exclusions`: `<off-limits>`
     * `Branch & Autonomy`: `<type>/TASK-XXX-<slug>` (`A1` | `A2`)
     * `Verification & Closeout Gate`: `<Exact build/test/audit command(s)>` (`IN_REVIEW` | Pre-Authorized `ACCEPTED` on exit `0`)
   * **Three-Step On-Disk Ledger Lifecycle (`ACTIVE_TASKS.md`)**:
     1. *Pre-Implementation Registration (`IN_PROGRESS`)*: Before editing target code or docs, allocate the next sequential `TASK-XXX` ID from `ACTIVE_TASKS.md`, create/switch to branch `<type>/TASK-XXX-<slug>`, and append the `TASK-XXX` row to `ACTIVE_TASKS.md` on disk with state `IN_PROGRESS` (ensuring crash/interruption recovery via `workflows/STATUS_WORKFLOW.md` and preventing local ID collisions).
     2. *Mid-Task Track Promotion (`IN_PROGRESS` -> `BLOCKED`)*: If any of the four eligibility gates is invalidated during implementation, immediately halt file edits, update the on-disk `ACTIVE_TASKS.md` row to `BLOCKED` under the **same** `TASK-XXX` ID and branch, upgrade the task to a full `Standard-Contract` with an assigned independent `Reviewer Role`, and obtain CTO (`A2`) or Human Stakeholder (`A3`) approval before resuming (`IN_PROGRESS`).
     3. *Post-Verification In-Place Update & Single Commit (`IN_REVIEW` or `ACCEPTED`)*: Once the verification command exits `0` (`Verified`), update the `ACTIVE_TASKS.md` row in place to `IN_REVIEW` (or `ACCEPTED` when conditional closeout is pre-authorized) with note `[Fast-Path] Verified via <cmd> (exit 0)` (never embedding a self-referential commit SHA in the ledger row), and commit with trailer `[TASK-XXX]` so `.git/hooks/pre-commit` refreshes `CONTEXT_SNAPSHOT.md`.

## 4. Responsibilities
* **CTO**: Verifies `DISCOVERY_APPROVED` prerequisite for Track 1 work, authors and approves milestone and cross-functional Task Contracts, and maintains `management/ACTIVE_TASKS.md`.
* **Task Owner Role**: Executes work strictly within contract scope or requests a contract amendment before expanding scope.

## 5. Relevant Workflows
1. **Contract Creation & Dispatch**: Verify Track 1 (`DSC-XXX` approved) or Track 2 eligibility -> define fields -> assign Task ID -> log in `management/ACTIVE_TASKS.md` -> dispatch via `protocols/HANDOFF_PROTOCOL.md` if crossing environments.

## 6. Relationships with Other Documents
* **Autonomy & Git**: `policies/AUTONOMY_POLICY.md`, `policies/GIT_POLICY.md`
* **Discovery, Handoff & Acceptance**: `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Task Registry**: `management/ACTIVE_TASKS.md`
