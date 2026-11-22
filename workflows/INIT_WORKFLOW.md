# Lifecycle Workflow — Project Initialization & Onboarding (`/uesf-init`)
* **Document ID**: UESF-WKFL-001
* **Canonical Path**: workflows/INIT_WORKFLOW.md
* **Workflow Trigger**: /uesf-init
* **Version**: 0.10.0
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-22

## 1. Purpose & Command Trigger
Standardized, non-destructive, maturity-adaptive `/uesf-init` workflow for onboarding any greenfield or existing repository: inspect in read-only mode (`A0`), present a 5-section proposal, and scaffold `.uesf/` (`A1`) upon human confirmation without mutating existing project files.

## 2. Scope & Autonomy Profile
* **Scope**: Onboarding any downstream project to UESF (`extensions/README.md`).
* **Two-Stage Gate (`policies/AUTONOMY_POLICY.md`)**:
  * **Stage 1 (`A0` Lock)**: Read-only inspection and proposal; zero file edits.
  * **Stage 2 (`A1` Bounded Execution)**: Materializes `.uesf/` ONLY after explicit human approval.

## 3. Capability Detection & Environment Modes
Per `core/CAPABILITY_MODEL.md`:
* **Local Coding Agent (`CAP-FS` & `CAP-GIT`)**: Runs Stage 1 discovery (`A0`) and Stage 2 `.uesf/` scaffolding + `init-project` wiring (`A1`) on approval.
* **Cloud Chat (`CAP-FS` Unavailable)**: Outputs complete `.uesf/` bootstrap files and setup commands in chat.

## 4. Step-by-Step Execution Workflow
1. **Dogfooding & Non-Destructive Re-Audit Check**:
   * **UESF Core Guard**: If `README.md` has `Document ID: UESF-CORE-001`, inform the user this is the canonical UESF repo (`management/`), suggest `/uesf-status`, and halt `/uesf-init`.
   * **Existing `.uesf/EXTENSION.md`**: Summarize the current `.uesf/` setup and offer three safe options: (a) run a non-destructive `A0` diff re-audit of `.uesf/EXTENSION.md` and `.uesf/KNOWLEDGE_MAP.md` against the evolved repo (proposing targeted updates without touching `.uesf/ACTIVE_TASKS.md` or `.uesf/DECISION_LOG.md` history), (b) refresh `.uesf/bin/uesf.mjs`, `.uesf/scripts/sync-snapshot.*`, and hook wiring via `init-project`, or (c) run `/uesf-status`.
2. **Stage 1 — Bounded Shallow Discovery Pass & 5-Section Proposal (`A0`)**:
   * Run 4–6 fast read-only probes (never bulk-reading source code or full doc bodies; adapts from greenfield to monorepos):
     1. Root & depth-2 layout (single-package vs. monorepo workspaces).
     2. Build/test manifests (`package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Makefile`) & CI (`.github/workflows/`).
     3. AI/contributor guides (`AGENTS.md / CLAUDE.md / CONTRIBUTING.md`, `.cursorrules`, `.cursor/rules/`, `.github/copilot-instructions.md (if present)`, `.clinerules`) left untouched in place.
     4. Docs & ADRs (`README.md`, `docs/`, `adr/`).
     5. Live Git & hooks (`git status -sb`, `git branch -a`, `git remote -v`, `git log -n 10 --oneline`, `git config --get core.hooksPath`, `.git/hooks/pre-commit`).
   * Present a **5-Section Project Onboarding Proposal**:
     1. **Detected Project & Maturity Profile**: Name, remote URL & default branch, tech stack, layout (greenfield vs. active single-package vs. monorepo), and Git working-tree state (branch, clean vs. dirty).
     2. **Existing Conventions, AI Instructions & Git Hook Compatibility**: Detected AI/contributor guides to respect by reference, commit/branch conventions, and `.git/hooks/pre-commit` plan (wire directly vs. skip/chain to preserve existing hooks or `core.hooksPath`).
     3. **Detected Verification Gates**: Build, lint, typecheck, and test commands labeled `[VERIFIED]`, `[INFERRED]`, or `[UNKNOWN]`.
     4. **Curated Documentation & ADRs to Index (Left Untouched in Place)**: High-value `README.md`, `docs/`, `adr/`, and AI guides for `.uesf/KNOWLEDGE_MAP.md` (skipping noisy boilerplate Markdown).
     5. **Exact Non-Destructive File Plan**: Lists `.uesf/` files to create (`.uesf/EXTENSION.md`, `.uesf/KNOWLEDGE_MAP.md`, `.uesf/ACTIVE_TASKS.md`, `.uesf/DECISION_LOG.md`, `.uesf/CONTEXT_SNAPSHOT.md`, `.uesf/.gitignore`, `.uesf/handoffs/`, `.uesf/bin/uesf.mjs`, `.uesf/scripts/sync-snapshot.*`), `.git/hooks/pre-commit` action, and confirms **0 existing tracked files modified and no automatic `git commit`**.
   * End Stage 1 with: ``**Next:** Reply to approve scaffolding this `.uesf/` configuration or specify any adjustments first.``
