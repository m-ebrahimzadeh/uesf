# Task Acceptance Protocol
* **Document ID**: UESF-PROT-004
* **Canonical Path**: protocols/TASK_ACCEPTANCE_PROTOCOL.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Define the formal review criteria, acceptance authority tiers, and sign-off workflow required to transition a task from `IN_REVIEW` to `ACCEPTED`.

## 2. Scope
Applies to all tasks registered in `management/ACTIVE_TASKS.md`.

## 3. Rules and Requirements
1. **Tiered Acceptance Authority**:
   * **Tier 1 — Routine / Low-Risk Tasks**: May be accepted directly by the designated independent Reviewer Role specified in the Task Contract (e.g., QA accepting a bounded defect fix, Architect accepting a component interface draft) provided all acceptance criteria and verification requirements are satisfied.
   * **Tier 2 — Cross-Functional Milestones & High-Impact Tasks**: MUST be accepted by the CTO following domain reviewer verification. Includes foundational specifications, policy changes, new role Skill definitions, security-critical modules, and release milestones.
   * **Tier 3 — Human-Gated (`A3`) Tasks**: Require CTO technical review followed by explicit Human Stakeholder approval.
2. **Preconditions for Acceptance**:
   * Complete Evidence Package (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`) is attached.
   * Every acceptance criterion in the Task Contract is marked `Verified` (not merely `Reported` or `Inferred`).
   * Separation of duties (`policies/VERIFICATION_POLICY.md`) was respected.
   * Any discovered knowledge updates have been submitted or synchronized (`protocols/KNOWLEDGE_SYNCHRONIZATION.md`).
3. **Rejection & Remediation Loop**: If any acceptance criterion lacks verification evidence or violates policy, the reviewer MUST transition the task back to `IN_PROGRESS` with explicit remediation findings.

## 4. Responsibilities
* **Reviewer Role**: Audits evidence against Task Contract criteria and records Tier 1 acceptance or recommends Tier 2 acceptance to the CTO.
* **CTO**: Executes Tier 2 acceptance, audits Tier 1 compliance, and updates `management/ACTIVE_TASKS.md` and `management/RELEASE_HISTORY.md`.

## 5. Relevant Workflows
1. **Task Sign-Off**: Receive inbound handoff + Evidence Package -> verify criteria & separation of duties -> if passed, transition task to `VERIFIED` and `ACCEPTED` in `management/ACTIVE_TASKS.md`; if failed, return remediation checklist.

## 6. Relationships with Other Documents
* **Policies**: `policies/GOVERNANCE_POLICY.md`, `policies/VERIFICATION_POLICY.md`
* **Protocols**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`
* **Management**: `management/ACTIVE_TASKS.md`
