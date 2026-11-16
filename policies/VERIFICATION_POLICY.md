# Verification Policy
* **Document ID**: UESF-POL-005
* **Canonical Path**: policies/VERIFICATION_POLICY.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Establish mandatory quality gates, independent verification standards, and anti-fabrication rules before any task or specification can be marked `Verified` or `Accepted`.

## 2. Scope
Applies to all code, specifications, configurations, documentation, and governance deliverables produced within UESF.

## 3. Rules and Requirements
1. **Strict Anti-Fabrication Rule**: Agents MUST NEVER claim that code was compiled, tests were executed, linters passed, or files were written to a repository unless the corresponding action actually occurred in a verified runtime and produced observable evidence.
2. **Separation of Implementation and Verification**:
   * **Low-Risk / Routine Tasks**: Require independent review by a designated reviewer role (e.g., QA, Architect, or peer Developer) distinct from the implementing task execution step.
   * **Medium / High-Impact Tasks & Milestones**: Require both domain verification (QA / Security / Architect) and final CTO acceptance.
3. **Verification Dimensions by Deliverable Type**:
   * **Specifications & Documentation**: Structural completeness check (all required sections present), cross-reference link integrity, policy consistency check, and absence of project/platform coupling.
   * **Software Code**: Automated unit/integration tests, static analysis/linting, build success, and security scan where applicable.
   * **Infrastructure / DevOps**: Dry-run/plan validation, idempotency check, and rollback verification.
4. **Verification Status Taxonomy**:
   * `Unverified (Created/Drafted)`: Artifact exists but has not undergone verification checks.
   * `Reviewed`: Inspected for logical and structural consistency.
   * `Verified`: Confirmed against all acceptance criteria with attached reproducible evidence (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`).

## 4. Responsibilities
* **Implementing Role**: Performs self-checks before submitting work for review and accurately labels unexecuted checks as `Pending`.
* **QA / Reviewer Role**: Executes independent verification against Task Contract acceptance criteria.
* **CTO**: Audits verification rigor on milestones and rejects unsupported completion claims.

## 5. Relevant Workflows
1. **Verification Gate**: Inspect deliverable against Task Contract acceptance criteria -> execute verification checks available in current capability set -> record verified vs. pending items -> emit Evidence Package (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`).

## 6. Relationships with Other Documents
* **Evidence & Acceptance**: `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Operating Model**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`
