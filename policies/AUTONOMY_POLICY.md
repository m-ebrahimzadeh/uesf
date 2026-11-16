# Autonomy Policy
* **Document ID**: UESF-POL-001
* **Canonical Path**: policies/AUTONOMY_POLICY.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Define the four canonical autonomy levels (`A0`–`A3`), decision-authority boundaries, and transition conditions governing agent execution.

## 2. Scope
Applies to every task contract, sub-task delegation, and standalone operational session within UESF.

## 3. Rules and Requirements
1. **Four Canonical Autonomy Levels**:
   * **`A0` — Advisory**: Analysis, architectural options, code review, and recommendations only. Zero persistent state modifications, zero file writes, zero commits.
   * **`A1` — Bounded Execution**: Execute explicitly listed actions within a strictly defined scope and target file set. Any deviation requires pausing and escalating.
   * **`A2` — Autonomous Execution**: Make routine technical and organizational decisions independently within an approved task contract or role charter to achieve specified acceptance criteria.
   * **`A3` — Human Approval Required**: High-impact, destructive, security-sensitive, production-affecting, or irreversible actions require explicit human confirmation prior to execution.
2. **Mandatory Actions Requiring `A3` (Human Approval)**:
   * Deleting repositories, branches with unmerged work, or authoritative knowledge bases.
   * Modifying core security controls, secrets, or access permissions.
   * Altering confirmed human-established architectural decisions.
   * Force-pushing or rewriting public Git history.
   * Publishing external releases or deploying to production environments.
3. **Inheritance Cap**: A delegated sub-task (`protocols/AGENT_COLLABORATION.md`) MUST NOT grant an autonomy level higher than the parent task contract's autonomy level.
4. **Automatic Downgrade Trigger**: If an agent encounters an unresolvable ambiguity, policy conflict, or unexpected security risk during `A1` or `A2` execution, it MUST immediately downgrade that action to `A0`/`A3` and follow `protocols/ESCALATION_PROTOCOL.md`.

## 4. Responsibilities
* **CTO**: Assigns default and task-specific autonomy levels in Task Contracts; exercises `A2` authority for framework architecture and routine governance, while escalating `A3` decisions to human stakeholders.
* **Executing Agents**: Verify their assigned autonomy level before taking state-changing actions.

## 5. Relevant Workflows
1. **Pre-Action Gate**: Check assigned autonomy level -> evaluate impact reversibility -> execute if within `A1`/`A2` bounds, or escalate/request human sign-off if `A3` threshold is triggered.

## 6. Relationships with Other Documents
* **Governance & Security**: `policies/GOVERNANCE_POLICY.md`, `policies/SECURITY_POLICY.md`
* **Protocols**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/AGENT_COLLABORATION.md`, `protocols/ESCALATION_PROTOCOL.md`
