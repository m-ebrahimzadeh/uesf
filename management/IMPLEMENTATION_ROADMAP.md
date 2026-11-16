# Implementation Roadmap
* **Document ID**: UESF-MGMT-006
* **Canonical Path**: management/IMPLEMENTATION_ROADMAP.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Define the phased, dependency-ordered engineering roadmap for evolving UESF from foundational specifications to complete universal agent Skills, platform adapters, and project integrations.

## 2. Scope
Covers Phases 1 through 4 of UESF development in alignment with `DEC-007` (`management/DECISION_LOG.md`).

## 3. Phased Engineering Roadmap
### Milestone M1: Foundational Architecture & Governance (`v0.1.0`) — *CURRENT*
* **Objective**: Establish platform-independent operating model, policies, protocols, knowledge governance, and project management baseline.
* **Status**:
  * `TASK-000` (Strategic Workspace Specification & Validation): `VERIFIED` (2026-11-16).
  * `TASK-001` (Git Repository Materialization in Engineering Workspace): `IN_PROGRESS` / `IN_REVIEW`.
* **Exit Criteria**: All 25 foundational documents committed to `main` in the canonical Git repository and verified via `EV-TASK-001-01`.

### Milestone M2: Universal Agent Role Skills (`v0.2.0`) — *NEXT*
* **Objective**: Author, review, and verify the eight platform-independent Agent Role Skills (`roles/<role>/SKILL.md`) and reusable Markdown artifact templates (`templates/`).
* **Planned Tasks**:
  * `TASK-002`: Define Universal Role Skill Standard Schema & Reusable Protocol Templates (`templates/`).
  * `TASK-003`: Author Governance, Architecture & Knowledge Role Skills (`CTO`, `Architect`, `Documentation`).
  * `TASK-004`: Author Implementation & Quality Role Skills (`Developer`, `QA`).
  * `TASK-005`: Author Infrastructure, Security & Reliability Role Skills (`DevOps`, `Security`, `SRE`).
  * `TASK-006`: Cross-Role Interaction Dry-Run & Consistency Audit (`v0.2.0` Release Sign-Off).
* **Exit Criteria**: All 8 universal Role Skills pass structural, boundary, and non-overlap verification without platform coupling.

### Milestone M3: Platform Adapters (`v0.3.0`) — *FUTURE*
* **Objective**: Create thin, modular platform adapters in `adapters/` mapping universal capabilities (`CAP-*`) and protocols to concrete environments.
* **Target Adapters**:
  * `adapters/gemini-strategic-workspace/` (Gemini 4 Argon + Notebook/Workspace bindings).
  * `adapters/antigravity-vscode/` (Antigravity + Gemini 4 Hydrogen/Orchestrator + local Git/terminal bindings).
  * `adapters/generic-cli-mcp/` (Portable CLI/MCP adapter profile).
* **Exit Criteria**: End-to-end multi-agent workflow verified across Strategic and Engineering workspaces using adapter bindings.

### Milestone M4: Project-Specific Extensions (`v1.0.0`) — *FUTURE*
* **Objective**: Apply UESF to concrete software engineering target projects via isolated overlays in `extensions/` without polluting universal layers 1–4.

## 4. Responsibilities
* **CTO**: Governs phase transitions and ensures no Milestone M2/M3/M4 work commences before its prerequisite milestone exit criteria are met.

## 5. Relationships with Other Documents
* **Tasks & Releases**: `management/ACTIVE_TASKS.md`, `management/RELEASE_HISTORY.md`, `management/DECISION_LOG.md`
