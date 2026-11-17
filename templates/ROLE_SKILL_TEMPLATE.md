# Role Skill Template
* **Document ID**: UESF-TMPL-001
* **Canonical Path**: templates/ROLE_SKILL_TEMPLATE.md
* **Version**: 0.2.1
* **Status**: Verified
* **Owner**: CTO
* **Target Layer**: Layer 4
* **Last Updated**: 2026-11-17

## 1. Purpose
Provide the canonical Markdown structure and metadata schema for all Layer 4 Universal Agent Role Skills (`roles/<role>/SKILL.md`).

## 2. Scope
Applies to all universal engineering agent role definitions in `roles/`. Universal Role Skills MUST remain 100% platform-independent and project-independent (`core/FRAMEWORK_ARCHITECTURE.md`).

## 3. Mandatory Role Skill Schema
Every `roles/<role>/SKILL.md` file MUST contain the following sections in order:
1. **Metadata Header**: `Document ID` (`UESF-ROLE-XXX`), `Canonical Path`, `Role Name`, `Version`, `Status`, `Owner`, `Last Updated`.
2. **Section 1 — Purpose & Role Charter**: Concise mission of the role within the engineering organization.
3. **Section 2 — Scope & Activation Triggers**: Explicit conditions under which an agent activates this role, and explicit out-of-scope boundaries.
4. **Section 3 — Capability & Autonomy Profile**:
   * Required and optional `CAP-*` domains (`core/CAPABILITY_MODEL.md`).
   * Default autonomy ceiling (`A0`–`A3`) by activity type (`policies/AUTONOMY_POLICY.md`).
5. **Section 4 — Core Responsibilities & Decision Authority**:
   * Domain-specific duties and Level 1 / Level 2 / Level 3 decision boundaries (`policies/GOVERNANCE_POLICY.md`).
   * Tier 1 / Tier 2 / Tier 3 verification and task acceptance authority (`protocols/TASK_ACCEPTANCE_PROTOCOL.md`).
6. **Section 5 — Collaboration, Delegation & Escalation Rules**:
   * Permitted outbound and inbound subtask delegations (`TASK-XXX.Y`) (`protocols/AGENT_COLLABORATION.md`).
   * Mandatory escalation triggers (`SEV-1`..`SEV-3`) (`protocols/ESCALATION_PROTOCOL.md`).
7. **Section 6 — Standard Workflows & Required Artifacts**: Step-by-step execution loops and required outputs (`Task Contracts`, `Handoffs`, `Evidence Packages`, `KDPs`).
8. **Section 7 — Prohibited Actions (Hard Guardrails)**: Explicit actions this role MUST NEVER perform.
9. **Section 8 — Relationships with Other Documents**: Canonical links to Layer 1 (`core/`), Layer 2 (`policies/`), and Layer 3 (`protocols/`).

## 4. Responsibilities
* **Architect & CTO**: Author and review Role Skill specifications against this template.
* **Documentation Role**: Verifies structural conformance and cross-reference integrity.

## 5. Relevant Workflows
1. **Role Skill Authoring**: Copy schema -> populate role-specific rules -> verify zero overlap with peer roles -> verify zero upward dependency on Layer 5/6 -> submit for CTO Tier 2 acceptance.

## 6. Relationships with Other Documents
* **Operating Model & Architecture**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`
* **Policies**: `policies/AUTONOMY_POLICY.md`, `policies/GOVERNANCE_POLICY.md`, `policies/VERIFICATION_POLICY.md`
