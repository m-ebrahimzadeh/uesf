---
name: uesf-init
description: UESF Project Initialization Workflow (/uesf:init - A0 Audit & .uesf/ Scaffold)
version: 0.6.2
---

> **NON-AUTHORITATIVE COMPILED UESF BUNDLE — DO NOT EDIT MANUALLY**
> * **Bundle ID**: `uesf-init` (`/uesf:init`)
> * **Canonical Source**: `workflows/INIT_WORKFLOW.md` (`uesf@v0.6.2`)
> * **Source-SHA256**: `bf44ca16f52b5d7dbcacdc0a1a4acf2d392c3745c1785a379d361374d7afdd71` (`bf44ca16f52b`)
> * **Activation Banner Rule**: Begin your first response with: `**[UESF v0.6.2 | Active: uesf-init | Autonomy: A0 -> A1 on Approval]**`

## UESF Embedded Core & Policy Invariants (`v0.6.2`)
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
* **Version**: 0.6.2
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose & Command Trigger
Define the standardized, newcomer-friendly onboarding workflow for `/uesf:init` (`@uesf-init`), enabling an agent in any new or existing software repository to audit the codebase in read-only mode (`A0`), present a clear plain-English setup proposal, and self-containedly scaffold the `.uesf/` operational control plane and automatic snapshot hook (`A1`) upon explicit human confirmation.

## 2. Scope & Autonomy Profile
* **Scope**: Applies when onboarding any new or existing downstream software project to UESF (`extensions/README.md`).
* **Two-Stage Autonomy Gate (`policies/AUTONOMY_POLICY.md`)**:
  * **Stage 1 — Read-Only Inspection & Plain-English Proposal (`A0` Lock)**: The agent inspects the repository and presents the proposed `.uesf/` setup without creating or modifying any files.
  * **Stage 2 — Self-Contained Materialization & Hook Wiring (`A1` Bounded Execution)**: Triggered ONLY after the human stakeholder explicitly approves the proposal.

## 3. Capability Detection & Environment Modes
Per `core/CAPABILITY_MODEL.md`:
* **Local Coding Agent (`CAP-FS` & `CAP-GIT` Verified Available)**: Directly inspects the local project directory tree, existing `docs/`, build/test manifests, and `git remote -v` / `git branch`, then writes `.uesf/` files, `.uesf/scripts/sync-snapshot.*`, and `.git/hooks/pre-commit` directly from the embedded payload in the compiled `uesf-init` bundle upon approval.
* **Cloud Chat Environment (`CAP-FS` Unavailable)**: Generates the complete `.uesf/` bootstrap files and setup commands in chat for the user or local coding agent to materialize.

## 4. Step-by-Step Execution Workflow
1. **Dogfooding Guard Check**:
   * Check whether the current repository root contains `README.md` with `Document ID: UESF-CORE-001`. If so, inform the user that this is the canonical UESF framework repository itself (already governed via `management/`), suggest running `/uesf:status`, and halt `/uesf:init`.
   * If `.uesf/EXTENSION.md` already exists, inform the user that the project is already initialized, summarize the current `.uesf/` setup, and ask whether they want to refresh `.uesf/scripts/sync-snapshot.*` and `.git/hooks/pre-commit` or run `/uesf:status` instead.
2. **Stage 1 — Read-Only Codebase & Documentation Audit (`A0`)**:
   * Inspect existing project documentation (`README.md`, `docs/`, `adr/`) without moving or duplicating those files.
   * Detect the tech stack, directory boundaries, build/lint/test commands, default Git branch, and remote repository URL.
   * Present a clear, newcomer-friendly **Project Onboarding Proposal** with four short sections:
     1. **Detected Project Profile**: Project name, remote URL & default branch, tech stack, and key directory boundaries.
     2. **Detected Verification Gates**: Exact build, linter, and test commands discovered (`[VERIFIED]` from config files vs. `[INFERRED]`).
     3. **Existing Documentation to Index (Left in Place)**: List of permanent docs found in `README.md` or `docs/` that will be indexed in `.uesf/KNOWLEDGE_MAP.md`.
     4. **Files to Create in `.uesf/`**: `.uesf/EXTENSION.md`, `.uesf/KNOWLEDGE_MAP.md`, `.uesf/ACTIVE_TASKS.md`, `.uesf/DECISION_LOG.md`, `.uesf/CONTEXT_SNAPSHOT.md`, `.uesf/scripts/sync-snapshot.*`, and `.git/hooks/pre-commit`.
   * Ask: *"Do you approve scaffolding this `.uesf/` configuration (or would you like to adjust any build/test commands first)?"*
