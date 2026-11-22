# Project-Specific Extension Template
* **Document ID**: UESF-TMPL-008
* **Canonical Path**: templates/PROJECT_EXTENSION_TEMPLATE.md
* **Version**: 0.7.0
* **Status**: Verified
* **Owner**: Architect
* **Target Layer**: Layer 6
* **Last Updated**: 2026-11-22

## 1. Purpose
Provide the standardized structural schema for all Layer 6 Project-Specific Extensions (`extensions/<project-slug>/EXTENSION.md`), enabling downstream software projects to overlay domain architecture, tech-stack conventions, and custom quality gates while preserving 100% immutability of UESF Layers 1–5.

## 2. Scope
Mandatory template for all Layer 6 project extension specifications (`core/FRAMEWORK_ARCHITECTURE.md` and `extensions/README.md`).

## 3. Rules and Requirements
1. **Mandatory Sections**: Every `EXTENSION.md` MUST include:
   * Metadata Header (`Document ID`, `Canonical Path`, `Version`, `Status`, `Owner`, `Last Updated`)
   * `## 1. Purpose & Target Project Profile`
   * `## 2. Scope & Domain Architecture Overlay`
   * `## 3. Role Specialization & Domain Responsibilities`
   * `## 4. Project-Specific Verification, Security & Release Gates`
   * `## 5. Adapter & Tooling Bindings`
   * `## 6. Strict Layer 6 Isolation & Non-Override Guarantees`
   * `## 7. Relationships with Other Documents`
2. **Unidirectional Dependency Invariant (`DEC-009`, `DEC-018`)**: Targeting Layer 6 (`Target Layer: Layer 6`), this template and `extensions/` files MAY depend downward on Layers 1–6 (`core/`, `policies/`, `protocols/`, `roles/`, `adapters/`, `extensions/`), while Layers 1–5 MUST NEVER reference `extensions/`.
3. **Additive-Only Constraint**: Extensions MAY tighten verification gates or add domain checklists, but MUST NOT weaken universal autonomy (`policies/AUTONOMY_POLICY.md`), Git (`policies/GIT_POLICY.md`), security (`policies/SECURITY_POLICY.md`), or verification (`policies/VERIFICATION_POLICY.md`) rules.
4. **Three-Domain Project Capsule (`.uesf/` + `docs/`)**: Every extension MUST specify its Canonical Remote Repository URL and Default Branch (for cloud `/uesf-status` retrieval), keep permanent docs in native paths (e.g., `docs/`) indexed by `.uesf/KNOWLEDGE_MAP.md`, and maintain operational state in `.uesf/` (`EXTENSION.md`, `KNOWLEDGE_MAP.md`, `ACTIVE_TASKS.md`, `DECISION_LOG.md`, `CONTEXT_SNAPSHOT.md`, and gitignored `.uesf/handoffs/` via `.uesf/.gitignore`).
5. **Downstream Delta-Only Conciseness & Convention Preservation**: Unlike full reference blueprints in `extensions/`, downstream `.uesf/EXTENSION.md` files created by `/uesf-init` MUST stay concise and delta-only to minimize `CONTEXT_SNAPSHOT.md` token overhead—capturing repo coordinates, maturity/layout profile, module boundaries, pointers to existing AI/contributor guides (left untouched in place), Git/commit conventions, high-risk paths, and `[VERIFIED]`/`[INFERRED]`/`[UNKNOWN]` verification commands, without restating universal 9-role definitions or linking to internal UESF paths.

## 4. Responsibilities
* **Architect / CTO**: Author and approve project extension overlays prior to downstream project execution.
* **QA / Security**: Verify that project-specific gates tighten rather than relax universal UESF policies.

## 5. Relevant Workflows
1. **Project Extension Onboarding**: Run `/uesf-init` in downstream projects (or copy this template to `extensions/<project-slug>/EXTENSION.md` for reference blueprints) -> define tech stack, domain boundaries, and build/test commands -> map to Layer 5 runtime adapters (`adapters/README.md`) -> register in `.uesf/KNOWLEDGE_MAP.md` (or `extensions/README.md` for UESF blueprints).

## 6. Relationships with Other Documents
* **Architecture & Layer 6 Registry**: `core/FRAMEWORK_ARCHITECTURE.md`, `extensions/README.md`
* **Policies**: `policies/AUTONOMY_POLICY.md`, `policies/GOVERNANCE_POLICY.md`, `policies/SECURITY_POLICY.md`, `policies/VERIFICATION_POLICY.md`
* **Adapters**: `adapters/README.md`
