# Framework Architecture
* **Document ID**: UESF-CORE-003
* **Canonical Path**: core/FRAMEWORK_ARCHITECTURE.md
* **Version**: 0.2.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Specify the layered modular architecture, directory structure, template target-layer model, and dependency rules of the Universal Engineering Skills Framework (UESF).

## 2. Scope
Covers all architectural layers of UESF: Core Operating Model, Universal Policies, Execution & Communication Protocols, Universal Agent Role Specifications, Platform Adapters, Project-Specific Extensions, Reusable Templates, and Project Management & Validation.

## 3. Rules and Requirements
1. **Six-Layer Decoupled Architecture**:
   * **Layer 1 — Core Foundation (`core/`)**: Universal operating model, architectural topology, and capability taxonomy.
   * **Layer 2 — Universal Policies (`policies/`)**: Normative rules for autonomy, governance, security, Git, verification, knowledge curation, and source-of-truth authority.
   * **Layer 3 — Interaction Protocols (`protocols/`)**: Standardized schemas and state machines for feature discovery, task contracts, handoffs, collaboration, acceptance, knowledge sync, evidence, and escalation.
   * **Layer 4 — Universal Agent Role Skills (`roles/`)**: Platform-independent role definitions for the nine canonical engineering roles (`discovery`, `cto`, `architect`, `developer`, `qa`, `devops`, `security`, `sre`, `documentation`).
   * **Layer 5 — Platform Adapters (`adapters/`)**: Environment-specific bindings (e.g., Gemini Strategic Workspace, Antigravity/VS Code Engineering Workspace, CLI/MCP runtimes) that map universal capabilities to concrete tools.
   * **Layer 6 — Project-Specific Extensions (`extensions/`)**: Domain- or codebase-specific overlays that inherit Layers 1–5 without modifying canonical universal specifications.
2. **Strict Unidirectional Dependency Rule (`DEC-009`, `DEC-018`)**:
   * Lower-numbered architectural layers MUST NEVER depend on or reference concrete specification files in higher-numbered layers (`Layer 1 -> Layer 2 -> Layer 3 -> Layer 4 -> Layer 5 -> Layer 6`). Universal layers (1–4) MUST contain zero platform-specific or project-specific coupling.
   * **Template Target-Layer Rule (`DEC-018`)**: `templates/` is a cross-cutting schema directory where each template declares a mandatory metadata field `* **Target Layer**: Layer N`. A template targeting `Layer N` MAY reference canonical specifications in Layers `1..N` (for example, a Layer 5 template may reference `adapters/`, and a Layer 6 template may reference `adapters/` and `extensions/`), but MUST NEVER reference files in Layers `> N`.
3. **Canonical Repository Topology**:
   * `README.md`
   * `core/`
   * `policies/`
   * `protocols/`
   * `management/` (`validation/` beneath `management/`, including versioned audit tooling `management/validation/audit.ps1`)
   * `roles/` (`discovery/`, `cto/`, `architect/`, `developer/`, `qa/`, `devops/`, `security/`, `sre/`, `documentation/`)
   * `adapters/`
   * `templates/`
   * `extensions/`

## 4. Responsibilities
* **CTO & Architect**: Maintain architectural layer integrity and review any structural changes under `policies/GOVERNANCE_POLICY.md`.
* **All Roles**: Place artifacts exclusively in their designated architectural directory and respect unidirectional dependencies.

## 5. Relevant Workflows
1. **Specification Placement**: Identify target layer -> verify zero upward file dependency -> register in `management/KNOWLEDGE_MAP.md`.
2. **Architectural Change Proposal**: Run discovery (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`) -> CTO/Architect review -> record in `management/DECISION_LOG.md`.

## 6. Relationships with Other Documents
* **Operating Model**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`
* **Source of Truth**: `policies/SOURCE_OF_TRUTH_POLICY.md`, `management/KNOWLEDGE_MAP.md`
* **Governance**: `policies/GOVERNANCE_POLICY.md`, `management/DECISION_LOG.md`
