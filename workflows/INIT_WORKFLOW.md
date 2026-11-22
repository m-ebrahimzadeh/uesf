# Lifecycle Workflow — Project Initialization & Onboarding (`/uesf-init`)
* **Document ID**: UESF-WKFL-001
* **Canonical Path**: workflows/INIT_WORKFLOW.md
* **Workflow Trigger**: /uesf-init
* **Version**: 0.9.0
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-22

## 1. Purpose & Command Trigger
Define the standardized, newcomer-friendly onboarding workflow for `/uesf-init` (`uesf-init`), enabling an agent in any new or existing software repository to audit the codebase in read-only mode (`A0`), present a clear plain-English setup proposal, and self-containedly scaffold the `.uesf/` operational control plane and automatic snapshot hook (`A1`) upon explicit human confirmation.

## 2. Scope & Autonomy Profile
* **Scope**: Applies when onboarding any new or existing downstream software project to UESF (`extensions/README.md`).
* **Two-Stage Autonomy Gate (`policies/AUTONOMY_POLICY.md`)**:
  * **Stage 1 — Read-Only Inspection & Plain-English Proposal (`A0` Lock)**: The agent inspects the repository and presents the proposed `.uesf/` setup without creating or modifying any files.
  * **Stage 2 — Self-Contained Materialization & Hook Wiring (`A1` Bounded Execution)**: Triggered ONLY after the human stakeholder explicitly approves the proposal.

## 3. Capability Detection & Environment Modes
Per `core/CAPABILITY_MODEL.md`:
* **Local Coding Agent (`CAP-FS` & `CAP-GIT` Verified Available)**: Directly inspects the local project directory tree, existing `docs/`, build/test manifests, and `git remote -v` / `git branch`, then in Stage 2 scaffolds `.uesf/` governance files, wires `.uesf/bin/uesf.mjs`, `.uesf/scripts/sync-snapshot.*`, and `.git/hooks/pre-commit`, and generates `.uesf/CONTEXT_SNAPSHOT.md` by invoking `node "<uesf_repo_path>/bin/uesf.mjs" init-project .` (reading `uesf_repo_path` from `~/.uesf/install-state.json`, or `npx --yes github:m-ebrahimzadeh/uesf init-project .`) upon approval.
* **Cloud Chat Environment (`CAP-FS` Unavailable)**: Generates the complete `.uesf/` bootstrap files and setup commands in chat for the user or local coding agent to materialize.

## 4. Step-by-Step Execution Workflow
1. **Dogfooding Guard Check**:
   * Check whether the current repository root contains `README.md` with `Document ID: UESF-CORE-001`. If so, inform the user that this is the canonical UESF framework repository itself (already governed via `management/`), suggest running `/uesf-status`, and halt `/uesf-init`.
   * If `.uesf/EXTENSION.md` already exists, inform the user that the project is already initialized, summarize the current `.uesf/` setup, and ask whether they want to refresh `.uesf/bin/uesf.mjs`, `.uesf/scripts/sync-snapshot.*`, and `.git/hooks/pre-commit` or run `/uesf-status` instead.
2. **Stage 1 — Read-Only Codebase & Documentation Audit (`A0`)**:
   * Inspect existing project documentation (`README.md`, `docs/`, `adr/`) without moving or duplicating those files.
   * Detect the tech stack, directory boundaries, build/lint/test commands, default Git branch, and remote repository URL.
   * Present a clear, newcomer-friendly **Project Onboarding Proposal** with four short sections:
     1. **Detected Project Profile**: Project name, remote URL & default branch, tech stack, and key directory boundaries.
     2. **Detected Verification Gates**: Exact build, linter, and test commands discovered (`[VERIFIED]` from config files vs. `[INFERRED]`).
     3. **Existing Documentation to Index (Left in Place)**: List of permanent docs found in `README.md` or `docs/` that will be indexed in `.uesf/KNOWLEDGE_MAP.md`.
     4. **Files to Create in `.uesf/`**: `.uesf/EXTENSION.md`, `.uesf/KNOWLEDGE_MAP.md`, `.uesf/ACTIVE_TASKS.md`, `.uesf/DECISION_LOG.md`, `.uesf/CONTEXT_SNAPSHOT.md`, `.uesf/handoffs/` (gitignored local handoff spool), `.gitignore` (ignoring `.uesf/handoffs/`), `.uesf/bin/uesf.mjs`, `.uesf/scripts/sync-snapshot.*`, and `.git/hooks/pre-commit`.
   * Conclude with: `**Next:** Reply to approve scaffolding this `.uesf/` configuration or specify any build/test command adjustments first.`
