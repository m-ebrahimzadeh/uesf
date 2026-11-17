# Implementation Roadmap
* **Document ID**: UESF-MGMT-006
* **Canonical Path**: management/IMPLEMENTATION_ROADMAP.md
* **Version**: 0.3.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Define the phased, dependency-ordered engineering roadmap for evolving UESF from foundational specifications to complete universal agent Skills, platform adapters, and project integrations.

## 2. Scope
Covers Milestones M1 through M4 of UESF development in alignment with `DEC-007` (`management/DECISION_LOG.md`).

## 3. Phased Engineering Roadmap

### Milestone M1: Foundational Architecture & Governance (`v0.1.0`) — *COMPLETED & ACCEPTED*
* **Objective**: Establish platform-independent operating model, policies, protocols, knowledge governance, and project management baseline.
* **Status**: `ACCEPTED` (`TASK-000` & `TASK-001`, commit `288d6dc` on `main`, verified via `EV-TASK-001-01`).

### Milestone M2: Universal Agent Role Skills (`v0.2.0`) — *COMPLETED & ACCEPTED*
* **Objective**: Author, review, and verify the eight platform-independent Agent Role Skills (`roles/<role>/SKILL.md`) and reusable Markdown artifact templates (`templates/`).
* **Status**: `ACCEPTED` (`TASK-002`–`TASK-006`, commit `ff33485` merged to `main`, verified via `EV-TASK-002-01` and `VALIDATION_REPORT_002.md`).

### Milestone M3: Platform Adapters (`v0.3.0`) — *CURRENT (In Review on `feat/TASK-007-platform-adapters`)*
* **Objective**: Create thin, modular Layer 5 platform adapters in `adapters/` mapping universal capabilities (`CAP-*`) and protocols to concrete environments, and resolve cross-platform repository hygiene (`KDP-001`, `KDP-002`).
* **Tasks**:
  * `TASK-007`: Define `templates/PLATFORM_ADAPTER_TEMPLATE.md`, `adapters/README.md`, and `.gitattributes` (`KDP-001`).
  * `TASK-008`: Author `adapters/antigravity-vscode/ADAPTER.md` (Engineering Workspace bindings).
  * `TASK-009`: Author `adapters/gemini-strategic-workspace/ADAPTER.md` (Strategic Workspace bindings) and `adapters/generic-cli-mcp/ADAPTER.md` (Portable CLI/MCP profile).
  * `TASK-010`: Execute Layer-Isolation & Cross-Reference Audit (`management/validation/VALIDATION_REPORT_003.md`) and update management registries to `0.3.0`.
* **Exit Criteria**: All 46 canonical `.md` documents and `.gitattributes` verified on `feat/TASK-007-platform-adapters` with zero upward dependencies (`EV-TASK-007-01`) and accepted by CTO.

### Milestone M4: Project-Specific Extensions & E2E Pilot (`v1.0.0`) — *NEXT (Mission 004)*
* **Objective**: Provide `templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`, and an end-to-end multi-agent pilot workflow validating Layers 1–6 together for the `v1.0.0` production release.

## 4. Responsibilities
* **CTO**: Governs phase transitions and ensures no milestone work is marked complete before its exit criteria are verified.

## 5. Relationships with Other Documents
* **Tasks & Releases**: `management/ACTIVE_TASKS.md`, `management/RELEASE_HISTORY.md`, `management/DECISION_LOG.md`
