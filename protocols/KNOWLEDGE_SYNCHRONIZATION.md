# Knowledge Synchronization Protocol
* **Document ID**: UESF-PROT-005
* **Canonical Path**: protocols/KNOWLEDGE_SYNCHRONIZATION.md
* **Version**: 0.2.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Define the protocol for submitting implementation discoveries (`KDP-XXX`), keeping the canonical repository and connected shared workspace synchronized, and automatically maintaining `CONTEXT_SNAPSHOT.md` and `dist/` bundles across local and cloud environments.

## 2. Scope
Applies to all knowledge updates, implementation discoveries, cross-workspace synchronizations, and automatic snapshot refreshes across UESF and UESF-governed projects.

## 3. Rules and Requirements
1. **Knowledge Discovery Proposal (`KDP-XXX`) Submission**:
   * When an engineering or review agent encounters an undocumented constraint, environment limitation, or specification gap, it MUST NOT silently rewrite normative policies.
   * It MUST submit a structured `KDP-XXX` record (conforming to `templates/KDP_TEMPLATE.md`) in its Handoff or Evidence Package.
2. **CTO Curation & Publication Gate (`DEC-006`)**:
   * The CTO evaluates `KDP-XXX` proposals, logs approved decisions in `management/DECISION_LOG.md`, and authorizes updates to canonical specifications and `management/KNOWLEDGE_MAP.md`.
3. **Automatic `CONTEXT_SNAPSHOT.md` Maintenance (`DEC-023`)**:
   * To ensure `/uesf:status` (`workflows/STATUS_WORKFLOW.md`) never depends on agents remembering to run `/uesf:handoff` or manually editing snapshot files, `CONTEXT_SNAPSHOT.md` (`management/CONTEXT_SNAPSHOT.md` in UESF; `.uesf/CONTEXT_SNAPSHOT.md` in downstream projects) is maintained automatically via three mechanisms:
     1. **Git `pre-commit` Hook (`scripts/hooks/pre-commit`)**: Runs `scripts/sync-snapshot` on every `git commit` and stages the updated `CONTEXT_SNAPSHOT.md` automatically.
     2. **Live On-Read Refresh in `/uesf:status`**: When local `CAP-FS` and `CAP-GIT` are available, `/uesf:status` refreshes `CONTEXT_SNAPSHOT.md` and probes live Git state before presenting status.
     3. **Audit Gate Verification (`management/validation/audit.ps1`)**: Verifies `SNAPSHOT_DRIFT_ISSUES=0` and `DIST_DRIFT_ISSUES=0` by comparing live source SHA-256 hashes against embedded snapshot and `dist/manifest.json` hashes.
4. **Epistemic Separation inside `CONTEXT_SNAPSHOT.md`**:
   * Every generated snapshot MUST separate **Section 1 (`[VERIFIED_BY_GIT_AND_FS_PROBE]`)** from **Section 2 (`[RECORDED_IN_LEDGER]`)** and **Section 3 (`[DRIFT_CHECK]`)** per `policies/VERIFICATION_POLICY.md`.

## 4. Responsibilities
* **All Roles**: Submit `KDP-XXX` proposals when discovering specification vs. implementation discrepancies; never manually edit `CONTEXT_SNAPSHOT.md` or `dist/`.
* **CTO**: Adjudicates `KDP-XXX` proposals and approves canonical updates.
* **DevOps & Documentation Roles**: Maintain `scripts/sync-snapshot.*`, `scripts/build-dist.*`, and workspace mirrors.

## 5. Relevant Workflows
1. **Automatic Commit Sync**: Modify canonical `.md` file -> run `git commit` -> `pre-commit` hook runs `sync-snapshot` and stages `CONTEXT_SNAPSHOT.md` -> push to remote so cloud sessions immediately see updated snapshot.

## 6. Relationships with Other Documents
* **Policies**: `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`, `policies/VERIFICATION_POLICY.md`
* **Protocols & Templates**: `protocols/HANDOFF_PROTOCOL.md`, `templates/KDP_TEMPLATE.md`
* **Registry**: `management/KNOWLEDGE_MAP.md`, `management/DECISION_LOG.md`
