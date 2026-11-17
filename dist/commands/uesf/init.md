> **NON-AUTHORITATIVE COMPILED UESF BUNDLE — DO NOT EDIT MANUALLY**
> * **Bundle ID**: `uesf-init` (`/uesf:init`)
> * **Canonical Source**: `workflows/INIT_WORKFLOW.md` (`uesf@v0.6.0`)
> * **Source-SHA256**: `716fb5b7623c7564545ce5d86bb77b38a32f1bac490d5a3f95fb801032e1f282` (`716fb5b7623c`)
> * **Activation Banner Rule**: Begin your first response with: `**[UESF v0.6.0 | Active: uesf-init | Autonomy: A0 -> A1 on Approval]**`

## UESF Embedded Core & Policy Invariants (`v0.6.0`)
1. **Autonomy Tiers (`policies/AUTONOMY_POLICY.md`)**:
   * `A0` (Advisory & Discovery — Read-Only, zero file writes/edits, zero task contracting).
   * `A1` (Bounded Execution — execute only explicitly contracted steps within file boundaries).
   * `A2` (Autonomous Execution — make routine technical/governance decisions within approved scope).
   * `A3` (Human Approval Required — mandatory pause for destructive git actions, security/secret changes, scope overrides, transitioning out of Feature Discovery, or tagging `v1.0.0`).
2. **Epistemic Discipline (`policies/VERIFICATION_POLICY.md`)**:
   * Distinguish all claims into: `Verified` (reproducible tool/test/git output in current session), `Observed` (seen in state without full lifecycle test), `Reported` (from handoff/remote ledger), `Inferred` (logically deduced), and `Unknown` (inaccessible in current runtime). Never fabricate tool execution or file edits.
3. **Capability Probing & Three-Domain Knowledge Lookup (`core/CAPABILITY_MODEL.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`)**:
   * Probe available capabilities (`CAP-FS`, `CAP-TERM`, `CAP-GIT`, `CAP-WS`, `CAP-WEB`, `CAP-MCP`, `CAP-AGENT`) before acting.
   * If working in a downstream project with `.uesf/`, read operational state from `.uesf/{EXTENSION.md, KNOWLEDGE_MAP.md, ACTIVE_TASKS.md, DECISION_LOG.md, CONTEXT_SNAPSHOT.md}` and permanent project documentation from native `docs/` paths indexed in `.uesf/KNOWLEDGE_MAP.md`. If working in the UESF repository itself, read `management/`.

---
## Canonical Specification (`workflows/INIT_WORKFLOW.md`)

# Lifecycle Workflow — Project Initialization & Onboarding (`/uesf:init`)
* **Document ID**: UESF-WKFL-001
* **Canonical Path**: workflows/INIT_WORKFLOW.md
* **Workflow Trigger**: /uesf:init
* **Version**: 0.6.0
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose & Command Trigger
Define the standardized workflow for `/uesf:init` (`@uesf-init`), enabling an agent to audit a new or existing software repository in read-only mode (`A0`), propose a tailored Three-Domain UESF project configuration, and scaffold the `.uesf/` operational control plane and automatic snapshot hook (`A1`) only after explicit human confirmation.

## 2. Scope & Autonomy Profile
* **Scope**: Applies when onboarding any new or existing downstream software project to UESF (`extensions/README.md`).
* **Two-Stage Autonomy Gate (`policies/AUTONOMY_POLICY.md`)**:
  * **Stage 1 — Inspection & Proposal (`A0` Read-Only Lock)**: The agent inspects the repository and proposes the initial `.uesf/` configuration without creating or modifying any files.
  * **Stage 2 — Materialization & Hook Wiring (`A1` Bounded Execution)**: Triggered ONLY after the human stakeholder explicitly approves the proposed configuration.

## 3. Capability Detection & Environment Modes
Per `core/CAPABILITY_MODEL.md`:
* **Local Coding Agent (`CAP-FS` & `CAP-GIT` Verified Available)**: Directly inspects the local project directory tree, existing `docs/`, build/test manifests, and `git remote -v` / `git branch`, then writes `.uesf/` files and installs `.git/hooks/pre-commit` upon approval.
* **Cloud Chat Environment (`CAP-FS` Unavailable)**: Generates the complete `.uesf/` bootstrap files and setup commands in chat for the user or local coding agent to materialize.

## 4. Step-by-Step Execution Workflow
1. **Dogfooding Guard Check**: Check whether the current repository root contains `README.md` with `Document ID: UESF-CORE-001`. If so, report that this is the canonical UESF framework repository itself (managed via `management/`) and halt `/uesf:init`.
2. **Stage 1 — Read-Only Codebase & Documentation Audit (`A0`)**:
   * Inspect existing project documentation (such as `README.md`, `docs/`, `adr/`) without moving or duplicating those files.
   * Detect the tech stack, directory boundaries, build/lint/test commands, default Git branch, and remote repository URL.
   * Present a concise **Project Onboarding Proposal** summarizing:
     * Proposed `.uesf/EXTENSION.md` profile (conforming to `templates/PROJECT_EXTENSION_TEMPLATE.md`).
     * Proposed `.uesf/KNOWLEDGE_MAP.md` routing table indexing existing permanent project documents in `docs/` and `README.md`.
     * Initial `.uesf/ACTIVE_TASKS.md` and `.uesf/DECISION_LOG.md` baseline.
   * Pause and ask for explicit human confirmation before writing any files.
