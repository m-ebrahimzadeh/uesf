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
