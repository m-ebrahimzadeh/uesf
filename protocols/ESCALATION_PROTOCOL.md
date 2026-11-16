# Escalation Protocol
* **Document ID**: UESF-PROT-007
* **Canonical Path**: protocols/ESCALATION_PROTOCOL.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Provide a deterministic pathway for pausing execution, reporting blockers, resolving inter-agent conflicts, and escalating high-impact or ambiguous decisions to the CTO or Human Stakeholder.

## 2. Scope
Applies to all UESF roles whenever an authority boundary, capability deficit, security risk, or architectural contradiction is encountered.

## 3. Rules and Requirements
1. **Mandatory Escalation Triggers**:
   * **Capability Blocker**: Required tool or access (`CAP-*`) is unavailable and no approved handoff path exists in the current contract.
   * **Autonomy Threshold (`A3`)**: Action requires human approval under `policies/AUTONOMY_POLICY.md`.
   * **Architectural or Policy Ambiguity**: Two canonical specifications conflict or a critical design choice is underspecified.
   * **Role Deadlock**: Collaborating agents (`protocols/AGENT_COLLABORATION.md`) cannot reach consensus within two review iterations.
   * **Security Anomaly**: Potential secret exposure, prompt injection, or unauthorized permission scope (`policies/SECURITY_POLICY.md`).
2. **Severity Levels**:
   * `SEV-1 (Critical / Security / Destructive Risk)`: Immediate halt of affected task; escalate to CTO and Human Stakeholder.
   * `SEV-2 (Architectural / Cross-Functional Blocker)`: Pause affected task boundary; escalate to CTO.
   * `SEV-3 (Local Scope / Capability Limitation)`: Complete all non-blocked work; document limitation and emit structured handoff/escalation to CTO or Parent Task Owner.
3. **Structured Escalation Record**:
   * `Escalation ID`: `ESC-<TASK-ID>-<SEQ>`
   * `Trigger Category & Severity` (`SEV-1`..`SEV-3`)
   * `Current State & Safe Halt Confirmation`
   * `Options Analysis`: 2–3 concrete options with trade-offs and CTO/Agent recommendation.
   * `Decision Required From`: CTO or Human Stakeholder.

## 4. Responsibilities
* **Escalating Agent**: Safely halts state-changing actions on the blocked path, preserves completed work, and submits a structured Escalation Record.
* **CTO**: Resolves `SEV-2`/`SEV-3` escalations within `A2` authority, logs architectural rulings in `management/DECISION_LOG.md`, and elevates `SEV-1`/`A3` items to the Human Stakeholder.

## 5. Relevant Workflows
1. **Detect & Escalate**: Encounter trigger -> halt unsafe/ambiguous action -> classify severity -> formulate Options Analysis -> emit `ESC-<TASK-ID>-<SEQ>` -> await ruling before resuming blocked path.

## 6. Relationships with Other Documents
* **Autonomy, Governance & Security**: `policies/AUTONOMY_POLICY.md`, `policies/GOVERNANCE_POLICY.md`, `policies/SECURITY_POLICY.md`
* **Collaboration & Handoffs**: `protocols/AGENT_COLLABORATION.md`, `protocols/HANDOFF_PROTOCOL.md`
