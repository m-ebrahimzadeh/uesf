# UESF Context Snapshot (Machine-Generated)
> **NON-AUTHORITATIVE DERIVED ARTIFACT — DO NOT EDIT MANUALLY**
> Generated deterministically by `bin/uesf.mjs sync-snapshot` per `policies/SOURCE_OF_TRUTH_POLICY.md` (`DEC-023`, `DEC-026`).
> * **Canonical Control Plane**: `management/`
> * **Snapshot Version**: `0.9.2`
> * **Source-Ledger-SHA256**: `0a2e7802c13d3f784660f401ee590efcc8b2e8279223d50033bd9b7378d26270` (`0a2e7802c13d`)
> * **Last Ledger Update**: `2026-11-22`

## 1. Empirically Verified Repository Facts (`[VERIFIED_BY_GIT_AND_FS_PROBE]`)
* **Canonical Specification Files on Disk**: `59`
* **Registered Documents in `KNOWLEDGE_MAP.md`**: `59`
* **Missing Registered Files on Disk**: `0`
* **Unindexed Canonical Markdown Files on Disk**: `0`
* **Header-to-Registry Version Mismatches**: `0`
* **Total Recorded Tasks (`ACCEPTED` / Total)**: `35 / 35`
* **Total Recorded Decisions (`DEC-*`)**: `33`
* **Unresolved Open Questions (`OQ-*`)**: `0`

## 2. Recorded Project & Governance State (`[RECORDED_IN_LEDGER]`)
### 2.1 Project Identity & Architecture Profile (`management/PROJECT_PROFILE.md`)
# Project Profile
* **Document ID**: UESF-MGMT-001
* **Canonical Path**: management/PROJECT_PROFILE.md
* **Version**: 0.9.2
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-22

## 1. Purpose
Establish the authoritative identity, scope boundaries, canonical repository coordinates, and operational workspace topology of the Universal Engineering Skills Framework (UESF).

## 2. Scope
Applies to all milestones, tasks, and environments participating in UESF development and adoption (`README.md`).

## 3. Rules and Requirements
1. **Project Identity**:
   * **Project Name**: Universal Engineering Skills Framework (UESF)
   * **Current Version**: `0.9.2` (Milestone M9.2 — Uniform Single-Sentence Next-Step Action Prompt Across All 12 UESF Skills)
   * **Current Phase**: Milestones M1 (`v0.1.0`) through M9.2 (`v0.9.2`) Completed, Verified, and Accepted on `main` (`v1.0.0` reserved for future `A3` Human Stakeholder release gate)
   * **Canonical Local Repository Path**: `c:/Users/user/Project/uesf`
   * **Canonical Remote Git Repository**: `https://github.com/m-ebrahimzadeh/uesf` (`DEC-012`)
   * **Founding CTO & Chief Architect**: Activated (`CTO` Role, Autonomy Level `A2` for routine governance / `A3` for human-gated decisions)