3. **Stage 2 — Self-Contained Scaffolding & Automatic Snapshot Hook (`A1`)**:
   * Upon human confirmation, create `.uesf/` and `.uesf/scripts/` containing:
     * `.uesf/EXTENSION.md` (conforming to `templates/PROJECT_EXTENSION_TEMPLATE.md`, pinning UESF version `0.6.2`).
     * `.uesf/KNOWLEDGE_MAP.md` (routing table indexing existing project docs in `docs/` and operational files in `.uesf/`).
     * `.uesf/ACTIVE_TASKS.md` (initialized with `TASK-001: Initialize UESF Project Control Plane (.uesf/)` marked `ACCEPTED`).
     * `.uesf/DECISION_LOG.md` (initialized with `DEC-001: Onboard Project to UESF Three-Domain Governance`).
     * `.uesf/scripts/sync-snapshot.ps1`, `.uesf/scripts/sync-snapshot.sh`, and `.git/hooks/pre-commit` (written directly from the **Embedded Project Automation Scripts** section of the compiled `uesf-init` bundle so zero external path lookup is required).
   * Execute `.uesf/scripts/sync-snapshot.ps1` (or `.sh`) to generate the initial `.uesf/CONTEXT_SNAPSHOT.md`.
4. **Stage 3 — Post-Init Welcome & Next Commands Card**:
   * Conclude by displaying a concise **"Your Project Is Ready"** summary showing the verified `.uesf/` files created and the 3 primary commands to use next:
     * `/uesf:discovery <idea>` — Brainstorm a new feature or change in read-only mode (`A0`).
     * `/uesf:cto` — Create a bounded task contract (`TASK-XXX`) for well-defined work.
     * `/uesf:status` — Reconstruct project context at the start of any future local or cloud session.

## 5. Epistemic & Output Formatting Rules
* Begin the first response with: `**[UESF v0.6.2 | Active: /uesf:init | Autonomy: A0 -> A1 on Approval]**`
* Distinguish `[VERIFIED]` repository observations (from `package.json`, `pyproject.toml`, `Cargo.toml`, `git remote -v`, etc.) from `[INFERRED]` architectural conventions (`policies/VERIFICATION_POLICY.md`).

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
---
## Embedded Project Automation Scripts (`.uesf/scripts/` & `.git/hooks/pre-commit`)

### Script 1: `.uesf/scripts/sync-snapshot.ps1`
```powershell
param([string]$TargetRoot = "")
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$cli = Join-Path $PSScriptRoot '..\bin\uesf.mjs'
if ([string]::IsNullOrWhiteSpace($TargetRoot)) {
    & node $cli sync-snapshot
} else {
    & node $cli sync-snapshot --target-root $TargetRoot
}
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
```

### Script 2: `.uesf/scripts/sync-snapshot.sh`
```sh
#!/usr/bin/env sh
set -e
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
exec node "$SCRIPT_DIR/../bin/uesf.mjs" sync-snapshot "$@"
```

### Script 3: `.git/hooks/pre-commit`
```sh
#!/usr/bin/env sh
# UESF Automatic Context Snapshot Pre-Commit Hook (DEC-023 / DEC-026)
set -e
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

if [ -f "bin/uesf.mjs" ]; then
    node "bin/uesf.mjs" sync-snapshot >/dev/null
    git add "management/CONTEXT_SNAPSHOT.md"
elif [ -f ".uesf/bin/uesf.mjs" ]; then
    node ".uesf/bin/uesf.mjs" sync-snapshot --target-root "$REPO_ROOT" >/dev/null
    git add ".uesf/CONTEXT_SNAPSHOT.md"
elif [ -f ".uesf/scripts/sync-snapshot.ps1" ] && command -v powershell.exe >/dev/null 2>&1; then
    powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".uesf/scripts/sync-snapshot.ps1" >/dev/null
    git add ".uesf/CONTEXT_SNAPSHOT.md"
fi
```
