# Layer 5: Platform Adapters & Multi-Agent Skill Distribution
* **Document ID**: UESF-ADPT-001
* **Canonical Path**: adapters/README.md
* **Version**: 0.4.1
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose
Define the Layer 5 Platform Adapters architecture, the compiled 12-bundle Skill/Command distribution pipeline (`dist/`), and the cross-platform multi-agent installation model powered by `package.json` + `bin/uesf.mjs` (`npx --yes github:m-ebrahimzadeh/uesf install` and `--version <ref>`) alongside thin pass-through wrappers `scripts/install.ps1` / `scripts/install.sh`.

## 2. Scope
Applies to all runtime environment bindings in `adapters/`, compiled bundles in `dist/`, and installer scripts in `scripts/` (`core/FRAMEWORK_ARCHITECTURE.md`).

## 3. Rules and Requirements
1. **Strict Layer 5 Isolation**:
   * Universal layers (`core/`, `policies/`, `protocols/`, `roles/`, `templates/`) remain 100% platform-agnostic.
   * Host-specific tool names, IDE paths, slash-command formats, and workspace connectors are encapsulated in `adapters/`, `scripts/`, and `dist/`.
2. **Canonical Adapter Registry (`v0.4.0`)**:
   | Adapter ID | Canonical Path | Target Runtime Environment | Primary Capabilities Bound |
   | :--- | :--- | :--- | :--- |
   | `UESF-ADPT-002` | `adapters/antigravity-vscode/ADAPTER.md` | Antigravity in VS Code (Engineering Workspace) | `CAP-FS`, `CAP-TERM`, `CAP-GIT` |
   | `UESF-ADPT-003` | `adapters/gemini-strategic-workspace/ADAPTER.md` | Gemini Desktop / Cloud Chat & Notebook (Strategic Workspace) | `CAP-WS`, `CAP-WEB` (with `CONTEXT_SNAPSHOT.md` remote/paste bridge) |
   | `UESF-ADPT-004` | `adapters/generic-cli-mcp/ADAPTER.md` | Claude Code, Gemini CLI, Codex, Cline, Kilo Code & Optional MCP Hosts | `CAP-FS`, `CAP-TERM`, `CAP-GIT`, `CAP-MCP`, `CAP-WEB` |
3. **12 Self-Contained Compiled Bundles (`DEC-021`, `DEC-026`)**:
   * `bin/uesf.mjs build` (and thin wrapper `scripts/build-dist.*`) compiles the **9 Universal Agent Roles** (`uesf-discovery`, `uesf-cto`, `uesf-architect`, `uesf-developer`, `uesf-qa`, `uesf-devops`, `uesf-security`, `uesf-sre`, `uesf-documentation`) and **3 Lifecycle Workflows** (`uesf-init`, `uesf-handoff`, `uesf-status`) into:
     * `dist/skills/uesf-<name>/SKILL.md` (Standard Agent Skill format for Antigravity, Claude Code, Codex, Cline, Kilo Code).
     * `dist/commands/uesf/<name>.md` (Slash-command Markdown format `/uesf:<name>` for Claude Code, Cline, Kilo Code).
     * `dist/gemini-cli/uesf/<name>.toml` (TOML slash-command format `/uesf:<name>` for Gemini CLI).
   * `package.json` + `bin/uesf.mjs` (`npx --yes github:m-ebrahimzadeh/uesf install` / `node bin/uesf.mjs install`, with `--version <ref>`, `--check`, and `--link` options) serves as the primary cross-platform installer alongside thin pass-through wrappers `scripts/install.*`, performing atomic clean-and-copy installation and wiring `.git/hooks/pre-commit`.

## 4. Responsibilities
* **Architect & DevOps**: Maintain adapter profiles, `package.json`, `bin/uesf.mjs`, and `scripts/*.ps1` / `scripts/*.sh` wrappers.
* **CTO**: Governs cross-workspace topology and approves adapter additions (`management/DECISION_LOG.md`).

## 5. Relevant Workflows
1. **Build & Install Pipeline**: Run `node bin/uesf.mjs build` (or `scripts/build-dist.ps1`) -> verify via `management/validation/audit.ps1` -> run `npx --yes github:m-ebrahimzadeh/uesf install` (or `node bin/uesf.mjs install` / `scripts/install.*`) with optional `--version <ref>` -> invoke `/uesf:status` or `/uesf:<role>` in target agent.

## 6. Relationships with Other Documents
* **Core Models**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`
* **Template**: `templates/PLATFORM_ADAPTER_TEMPLATE.md`
* **Adapters**: `adapters/antigravity-vscode/ADAPTER.md`, `adapters/gemini-strategic-workspace/ADAPTER.md`, `adapters/generic-cli-mcp/ADAPTER.md`