3. **Stage 2 — Scaffold `.uesf/` Control Plane & Automatic Snapshot Hook (`A1`)**:
   * Upon human confirmation, create `.uesf/` containing:
     * `EXTENSION.md` (project profile, remote URL, default branch, tech stack, verification gates, and pinned UESF version `0.6.0`).
     * `KNOWLEDGE_MAP.md` (routing index of permanent project docs in `docs/` and operational files in `.uesf/`).
     * `ACTIVE_TASKS.md` (using standard `TASK-XXX` identifiers per `protocols/TASK_CONTRACT_PROTOCOL.md`).
     * `DECISION_LOG.md` (using standard `DEC-XXX` and `OQ-XXX` identifiers per `policies/GOVERNANCE_POLICY.md`).
   * Copy or link the snapshot generator script (`sync-snapshot.ps1` / `sync-snapshot.sh`) into `.uesf/scripts/` and install the `.git/hooks/pre-commit` hook so `.uesf/CONTEXT_SNAPSHOT.md` is automatically generated and staged on every commit.
   * Run `sync-snapshot` once to generate the initial `.uesf/CONTEXT_SNAPSHOT.md`.

## 5. Epistemic & Output Formatting Rules
* Begin the first response with: `**[UESF v0.6.0 | Active: /uesf:init | Autonomy: A0 -> A1 on Approval]**`
* Distinguish `[VERIFIED]` repository observations (from `package.json`, `pyproject.toml`, `git remote -v`, etc.) from `[INFERRED]` architectural conventions (`policies/VERIFICATION_POLICY.md`).

## 6. Guardrails & Non-Overlap Boundaries
* **Never Move Permanent Project Docs into `.uesf/`**: Permanent architecture, specifications, PRDs, and roadmaps remain in the project's native `docs/` structure and are indexed via `.uesf/KNOWLEDGE_MAP.md` (`policies/SOURCE_OF_TRUTH_POLICY.md`).
* **Zero Universal Rule Duplication**: Never copy UESF `core/`, `policies/`, `protocols/`, or `roles/` files into `.uesf/`.

## 7. Relationships with Other Documents
* **Architecture & Policies**: `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`, `policies/AUTONOMY_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`
* **Protocols & Workflows**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/KNOWLEDGE_SYNCHRONIZATION.md`, `workflows/STATUS_WORKFLOW.md`, `workflows/HANDOFF_WORKFLOW.md`
* **Templates & Extensions**: `templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`
---
## Embedded Canonical Output Templates

### Template Source: `templates/PROJECT_EXTENSION_TEMPLATE.md`
# Project-Specific Extension Template
* **Document ID**: UESF-TMPL-008
* **Canonical Path**: templates/PROJECT_EXTENSION_TEMPLATE.md
* **Version**: 0.6.0
* **Status**: Verified
* **Owner**: Architect
* **Target Layer**: Layer 6
* **Last Updated**: 2026-11-17

## 1. Purpose
Provide the standardized structural schema for all Layer 6 Project-Specific Extensions (`extensions/<project-slug>/EXTENSION.md`), enabling downstream software projects to overlay domain architecture, tech-stack conventions, and custom quality gates while preserving 100% immutability of UESF Layers 1–5.

## 2. Scope
Mandatory template for all Layer 6 project extension specifications (`core/FRAMEWORK_ARCHITECTURE.md` and `extensions/README.md`).

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
2. **Unidirectional Dependency Invariant (`DEC-009`, `DEC-018`)**: Because this template targets Layer 6 (`Target Layer: Layer 6`), both this template and concrete extensions in `extensions/` MAY depend downward on Layers 1–6 (`core/`, `policies/`, `protocols/`, `roles/`, `adapters/`, `extensions/`), while Layers 1–5 MUST NEVER reference or depend on any file inside `extensions/`.
3. **Additive-Only Constraint**: A project extension MAY tighten verification gates or add domain-specific checklists, but MUST NOT weaken universal autonomy thresholds (`policies/AUTONOMY_POLICY.md`), Git protections (`policies/GIT_POLICY.md`), security rules (`policies/SECURITY_POLICY.md`), or epistemic verification requirements (`policies/VERIFICATION_POLICY.md`).
4. **Three-Domain Project Capsule (`.uesf/` + `docs/`)**: Every project extension MUST specify its Canonical Remote Repository URL and Default Branch (enabling cloud `/uesf:status` context retrieval), keep permanent documentation in native project paths (such as `docs/`) indexed by `.uesf/KNOWLEDGE_MAP.md`, and maintain operational state in `.uesf/` (`EXTENSION.md`, `KNOWLEDGE_MAP.md`, `ACTIVE_TASKS.md`, `DECISION_LOG.md`, and the machine-generated `CONTEXT_SNAPSHOT.md`).

## 4. Responsibilities
* **Architect / CTO**: Author and approve project extension overlays prior to downstream project execution.
* **QA / Security**: Verify that project-specific gates tighten rather than relax universal UESF policies.

## 5. Relevant Workflows
1. **Project Extension Onboarding**: Copy this template to `extensions/<project-slug>/EXTENSION.md` -> define tech stack, domain boundaries, and build/test commands -> map to Layer 5 runtime adapters (`adapters/README.md`) -> register in `extensions/README.md`.

## 6. Relationships with Other Documents
* **Architecture & Layer 6 Registry**: `core/FRAMEWORK_ARCHITECTURE.md`, `extensions/README.md`
* **Policies**: `policies/AUTONOMY_POLICY.md`, `policies/GOVERNANCE_POLICY.md`, `policies/SECURITY_POLICY.md`, `policies/VERIFICATION_POLICY.md`
* **Adapters**: `adapters/README.md`
