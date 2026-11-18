# Active Tasks Registry
* **Document ID**: UESF-MGMT-002
* **Canonical Path**: management/ACTIVE_TASKS.md
* **Version**: 0.9.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-18

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

## 5. Active Outbound Task Contract Queue
* Milestones M1 (`v0.1.0`) through M9 (`v0.9.0`, `TASK-000`–`TASK-032`) are **COMPLETED, VERIFIED, AND ACCEPTED** on `main` (tagged `v0.9.0`).
* All 12 UESF skills (`/uesf-discovery`, `/uesf-cto`, `/uesf-architect`, `/uesf-developer`, `/uesf-qa`, `/uesf-devops`, `/uesf-security`, `/uesf-sre`, `/uesf-documentation`, `/uesf-init`, `/uesf-handoff`, `/uesf-status`) are compiled in `dist/` and managed across native agent `skills/` directories (plus flat `~/Documents/Cline/Workflows/uesf-<name>.md` `/` menu workflow triggers in Cline) via `bin/uesf.mjs` and `~/.uesf/install-state.json`.
* Operational handoffs across sessions and environments exchange paired odd/even Markdown files inside the gitignored flat `<ctrlDir>/handoffs/` spool (`management/handoffs/` in UESF, `.uesf/handoffs/` in downstream projects) per `protocols/HANDOFF_PROTOCOL.md` (`0.3.0`) and `DEC-031`.
* Any future feature proposal or architectural enhancement enters through Track 1 Iterative Discovery (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `roles/discovery/SKILL.md`) locked at `A0` until explicit human confirmation.

## 6. Relationships with Other Documents
* **Protocols**: `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Roadmap & Decisions**: `management/IMPLEMENTATION_ROADMAP.md`, `management/DECISION_LOG.md`
