# Feature Discovery Brief Template
* **Document ID**: UESF-TMPL-009
* **Canonical Path**: templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md
* **Version**: 0.5.0
* **Status**: Verified
* **Owner**: Architect
* **Target Layer**: Layer 3
* **Last Updated**: 2026-11-17

## 1. Purpose
Provide the canonical schema for Feature Discovery Briefs (`DSC-XXX`) produced under `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, ensuring clear separation between human requests and agent recommendations before any specification or implementation task is contracted.

## 2. Scope
Applies to all Track 1 feature discovery cycles conducted by the `Discovery` role (`core/UNIVERSAL_AGENT_OPERATING_MODEL.md`).

## 3. Rules and Requirements
1. **Mandatory Sections**: Every Feature Discovery Brief (`DSC-XXX`) MUST include:
   * `1. Discovery Metadata` (`Discovery ID: DSC-XXX`, `Title`, `Lifecycle State`, `Originating Stakeholder Intent`, `Iteration Count`)
   * `2. True Intent & Problem Statement` (Underlying goal vs. initial literal phrasing)
   * `3. Provenance-Tagged Requirements Matrix` (`[EXPLICITLY_REQUESTED]`, `[CLARIFIED_IN_DISCOVERY]`, `[AGENT_RECOMMENDED]`, `[EXPLICIT_NON_GOAL]`)
   * `4. Assumptions Challenged & Alternatives Evaluated` (Options considered, trade-offs, and rationale)
   * `5. Architectural & Decision Conflict Audit` (Cross-check against `core/FRAMEWORK_ARCHITECTURE.md`, `policies/*.md`, and `DEC-*` records)
   * `6. Open Questions & Remaining Ambiguities` (Must be `0` unresolved blockers before approval)
   * `7. Explicit Human Approval Gate` (Confirmation status and readiness for `protocols/TASK_CONTRACT_PROTOCOL.md`)
2. **Pre-Approval Read-Only Rule**: While `Lifecycle State` is `INTAKE` or `ITERATIVE_ALIGNMENT`, the brief exists strictly as an interactive response artifact (`A0`); no repository files may be created or modified until the human stakeholder grants `DISCOVERY_APPROVED`.

## 4. Responsibilities
* **Discovery Role**: Compiles and iteratively refines the `DSC-XXX` brief during brainstorming sessions.
* **CTO / Architect**: Consumes the `DISCOVERY_APPROVED` brief to author specifications and Task Contracts (`TASK-XXX`).

## 5. Relevant Workflows
1. **Brief Refinement & Sign-Off**: Draft `DSC-XXX` in chat (`ITERATIVE_ALIGNMENT`) -> update across feedback rounds -> verify all `[AGENT_RECOMMENDED]` items are explicitly accepted or rejected by the human -> record `DISCOVERY_APPROVED` -> transition to `protocols/TASK_CONTRACT_PROTOCOL.md`.

## 6. Relationships with Other Documents
* **Core & Policies**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/FRAMEWORK_ARCHITECTURE.md`, `policies/AUTONOMY_POLICY.md`, `policies/GOVERNANCE_POLICY.md`
* **Protocols**: `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`
