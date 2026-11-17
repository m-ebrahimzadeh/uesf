# Project-Specific Extension Template
* **Document ID**: UESF-TMPL-008
* **Canonical Path**: templates/PROJECT_EXTENSION_TEMPLATE.md
* **Version**: 1.0.0
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose
Provide the standardized structural schema for all Layer 6 Project-Specific Extensions (`extensions/<project-slug>/EXTENSION.md`), enabling downstream software projects to overlay domain architecture, tech-stack conventions, and custom quality gates while preserving 100% immutability of UESF Layers 1–5.

## 2. Scope
Mandatory template for all Layer 6 project extension specifications defined under the six-layer architecture (`core/FRAMEWORK_ARCHITECTURE.md`).

## 3. Rules and Requirements
1. **Mandatory Sections**: Every `EXTENSION.md` specification MUST include:
   * Metadata Header (`Document ID`, `Canonical Path`, `Version`, `Status`, `Owner`, `Last Updated`)
   * `## 1. Purpose & Target Project Profile`
   * `## 2. Scope & Domain Architecture Overlay`
   * `## 3. Role Specialization & Domain Responsibilities`
   * `## 4. Project-Specific Verification, Security & Release Gates`
   * `## 5. Adapter & Tooling Bindings`
   * `## 6. Strict Layer 6 Isolation & Non-Override Guarantees`
   * `## 7. Relationships with Other Documents`
2. **Unidirectional Dependency Invariant (`DEC-009`)**: Layer 6 extensions MAY depend on Layers 1–5 (`core/`, `policies/`, `protocols/`, `roles/`, `adapters/`) and `templates/`, but Layers 1–5 and `templates/` MUST NEVER reference or depend on any concrete specification file inside higher layers.
3. **Additive-Only Constraint**: A project extension MAY tighten verification gates or add domain-specific checklists, but MUST NOT weaken universal autonomy thresholds (`policies/AUTONOMY_POLICY.md`), Git protections (`policies/GIT_POLICY.md`), security rules (`policies/SECURITY_POLICY.md`), or epistemic verification requirements (`policies/VERIFICATION_POLICY.md`).

## 4. Responsibilities
* **Architect / CTO**: Author and approve project extension overlays prior to downstream project execution.
* **QA / Security**: Verify that project-specific gates tighten rather than relax universal UESF policies.

## 5. Relevant Workflows
1. **Project Extension Onboarding**: Copy this template to `extensions/<project-slug>/EXTENSION.md` -> define tech stack, domain boundaries, and build/test commands -> map to Layer 5 runtime adapters -> validate zero upward file references from Layers 1–5 and `templates/`.

## 6. Relationships with Other Documents
* **Architecture & Capabilities**: `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`
* **Policies**: `policies/AUTONOMY_POLICY.md`, `policies/GOVERNANCE_POLICY.md`, `policies/SECURITY_POLICY.md`, `policies/VERIFICATION_POLICY.md`
