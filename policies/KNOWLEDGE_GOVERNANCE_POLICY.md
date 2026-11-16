# Knowledge Governance Policy
* **Document ID**: UESF-POL-006
* **Canonical Path**: policies/KNOWLEDGE_GOVERNANCE_POLICY.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Define the lifecycle states, curation authority, versioning scheme, and change control process for all authoritative UESF project knowledge.

## 2. Scope
Applies to all specifications, policies, protocols, project management records, decision logs, and synchronized workspace knowledge across UESF.

## 3. Rules and Requirements
1. **Centralized Curation Authority**:
   * The CTO is the primary curator and sole approver of authoritative project knowledge.
   * Specialized agents (Architect, Developer, QA, DevOps, Security, SRE) MAY propose updates and submit implementation discoveries via `protocols/KNOWLEDGE_SYNCHRONIZATION.md`.
   * The Documentation role maintains approved documents, formatting, and indexes, but MUST NOT independently alter normative rules or architectural decisions.
2. **Knowledge Lifecycle States**:
   * **`Proposed`**: Drafted by an agent or proposed via discovery report; not yet binding.
   * **`Approved`**: Formally approved by the CTO (or Human Stakeholder); normative and binding.
   * **`Verified`**: Approved AND confirmed as accurately materialized and validated in its canonical storage location.
   * **`Historical`**: Accurate record of a past milestone, task handoff, or validation snapshot retained for auditability.
   * **`Deprecated`**: Superseded by a newer specification version; retained temporarily with a pointer to its replacement.
   * **`Rejected`**: Evaluated and explicitly declined; logged in `management/DECISION_LOG.md` to prevent re-litigation.
3. **Semantic Versioning for Specifications (`MAJOR.MINOR.PATCH`)**:
   * `MAJOR`: Breaking architectural or governance changes.
   * `MINOR`: New sections, compatible protocol extensions, or new policies.
   * `PATCH`: Clarifications, typo fixes, and cross-reference updates that do not alter normative rules.
4. **Mandatory Document Header Metadata**: Every canonical document MUST include `Document ID`, `Canonical Path`, `Version`, `Status`, `Owner`, and `Last Updated`.

## 4. Responsibilities
* **CTO**: Reviews knowledge change proposals, assigns lifecycle states, increments semantic versions, and updates `management/KNOWLEDGE_MAP.md`.
* **Documentation Role**: Formats approved updates and verifies metadata headers and cross-references.
* **All Roles**: Reference only `Approved` or `Verified` specifications as normative rules.

## 5. Relevant Workflows
1. **Knowledge Update Lifecycle**: Agent submits discovery/proposal (`Proposed`) -> CTO evaluates impact & consistency -> CTO approves (`Approved`) or declines (`Rejected`) -> Canonical artifact updated & verified (`Verified`) -> Mirror synchronized (`protocols/KNOWLEDGE_SYNCHRONIZATION.md`).

## 6. Relationships with Other Documents
* **Source of Truth**: `policies/SOURCE_OF_TRUTH_POLICY.md`, `management/KNOWLEDGE_MAP.md`
* **Synchronization**: `protocols/KNOWLEDGE_SYNCHRONIZATION.md`
* **Decision Log**: `management/DECISION_LOG.md`