2. **Delivered Architecture (`v0.9.2` — All 6 Layers + 9 Roles + 3 Workflows + Native Multi-Agent CLI)**:
   * **Layer 1 — Core Operating Model (`core/`)**: Operating model (`0.4.0` with `Fast-Path` vs. `Standard-Contract` execution tracks and `DSC-006` Single-Sentence Closing Action Prompt), 6-layer architecture with Template Target-Layer Rule (`0.3.1`), and capability taxonomy (`0.1.0`).
   * **Layer 2 — Universal Policies (`policies/`)**: Autonomy (`0.2.0` with hard `A0` discovery lock), governance, security, Git, verification, knowledge governance, and source-of-truth policy (`0.3.0`).
   * **Layer 3 — Interaction Protocols (`protocols/`)**: Feature discovery (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`), task contracts (`0.3.0` with 4 mandatory `Fast-Path` eligibility gates and `IN_PROGRESS -> BLOCKED` Track Promotion), handoffs (`0.4.0` with file-backed `<ctrlDir>/handoffs/` spool and `DSC-006` closing-action alignment), peer collaboration, task acceptance, knowledge synchronization, evidence submission, and escalation protocols.
   * **Layer 4 — Universal Agent Role Skills (`roles/`)**: Nine canonical engineering role skills (`Discovery`, `CTO` and `Developer` at `0.4.0`, `Architect`, `QA`, `DevOps`, `Security`, `SRE`, `Documentation`).
   * **Layer 5 — Platform Adapters & CLI Distribution (`adapters/`, `bin/uesf.mjs`, `dist/`)**: Runtime bindings for Antigravity/VS Code (`antigravity-vscode`), Gemini Strategic Workspace (`gemini-strategic-workspace`), and portable CLI/MCP hosts (`generic-cli-mcp`), installing native per-agent `skills/` directories (plus flat `/` menu workflow triggers in Cline per `DEC-029`) tracked in `~/.uesf/install-state.json`, with `.gitignore`-aware snapshot discovery (`DEC-032`) and uniform `DSC-006` `coreInvariantsBlock` propagation across all 12 bundles (`DEC-033`).
   * **Layer 6 — Project-Specific Extensions (`extensions/`)**: Extension isolation standard (`extensions/README.md`), template (`templates/PROJECT_EXTENSION_TEMPLATE.md`), and reference web-service blueprint (`extensions/example-web-service/EXTENSION.md`).
3. **Dual-Environment Operating Topology**:
   * **Strategic Workspace (`adapters/gemini-strategic-workspace/ADAPTER.md`)**: Gemini 4 Argon with connected Shared Workspace (`UNIVERSAL ENGINEERING SKILLS` Gemini Notebook & Google Workspace).
   * **Engineering Workspace (`adapters/antigravity-vscode/ADAPTER.md`)**: Antigravity inside VS Code (Gemini 4 Hydrogen primary coding agent; Gemini 4 Argon Orchestrator / Gemini 3.8 Flash optional).

## 4. Responsibilities
* **CTO**: Keeps this profile accurate as milestones are completed and new extensions or adapters are onboarded.

## 5. Relevant Workflows
1. **Milestone Profile Update**: Upon milestone implementation and acceptance (`protocols/TASK_ACCEPTANCE_PROTOCOL.md`), update Current Version and Current Phase in concert with `management/RELEASE_HISTORY.md`.

## 6. Relationships with Other Documents
* **Roadmap & Releases**: `management/IMPLEMENTATION_ROADMAP.md`, `management/RELEASE_HISTORY.md`
* **Tasks & Decisions**: `management/ACTIVE_TASKS.md`, `management/DECISION_LOG.md`, `management/KNOWLEDGE_MAP.md`
* **Discovery, Adapters & Extensions**: `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `adapters/README.md`, `extensions/README.md`
* **Lifecycle Workflows**: `workflows/INIT_WORKFLOW.md`, `workflows/HANDOFF_WORKFLOW.md`, `workflows/STATUS_WORKFLOW.md`

### 2.2 Active & Recent Task Ledger (`management/ACTIVE_TASKS.md`)
# Active Tasks Registry
* **Document ID**: UESF-MGMT-002
* **Canonical Path**: management/ACTIVE_TASKS.md
* **Version**: 0.9.2
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-22

## 1. Purpose
Track all active, pending, and completed UESF tasks with unique identifiers, assigned roles, autonomy levels, states, and verification evidence links.

## 2. Scope
Covers all tasks across UESF development phases (`protocols/TASK_CONTRACT_PROTOCOL.md`).

## 3. Rules and Requirements
1. **Task ID Format**: `TASK-XXX` for primary tasks; `TASK-XXX.Y` for bounded delegated sub-tasks.
2. **State Discipline**: No task may be marked `VERIFIED` or `ACCEPTED` without a linked Evidence Package (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`).

## 4. Current Task Registry
| Task ID | Title | Responsible Role | Reviewer Role | Target Workspace | Autonomy | State | Evidence / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TASK-000` | Mission 001: Project Initialization, Foundational Architecture, Policies, Protocols & Governance | CTO | Human Stakeholder / CTO | Strategic Workspace | `A2` | `ACCEPTED` | `EV-TASK-000-01` (`management/validation/VALIDATION_REPORT_001.md`). |
| `TASK-001` | Materialize UESF v0.1.0 Foundation in Local Git Repository | DevOps / Developer | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-001-01` (`HO-TASK-001-02`, commit `288d6dc` on `main`). Accepted via `DEC-011`. |
| `TASK-002` | Define Universal Role Skill Standard Schema & Reusable Protocol Templates (`templates/`) | Architect | CTO | Strategic & Engineering | `A2` | `ACCEPTED` | `EV-TASK-002-01` (`HO-TASK-002-02`, commit `ff33485` / `8d46a45`). Accepted via `DEC-011`. |
| `TASK-003` | Author Governance, Architecture & Knowledge Role Skills (`CTO`, `Architect`, `Documentation`) | Architect / CTO | CTO | Strategic & Engineering | `A2` | `ACCEPTED` | `EV-TASK-002-01` (`HO-TASK-002-02`, commit `ff33485`). Accepted via `DEC-011`. |
| `TASK-004` | Author Implementation & Quality Role Skills (`Developer`, `QA`) | Architect / QA | CTO | Strategic & Engineering | `A2` | `ACCEPTED` | `EV-TASK-002-01` (`HO-TASK-002-02`, commit `ff33485`). Accepted via `DEC-011`. |
| `TASK-005` | Author Infrastructure, Security & Reliability Role Skills (`DevOps`, `Security`, `SRE`) | Architect / Security | CTO | Strategic & Engineering | `A2` | `ACCEPTED` | `EV-TASK-002-01` (`HO-TASK-002-02`, commit `ff33485`). Accepted via `DEC-011`. |
| `TASK-006` | Cross-Role Interaction Dry-Run & Consistency Audit (`v0.2.0` Release Sign-Off) | CTO / QA | CTO | Strategic & Engineering | `A2` | `ACCEPTED` | `EV-TASK-006-01` (`management/validation/VALIDATION_REPORT_002.md`) & `EV-TASK-002-01`. |
| `TASK-007` | Define Platform Adapter Template (`templates/PLATFORM_ADAPTER_TEMPLATE.md`), Layer 5 Index (`adapters/README.md`) & `.gitattributes` (`KDP-001`) | Architect / DevOps | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-007-01` (`HO-TASK-007-02`, commit `f548df7` / `0fa8bbe`). Accepted via `DEC-014`. |
| `TASK-008` | Author Antigravity / VS Code Engineering Workspace Adapter (`adapters/antigravity-vscode/ADAPTER.md`) | DevOps / Developer | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-007-01` (`HO-TASK-007-02`, commit `f548df7`). Accepted via `DEC-014`. |
| `TASK-009` | Author Gemini Strategic Workspace & Generic CLI/MCP Adapters (`adapters/gemini-strategic-workspace/ADAPTER.md`, `adapters/generic-cli-mcp/ADAPTER.md`) | Architect / DevOps | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-007-01` (`HO-TASK-007-02`, commit `f548df7`). Accepted via `DEC-014`. |
| `TASK-010` | Milestone M3 Layer-Isolation Audit (`VALIDATION_REPORT_003.md`) & `v0.3.0` Registry Synchronization (`KDP-002`) | CTO / QA | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-010-01` (`management/validation/VALIDATION_REPORT_003.md`) & `EV-TASK-007-01`. |
| `TASK-011` | Author Layer 6 Project Extension Suite (`templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`, `extensions/example-web-service/EXTENSION.md`) | Architect / Developer | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-011-01` (`bc931bf`, re-versioned to `0.4.0` per `DEC-017`). |
| `TASK-012` | Harmonize `CAP-WEB` Capability Tokens (`KDP-003`) & Strict `* **Owner**:` Validation Report Headers (`KDP-004`) | Documentation / DevOps | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-011-01` (`bc931bf`). |
| `TASK-013` | Execute Milestone M4 Layer 6 Validation (`VALIDATION_REPORT_004.md`) | CTO / QA | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-014-01` (`management/validation/VALIDATION_REPORT_004.md`, re-versioned to `0.4.0` per `DEC-017`). |
| `TASK-014` | Working-Tree LF Normalization (`KDP-007`) & `*XXX*` Placeholder Recognition (`KDP-006`) | DevOps / QA | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-014-01` (`b9dd930` / `e9f4e02`; `v1.0.0` tag rolled back per `DEC-017`). |
| `TASK-015` | Roll Back Premature `v1.0.0` Tag (`DEC-017`, `A3`) & Re-Version Milestone M4 Artifacts to `0.4.0` | DevOps | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-015-01` (`HO-TASK-015-02`, commit `e7d8b2b`). Accepted via `DEC-020`. |
| `TASK-016` | Implement Template Target-Layer Architecture (`DEC-018`) & Restore Concrete Links in `UESF-TMPL-007`/`008` | Architect / Developer | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-015-01` (`HO-TASK-015-02`, commit `e7d8b2b`). Accepted via `DEC-020`. |
| `TASK-017` | Author 9th Role `Discovery` (`roles/discovery/SKILL.md`), `FEATURE_DISCOVERY_PROTOCOL.md` & `FEATURE_DISCOVERY_BRIEF_TEMPLATE.md` (`DEC-019`) | Architect / CTO | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-015-01` (`HO-TASK-015-02`, commit `e7d8b2b`). Accepted via `DEC-020`. |
| `TASK-018` | Commit Versioned Cumulative Audit Script (`management/validation/audit.ps1`), Author `VALIDATION_REPORT_005.md` & Sync Registries to `0.5.0` | QA / DevOps | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-015-01` (`management/validation/VALIDATION_REPORT_005.md`). Accepted via `DEC-020`. |
| `TASK-019` | Close Out Accepted Milestone M5 (`v0.5.0`) Registries & Merge `feat/TASK-015-discovery-role-v0.5.0` to `main` | DevOps / Documentation | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-019-01` (`HO-TASK-019-02`, merged to `main` per `DEC-020`). |
| `TASK-020` | Author Lifecycle Workflows (`workflows/{INIT,HANDOFF,STATUS}_WORKFLOW.md`) & Update Architecture/Policies for 3-Domain Model (`DEC-021`, `DEC-022`) | Architect / CTO | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-020-01` (`HO-TASK-020-02`, commit `c6d894e`). Accepted via `DEC-024`. |
| `TASK-021` | Implement Automatic Snapshot Generator (`scripts/sync-snapshot.*`, `scripts/hooks/pre-commit`) & Generate `management/CONTEXT_SNAPSHOT.md` (`DEC-023`) | DevOps / Developer | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-020-01` (`HO-TASK-020-02`, commit `c6d894e`). Accepted via `DEC-024`. |
| `TASK-022` | Implement Deterministic Bundle Compiler (`scripts/build-dist.*`) & Multi-Agent Installer (`scripts/install.*`), Compiling 12 Bundles into `dist/` | DevOps / Developer | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-020-01` (`HO-TASK-020-02`, commit `c6d894e`). Accepted via `DEC-024`. |
| `TASK-023` | Upgrade `management/validation/audit.ps1` (`SNAPSHOT_DRIFT`, `DIST_DRIFT`), Author `VALIDATION_REPORT_006.md` & Sync Registries to `0.6.0` | QA / DevOps | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-020-01` (`management/validation/VALIDATION_REPORT_006.md`). Accepted via `DEC-024`. |
| `TASK-024` | Close Out Accepted Milestone M6 (`v0.6.0`) Registries, Refresh `CONTEXT_SNAPSHOT.md` & Merge `feat/TASK-020-skill-distribution-v0.6.0` to `main` | DevOps / Documentation | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-024-01` (`HO-TASK-024-02`, merged to `main` per `DEC-024`). |
| `TASK-025` | Redesign `README.md` for Newcomer Onboarding, Make `/uesf:init` Bundle Self-Contained & Release `v0.6.1` (`DEC-025`) | Documentation / DevOps | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-025-01` (`HO-TASK-025-02`, merged to `main` per `DEC-025`). |
| `TASK-026` | Implement Zero-Dependency Node.js CLI (`package.json` + `bin/uesf.mjs`), Consolidate Scripts & Release `v0.6.2` (`DEC-026`) | DevOps / Developer | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-026-01` (`HO-TASK-026-02`, merged to `main` and tagged `v0.6.2` per `DEC-026`). |
| `TASK-027` | Add `init-project` Downstream Wiring to `bin/uesf.mjs`, Update `INIT_WORKFLOW.md` & Release `v0.6.3` (`DEC-027`) | DevOps / Developer | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-027-01` (`HO-TASK-027-02`, merged to `main` and tagged `v0.6.3` per `DEC-027`). |
| `TASK-028` | Forensic Multi-Agent Discovery Audit Across Antigravity, Kilo Code, Codex, Claude Code, Gemini CLI & Cline (`DEC-028`) | QA / DevOps | CTO | Engineering Workspace | `A0` | `ACCEPTED` | `EV-TASK-028-01` (`management/validation/VALIDATION_REPORT_007.md`). |
| `TASK-029` | Fix Duplicate Commands & Description Metadata in Claude Code and Gemini CLI, Migrate Cline to Native Skills Only, Implement `install`/`update`/`check`/`doctor`/`uninstall` in `bin/uesf.mjs` & Stage `v0.7.0` (`DEC-028`) | DevOps / Developer / QA | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-029-01` (`HO-TASK-029-02` on branch `feat/TASK-029-native-agent-installer-v0.7.0`, accepted via `DEC-029`; `management/validation/VALIDATION_REPORT_007.md`). |
| `TASK-030` | Enable Cline `/` Menu Workflow Triggers + Native Skills, Close Out Milestone M7 (`v0.7.0`) Registries & Merge to `main` (`DEC-029`) | DevOps / Developer / QA | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-030-01` (`HO-TASK-030-02`, merged to `main` and tagged `v0.7.0` per `DEC-029`). |
| `TASK-031` | Implement Risk-Gated Proportional Execution (`DSC-003` / `DEC-030`), Selective Role Hardening, Bundle Template Trimming & Release `v0.8.0` | Developer / Documentation / DevOps | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-031-01` (`HO-TASK-031-02`, `ESC-TASK-031-01` / `KDP-009` adjudicated by CTO `A2`, merged to `main` and tagged `v0.8.0` per `DEC-030`). |
| `TASK-032` | Implement File-Backed Operational Handoff Spool (`<ctrlDir>/handoffs/`), Odd/Even Pickup, Compact Chat Cards, Uninstall History Protection & Release `v0.9.0` (`DSC-004` / `DEC-031`) | Developer / DevOps / Documentation / QA | CTO | Strategic & Engineering | `A1` | `ACCEPTED` | `EV-TASK-032-01` (`management/handoffs/HO-TASK-032-02.md`, merged to `main` and tagged `v0.9.0` per `DEC-031`). |
| `TASK-033` | Implement `.gitignore`-Aware Markdown Discovery & Universal Non-Git Fallback for `sync-snapshot` in `bin/uesf.mjs` (`DSC-005` `REQ-3`) | Developer | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-033-01` (`management/handoffs/HO-TASK-033-02.md`, commit `b76a3c9`, merged to `main` and tagged `v0.9.1` per `DEC-032`). |
| `TASK-034` | Implement Uniform Single-Sentence Next-Step Action Prompt Across All 12 UESF Skills (`DSC-006`) | Developer | CTO | Engineering Workspace | `A1` | `ACCEPTED` | `EV-TASK-034-01` (`management/handoffs/HO-TASK-034-02.md`, commit `ffe2f8f`, merged to `main` and tagged `v0.9.2` per `DEC-033`). |

## 5. Active Outbound Task Contract Queue
* Milestones M1 (`v0.1.0`) through M9.2 (`v0.9.2`, `TASK-000`–`TASK-034`) are **COMPLETED, VERIFIED, AND ACCEPTED** on `main` (tagged `v0.9.2`).
* All 12 UESF skills (`/uesf-discovery`, `/uesf-cto`, `/uesf-architect`, `/uesf-developer`, `/uesf-qa`, `/uesf-devops`, `/uesf-security`, `/uesf-sre`, `/uesf-documentation`, `/uesf-init`, `/uesf-handoff`, `/uesf-status`) are compiled in `dist/` and managed across native agent `skills/` directories (plus flat `~/Documents/Cline/Workflows/uesf-<name>.md` `/` menu workflow triggers in Cline) via `bin/uesf.mjs` and `~/.uesf/install-state.json`.
* Operational handoffs across sessions and environments exchange paired odd/even Markdown files inside the gitignored flat `<ctrlDir>/handoffs/` spool (`management/handoffs/` in UESF, `.uesf/handoffs/` in downstream projects) per `protocols/HANDOFF_PROTOCOL.md` (`0.4.0`) and `DEC-031`/`DEC-033`.
* Any future feature proposal or architectural enhancement enters through Track 1 Iterative Discovery (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `roles/discovery/SKILL.md`) locked at `A0` until explicit human confirmation.

## 6. Relationships with Other Documents
* **Protocols**: `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Roadmap & Decisions**: `management/IMPLEMENTATION_ROADMAP.md`, `management/DECISION_LOG.md`

### 2.3 Architectural & Governance Decisions (`management/DECISION_LOG.md`)
# Architectural & Governance Decision Log
* **Document ID**: UESF-MGMT-003
* **Canonical Path**: management/DECISION_LOG.md
* **Version**: 0.9.2
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-22

## 1. Purpose
Maintain an immutable, auditable ledger of all confirmed stakeholder constraints, CTO architectural and governance decisions, adjudicated Knowledge Discovery Proposals (`KDP-*`), and resolved open questions.

## 2. Scope
Governs all structural, policy, protocol, role, adapter, and project extension decisions across UESF (`policies/GOVERNANCE_POLICY.md`).

## 3. Confirmed & Approved Decisions
| Decision ID | Category | Decision Summary | Status | Authority | Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DEC-001` | Role Topology | Establish exactly 8 initial universal engineering agent roles: `CTO`, `Architect`, `Developer`, `QA`, `DevOps`, `Security`, `SRE`, `Documentation`. Explicit role activation is required. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-002` | Task Acceptance | Use tiered task acceptance: routine low-risk tasks are accepted by the designated independent reviewer role; the CTO governs cross-functional milestones, foundational specs, and high-impact changes. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-003` | Git Governance | Branches are the default for all code/spec changes. Small, isolated, low-risk changes (and initial repo bootstrap) may commit directly to `main` only when explicitly authorized in the Task Contract and verified. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-004` | Hybrid Knowledge Backend | Use a hybrid arrangement combining the Project Git Repository and Connected Shared Workspace, with a strict Single Source of Truth per document registered in `management/KNOWLEDGE_MAP.md`. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-005` | Multi-Agent Collaboration | Permit bounded direct agent-to-agent subtask delegation within an approved Task Contract without mandatory CTO mediation; original task owner retains full accountability. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-006` | Knowledge Ownership | The CTO is the primary curator and sole approver of authoritative project knowledge. Documentation agents maintain approved artifacts but cannot redefine normative decisions. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-007` | Phased Delivery Strategy | Build the platform-independent universal foundation first (M1), followed by the 8 universal Role Skills (M2), platform adapters (M3), and project-specific extensions last (M4). | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-008` | Autonomy Model | Standardize on four autonomy levels: `A0` (Advisory), `A1` (Bounded Execution), `A2` (Autonomous Execution within scope), and `A3` (Human Approval Required). | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-009` | Six-Layer Directory Architecture | Organize the repository into `core/`, `policies/`, `protocols/`, `management/`, `roles/`, `adapters/`, `templates/`, and `extensions/` with strict unidirectional dependencies (`core -> policies -> protocols -> roles -> adapters -> extensions`). | Approved | CTO (`A2`) | 2026-11-16 |
| `DEC-010` | Strategic Workspace Staging & Repo Transition | Persist foundational specifications in the Strategic Workspace as `Approved (Staged)` and dispatch `TASK-001` (`HO-TASK-001-01`) to materialize the Git repository in Antigravity/VS Code. | Approved | CTO (`A2`) | 2026-11-16 |
| `DEC-011` | Milestone M1 (`v0.1.0`) & M2 (`v0.2.0`) Acceptance | Formally accept `TASK-001` (`288d6dc`) and `TASK-002`–`TASK-006` (`ff33485` / `8d46a45`) based on verified Evidence Packages `EV-TASK-001-01` and `EV-TASK-002-01`. | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-012` | Canonical GitHub Remote & Handoff Bridge (`OQ-001` & `OQ-002`) | Designate `https://github.com/m-ebrahimzadeh/uesf` (`c:/Users/user/Project/uesf`) as the canonical Git repository (`OQ-001`) and standardize on explicit Markdown Handoff Packages (`HO-TASK-XXX`) coupled with Layer 5 Adapter profiles (`OQ-002`). | Confirmed | Human Stakeholder / CTO | 2026-11-17 |
| `DEC-013` | Cross-Platform Line-Ending Normalization (`KDP-001`) & Layer 5 Adapter Suite | Adopt `.gitattributes` (`* text=auto eol=lf` for `.md`/`.sh`) per `KDP-001` and establish three canonical Layer 5 Platform Adapters (`antigravity-vscode`, `gemini-strategic-workspace`, `generic-cli-mcp`) governed by `templates/PLATFORM_ADAPTER_TEMPLATE.md`. | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-014` | Milestone M3 (`v0.3.0`) Acceptance & `KDP-003`/`KDP-004` Harmonization | Formally accept `TASK-007`–`TASK-010` (`f548df7` / `0fa8bbe`) based on `EV-TASK-007-01`, harmonize `CAP-WEB` in `adapters/` (`KDP-003`), and add explicit `* **Owner**: CTO` metadata headers to `VALIDATION_REPORT_001.md` and `VALIDATION_REPORT_002.md` (`KDP-004`). | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-015` | Layer 6 Project Extension Isolation & `v1.0.0` Full-Stack Baseline | Establish `templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`, and the vendor-neutral reference blueprint `extensions/example-web-service/EXTENSION.md` to complete all 6 architectural layers for `v1.0.0` without introducing external product lock-in. | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-016` | Milestone M4 Audit Harmonization (`KDP-005`–`KDP-007`) | Resolved `*XXX*` placeholder tokens (`KDP-006`) and normalized working-tree files to `w/lf` (`KDP-007`); initial template link stripping and `v1.0.0` tag superseded by `DEC-017` and `DEC-018`. | Superseded (Partially by `DEC-017`/`DEC-018`) | CTO (`A2`) | 2026-11-17 |
| `DEC-017` | Rollback of Premature `v1.0.0` Tag & Re-Versioning of M4 to `v0.4.0` | Delete tag `v1.0.0` locally and on `origin`, re-version Milestone M4 Layer 6 artifacts from `1.0.0` to `0.4.0`, designate Milestone M5 as `v0.5.0`, and reserve `v1.0.0` strictly for an explicit future `A3` Human Stakeholder release gate (`DSC-001` Q1). | Confirmed | Human Stakeholder (`A3`) | 2026-11-17 |
| `DEC-018` | Template Target-Layer Rule & Versioned Cumulative Audit Script | Define `* **Target Layer**: Layer N` metadata for all `templates/*.md` in `core/FRAMEWORK_ARCHITECTURE.md` (`0.2.0`) so templates targeting Layer `N` may link to canonical specs in Layers `<= N` (restoring `adapters/README.md` and `extensions/README.md` in `UESF-TMPL-007` and `UESF-TMPL-008`), and commit a cumulative verification script at `management/validation/audit.ps1` (`DSC-001` Q2). | Approved | CTO (`A2`) / Human Stakeholder | 2026-11-17 |
| `DEC-019` | Addition of 9th Universal Agent Role (`Discovery`) & Iterative Discovery Protocol | Expand `DEC-001` from 8 to 9 canonical roles by introducing `Discovery` (`roles/discovery/SKILL.md`), `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, and `templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md` with a hard `A0` zero-mutation gate requiring iterative refinement until explicit human confirmation (`DSC-001` Q3 — Option A). | Confirmed | Human Stakeholder (`A3`) | 2026-11-17 |
| `DEC-020` | Milestone M5 (`v0.5.0`) Acceptance & Merge to `main` | Formally accept `TASK-015`–`TASK-018` (`e7d8b2b`) based on verified Evidence Package `EV-TASK-015-01` (`MD_COUNT=54`, `ROLE_COUNT=9`, `V1_TAG_COUNT=0`, 0 audit failures across all 19 checks) and authorize merge of `feat/TASK-015-discovery-role-v0.5.0` into `main`. | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-021` | 12-Command Compiled Skill Distribution & Multi-Agent Installer (`DSC-002`) | Compile the 9 Universal Role Skills (`roles/*/SKILL.md`) and 3 Lifecycle Workflows (`workflows/{INIT,HANDOFF,STATUS}_WORKFLOW.md`) via `scripts/build-dist.ps1` into self-contained `dist/` packages (`skills/`, `commands/`, `gemini-cli/`, `manifest.json`) installed via `scripts/install.ps1` (atomic copy default, `-Check`, `-Link`), without an always-on Micro-Kernel and keeping MCP optional. | Confirmed | Human Stakeholder (`A3`) | 2026-11-17 |
| `DEC-022` | Three-Domain Knowledge Partitioning & Unified `/uesf:status` (`DSC-002`) | Separate Universal UESF Knowledge (`uesf/` & `dist/`), Permanent Project Documentation (native project `docs/` indexed by `.uesf/KNOWLEDGE_MAP.md`), and Operational Project State (`.uesf/{EXTENSION,KNOWLEDGE_MAP,ACTIVE_TASKS,DECISION_LOG,CONTEXT_SNAPSHOT}.md` using standard `TASK-XXX`/`DEC-XXX` IDs), with `/uesf:status` serving as the unified session-entry and context-reconstruction workflow and `/uesf:handoff` serving as the session-exit packaging workflow. | Confirmed | Human Stakeholder (`A3`) | 2026-11-17 |
| `DEC-023` | Automatic Machine-Generated `CONTEXT_SNAPSHOT.md` (`DSC-002` Refinement A) | Maintain `CONTEXT_SNAPSHOT.md` automatically via `scripts/sync-snapshot.*`, `.git/hooks/pre-commit`, and on-read refresh in `/uesf:status` (verified by `SNAPSHOT_DRIFT_ISSUES=0` in `management/validation/audit.ps1`), strictly separating `[VERIFIED_BY_GIT_AND_FS_PROBE]` facts from `[RECORDED_IN_LEDGER]` tables and `[DRIFT_CHECK]` alerts. | Confirmed | Human Stakeholder (`A3`) | 2026-11-17 |
| `DEC-024` | Milestone M6 (`v0.6.0`) Acceptance, `KDP-008` Approval & Merge to `main` | Formally accept `TASK-020`–`TASK-023` (`c6d894e`) based on verified Evidence Package `EV-TASK-020-01` (`MD_COUNT=58`, `WORKFLOW_COUNT=3`, `DIST_BUNDLE_ISSUES=0`, `SNAPSHOT_DRIFT_ISSUES=0`, 5 host agent targets `UP_TO_DATE`), approve `KDP-008` (PowerShell 5.1 ASCII/UTF-8 safety, `.uesf/scripts/` root resolution, and `100755` POSIX script modes), and authorize merge of `feat/TASK-020-skill-distribution-v0.6.0` into `main`. | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-025` | Newcomer Onboarding Guide (`README.md`), Self-Contained `/uesf:init` Bundle & Installer Quickstart (`v0.6.1`) | Redesign `README.md` (`0.6.1`) around the 5-stage newcomer journey (Discover, Install, Configure, Get Started, Maintain) while preserving the 58-document master specification index; embed `sync-snapshot.*` and `pre-commit` directly inside the compiled `uesf-init` bundle (`workflows/INIT_WORKFLOW.md` `0.6.1`) so `/uesf:init` scaffolds `.uesf/` self-containedly in any repository; and add a post-install quickstart summary to `scripts/install.ps1`. | Confirmed | Human Stakeholder / CTO (`A2`) | 2026-11-17 |
| `DEC-026` | Zero-Dependency Node.js CLI (`package.json` + `bin/uesf.mjs`) & Script Consolidation (`v0.6.2`) | Adopt `package.json` + `bin/uesf.mjs` (`dependencies: {}`) inside the UESF repository as the primary cross-platform CLI for `install` (`npx github:m-ebrahimzadeh/uesf install`), `check`, `sync-snapshot`, and `build` with `--version <ref>` support; refactor `scripts/*.ps1`, `scripts/*.sh`, and `scripts/hooks/pre-commit` into thin pass-through wrappers calling `bin/uesf.mjs` so zero duplicate logic is maintained; and defer `npmjs.com` registry publishing until a mature release. | Confirmed | Human Stakeholder / CTO (`A2`) | 2026-11-17 |
| `DEC-027` | Downstream `/uesf:init` CLI Engine Wiring (`init-project` Subcommand, `v0.6.3`) | Add `init-project [path]` subcommand (and standalone `--init-project` behavior) to `bin/uesf.mjs` (`0.6.3`) and update `workflows/INIT_WORKFLOW.md` (`0.6.3`) so downstream projects initialized via `/uesf:init` receive `.uesf/bin/uesf.mjs`, `.uesf/scripts/sync-snapshot.{ps1,sh}`, `.git/hooks/pre-commit`, and an initial `.uesf/CONTEXT_SNAPSHOT.md` in one step without dead wrapper references. | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-028` | Forensic Multi-Agent Native Skills Alignment, Removal of Duplicate Command/Workflow Paths & Full Lifecycle CLI (`v0.7.0`) | Standardize on native single-skill `SKILL.md` installation per local agent (`~/.gemini/config/skills/`, `~/.claude/skills/`, `~/.gemini/skills/`, `~/.cline/skills/`, `~/.kilo/skills/`, `~/.codex/skills/`) with strict 2-key YAML frontmatter (`name` and JSON-quoted `description`, zero `version:` key), eliminate top-of-body `> **NON-AUTHORITATIVE` boilerplate in favor of a bottom HTML comment provenance footer (`<!-- UESF-BUNDLE-METADATA: ... -->`), remove duplicate `commands/uesf` and `Workflows/uesf*` files in Claude Code / Gemini CLI / Cline / Kilo Code / Antigravity, centralize state in `~/.uesf/install-state.json` (zero `.uesf-manifest.json` files inside agent directories), and implement `install`, `update`, `check`, `doctor [--fix]`, and `uninstall` in `bin/uesf.mjs` (`TASK-028`, `TASK-029`). | Approved | CTO (`A2`) | 2026-11-17 |
| `DEC-029` | Milestone M7 (`v0.7.0`) Live UI Sign-Off, Dual Cline `/` Workflow + Skill Integration & Merge to `main` | Following live UI confirmation across Antigravity, Kilo Code, Codex, Claude Code, and Gemini CLI, enable flat `~/Documents/Cline/Workflows/uesf-<name>.md` `/` menu triggers alongside `~/.cline/skills/uesf-<name>/SKILL.md` in the Cline adapter, formally accept `TASK-029` and `TASK-030`, and authorize merging `feat/TASK-029-native-agent-installer-v0.7.0` into `main` with tag `v0.7.0`. | Confirmed | Human Stakeholder (`A3`) / CTO (`A2`) | 2026-11-17 |
| `DEC-030` | Milestone M8 (`v0.8.0`) Risk-Gated Proportional Execution, On-Disk `IN_PROGRESS` Fast-Path Lifecycle, Selective Role Hardening & Bundle Template Trimming (`DSC-003`, `ESC-TASK-031-01`, `KDP-009`) | Adopt the refined `DSC-003` scope for `v0.8.0` (with CTO `A2` discrepancy adjudication per `ESC-TASK-031-01` / `KDP-009`): (1) integrate risk-gated `Fast-Path` vs. `Standard-Contract` execution tracks into `core/UNIVERSAL_AGENT_OPERATING_MODEL.md` (`0.3.0`, rule `5.`) and `protocols/TASK_CONTRACT_PROTOCOL.md` (`0.3.0`, rule `5.`) with 4 mandatory eligibility gates, orthogonality to `A1`/`A2` autonomy, pre-implementation `IN_PROGRESS` registration in `ACTIVE_TASKS.md`, and `IN_PROGRESS -> BLOCKED` mid-task Track Promotion; (2) add selective tactical practices and anti-rationalization guardrails to 8 roles (`0.3.0` for 7 roles, `0.6.0` for `discovery`, preserving the 8 canonical `ROLE_SKILL_TEMPLATE.md` H2 sections) and `HANDOFF_WORKFLOW.md` (`0.8.0`) while leaving `documentation`, `init`, and `status` untouched; (3) extract actionable fenced markdown blocks and schema rules via `extractTemplateStructure()` in `bin/uesf.mjs` (`0.8.0`) to strip template wrapper boilerplate for a net line and byte reduction across `dist/skills/`; and (4) keep P2 (trigger evals) and P5 (plugin manifests) deferred. | Confirmed | Human Stakeholder (`A3`) / CTO (`A2`) | 2026-11-18 |
| `DEC-031` | Milestone M9 (`v0.9.0`) File-Backed Operational Handoff Spool (`<ctrlDir>/handoffs/`), Odd/Even Sequence Pickup, Compact Chat Cards & Uninstall History Protection (`DSC-004`) | Standardize a single flat, gitignored operational handoff spool directory (`management/handoffs/` in UESF and `.uesf/handoffs/` in downstream projects) pairing Outbound (`HO-TASK-XXX-01.md`) and Inbound (`HO-TASK-XXX-02.md` with embedded `EV-TASK-XXX`) packages by Task ID (`policies/SOURCE_OF_TRUTH_POLICY.md` `0.3.0`, `protocols/HANDOFF_PROTOCOL.md` `0.3.0`); emit compact 5-line Dispatch/Return summary cards in chat when `CAP-FS`/`CAP-MCP` is available with automatic inline-chat fallback; exclude `handoffs/` from `walkMdFiles()` in `bin/uesf.mjs` (`0.9.0`) and `$mdFiles` in `management/validation/audit.ps1` so local handoff files never cause snapshot or `KNOWLEDGE_MAP.md` drift; scaffold `.uesf/handoffs/` and `.gitignore` during `init-project`; and strictly preserve non-empty `.uesf/handoffs/` history during `uesf uninstall --project`. | Confirmed | Human Stakeholder (`A3`) / CTO (`A2`) | 2026-11-18 |
| `DEC-032` | `.gitignore`-Aware `sync-snapshot` Discovery, Universal Non-Git Fallback & Patch Release `v0.9.1` (`DSC-005` `REQ-3` / `TASK-033`) | Accept `TASK-033` (`EV-TASK-033-01` / `HO-TASK-033-02`, commit `b76a3c9`) and release `v0.9.1`: upgrade `runSyncSnapshot()` in `bin/uesf.mjs` (`0.9.1`) via `discoverSnapshotMdFiles()` to enumerate Markdown files using `git -c core.quotepath=false ls-files -z --cached --others --exclude-standard -- '*.md'` filtered to existing regular files on disk while always excluding `.git/`, `handoffs/`, `dist/`, and `CONTEXT_SNAPSHOT.md`; retain a deterministic non-Git fallback in `walkMdFiles()` skipping a minimal universal build/dependency set (`node_modules`, `.venv`, `venv`, `vendor`, `target`, `.next`, `build`, `coverage`, `dist`, `handoffs`, `.git`); and keep `runBuildDist()` explicit `sourceDirs` scanning and strict `management/validation/audit.ps1` repo enumeration untouched. | Approved | CTO (`A2`) / Human Stakeholder (`DSC-005`) | 2026-11-20 |
| `DEC-033` | Uniform Single-Sentence Closing Action Prompt Across All 12 UESF Skills & Patch Release `v0.9.2` (`DSC-006` / `TASK-034`) | Accept `TASK-034` (`EV-TASK-034-01` / `HO-TASK-034-02`, commit `ffe2f8f`) and release `v0.9.2`: add platform- and syntax-neutral Rule `6.` in `core/UNIVERSAL_AGENT_OPERATING_MODEL.md` (`0.4.0`) requiring every UESF skill or workflow response to conclude with one concise, actionable closing sentence (`**Next:** ...`) recommending the single best ready-to-use invocation command on completion/handoff or the exact in-chat reply/approval/unblock action when paused at `A0`/`A3`/`BLOCKED`; propagate matching Invariant `6.` via `coreInvariantsBlock` in `bin/uesf.mjs` (`0.9.2`) across all 12 compiled bundles; normalize legacy `/uesf:` command syntax and harmonize `protocols/HANDOFF_PROTOCOL.md` (`0.4.0`), `workflows/HANDOFF_WORKFLOW.md` (`0.10.0`), `workflows/STATUS_WORKFLOW.md` (`0.8.0`), and `workflows/INIT_WORKFLOW.md` (`0.9.0`) (preserving the 5-line Summary Card `Next Command` line without duplication and `/uesf-init` Stage 3's 3-command newcomer welcome card exception). | Approved | CTO (`A2`) / Human Stakeholder (`DSC-006`) | 2026-11-22 |

## 4. Open Questions & Pending Human Decisions (`A3` / Clarification Items)
| Question ID | Topic | Resolution Summary | Status |
| :--- | :--- | :--- | :--- |
| `OQ-001` | Canonical Remote Git Hosting & Path | Resolved via `DEC-012`: Local path `c:/Users/user/Project/uesf` bound to GitHub remote `https://github.com/m-ebrahimzadeh/uesf`. | **Closed (Resolved)** |
| `OQ-002` | Automated vs. Manual Workspace-to-Repo Bridge | Resolved via `DEC-012`: Explicit Markdown Handoff Packages (`HO-TASK-XXX`) with Layer 5 Adapter profiles (`adapters/`). | **Closed (Resolved)** |

## 5. Responsibilities
* **CTO**: Records all architectural and governance rulings and adjudicates `KDP-*` proposals.

## 6. Relationships with Other Documents
* **Governance & Knowledge**: `policies/GOVERNANCE_POLICY.md`, `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `protocols/KNOWLEDGE_SYNCHRONIZATION.md`
* **Management**: `management/PROJECT_PROFILE.md`, `management/ACTIVE_TASKS.md`, `management/IMPLEMENTATION_ROADMAP.md`

### 2.4 Master Knowledge Map Routing Index (`management/KNOWLEDGE_MAP.md`)
# Master Knowledge Map & Source-of-Truth Registry
* **Document ID**: UESF-MGMT-004
* **Canonical Path**: management/KNOWLEDGE_MAP.md
* **Version**: 0.9.2
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-22

## 1. Purpose
Maintain the single authoritative registry mapping every canonical UESF specification document to its unique Document ID, canonical repository path, architectural layer, owner role, version, and verification status.

## 2. Scope
Covers all 59 canonical Markdown documents across the UESF repository (`policies/SOURCE_OF_TRUTH_POLICY.md`). Machine-generated derived artifacts (`management/CONTEXT_SNAPSHOT.md` and `dist/`) are governed by automated SHA-256 drift verification in `management/validation/audit.ps1`.

## 3. Rules and Requirements
1. **Single Canonical Home**: The Git repository (`c:/Users/user/Project/uesf` synced with `https://github.com/m-ebrahimzadeh/uesf`) is the canonical source of truth for all registered specifications.
2. **1-to-1 Inventory Parity**: Every canonical `.md` specification file in the repository MUST have an exact corresponding row in Section 4 of this registry.

## 4. Master Source-of-Truth Matrix (`v0.9.2` — 59 Canonical Documents)
| Doc ID | Canonical Repository Path | Layer / Category | Owner Role | Version | Lifecycle Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `UESF-CORE-001` | `README.md` | Core Index | CTO | `0.9.2` | Verified |
| `UESF-CORE-002` | `core/UNIVERSAL_AGENT_OPERATING_MODEL.md` | Layer 1: Core | CTO | `0.4.0` | Verified |
| `UESF-CORE-003` | `core/FRAMEWORK_ARCHITECTURE.md` | Layer 1: Core | CTO | `0.3.1` | Verified |
| `UESF-CORE-004` | `core/CAPABILITY_MODEL.md` | Layer 1: Core | CTO | `0.1.0` | Verified |
| `UESF-POL-001` | `policies/AUTONOMY_POLICY.md` | Layer 2: Policy | CTO | `0.2.0` | Verified |
| `UESF-POL-002` | `policies/GOVERNANCE_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | Verified |
| `UESF-POL-003` | `policies/SECURITY_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | Verified |
| `UESF-POL-004` | `policies/GIT_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | Verified |
| `UESF-POL-005` | `policies/VERIFICATION_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | Verified |
| `UESF-POL-006` | `policies/KNOWLEDGE_GOVERNANCE_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | Verified |
| `UESF-POL-007` | `policies/SOURCE_OF_TRUTH_POLICY.md` | Layer 2: Policy | CTO | `0.3.0` | Verified |
| `UESF-PROT-001` | `protocols/TASK_CONTRACT_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.3.0` | Verified |
| `UESF-PROT-002` | `protocols/HANDOFF_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.4.0` | Verified |
| `UESF-PROT-003` | `protocols/AGENT_COLLABORATION.md` | Layer 3: Protocol | CTO | `0.1.0` | Verified |
| `UESF-PROT-004` | `protocols/TASK_ACCEPTANCE_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | Verified |
| `UESF-PROT-005` | `protocols/KNOWLEDGE_SYNCHRONIZATION.md` | Layer 3: Protocol | CTO | `0.2.0` | Verified |
| `UESF-PROT-006` | `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | Verified |
| `UESF-PROT-007` | `protocols/ESCALATION_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | Verified |
| `UESF-PROT-008` | `protocols/FEATURE_DISCOVERY_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.5.0` | Verified |
| `UESF-WKFL-001` | `workflows/INIT_WORKFLOW.md` | Lifecycle Workflow | Architect | `0.9.0` | Verified |
| `UESF-WKFL-002` | `workflows/HANDOFF_WORKFLOW.md` | Lifecycle Workflow | Architect | `0.10.0` | Verified |
| `UESF-WKFL-003` | `workflows/STATUS_WORKFLOW.md` | Lifecycle Workflow | CTO | `0.8.0` | Verified |
| `UESF-TMPL-001` | `templates/ROLE_SKILL_TEMPLATE.md` | Templates (L4) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-002` | `templates/TASK_CONTRACT_TEMPLATE.md` | Templates (L3) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-003` | `templates/HANDOFF_PACKAGE_TEMPLATE.md` | Templates (L3) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-004` | `templates/EVIDENCE_PACKAGE_TEMPLATE.md` | Templates (L3) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-005` | `templates/KDP_TEMPLATE.md` | Templates (L3) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-006` | `templates/ESCALATION_RECORD_TEMPLATE.md` | Templates (L3) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-007` | `templates/PLATFORM_ADAPTER_TEMPLATE.md` | Templates (L5) | Architect | `0.4.0` | Verified |
| `UESF-TMPL-008` | `templates/PROJECT_EXTENSION_TEMPLATE.md` | Templates (L6) | Architect | `0.6.0` | Verified |
| `UESF-TMPL-009` | `templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md` | Templates (L3) | Architect | `0.5.0` | Verified |
| `UESF-ROLE-001` | `roles/cto/SKILL.md` | Layer 4: Role Skill | CTO | `0.4.0` | Verified |
| `UESF-ROLE-002` | `roles/architect/SKILL.md` | Layer 4: Role Skill | CTO | `0.3.0` | Verified |
| `UESF-ROLE-003` | `roles/developer/SKILL.md` | Layer 4: Role Skill | CTO | `0.4.0` | Verified |
| `UESF-ROLE-004` | `roles/qa/SKILL.md` | Layer 4: Role Skill | CTO | `0.3.0` | Verified |
| `UESF-ROLE-005` | `roles/devops/SKILL.md` | Layer 4: Role Skill | CTO | `0.3.0` | Verified |
| `UESF-ROLE-006` | `roles/security/SKILL.md` | Layer 4: Role Skill | CTO | `0.3.0` | Verified |
| `UESF-ROLE-007` | `roles/sre/SKILL.md` | Layer 4: Role Skill | CTO | `0.3.0` | Verified |
| `UESF-ROLE-008` | `roles/documentation/SKILL.md` | Layer 4: Role Skill | CTO | `0.2.0` | Verified |
| `UESF-ROLE-009` | `roles/discovery/SKILL.md` | Layer 4: Role Skill | CTO | `0.6.0` | Verified |
| `UESF-ADPT-001` | `adapters/README.md` | Layer 5: Adapter | Architect | `0.5.0` | Verified |
| `UESF-ADPT-002` | `adapters/antigravity-vscode/ADAPTER.md` | Layer 5: Adapter | DevOps | `0.5.0` | Verified |
| `UESF-ADPT-003` | `adapters/gemini-strategic-workspace/ADAPTER.md` | Layer 5: Adapter | Architect | `0.5.0` | Verified |
| `UESF-ADPT-004` | `adapters/generic-cli-mcp/ADAPTER.md` | Layer 5: Adapter | Architect | `0.5.0` | Verified |
| `UESF-EXT-001` | `extensions/README.md` | Layer 6: Extension | Architect | `0.6.0` | Verified |
| `UESF-EXT-002` | `extensions/example-web-service/EXTENSION.md` | Layer 6: Extension | Architect | `0.6.0` | Verified |
| `UESF-MGMT-001` | `management/PROJECT_PROFILE.md` | Management | CTO | `0.9.2` | Verified |
| `UESF-MGMT-002` | `management/ACTIVE_TASKS.md` | Management | CTO | `0.9.2` | Verified |
| `UESF-MGMT-003` | `management/DECISION_LOG.md` | Management | CTO | `0.9.2` | Verified |
| `UESF-MGMT-004` | `management/KNOWLEDGE_MAP.md` | Management | CTO | `0.9.2` | Verified |
| `UESF-MGMT-005` | `management/RELEASE_HISTORY.md` | Management | CTO | `0.9.2` | Verified |
| `UESF-MGMT-006` | `management/IMPLEMENTATION_ROADMAP.md` | Management | CTO | `0.9.2` | Verified |
| `UESF-VAL-001` | `management/validation/VALIDATION_REPORT_001.md` | Validation Evidence | CTO | `0.1.1` | Verified |
| `UESF-VAL-002` | `management/validation/VALIDATION_REPORT_002.md` | Validation Evidence | CTO | `0.2.1` | Verified |
| `UESF-VAL-003` | `management/validation/VALIDATION_REPORT_003.md` | Validation Evidence | CTO | `0.3.0` | Verified |
| `UESF-VAL-004` | `management/validation/VALIDATION_REPORT_004.md` | Validation Evidence | CTO | `0.4.0` | Verified |
| `UESF-VAL-005` | `management/validation/VALIDATION_REPORT_005.md` | Validation Evidence | CTO | `0.5.0` | Verified |
| `UESF-VAL-006` | `management/validation/VALIDATION_REPORT_006.md` | Validation Evidence | CTO | `0.6.0` | Verified |
| `UESF-VAL-007` | `management/validation/VALIDATION_REPORT_007.md` | Validation Evidence | CTO | `0.7.0` | Verified |

## 5. Responsibilities
* **CTO**: Approves additions, deprecations, and version transitions in this registry.
* **Documentation Role**: Verifies 1-to-1 file parity during every milestone update.

## 6. Relationships with Other Documents
* **Policies**: `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`
* **Protocols**: `protocols/KNOWLEDGE_SYNCHRONIZATION.md`

## 3. Automated Discrepancy & Drift Audit (`[DRIFT_CHECK]`)
* **Drift Audit Verdict**: `CLEAN (0 discrepancies between canonical ledgers and on-disk specification tree)`
* **Cloud / Remote Session Note**: When reading this file remotely without local `CAP-FS`/`CAP-GIT`, treat Section 1 as verified at the time of the commit that produced `Source-Ledger-SHA256: 0a2e7802c13d`, treat Section 2 as `[REPORTED — Remote Ledger]`, and treat any uncommitted local working-tree edits as `[UNKNOWN — Local FS Unavailable]`.
