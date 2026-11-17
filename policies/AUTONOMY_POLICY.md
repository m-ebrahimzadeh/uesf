# Autonomy Policy
* **Document ID**: UESF-POL-001
* **Canonical Path**: policies/AUTONOMY_POLICY.md
* **Version**: 0.2.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Define the four canonical autonomy levels (`A0`–`A3`), decision-authority boundaries, discovery read-only locks, and transition conditions governing agent execution.

## 2. Scope
Applies to every feature discovery session, task contract, sub-task delegation, and standalone operational session within UESF.

## 3. Rules and Requirements
1. **Four Canonical Autonomy Levels**:
   * **`A0` — Advisory & Discovery**: Analysis, Socratic questioning, assumption challenging, architectural options, code review, and recommendations only. Zero persistent state modifications, zero file creations or edits, zero commits, and zero task contract dispatches.
   * **`A1` — Bounded Execution**: Execute explicitly listed actions within a strictly defined scope and target file set. Any deviation requires pausing and escalating.
   * **`A2` — Autonomous Execution**: Make routine technical and organizational decisions independently within an approved task contract or role charter to achieve specified acceptance criteria.
   * **`A3` — Human Approval Required**: High-impact, destructive, security-sensitive, production-affecting, or irreversible actions require explicit human confirmation prior to execution.
2. **Mandatory Actions Requiring `A3` (Human Approval)**:
   * Transitioning out of a Feature Discovery cycle (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`) into formal specification, file creation/modification, or implementation contracting.
   * Deleting repositories, branches with unmerged work, release tags, or authoritative knowledge bases.
   * Modifying core security controls, secrets, or access permissions.
   * Altering confirmed human-established architectural decisions.
   * Force-pushing or rewriting public Git history.
   * Publishing official major/external releases (such as `v1.0.0`) or deploying to production environments.
3. **Inheritance Cap**: A delegated sub-task (`protocols/AGENT_COLLABORATION.md`) MUST NOT grant an autonomy level higher than the parent task contract's autonomy level.
4. **Automatic Downgrade Trigger**: If an agent encounters an unresolvable ambiguity, failed release-gate check, policy conflict, or unexpected security risk during `A1` or `A2` execution, it MUST immediately halt mutations, downgrade to `A0`/`A3`, and follow `protocols/ESCALATION_PROTOCOL.md`.

## 4. Responsibilities
* **CTO**: Assigns default and task-specific autonomy levels in Task Contracts; exercises `A2` authority for framework architecture and routine governance, while escalating `A3` decisions to human stakeholders.
* **Discovery & Executing Agents**: Verify their assigned autonomy level before taking state-changing actions; enforce the hard `A0` zero-mutation lock throughout discovery until explicit human approval.

## 5. Relevant Workflows
1. **Pre-Action Gate**: Check assigned autonomy level -> evaluate whether discovery is still open (`A0` lock) or whether an `A3` threshold is triggered -> execute only if within approved `A1`/`A2` bounds.

## 6. Relationships with Other Documents
* **Governance & Security**: `policies/GOVERNANCE_POLICY.md`, `policies/SECURITY_POLICY.md`
* **Protocols**: `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/AGENT_COLLABORATION.md`, `protocols/ESCALATION_PROTOCOL.md`
