# Knowledge Synchronization Protocol
* **Document ID**: UESF-PROT-005
* **Canonical Path**: protocols/KNOWLEDGE_SYNCHRONIZATION.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Define the structured workflow for submitting implementation discoveries, proposing specification updates, and synchronizing authoritative knowledge between the Project Git Repository and the Connected Shared Workspace.

## 2. Scope
Applies to all knowledge updates, architectural discoveries, specification revisions, and cross-backend synchronization actions across UESF.

## 3. Rules and Requirements
1. **Implementation Discovery Submission**:
   * When an executing agent in the Engineering Workspace discovers an environmental constraint, edge case, or architectural discrepancy, it MUST NOT silently diverge from specifications.
   * It MUST submit a **Knowledge Discovery Proposal (`KDP`)** containing:
     * `Discovery ID`: `KDP-XXX`
     * `Source Task & Role`: Originating task and role.
     * `Epistemic Status`: `Verified` or `Observed` with supporting evidence.
     * `Affected Canonical Document(s)`: Paths in `management/KNOWLEDGE_MAP.md`.
     * `Proposed Change`: Exact section and diff/update recommendation.
2. **CTO Evaluation & Publication**:
   * The CTO evaluates each `KDP` against `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`.
   * Upon approval, the CTO records significant decisions in `management/DECISION_LOG.md`, increments the target specification's semantic version, and authorizes update of the canonical source and workspace mirror.
3. **Bi-Directional Synchronization Hygiene**:
   * **Strategic-to-Engineering Sync**: When specifications are drafted or updated in the Strategic Workspace during governance sessions, a synchronization Task Contract is issued to commit the exact versioned Markdown files to the canonical Git Repository.
   * **Engineering-to-Strategic Sync**: When canonical files are updated via approved Git commits in the Engineering Workspace, the corresponding reference sources in the Connected Shared Workspace (`UNIVERSAL ENGINEERING SKILLS` Notebook) MUST be refreshed (`refresh_source_content` or batch update) to match the committed version.
4. **Drift Detection**: During milestone reviews, the CTO or Documentation role verifies that document versions in `management/KNOWLEDGE_MAP.md` match across the Git Repository and Connected Shared Workspace.

## 4. Responsibilities
* **All Roles**: Submit `KDP` reports whenever implementation realities impact documented specifications.
* **CTO**: Reviews, approves/rejects `KDP` submissions, and governs synchronization tasks.
* **Documentation Role**: Executes approved workspace mirror refreshes and version index updates.

## 5. Relevant Workflows
1. **Discovery-to-Publication Flow**: Agent emits `KDP-XXX` in Handoff -> CTO evaluates -> CTO updates `management/DECISION_LOG.md` & approves revision -> Canonical Git file updated -> Shared Workspace mirror refreshed -> `management/KNOWLEDGE_MAP.md` version incremented.

## 6. Relationships with Other Documents
* **Policies**: `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`
* **Management**: `management/KNOWLEDGE_MAP.md`, `management/DECISION_LOG.md`
