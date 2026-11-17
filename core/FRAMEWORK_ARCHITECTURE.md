# Framework Architecture
* **Document ID**: UESF-CORE-003
* **Canonical Path**: core/FRAMEWORK_ARCHITECTURE.md
* **Version**: 0.3.1
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Specify the layered modular architecture, directory structure, template target-layer model, three-domain knowledge partitioning, and distribution pipeline of the Universal Engineering Skills Framework (UESF).

## 2. Scope
Covers all architectural layers and operational directories of UESF: Core Operating Model, Universal Policies, Execution & Communication Protocols, Universal Agent Role Specifications, Platform Adapters, Project-Specific Extensions, Lifecycle Workflows, Reusable Templates, Deterministic Build/Install Scripts, Compiled Distribution Bundles, and Project Management & Validation.

## 3. Rules and Requirements
1. **Six-Layer Decoupled Architecture**:
   * **Layer 1 — Core Foundation (`core/`)**: Universal operating model, architectural topology, and capability taxonomy.
   * **Layer 2 — Universal Policies (`policies/`)**: Normative rules for autonomy, governance, security, Git, verification, knowledge curation, and source-of-truth authority.
   * **Layer 3 — Interaction Protocols (`protocols/`)**: Standardized schemas and state machines for feature discovery, task contracts, handoffs, collaboration, acceptance, knowledge sync, evidence, and escalation.
   * **Layer 4 — Universal Agent Role Skills (`roles/`)**: Platform-independent role definitions for the nine canonical engineering roles (`discovery`, `cto`, `architect`, `developer`, `qa`, `devops`, `security`, `sre`, `documentation`).
   * **Layer 5 — Platform Adapters (`adapters/`)**: Environment-specific bindings (`antigravity-vscode`, `gemini-strategic-workspace`, `generic-cli-mcp`) and compiled multi-agent distribution rules.
   * **Layer 6 — Project-Specific Extensions (`extensions/`)**: Domain- or codebase-specific overlays that inherit Layers 1–5 without modifying canonical universal specifications.
2. **Cross-Cutting Operational Directories**:
   * **Lifecycle Workflows (`workflows/`)**: Canonical specifications for the three cross-cutting operational commands (`/uesf:init` in `workflows/INIT_WORKFLOW.md`, `/uesf:handoff` in `workflows/HANDOFF_WORKFLOW.md`, and `/uesf:status` in `workflows/STATUS_WORKFLOW.md`).
   * **Layer-Targeted Templates (`templates/`)**: Each template declares `* **Target Layer**: Layer N` (`DEC-018`) and may reference canonical specifications in Layers `1..N`, while never referencing files in Layers `> N`.
   * **Deterministic Automation & Distribution (`package.json`, `bin/uesf.mjs`, `scripts/` and `dist/`)**: `package.json` and `bin/uesf.mjs` provide the consolidated zero-dependency Node.js CLI engine for `install`, `check`, `sync-snapshot`, and `build` (`DEC-026`), while `scripts/*.ps1` and `scripts/*.sh` serve as thin pass-through wrappers. `sync-snapshot` generates the machine-maintained `CONTEXT_SNAPSHOT.md`; `build` compiles the 9 Role Skills and 3 Lifecycle Workflows into self-contained multi-agent bundles in `dist/`; and `install` installs them across coding agents (`DEC-021`, `DEC-023`, `DEC-026`).
3. **Three-Domain Knowledge Partitioning (`DEC-022`)**:
   * **Domain 1 — Universal UESF Knowledge**: Lives exclusively in the UESF repository and compiled `dist/` bundles.
   * **Domain 2 — Permanent Project Documentation**: Lives in the target project's native `docs/` directory (architecture, technical specs, PRDs, roadmap) and is indexed in `.uesf/KNOWLEDGE_MAP.md`.
   * **Domain 3 — Operational Project State (`.uesf/`)**: Contains only `EXTENSION.md`, `KNOWLEDGE_MAP.md`, `ACTIVE_TASKS.md`, `DECISION_LOG.md`, and the machine-generated `CONTEXT_SNAPSHOT.md`.
4. **Strict Unidirectional Dependency Rule (`DEC-009`, `DEC-018`)**:
   * Lower-numbered architectural layers MUST NEVER depend on or reference concrete specification files in higher-numbered layers (`Layer 1 -> Layer 2 -> Layer 3 -> Layer 4 -> Layer 5 -> Layer 6`). Universal layers (1–4) MUST contain zero platform-specific or project-specific coupling.

## 4. Responsibilities
* **CTO & Architect**: Maintain architectural layer integrity and review any structural changes under `policies/GOVERNANCE_POLICY.md`.
* **DevOps Role**: Maintains `package.json`, `bin/uesf.mjs`, `scripts/*.ps1`, `scripts/*.sh`, and `management/validation/audit.ps1`.
* **All Roles**: Place artifacts exclusively in their designated architectural directory and respect unidirectional dependencies.

## 5. Relevant Workflows
1. **Specification & Bundle Pipeline**: Author/update canonical `.md` spec -> register in `management/KNOWLEDGE_MAP.md` -> run `node bin/uesf.mjs build` (or `scripts/build-dist.ps1`, which updates `management/CONTEXT_SNAPSHOT.md` and `dist/`) -> verify via `management/validation/audit.ps1`.

## 6. Relationships with Other Documents
* **Operating Model**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/CAPABILITY_MODEL.md`
* **Source of Truth**: `policies/SOURCE_OF_TRUTH_POLICY.md`, `management/KNOWLEDGE_MAP.md`
* **Governance**: `policies/GOVERNANCE_POLICY.md`, `management/DECISION_LOG.md`
