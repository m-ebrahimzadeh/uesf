> **NON-AUTHORITATIVE COMPILED UESF BUNDLE — DO NOT EDIT MANUALLY**
> * **Bundle ID**: `uesf-status` (`/uesf:status`)
> * **Canonical Source**: `workflows/STATUS_WORKFLOW.md` (`uesf@v0.6.2`)
> * **Source-SHA256**: `bf44ca16f52b5d7dbcacdc0a1a4acf2d392c3745c1785a379d361374d7afdd71` (`bf44ca16f52b`)
> * **Activation Banner Rule**: Begin your first response with: `**[UESF v0.6.2 | Active: uesf-status | Autonomy: A0 (Read-Only)]**`

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
## Canonical Specification (`workflows/STATUS_WORKFLOW.md`)

# Lifecycle Workflow — Unified Context Reconstruction & Session Resume (`/uesf:status`)
* **Document ID**: UESF-WKFL-003
* **Canonical Path**: workflows/STATUS_WORKFLOW.md
* **Workflow Trigger**: /uesf:status
* **Version**: 0.6.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose & Command Trigger
Define the unified session-entry and context-reconstruction workflow for `/uesf:status [optional-target]` (`@uesf-status`), enabling any local coding agent or cloud-based chat session to rapidly reconstruct project identity, architecture, verified repository state, recorded progress, active tasks, blockers, and logical next steps without requiring the user to re-explain project history.

## 2. Scope & Autonomy Profile
* **Scope**: Works on both the UESF repository itself (`management/`) and any downstream project using UESF (`.uesf/` + `docs/`).
* **Autonomy Level**: **`A0` (Read-Only Assessment)**, with an automatic non-destructive refresh of the machine-generated `CONTEXT_SNAPSHOT.md` when local `CAP-FS` and `CAP-GIT` are available.

## 3. Capability Detection & Environment Modes
Per `core/CAPABILITY_MODEL.md` and `protocols/KNOWLEDGE_SYNCHRONIZATION.md`, `/uesf:status` adapts automatically to the active runtime environment:
1. **Mode 1 — Local Coding Agent (`CAP-FS` & `CAP-GIT` Verified Available)**:
   * Detects whether the current directory is UESF (`management/PROJECT_PROFILE.md`) or a downstream project (`.uesf/EXTENSION.md`).
   * Runs `scripts/sync-snapshot` (or live probes `git status -sb`, `git branch -a`, `git log -n 5 --oneline`) and reads `CONTEXT_SNAPSHOT.md` so both committed ledgers and uncommitted working-tree changes are captured.
   * Classifies live Git/filesystem observations as **`[VERIFIED — Live Local Git & FS]`** and ledger tables as **`[RECORDED_IN_LEDGER]`**.
2. **Mode 2 — Cloud Chat + Public GitHub Repo or Connected Repo/Workspace (`CAP-FS` Unavailable; `CAP-WEB`, `CAP-MCP`, or `CAP-WS` Available)**:
   * Identifies the target repository URL and branch from the command argument (e.g., `/uesf:status owner/repo [branch]`), the active project profile (defaulting to `https://github.com/m-ebrahimzadeh/uesf` branch `main` when inspecting UESF itself), or connected Workspace/Notebook sources.
   * Retrieves the single pre-compiled snapshot via raw URL (`https://raw.githubusercontent.com/<owner>/<repo>/<branch>/.uesf/CONTEXT_SNAPSHOT.md` or `.../management/CONTEXT_SNAPSHOT.md` for UESF) or via the connected GitHub/Workspace tool.
   * Checks the latest remote commit SHA if reachable; if a direct Web-UI edit occurred after the snapshot, fetches raw `ACTIVE_TASKS.md` and `DECISION_LOG.md`.
   * Classifies remote data as **`[REPORTED — Remote @ <SHA/Branch>]`** and explicitly marks local unpushed/uncommitted state as **`[UNKNOWN — Local FS Unavailable]`**.
