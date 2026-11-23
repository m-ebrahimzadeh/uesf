# Implementation Roadmap
* **Document ID**: UESF-MGMT-006
* **Canonical Path**: management/IMPLEMENTATION_ROADMAP.md
* **Version**: 0.9.4
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-23

## 1. Purpose
Define the phased, dependency-ordered engineering roadmap for evolving UESF from foundational specifications to complete universal agent Skills, platform adapters, feature discovery workflows, and project integrations.

## 2. Scope
Covers Milestones M1 through M10 of UESF development in alignment with `DEC-007` and `DEC-017`–`DEC-035` (`management/DECISION_LOG.md`).

## 3. Phased Engineering Roadmap

### Milestone M1: Foundational Architecture & Governance (`v0.1.0`) — *COMPLETED & ACCEPTED*
* **Objective**: Establish platform-independent operating model, policies, protocols, knowledge governance, and project management baseline.
* **Status**: `ACCEPTED` (`TASK-000` & `TASK-001`, commit `288d6dc` on `main`, verified via `EV-TASK-001-01`).

### Milestone M2: Universal Agent Role Skills (`v0.2.0`) — *COMPLETED & ACCEPTED*
* **Objective**: Author, review, and verify the initial eight platform-independent Agent Role Skills (`roles/<role>/SKILL.md`) and reusable Markdown artifact templates (`templates/`).
* **Status**: `ACCEPTED` (`TASK-002`–`TASK-006`, commit `ff33485` merged to `main` @ `8d46a45`, verified via `EV-TASK-002-01` and `management/validation/VALIDATION_REPORT_002.md`).

### Milestone M3: Platform Adapters (`v0.3.0`) — *COMPLETED & ACCEPTED*
* **Objective**: Create thin, modular Layer 5 platform adapters in `adapters/` mapping universal capabilities (`CAP-*`) and protocols to concrete environments, and resolve cross-platform repository hygiene (`KDP-001`, `KDP-002`).
* **Status**: `ACCEPTED` (`TASK-007`–`TASK-010`, commit `f548df7` merged to `main` @ `0fa8bbe`, verified via `EV-TASK-007-01` and `management/validation/VALIDATION_REPORT_003.md`).

### Milestone M4: Layer 6 Project Extensions (`v0.4.0`) — *COMPLETED & ACCEPTED*
* **Objective**: Complete Layer 6 (`extensions/`) with `templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`, and the reference blueprint `extensions/example-web-service/EXTENSION.md`, and harmonize `KDP-003`–`KDP-007`.
* **Status**: `ACCEPTED` (`TASK-011`–`TASK-014`, merged on `main` @ `e9f4e02` and re-versioned to `v0.4.0` per `DEC-017`).

