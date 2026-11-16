# Agent Collaboration Protocol
* **Document ID**: UESF-PROT-003
* **Canonical Path**: protocols/AGENT_COLLABORATION.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Govern bounded direct agent-to-agent delegation and collaboration so specialized roles can cooperate efficiently without requiring CTO mediation for every routine interaction, while preserving strict accountability and scope control.

## 2. Scope
Applies to all multi-agent interactions, sub-task delegations, peer reviews, and technical consultations among the eight UESF roles.

## 3. Rules and Requirements
1. **Bounded Direct Delegation**:
   * An agent holding an active Task Contract (`Parent Task`) MAY delegate a specialized sub-task (`TASK-XXX.Y`) directly to another UESF role without prior CTO mediation ONLY IF:
     a. The sub-task falls strictly within the approved scope and exclusions of the Parent Task Contract.
     b. The delegated autonomy level does not exceed the Parent Task's autonomy level (`policies/AUTONOMY_POLICY.md`).
     c. The delegation does not alter project priorities, architectural baselines, or cross-functional milestones.
2. **Non-Transferable Accountability**:
   * The original Parent Task Owner remains fully accountable for integrating delegated work, verifying its alignment with the Parent Task Contract, and submitting the consolidated deliverable.
3. **Mandatory CTO Mediation Triggers**:
   * Scope expansion beyond the Parent Task Contract.
   * Reprioritization of active tasks in `management/ACTIVE_TASKS.md`.
   * Cross-functional architectural trade-offs or policy exceptions.
   * Unresolved disagreement between collaborating roles (e.g., Developer vs. QA or Architect vs. Security).
4. **Delegation Traceability**: Every delegated sub-task MUST use hierarchical ID notation (`TASK-XXX.1`, `TASK-XXX.2`) and be logged in the Parent Task's handoff and evidence record.

## 4. Responsibilities
* **Parent Task Owner**: Defines sub-task boundaries, tracks sub-task completion, and retains end-to-end accountability.
* **Delegatee Role**: Executes the bounded sub-task and returns evidence to the Parent Task Owner.
* **CTO**: Monitors cross-functional collaboration and arbitrates escalated disputes.

## 5. Relevant Workflows
1. **Bounded Sub-Task Delegation**: Parent Task Owner identifies specialized need (e.g., Developer requests Security review on an auth module within `TASK-005`) -> issues sub-task `TASK-005.1` via `protocols/HANDOFF_PROTOCOL.md` -> Security executes and returns evidence -> Developer incorporates result into `TASK-005` evidence package.

## 6. Relationships with Other Documents
* **Operating Model**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`
* **Governance & Autonomy**: `policies/GOVERNANCE_POLICY.md`, `policies/AUTONOMY_POLICY.md`
* **Protocols**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/ESCALATION_PROTOCOL.md`