3. **Mode 3 — Cloud Chat + Private Unconnected Repo (All Repo Capabilities Unavailable / HTTP 404)**:
   * Clearly states that the remote repository is inaccessible without authentication (`[UNKNOWN]`) and prompts: *"Please drop or paste `.uesf/CONTEXT_SNAPSHOT.md` (automatically maintained in your local repo on every commit) to restore full project context in one step."*

## 4. Step-by-Step Execution Workflow
1. **Hydrate Operational Context (Low-Token Control Plane)**:
   * Load `CONTEXT_SNAPSHOT.md` (which embeds `PROJECT_PROFILE.md`/`EXTENSION.md`, `ACTIVE_TASKS.md`, `DECISION_LOG.md`, `KNOWLEDGE_MAP.md`, and the automated `[DRIFT_CHECK]` results) plus live `git status -sb` / `git log -n 5 --oneline` when local `CAP-GIT` is available.
   * Do **not** bulk-load all permanent documentation in `docs/` during baseline hydration; use the `KNOWLEDGE_MAP.md` routing table to know what documents exist and where they live.
2. **Optional Targeted Deep-Resume (`/uesf:status <TASK-ID or topic>`)**:
   * If the user supplies a specific Task ID, role, or feature topic (e.g., `/uesf:status TASK-020` or `/uesf:status adapters`), use `KNOWLEDGE_MAP.md` to selectively read the 1–3 permanent project specifications in `docs/` (or UESF layer directories) relevant to that target so work can resume immediately.
3. **Present the Five-Part Session-Resume Briefing**:
   * **Part 1 — Project & Architecture Overview**: Project identity, version, tech stack / layer structure, and key architectural decisions (`DEC-*`).
   * **Part 2 — Epistemic State & Repository Parity (`[VERIFIED]` vs. `[RECORDED]` vs. `[UNKNOWN]`)**: Current branch, latest commits, working-tree cleanliness, `KNOWLEDGE_MAP.md` file parity, and explicit disclosure of any unverified/inaccessible items.
   * **Part 3 — Completed Baseline vs. Active & Remaining Work**: Summary of recently `ACCEPTED` milestones/tasks vs. tasks currently `IN_PROGRESS`, `IN_REVIEW`, or `PROPOSED`.
   * **Part 4 — Blockers, Drift Alerts & Pending Decisions**: Any `[DRIFT_CHECK]` anomalies, `BLOCKED` tasks, or open human questions (`OQ-*`).
   * **Part 5 — Recommended Next Steps**: The 1–2 most logical immediate actions and which role or workflow to invoke next (e.g., `/uesf:discovery`, `/uesf:cto`, `/uesf:developer`).

## 5. Epistemic & Output Formatting Rules
* Begin the response with: `**[UESF v0.6.0 | Active: /uesf:status | Mode: <Local-Verified | Cloud-Remote | Snapshot-Paste> | Autonomy: A0]**`
* Strictly separate **Verified Repository Facts** (confirmed by live Git/FS probes or deterministic snapshot probes) from **Recorded Ledger Information** (task/decision tables) and **Unknowns** (`policies/VERIFICATION_POLICY.md`).

## 6. Guardrails & Non-Overlap Boundaries
* **Read-Only Session Entry**: `/uesf:status` never modifies canonical source specifications, never creates branches or commits, and never fabricates local Git state in cloud sessions.
* **Complements `/uesf:handoff`**: `/uesf:status` reconstructs context at session start; `/uesf:handoff` (`workflows/HANDOFF_WORKFLOW.md`) packages deliverables and evidence at session exit.

## 7. Relationships with Other Documents
* **Core & Policies**: `core/CAPABILITY_MODEL.md`, `core/FRAMEWORK_ARCHITECTURE.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`, `policies/VERIFICATION_POLICY.md`
* **Protocols & Workflows**: `protocols/KNOWLEDGE_SYNCHRONIZATION.md`, `protocols/HANDOFF_PROTOCOL.md`, `workflows/INIT_WORKFLOW.md`, `workflows/HANDOFF_WORKFLOW.md`
* **Management**: `management/KNOWLEDGE_MAP.md`, `management/ACTIVE_TASKS.md`, `management/DECISION_LOG.md`
