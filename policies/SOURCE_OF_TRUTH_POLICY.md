# Source of Truth Policy
* **Document ID**: UESF-POL-007
* **Canonical Path**: policies/SOURCE_OF_TRUTH_POLICY.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Prevent competing sources of truth across hybrid environments (Git repository vs. connected Strategic Workspace) by establishing strict single-home ownership and conflict resolution rules.

## 2. Scope
Applies to all documents, code, configurations, task registries, and governance artifacts across the Project Git Repository and the Connected Shared Workspace.

## 3. Rules and Requirements
1. **Single Authoritative Location Rule**: Every information category and document MUST have exactly one designated canonical source of truth registered in `management/KNOWLEDGE_MAP.md`.
2. **Hybrid Backend Partitioning**:
   * **Project Git Repository (`uesf/`) — Canonical Source of Truth For**:
     * Core architecture and operating model (`core/`).
     * Normative policies (`policies/`).
     * Interaction protocols (`protocols/`).
     * Universal agent role Skill specifications (`roles/`).
     * Platform adapters (`adapters/`), templates (`templates/`), and extensions (`extensions/`).
     * Versioned project management records (`management/`).
   * **Connected Shared Workspace (Strategic Workspace / Gemini Notebook `UNIVERSAL ENGINEERING SKILLS`) — Canonical / Active Mirror Role**:
     * Serves as the **Authoritative Staging & Strategic Governance Workspace** prior to repository initialization (Mission 001 bootstrap state).
     * Once the Git repository is initialized in the Engineering Workspace (`TASK-001`), the Git repository becomes the **Canonical Source of Truth** for all versioned `.md` files, while the Connected Shared Workspace serves as a **Synchronized Reference Mirror** for strategic reasoning plus the canonical home for transient strategic research notes and live session deliberation prior to codification.
3. **Mirror Attribution Requirement**: Any copy, mirror, or summary stored outside its canonical location MUST carry a metadata pointer identifying its canonical path and version.
4. **Deterministic Conflict Resolution Hierarchy**:
   * If a conflict arises between a mirror/summary and the canonical document, the **Canonical Source of Truth** prevails.
   * If a conflict arises between two canonical documents:
     1. Confirmed Human Stakeholder constraints (`management/DECISION_LOG.md`) prevail over all specifications.
     2. Core Policies (`policies/`) prevail over Protocols (`protocols/`) and Role Skills (`roles/`).
     3. Protocols (`protocols/`) prevail over Role Skills (`roles/`) and Adapters (`adapters/`).
     4. Any unresolved ambiguity between documents at the same tier MUST be escalated to the CTO for immediate reconciliation.

## 4. Responsibilities
* **CTO**: Designates canonical locations in `management/KNOWLEDGE_MAP.md` and resolves cross-document conflicts.
* **Documentation & DevOps Roles**: Ensure mirrors in the Strategic Workspace and files in the Git Repository remain synchronized via `protocols/KNOWLEDGE_SYNCHRONIZATION.md`.

## 5. Relevant Workflows
1. **Bootstrap-to-Repo Transition**: Author canonical specs in Strategic Workspace (`Approved (Staged)`) -> Handoff via `TASK-001` to Engineering Workspace -> Commit to Git repository -> Verify commit hash -> Transition canonical pointer to Git repository (`Verified`).

## 6. Relationships with Other Documents
* **Knowledge Governance**: `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `management/KNOWLEDGE_MAP.md`
* **Synchronization**: `protocols/KNOWLEDGE_SYNCHRONIZATION.md`