### Milestone M5: Feature Discovery Role (`Discovery`), Template Target-Layer Architecture & Cumulative Audit (`v0.5.0`) — *COMPLETED & ACCEPTED*
* **Objective**: Roll back the premature `v1.0.0` tag (`DEC-017`), implement the Template Target-Layer Rule (`DEC-018`), introduce the 9th Universal Agent Role `Discovery` (`roles/discovery/SKILL.md`), `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, and `templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md` (`DEC-019`), and commit the versioned cumulative verification script (`management/validation/audit.ps1`).
* **Status**: `ACCEPTED` (`TASK-015`–`TASK-019`, originating from approved Feature Discovery Brief `DSC-001`, merged to `main` per `DEC-020` and verified via `EV-TASK-015-01`, `EV-TASK-019-01`, and `management/validation/VALIDATION_REPORT_005.md`).

### Milestone M6: Compiled Skill Distribution, Lifecycle Workflows, Snapshot Sync & Zero-Dependency Node.js CLI (`v0.6.0`–`v0.6.3`) — *COMPLETED & ACCEPTED*
* **Objective**: Compile the 9 Universal Role Skills and 3 Lifecycle Workflows (`init`, `handoff`, `status`) into self-contained `dist/` packages with a multi-agent installer (`DEC-021`), establish the Three-Domain Knowledge Model (`DEC-022`), implement automatic machine-generated `CONTEXT_SNAPSHOT.md` synchronization (`DEC-023`), deliver the newcomer-friendly `README.md` and self-contained `/uesf:init` bundle (`DEC-025`), consolidate all build/install/snapshot tooling into a zero-dependency Node.js CLI (`package.json` + `bin/uesf.mjs` with `npx` & `--version <ref>` support and thin script wrappers per `DEC-026`), and provide atomic downstream project wiring via `init-project` (`DEC-027`).
* **Status**: `ACCEPTED` (`TASK-020`–`TASK-027`, originating from approved Feature Discovery Brief `DSC-002` and `DEC-025`–`DEC-027`, completed and accepted on `main` via `EV-TASK-020-01`, `EV-TASK-024-01`, `EV-TASK-025-01`, `EV-TASK-026-01`, `EV-TASK-027-01`, and `management/validation/VALIDATION_REPORT_006.md`).

### Milestone M7: Native Multi-Agent Skill & Workflow Adapters, Metadata/Duplicate Fixes & Full Lifecycle CLI (`v0.7.0`) — *COMPLETED & ACCEPTED*
* **Objective**: Align all 6 local coding agent adapters (`Antigravity`, `Claude Code`, `Gemini CLI`, `Cline`, `Kilo Code`, `Codex`) on native `SKILL.md` directories (`DEC-028`), enable flat `~/Documents/Cline/Workflows/uesf-<name>.md` `/` menu workflow triggers alongside `~/.cline/skills/` in Cline (`DEC-029`), eliminate duplicate command directories and top-of-body compiler boilerplate leaks, enforce strict 2-key YAML frontmatter with bottom HTML-comment SHA-256 metadata, centralize installation state in `~/.uesf/install-state.json`, and deliver `install`, `update`, `check`, `doctor [--fix]`, and `uninstall` in `bin/uesf.mjs`.
* **Status**: `ACCEPTED` (`TASK-028`–`TASK-030`, merged to `main` and tagged `v0.7.0` per `DEC-029`, verified via `EV-TASK-028-01`, `EV-TASK-029-01`, `EV-TASK-030-01`, and `management/validation/VALIDATION_REPORT_007.md`).

### Milestone M8: Risk-Gated Proportional Execution, Selective Role Hardening & Bundle Template Trimming (`v0.8.0`) — *COMPLETED & ACCEPTED*
* **Objective**: Integrate risk-gated `Fast-Path` vs. `Standard-Contract` execution tracks with on-disk `IN_PROGRESS` registration and `IN_PROGRESS -> BLOCKED` mid-task Track Promotion (`core/UNIVERSAL_AGENT_OPERATING_MODEL.md` `0.3.0`, `protocols/TASK_CONTRACT_PROTOCOL.md` `0.3.0`), add selective tactical practices and anti-rationalization guardrails across 8 roles (`0.3.0`/`0.6.0`) and `workflows/HANDOFF_WORKFLOW.md` (`0.8.0`), and strip template wrapper boilerplate in `bin/uesf.mjs` (`0.8.0`) via `extractTemplateStructure()` to reduce compiled `dist/skills/` token footprint (`DSC-003`, `DEC-030`, `ESC-TASK-031-01`, `KDP-009`).
* **Status**: `ACCEPTED` (`TASK-031`, merged to `main` and tagged `v0.8.0` per `DEC-030`, verified via `EV-TASK-031-01` and `HO-TASK-031-02`).

### Milestone M9: File-Backed Operational Handoff Spool, Odd/Even Pickup, Compact Chat Cards & Uninstall History Protection (`v0.9.0`) — *COMPLETED & ACCEPTED*
* **Objective**: Standardize a gitignored flat operational handoff spool (`management/handoffs/` in UESF, `.uesf/handoffs/` in downstream projects) with paired odd/even sequence naming (`HO-TASK-XXX-01.md` / `HO-TASK-XXX-02.md`), compact 5-line chat summary cards with automatic inline fallback (`policies/SOURCE_OF_TRUTH_POLICY.md` `0.3.0`, `protocols/HANDOFF_PROTOCOL.md` `0.3.0`, `workflows/{INIT,HANDOFF,STATUS}_WORKFLOW.md`, `roles/{cto,developer}/SKILL.md`), `handoffs/` exclusion in `bin/uesf.mjs` (`0.9.0`) and `management/validation/audit.ps1`, `init-project` spool and `.gitignore` scaffolding, and strict non-empty `.uesf/handoffs/` history protection during `uesf uninstall --project` (`DSC-004`, `DEC-031`).
* **Status**: `ACCEPTED` (`TASK-032`, merged to `main` and tagged `v0.9.0` per `DEC-031`, verified via `EV-TASK-032-01` and `HO-TASK-032-02`).

### Milestone M9.1: `.gitignore`-Aware `sync-snapshot` Markdown Discovery & Universal Non-Git Fallback (`v0.9.1`) — *COMPLETED & ACCEPTED*
* **Objective**: Upgrade `runSyncSnapshot()` in `bin/uesf.mjs` (`0.9.1`) via `discoverSnapshotMdFiles()` to enumerate Markdown files using `git -c core.quotepath=false ls-files -z --cached --others --exclude-standard -- '*.md'` filtered to existing regular files on disk while always excluding `.git/`, `handoffs/`, `dist/`, and `CONTEXT_SNAPSHOT.md`, retain a deterministic non-Git fallback in `walkMdFiles()` skipping a minimal universal build/dependency set, and keep `runBuildDist()` and `management/validation/audit.ps1` unchanged (`DSC-005` `REQ-3`, `DEC-032`).
* **Status**: `ACCEPTED` (`TASK-033`, commit `b76a3c9`, merged to `main` and tagged `v0.9.1` per `DEC-032`, verified via `EV-TASK-033-01` and `HO-TASK-033-02`).

### Milestone M9.2: Uniform Single-Sentence Next-Step Action Prompt Across All 12 UESF Skills (`v0.9.2`) — *COMPLETED & ACCEPTED*
* **Objective**: Add platform-neutral closing-action rule `6.` in `core/UNIVERSAL_AGENT_OPERATING_MODEL.md` (`0.4.0`), inject matching Invariant `6.` via `coreInvariantsBlock` in `bin/uesf.mjs` (`0.9.2`) across all 12 compiled bundles, normalize legacy `/uesf:` tokens and harmonize `protocols/HANDOFF_PROTOCOL.md` (`0.4.0`) and `workflows/{INIT,HANDOFF,STATUS}_WORKFLOW.md` (`0.9.0`/`0.10.0`/`0.8.0`) with the single-sentence `**Next:**` rule (preserving the 5-line Summary Card `Next Command` line without duplication and `/uesf-init` Stage 3's 3-command welcome card exception) (`DSC-006`, `DEC-033`).
* **Status**: `ACCEPTED` (`TASK-034`, commit `ffe2f8f`, merged to `main` and tagged `v0.9.2` per `DEC-033`, verified via `EV-TASK-034-01` and `HO-TASK-034-02`).

### Milestone M9.3: Non-Destructive Existing-Repository Onboarding & Downstream Snapshot Reliability (`v0.9.3`) — *COMPLETED & ACCEPTED*
* **Objective**: Upgrade `bin/uesf.mjs` (`0.9.3`) and `scripts/hooks/pre-commit` for downstream-safe `sync-snapshot`, non-destructive `init-project` (`.uesf/.gitignore`, `core.hooksPath` & existing-hook preservation, missing-ledger skeletons), and multi-branch hook safety; update `workflows/INIT_WORKFLOW.md` (`0.10.0`) and `templates/PROJECT_EXTENSION_TEMPLATE.md` (`0.7.0`) for maturity-adaptive shallow discovery, `A0` re-audit, delta-only extensions, and exact ledger schemas; and remove redundant `initWiringBlock` (`DSC-007`, `DEC-034`).
* **Status**: `ACCEPTED` (`TASK-035`, commit `9bbfecf`, merged to `main` and tagged `v0.9.3` per `DEC-034`, verified via `EV-TASK-035-01` and `HO-TASK-035-02`).

### Milestone M9.4: WSL / `npm 9.x` `npx` Compatibility & WSL Adapter Hardening (`v0.9.4`) — *COMPLETED & ACCEPTED*
* **Objective**: Rename `"build"` to `"build-dist"` in `package.json` `scripts` to eliminate `pacote` Git-prepare failures under Ubuntu/WSL `npm 9.x`, extend `bin/uesf.mjs` (`0.9.4`) extension/CLI detection for `.vscode-server*`, `.antigravity-server`, and `~/.gemini/antigravity-cli`, replace silent `0`-target exits in `install`/`check`/`doctor` with explicit warnings/statuses, and enforce the `CLI_PACOTE_PREPARE_TRIGGER` guard in `management/validation/audit.ps1` (`DSC-008`, `DEC-035`).
* **Status**: `ACCEPTED` (`TASK-036`, commit `74ef853`, merged to `main` and tagged `v0.9.4` per `DEC-035`, verified via `EV-TASK-036-01` and `HO-TASK-036-02`).

### Milestone M10: Production Release Readiness & `A3` Human Sign-Off (`v1.0.0`) — *FUTURE (`A3` HUMAN-GATED)*
* **Objective**: Validate UESF across live feature discovery cycles and downstream project extensions, and promote to `v1.0.0` **only upon explicit `A3` Human Stakeholder release authorization** (`policies/AUTONOMY_POLICY.md`).

## 4. Responsibilities
* **CTO**: Governs phase transitions, enforces the Track 1 Feature Discovery prerequisite (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`), and ensures `v1.0.0` is never tagged without explicit `A3` human approval.

## 5. Relationships with Other Documents
* **Tasks & Releases**: `management/ACTIVE_TASKS.md`, `management/RELEASE_HISTORY.md`, `management/DECISION_LOG.md`