3. **Stage 2 — Self-Contained Scaffolding & Automatic Snapshot Hook (`A1`)**:
   * Upon human confirmation, create `.uesf/` containing:
     * `.uesf/EXTENSION.md` (conforming to `templates/PROJECT_EXTENSION_TEMPLATE.md`, pinning UESF version `0.9.0`).
     * `.uesf/KNOWLEDGE_MAP.md` (routing table indexing existing project docs in `docs/` and operational files in `.uesf/`).
     * `.uesf/ACTIVE_TASKS.md` (initialized with `TASK-001: Initialize UESF Project Control Plane (.uesf/)` marked `ACCEPTED`).
     * `.uesf/DECISION_LOG.md` (initialized with `DEC-001: Onboard Project to UESF Three-Domain Governance`).
   * Wire the standalone snapshot engine and Git `pre-commit` hook, scaffold the gitignored `.uesf/handoffs/` spool directory and `.gitignore` entry, and generate the initial `.uesf/CONTEXT_SNAPSHOT.md` by running `node "<uesf_repo_path>/bin/uesf.mjs" init-project .` (reading `uesf_repo_path` from `~/.uesf/install-state.json`, or falling back to `npx --yes github:m-ebrahimzadeh/uesf init-project .`), which atomically copies `.uesf/bin/uesf.mjs`, `.uesf/scripts/sync-snapshot.ps1`, `.uesf/scripts/sync-snapshot.sh`, and `.git/hooks/pre-commit`, scaffolds `.uesf/handoffs/` and adds `.uesf/handoffs/` to `.gitignore`, and runs `sync-snapshot`.
4. **Stage 3 — Post-Init Welcome & Next Commands Card**:
   * Conclude by displaying a concise **"Your Project Is Ready"** summary showing the verified `.uesf/` files created and the 3 primary commands to use next (this 3-command newcomer welcome card is the designated exception to the single-command closing action rule, `DSC-006`):
     * `/uesf-discovery <idea>` — Brainstorm a new feature or change in read-only mode (`A0`).
     * `/uesf-cto` — Create a bounded task contract (`TASK-XXX`) for well-defined work.
     * `/uesf-status` — Reconstruct project context at the start of any future local or cloud session.

## 5. Epistemic & Output Formatting Rules
* Begin the first response with: `**[UESF v0.9.0 | Active: uesf-init | Autonomy: A0 -> A1 on Approval]**`
* Distinguish `[VERIFIED]` repository observations (from `package.json`, `pyproject.toml`, `Cargo.toml`, `git remote -v`, etc.) from `[INFERRED]` architectural conventions (`policies/VERIFICATION_POLICY.md`).

## 6. Guardrails & Non-Overlap Boundaries
* **Never Move Permanent Project Docs into `.uesf/`**: Permanent architecture, specifications, PRDs, and roadmaps remain in the project's native `docs/` structure and are indexed via `.uesf/KNOWLEDGE_MAP.md` (`policies/SOURCE_OF_TRUTH_POLICY.md`).
* **Zero Universal Rule Duplication**: Never copy UESF `core/`, `policies/`, `protocols/`, or `roles/` files into `.uesf/`.

## 7. Relationships with Other Documents
* **Architecture & Policies**: `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`, `policies/AUTONOMY_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`
* **Protocols & Workflows**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/KNOWLEDGE_SYNCHRONIZATION.md`, `workflows/STATUS_WORKFLOW.md`, `workflows/HANDOFF_WORKFLOW.md`
* **Templates & Extensions**: `templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`
