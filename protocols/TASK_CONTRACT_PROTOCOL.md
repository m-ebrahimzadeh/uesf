# Task Contract Protocol
* **Document ID**: UESF-PROT-001
* **Canonical Path**: protocols/TASK_CONTRACT_PROTOCOL.md
* **Version**: 0.2.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

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

## 4. Responsibilities
* **CTO**: Verifies `DISCOVERY_APPROVED` prerequisite for Track 1 work, authors and approves milestone and cross-functional Task Contracts, and maintains `management/ACTIVE_TASKS.md`.
* **Task Owner Role**: Executes work strictly within contract scope or requests a contract amendment before expanding scope.

## 5. Relevant Workflows
1. **Contract Creation & Dispatch**: Verify Track 1 (`DSC-XXX` approved) or Track 2 eligibility -> define fields -> assign Task ID -> log in `management/ACTIVE_TASKS.md` -> dispatch via `protocols/HANDOFF_PROTOCOL.md` if crossing environments.

## 6. Relationships with Other Documents
* **Autonomy & Git**: `policies/AUTONOMY_POLICY.md`, `policies/GIT_POLICY.md`
* **Discovery, Handoff & Acceptance**: `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Task Registry**: `management/ACTIVE_TASKS.md`
