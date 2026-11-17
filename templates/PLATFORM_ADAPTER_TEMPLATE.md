# Platform Adapter Template
* **Document ID**: UESF-TMPL-007
* **Canonical Path**: templates/PLATFORM_ADAPTER_TEMPLATE.md
* **Version**: 0.3.1
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose
Provide the standardized structural schema for all Layer 5 Platform Adapters (`adapters/<adapter-name>/ADAPTER.md`), ensuring consistent capability mapping, graceful degradation, and zero upward dependency violations.

## 2. Scope
Mandatory template for all runtime adapter specifications introduced in Milestone M3 (`v0.3.0`) and subsequent releases (`core/FRAMEWORK_ARCHITECTURE.md`).

## 3. Rules and Requirements
1. **Mandatory Sections**: Every `ADAPTER.md` specification MUST include:
   * Metadata Header (`Document ID`, `Canonical Path`, `Version`, `Status`, `Owner`, `Last Updated`)
   * `## 1. Purpose & Target Runtime Profile`
   * `## 2. Scope & Supported Roles`
   * `## 3. Capability Mapping Matrix (CAP-* to Runtime Bindings)`
   * `## 4. Constraint Handling & Graceful Degradation Rules`
   * `## 5. Session Initialization & Handoff Execution Workflow`
   * `## 6. Security & Isolation Guardrails`
   * `## 7. Relationships with Other Documents`
2. **Unidirectional Dependency Rule**: Adapters in Layer 5 (`adapters/`) MAY reference Layers 1–4 (`core/`, `policies/`, `protocols/`, `roles/`) and `templates/`, but Layers 1–4 and `templates/` MUST NEVER reference or depend on concrete files in `adapters/` or `extensions/`.
3. **Zero Policy Override**: An adapter maps abstract capabilities to concrete tools; it MUST NOT weaken autonomy gates (`policies/AUTONOMY_POLICY.md`), verification rigor (`policies/VERIFICATION_POLICY.md`), or source-of-truth rules (`policies/SOURCE_OF_TRUTH_POLICY.md`).

## 4. Responsibilities
* **Architect / DevOps**: Author and maintain platform adapter definitions conforming to this schema.
* **QA / Security**: Verify that adapter tool bindings enforce least privilege and epistemic honesty.
* **CTO**: Approves new platform adapter profiles.

## 5. Relevant Workflows
1. **Adapter Authoring Workflow**: Copy this template -> map each `CAP-*` domain from `core/CAPABILITY_MODEL.md` to concrete host tools -> specify fallback behavior for `UNAVAILABLE` capabilities -> validate against `core/FRAMEWORK_ARCHITECTURE.md`.

## 6. Relationships with Other Documents
* **Architecture & Capabilities**: `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`
* **Policies**: `policies/AUTONOMY_POLICY.md`, `policies/SECURITY_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`, `policies/VERIFICATION_POLICY.md`
