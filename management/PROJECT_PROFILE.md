# Project Profile
* **Document ID**: UESF-MGMT-001
* **Canonical Path**: management/PROJECT_PROFILE.md
* **Version**: 0.6.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Establish the authoritative identity, scope boundaries, canonical repository coordinates, and operational workspace topology of the Universal Engineering Skills Framework (UESF).

## 2. Scope
Applies to all milestones, tasks, and environments participating in UESF development and adoption (`README.md`).

## 3. Rules and Requirements
1. **Project Identity**:
   * **Project Name**: Universal Engineering Skills Framework (UESF)
   * **Current Version**: `0.6.0` (Milestone M6 — 12 Compiled Skill/Command Bundles, Lifecycle Workflows & Automatic Context Snapshot)
   * **Current Phase**: Milestones M1 (`v0.1.0`), M2 (`v0.2.0`), M3 (`v0.3.0`), M4 (`v0.4.0`), M5 (`v0.5.0`), and M6 (`v0.6.0` — 12 Compiled Skill/Command Bundles, Lifecycle Workflows & Automatic Context Snapshot) Completed, Verified, and Accepted on `main` (`v1.0.0` reserved for future `A3` Human Stakeholder release gate)
   * **Canonical Local Repository Path**: `c:/Users/user/Project/uesf`
   * **Canonical Remote Git Repository**: `https://github.com/m-ebrahimzadeh/uesf` (`DEC-012`)
   * **Founding CTO & Chief Architect**: Activated (`CTO` Role, Autonomy Level `A2` for routine governance / `A3` for human-gated decisions)
2. **Delivered Architecture (`v0.5.0` — All 6 Layers + 9 Roles)**:
   * **Layer 1 — Core Operating Model (`core/`)**: Operating model (`0.2.0`), 6-layer architecture with Template Target-Layer Rule (`0.2.0`), and capability taxonomy (`0.1.0`).
   * **Layer 2 — Universal Policies (`policies/`)**: Autonomy (`0.2.0` with hard `A0` discovery lock), governance, security, Git, verification, knowledge governance, and source-of-truth policies.
   * **Layer 3 — Interaction Protocols (`protocols/`)**: Feature discovery (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`), task contracts (`0.2.0`), handoffs, peer collaboration, task acceptance, knowledge synchronization, evidence submission, and escalation protocols.
   * **Layer 4 — Universal Agent Role Skills (`roles/`)**: Nine canonical engineering role skills (`Discovery`, `CTO`, `Architect`, `Developer`, `QA`, `DevOps`, `Security`, `SRE`, `Documentation`).
   * **Layer 5 — Platform Adapters (`adapters/`)**: Runtime bindings for Antigravity/VS Code (`antigravity-vscode`), Gemini Strategic Workspace (`gemini-strategic-workspace`), and portable CLI/MCP hosts (`generic-cli-mcp`).
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
