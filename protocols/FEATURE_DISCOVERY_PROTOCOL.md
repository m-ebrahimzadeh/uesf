# Feature Discovery & Requirements Alignment Protocol
* **Document ID**: UESF-PROT-008
* **Canonical Path**: protocols/FEATURE_DISCOVERY_PROTOCOL.md
* **Version**: 0.5.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Define the mandatory iterative discovery, assumption-challenging, architectural conflict-auditing, and explicit human-approval workflow that governs how new ideas and feature proposals are refined before any specification, file modification, or implementation Task Contract (`protocols/TASK_CONTRACT_PROTOCOL.md`) is created.

## 2. Scope
Applies to the `Discovery` role (`roles/discovery/SKILL.md`) and any collaborating agent whenever a human stakeholder introduces a new feature concept, architectural modification, role/adapter/extension proposal, or ambiguous requirement.

## 3. Rules and Requirements
1. **Two-Track Intake Classification**:
   * **Track 1 — Discovery Track (Mandatory)**: All new feature ideas, new roles/adapters/extensions, architectural changes, workflow modifications, or open-ended/ambiguous requests MUST pass through this protocol prior to specification or task contracting.
   * **Track 2 — Direct Contracting Track**: Routine bug fixes, deterministic hygiene patches (`KDP-*`), and bounded maintenance tasks with already-explicit acceptance criteria may proceed directly to `protocols/TASK_CONTRACT_PROTOCOL.md` unless the human stakeholder requests discovery.
2. **Hard `A0` Read-Only Lock Until Explicit Human Approval**:
   * Throughout the discovery process, the active agent is strictly locked at Autonomy Level **`A0` (Advisory Only)** per `policies/AUTONOMY_POLICY.md`.
   * The agent MAY read repository and workspace files to audit architectural compatibility, but MUST NOT create, edit, stage, or delete any file, MUST NOT mark discovery complete on its own initiative, and MUST NOT transition to specification authoring or implementation handoffs until the human stakeholder explicitly confirms that the proposal captures what they want and approves moving forward.
3. **Five Mandatory Discovery Duties**:
   * **True Intent Extraction**: Look beyond literal initial phrasing to identify the underlying problem, desired outcome, and operational constraints.
   * **Ambiguity & Gap Elicitation**: Ask focused, high-leverage clarifying questions to expose unstated assumptions, edge cases, and failure modes.
   * **Constructive Challenge & Alternatives**: Challenge fragile or overengineered premises and present concrete alternative approaches with clear trade-offs.
   * **Architectural & Principle Conflict Audit**: Cross-check the proposal against `core/FRAMEWORK_ARCHITECTURE.md`, `policies/*.md`, `management/DECISION_LOG.md`, and `management/KNOWLEDGE_MAP.md` to surface any contradiction with confirmed decisions (`DEC-*`) or existing features.
   * **Strict Provenance Separation**: Every requirement or design point in a discovery summary or `DSC-XXX` brief MUST carry one of four explicit provenance tags:
     * `[EXPLICITLY_REQUESTED]` — Directly stated by the human stakeholder.
     * `[CLARIFIED_IN_DISCOVERY]` — Confirmed by the human stakeholder during iterative Q&A.
     * `[AGENT_RECOMMENDED]` — Independently proposed by the agent (requires explicit human opt-in).
     * `[EXPLICIT_NON_GOAL]` — Agreed to be excluded from scope.
4. **Deterministic Discovery Lifecycle States**:
   * `INTAKE` (`A0`) -> `ITERATIVE_ALIGNMENT` (`A0` multi-turn loop) -> `DISCOVERY_APPROVED` (Explicit Human Confirmation Gate) -> `HANDOFF_TO_SPECIFICATION` (CTO / Architect `A2`/`A1` contracting).
   * Answering a subset of questions or giving partial feedback keeps the state in `ITERATIVE_ALIGNMENT`. Transition to `DISCOVERY_APPROVED` occurs ONLY upon an unambiguous human confirmation (e.g., *"Approved"*, *"That captures what I want, proceed"*).

## 4. Responsibilities
* **Discovery Role**: Leads iterative brainstorming, challenges assumptions, audits architectural conflicts, maintains provenance tags, and respects the hard `A0` read-only gate until explicit human approval.
* **CTO & Architect Roles**: Participate in advisory consultations (`A0`) during discovery when needed, and translate `DISCOVERY_APPROVED` briefs (`DSC-XXX`) into normative specifications and Task Contracts (`TASK-XXX`).
* **Human Stakeholder**: Collaborates in iterative refinement and holds sole authority to grant `DISCOVERY_APPROVED` sign-off.

## 5. Relevant Workflows
1. **Iterative Feature Discovery Loop**: Receive human idea (`INTAKE`) -> inspect existing architecture & decisions (`A0` read-only) -> challenge assumptions, flag conflicts, & ask clarifying questions (`ITERATIVE_ALIGNMENT`) -> synthesize updated Feature Discovery Brief (`DSC-XXX`) with provenance tags -> repeat loop until explicit human approval (`DISCOVERY_APPROVED`) -> hand off to CTO/Architect for `protocols/TASK_CONTRACT_PROTOCOL.md`.

## 6. Relationships with Other Documents
* **Operating Model & Architecture**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/FRAMEWORK_ARCHITECTURE.md`
* **Policies**: `policies/AUTONOMY_POLICY.md`, `policies/GOVERNANCE_POLICY.md`, `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`
* **Protocols**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/AGENT_COLLABORATION.md`, `protocols/HANDOFF_PROTOCOL.md`
* **Management**: `management/DECISION_LOG.md`, `management/ACTIVE_TASKS.md`
