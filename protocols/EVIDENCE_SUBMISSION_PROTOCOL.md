# Evidence Submission Protocol
* **Document ID**: UESF-PROT-006
* **Canonical Path**: protocols/EVIDENCE_SUBMISSION_PROTOCOL.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Specify the structure, epistemic labeling, and artifact requirements for Evidence Packages submitted to prove task completion and verification compliance.

## 2. Scope
Applies to all task completions, review submissions, and validation reports across UESF.

## 3. Rules and Requirements
1. **No Completion Claim Without Evidence**: Every claim that a task criterion is met MUST be paired with concrete, inspectable evidence in an **Evidence Package (`EV-<TASK-ID>`)**.
2. **Mandatory Evidence Package Schema**:
   * `Evidence ID`: `EV-<TASK-ID>-<SEQ>`
   * `Task ID & Submitting Role`
   * `Execution Environment & Capabilities Used`: Actual runtime and `CAP-*` domains exercised.
   * `Epistemic Classification Table`: Explicit breakdown of results into:
     * **Verified**: Confirmed via direct execution/inspection in current runtime.
     * **Observed**: Present in environment state without full lifecycle test.
     * **Reported**: Relayed from external/prior output.
     * **Inferred**: Deduced logically.
     * **Unknown / Pending**: Not executable in current environment (with explanation of limitation).
   * `Acceptance Criteria Mapping`: 1-to-1 table mapping each Task Contract acceptance criterion to its verification status, method, and evidence artifact (e.g., command exit code, test log snippet, file hash, commit SHA, or structural audit checklist).
   * `Limitations & Deferred Verifications`: Explicit declaration of any verification step that could not be run in the current environment and the follow-up task responsible for completing it.

## 4. Responsibilities
* **Implementing Role**: Compiles honest, complete Evidence Packages without exaggerating verification depth.
* **Reviewer / QA / CTO**: Audits the Epistemic Classification Table and rejects packages that conflate `Inferred` or `Created` with `Verified`.

## 5. Relevant Workflows
1. **Evidence Compilation**: Run verification checks -> collect raw outputs/hashes/checklists -> classify epistemic status -> map to acceptance criteria -> embed in inbound handoff (`protocols/HANDOFF_PROTOCOL.md`).

## 6. Relationships with Other Documents
* **Operating Model**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`
* **Verification & Acceptance**: `policies/VERIFICATION_POLICY.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`
