# Project Profile
* **Document ID**: UESF-MGMT-001
* **Canonical Path**: management/PROJECT_PROFILE.md
* **Version**: 0.3.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Establish the authoritative identity, scope boundaries, canonical repository coordinates, and operational workspace topology of the Universal Engineering Skills Framework (UESF).

## 2. Scope
Applies to all milestones, tasks, and environments participating in UESF development (`README.md`).

## 3. Rules and Requirements
1. **Project Identity**:
   * **Project Name**: Universal Engineering Skills Framework (UESF)
   * **Current Version**: `0.3.0` (Milestone M3 — Platform Adapters & Repository Hygiene)
   * **Current Phase**: Milestone M1 (`v0.1.0`) & Milestone M2 (`v0.2.0`) Accepted; Milestone M3 (`v0.3.0`) Implemented on `feat/TASK-007-platform-adapters`
   * **Canonical Local Repository Path**: `c:/Users/user/Project/uesf`
   * **Canonical Remote Git Repository**: `https://github.com/m-ebrahimzadeh/uesf` (`DEC-012`)
   * **Founding CTO & Chief Architect**: Activated (`CTO` Role, Autonomy Level `A2` for routine governance / `A3` for human-gated decisions)
2. **Confirmed Scope Boundaries**:
   * **In Scope (Delivered in M1–M3)**:
     * Layer 1 Core Operating Model, Capability Model, and 6-Layer Architecture (`core/`).
     * Layer 2 Universal Engineering, Security, Git, Verification, and Knowledge Policies (`policies/`).
     * Layer 3 Execution, Collaboration, Handoff, Acceptance, Evidence, and Escalation Protocols (`protocols/`).
     * Layer 4 Eight Universal Engineering Agent Role Skills (`roles/{cto,architect,developer,qa,devops,security,sre,documentation}/SKILL.md`) and 7 Reusable Templates (`templates/`).
     * Layer 5 Platform Adapters (`adapters/README.md`, `adapters/antigravity-vscode/ADAPTER.md`, `adapters/gemini-strategic-workspace/ADAPTER.md`, `adapters/generic-cli-mcp/ADAPTER.md`).
   * **Out of Scope for M1–M3 (Reserved for Milestone M4 `v1.0.0`)**: Project-specific domain extensions (`extensions/`) such as PoliSDK or PoliTicket.
3. **Dual-Environment Operating Topology**:
   * **Strategic Workspace (`adapters/gemini-strategic-workspace/ADAPTER.md`)**: Gemini 4 Argon with connected Shared Workspace (`UNIVERSAL ENGINEERING SKILLS` Gemini Notebook & Google Workspace). Used for strategy, architecture, governance, task creation, knowledge curation, and deliverable review (`CAP-WS` available; `CAP-FS`, `CAP-TERM`, `CAP-GIT` unavailable).
   * **Engineering Workspace (`adapters/antigravity-vscode/ADAPTER.md`)**: Antigravity inside VS Code (Gemini 4 Hydrogen primary coding agent; Gemini 4 Argon Orchestrator / Gemini 3.8 Flash optional). Used for local filesystem operations, Git workflows, automated verification, and implementation execution (`CAP-FS`, `CAP-TERM`, `CAP-GIT` verified available).

## 4. Responsibilities
* **CTO**: Keeps this profile accurate as milestones are completed and environments evolve.

## 5. Relevant Workflows
1. **Milestone Profile Update**: Upon milestone implementation and acceptance (`protocols/TASK_ACCEPTANCE_PROTOCOL.md`), update Current Version and Current Phase in concert with `management/RELEASE_HISTORY.md`.

## 6. Relationships with Other Documents
* **Roadmap & Releases**: `management/IMPLEMENTATION_ROADMAP.md`, `management/RELEASE_HISTORY.md`
* **Tasks & Decisions**: `management/ACTIVE_TASKS.md`, `management/DECISION_LOG.md`, `management/KNOWLEDGE_MAP.md`
* **Adapters**: `adapters/README.md`, `adapters/antigravity-vscode/ADAPTER.md`, `adapters/gemini-strategic-workspace/ADAPTER.md`
