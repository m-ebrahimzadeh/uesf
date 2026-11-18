# Source of Truth Policy
* **Document ID**: UESF-POL-007
* **Canonical Path**: policies/SOURCE_OF_TRUTH_POLICY.md
* **Version**: 0.3.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-18

## 1. Purpose
Prevent competing, fragmented, or contradictory documentation by assigning a single authoritative canonical location to every information category across the hybrid repository-and-workspace architecture and across downstream projects.

## 2. Scope
Applies to all specifications, policies, protocols, role skills, lifecycle workflows, compiled `dist/` bundles, machine-generated context snapshots, project management registries, and downstream project capsules (`.uesf/`).

## 3. Rules and Requirements
1. **Single Authoritative Location (`DEC-004`)**: Every canonical document MUST have exactly one authoritative location registered in `management/KNOWLEDGE_MAP.md` (or `.uesf/KNOWLEDGE_MAP.md` in downstream projects).
2. **Three-Domain Knowledge Partitioning (`DEC-022`)**:
   * **Domain 1 — Universal Framework Specifications**: Canonical in the UESF Git repository (`core/`, `policies/`, `protocols/`, `roles/`, `workflows/`, `adapters/`, `extensions/`, `templates/`). Never duplicated as editable files inside downstream projects.
   * **Domain 2 — Permanent Project Documentation**: Canonical in the downstream project's native documentation directories (e.g., `README.md`, `docs/architecture/`, `docs/specs/`, `docs/product/`, `docs/ROADMAP.md`) and indexed by `.uesf/KNOWLEDGE_MAP.md`.
   * **Domain 3 — Operational Project State**: Canonical in `management/` (for UESF itself) or `.uesf/` (for downstream projects: `EXTENSION.md`, `KNOWLEDGE_MAP.md`, `ACTIVE_TASKS.md`, `DECISION_LOG.md`).
3. **Machine-Generated Derived Artifacts (`dist/` and `CONTEXT_SNAPSHOT.md`, `DEC-021`, `DEC-023`)**:
   * Compiled skill/command bundles in `dist/` and context snapshots (`management/CONTEXT_SNAPSHOT.md` or `.uesf/CONTEXT_SNAPSHOT.md`) are **100% deterministic, script-generated derived mirrors**.
   * Humans and agents MUST NEVER manually edit files in `dist/` or `CONTEXT_SNAPSHOT.md`; all updates must be made to the canonical source files and propagated automatically via `scripts/sync-snapshot.*`, `.git/hooks/pre-commit`, and `scripts/build-dist.*`.
   * Every derived bundle and snapshot MUST carry an explicit mirror header citing its canonical source version and `Source-SHA256` / `Source-Ledger-SHA256` digest.
4. **Conflict Resolution Precedence**:
   * Tier 1: Confirmed Human Stakeholder Constraints recorded in `management/DECISION_LOG.md`.
   * Tier 2: Core Architecture & Normative Policies (`core/`, `policies/`).
   * Tier 3: Interaction Protocols (`protocols/`).
   * Tier 4: Role Skills (`roles/`), Workflows (`workflows/`), Platform Adapters (`adapters/`), and Project Extensions (`extensions/`).
   * Tier 5: Derived Artifacts (`dist/` and `CONTEXT_SNAPSHOT.md` — if a hash mismatch occurs, the canonical source files and live Git state govern).
5. **Ephemeral Local Handoff Spool (`<ctrlDir>/handoffs/`, `DEC-031`)**:
   * The flat directory `management/handoffs/` (in the UESF repository) or `.uesf/handoffs/` (in downstream projects) is a **gitignored, non-authoritative local transport spool** used to exchange Outbound (`HO-TASK-XXX-01.md`) and Inbound (`HO-TASK-XXX-02.md` with embedded `EV-TASK-XXX`) handoff packages across sessions and coding agents without manual copy-paste.
   * Handoff spool files are excluded from `KNOWLEDGE_MAP.md` and `CONTEXT_SNAPSHOT.md` so local in-flight handoffs never cause Git working-tree or snapshot drift.
   * Authoritative task states, acceptance verdicts, and architectural rulings MUST always be distilled into the Git-tracked ledgers (`ACTIVE_TASKS.md` and `DECISION_LOG.md`).

## 4. Responsibilities
* **CTO**: Designates canonical locations and resolves cross-document conflicts.
* **Documentation & DevOps Roles**: Verify that `management/KNOWLEDGE_MAP.md`, `dist/manifest.json`, and `management/CONTEXT_SNAPSHOT.md` remain synchronized (`SNAPSHOT_DRIFT_ISSUES=0`, `DIST_DRIFT_ISSUES=0`).

## 5. Relevant Workflows
1. **Canonical Update & Derived Sync**: Edit canonical `.md` specification -> run `scripts/build-dist.ps1` (which also runs `scripts/sync-snapshot.ps1`) or commit via `.git/hooks/pre-commit` -> verify zero drift via `management/validation/audit.ps1`.

## 6. Relationships with Other Documents
* **Knowledge Governance**: `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`
* **Synchronization Protocol**: `protocols/KNOWLEDGE_SYNCHRONIZATION.md`
* **Master Registry**: `management/KNOWLEDGE_MAP.md`