3. **Stage 2 — Delta-Only Scaffolding, Exact Ledgers & Wiring (`A1`)**:
   * On approval, write `.uesf/` files without modifying existing files or running `git commit`:
     * `.uesf/EXTENSION.md`: Delta-only per `templates/PROJECT_EXTENSION_TEMPLATE.md` (no universal 9-role restatement or internal UESF paths).
     * `.uesf/KNOWLEDGE_MAP.md`: Row format ``| `<Doc-ID>` | `<repo-relative-path>` | <Category> | <Owner> | `<Version-or-N/A>` | <Status> |``.
     * `.uesf/ACTIVE_TASKS.md`: Row format ``| `TASK-001` | Initialize UESF Project Control Plane (.uesf/) | CTO / DevOps | Human Stakeholder | Engineering Workspace | `A1` | `ACCEPTED` | Initialized via /uesf-init. |``.
     * `.uesf/DECISION_LOG.md`: Row format ``| `DEC-001` | Governance | Onboard Project to UESF Three-Domain Governance | Confirmed | Human Stakeholder | YYYY-MM-DD |`` (plus optional `OQ-001` table and `docs/adr/` pointer).
   * Wire `.uesf/bin/uesf.mjs`, `.uesf/scripts/sync-snapshot.*`, `.uesf/.gitignore`, `.uesf/handoffs/`, safe `.git/hooks/pre-commit`, and `.uesf/CONTEXT_SNAPSHOT.md` via ONE command in project root:
     * `node "<uesf_repo_path>/bin/uesf.mjs" init-project .` (reading `uesf_repo_path` from `~/.uesf/install-state.json`), or fallback `npx --yes github:m-ebrahimzadeh/uesf init-project .`.
4. **Stage 3 — Post-Init Welcome & Next Commands Card**:
   * Display **"Your Project Is Ready"** with created `.uesf/` files, any hook-chaining note, and the 3-command welcome card (`DSC-006` exception):
     * `/uesf-discovery <idea>` — Brainstorm a new feature or change (`A0`).
     * `/uesf-cto` — Create a bounded task contract (`TASK-XXX`).
     * `/uesf-status` — Reconstruct project context in any session.

## 5. Epistemic & Output Formatting Rules
* Start with the active compiled UESF version banner at the top of this skill (`**[UESF vX.Y.Z | Active: uesf-init | Autonomy: A0 -> A1 on Approval]**`).
* Tag findings as `[VERIFIED]`, `[OBSERVED]`, `[INFERRED]`, or `[UNKNOWN]` (`policies/VERIFICATION_POLICY.md`).

## 6. Guardrails & Non-Overlap Boundaries
* **Never Move or Mutate Existing Docs or AI Guides**: `README.md`, `docs/`, `adr/`, and AI/contributor guides stay untouched in place and are indexed in `.uesf/KNOWLEDGE_MAP.md` (`policies/SOURCE_OF_TRUTH_POLICY.md`).
* **Zero Universal Rule Duplication**: Never copy `core/`, `policies/`, `protocols/`, or `roles/` into `.uesf/`.

## 7. Relationships with Other Documents
* **Architecture & Policies**: `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`, `policies/AUTONOMY_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`
* **Protocols & Workflows**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/KNOWLEDGE_SYNCHRONIZATION.md`, `workflows/STATUS_WORKFLOW.md`, `workflows/HANDOFF_WORKFLOW.md`
* **Templates & Extensions**: `templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`
