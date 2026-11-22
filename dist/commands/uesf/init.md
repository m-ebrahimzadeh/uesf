---
description: "UESF Project Initialization Workflow (/uesf-init - A0 Audit & .uesf/ Scaffold)"
---

* **Activation Banner Rule**: Begin your first response with: `**[UESF v0.9.3 | Active: uesf-init | Autonomy: A0 -> A1 on Approval]**`

## UESF Embedded Core & Policy Invariants (`v0.9.3`)
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
4. **Risk-Gated Proportional Execution (`protocols/TASK_CONTRACT_PROTOCOL.md`)**:
   * Unambiguous, single-concern, low-risk tasks in a single workspace may use the `Fast-Path` inline contract (registering `IN_PROGRESS` in `ACTIVE_TASKS.md` on disk before code edits, running `Verified` checks, and updating the row to `IN_REVIEW`/`ACCEPTED` before committing with `[TASK-XXX]`). Any task touching auth, secrets, deletion logic, policies, multi-module interfaces, or `A3` gates requires the `Standard-Contract` track (or immediate `IN_PROGRESS -> BLOCKED` Track Promotion if discovered mid-task).
5. **File-Backed Operational Handoff Spool (`protocols/HANDOFF_PROTOCOL.md`, `DEC-031`)**:
   * Cross-session and cross-agent handoffs use the gitignored flat directory `<ctrlDir>/handoffs/` (`.uesf/handoffs/` in downstream projects, `management/handoffs/` in UESF) with paired sequential filenames: odd sequences (`HO-TASK-XXX-01.md`, `-03.md`) for Outbound dispatches and even sequences (`HO-TASK-XXX-02.md`, `-04.md`) for Inbound returns with embedded `EV-TASK-XXX` evidence.
   * When `CAP-FS` or `CAP-MCP` is available, read/write handoff files directly in `<ctrlDir>/handoffs/` and emit a compact 5-line Dispatch/Return Summary Card in chat; fall back to full inline chat Markdown only when filesystem access is unavailable. Permanent task states and decisions MUST still be recorded in `ACTIVE_TASKS.md` and `DECISION_LOG.md`.
6. **Single-Sentence Closing Action Prompt (`core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `DSC-006`)**:
   * End every UESF skill response with **one concise, actionable sentence** starting with `**Next:**` recommending the single best next step—no lengthy explanations or multi-option lists.
   * On completed execution or handoff, include a ready-to-use `/uesf-<name>` command populated with concrete known context (`TASK-XXX`, `DSC-XXX`, `HO-TASK-XXX-YY`) without fabricating unknown IDs (adapt prefix to `$uesf-<name>` in Codex or `/uesf-<name>.md` in Cline when active). On `A0`/`A3` pauses or `BLOCKED` halts, state the exact in-chat reply, approval, or unblock action needed without prematurely recommending a gated downstream command.
   * Exceptions: a 5-line Handoff Summary Card whose `Next Command` line already names the next step satisfies this rule without duplication; `/uesf-init` Stage 3 keeps its 3-command newcomer welcome card.

---
## Canonical Specification (`workflows/INIT_WORKFLOW.md`)

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
---
## Embedded Canonical Output Templates

### Template Source: `templates/PROJECT_EXTENSION_TEMPLATE.md`
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

<!-- UESF-BUNDLE-METADATA: bundle=uesf-init command=/uesf-init source=workflows/INIT_WORKFLOW.md version=0.9.3 sha256=45ab045ec995bdbffb854834537124a0954b9ed182b729558a68650b89423de1 short_sha256=45ab045ec995 -->
