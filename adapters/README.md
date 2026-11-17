# Layer 5: Platform Adapters & Multi-Agent Skill Distribution
* **Document ID**: UESF-ADPT-001
* **Canonical Path**: adapters/README.md
* **Version**: 0.5.0
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose
Define the Layer 5 Platform Adapters architecture, the compiled 12-bundle native Skill distribution pipeline (`dist/`), and the cross-platform multi-agent lifecycle CLI powered by `package.json` + `bin/uesf.mjs` (`install`, `update`, `check`, `doctor`, `uninstall`, `init-project`, `sync-snapshot`, `build`) alongside thin pass-through wrappers `scripts/install.ps1` / `scripts/install.sh`.

## 2. Scope
Applies to all runtime environment bindings in `adapters/`, compiled bundles in `dist/`, and installer/lifecycle tooling in `bin/uesf.mjs` and `scripts/` (`core/FRAMEWORK_ARCHITECTURE.md`).

## 3. Rules and Requirements
1. **Strict Layer 5 Isolation**:
   * Universal layers (`core/`, `policies/`, `protocols/`, `roles/`, `templates/`) remain 100% platform-agnostic.
   * Host-specific tool names, IDE paths, slash-command formats, and workspace connectors are encapsulated in `adapters/`, `bin/uesf.mjs`, `scripts/`, and `dist/`.
2. **Canonical Adapter Registry (`v0.7.0`)**:
   | Adapter ID | Canonical Path | Target Runtime Environment | Primary Capabilities Bound |
   | :--- | :--- | :--- | :--- |
   | `UESF-ADPT-002` | `adapters/antigravity-vscode/ADAPTER.md` | Antigravity in VS Code (Engineering Workspace) | `CAP-FS`, `CAP-TERM`, `CAP-GIT` |
   | `UESF-ADPT-003` | `adapters/gemini-strategic-workspace/ADAPTER.md` | Gemini Desktop / Cloud Chat & Notebook (Strategic Workspace) | `CAP-WS`, `CAP-WEB` (with `CONTEXT_SNAPSHOT.md` remote/paste bridge) |
   | `UESF-ADPT-004` | `adapters/generic-cli-mcp/ADAPTER.md` | Claude Code, Gemini CLI, Cline, Kilo Code, Codex & Optional MCP Hosts | `CAP-FS`, `CAP-TERM`, `CAP-GIT`, `CAP-MCP`, `CAP-WEB` |
3. **12 Self-Contained Compiled Bundles & Native Agent Adapters (`DEC-021`, `DEC-026`, `DEC-028`, `DEC-029`)**:
   * `bin/uesf.mjs build` (and thin wrapper `scripts/build-dist.*`) compiles the **9 Universal Agent Roles** (`uesf-discovery`, `uesf-cto`, `uesf-architect`, `uesf-developer`, `uesf-qa`, `uesf-devops`, `uesf-security`, `uesf-sre`, `uesf-documentation`) and **3 Lifecycle Workflows** (`uesf-init`, `uesf-handoff`, `uesf-status`) into:
     * `dist/skills/uesf-<name>/SKILL.md` (Primary native Agent Skill format with strict 2-key YAML frontmatter — `name` and JSON-quoted `description`, zero top-level `version:` key — and bottom `<!-- UESF-BUNDLE-METADATA: ... -->` HTML comment footer).
     * `dist/commands/uesf/<name>.md` and `dist/gemini-cli/uesf/<name>.toml` (Compiled command/workflow payloads with clean `description` frontmatter; `dist/commands/uesf/<name>.md` is also installed as flat `~/Documents/Cline/Workflows/uesf-<name>.md` `/` menu workflow triggers for Cline, while Claude Code, Gemini CLI, Antigravity, Kilo Code, and Codex do not receive duplicate `commands/`/`workflows/` directories).
   * `package.json` + `bin/uesf.mjs` installs native `skills/` directories across all 6 local coding agents (`~/.gemini/config/skills/`, `~/.claude/skills/`, `~/.gemini/skills/`, `~/.cline/skills/`, `~/.kilo/skills/`, `~/.codex/skills/`)—plus, for the `cline` adapter, flat `/` menu workflow triggers (`~/Documents/Cline/Workflows/uesf-<name>.md`) alongside `~/.cline/skills/uesf-<name>/SKILL.md`—cleans legacy duplicate command/workflow directories (such as `~/.claude/commands/uesf`, `~/.gemini/commands/uesf`, and broken nested `~/Documents/Cline/Workflows/uesf`), writes no foreign `.uesf-manifest.json` inside agent directories, and records installation metadata centrally in `~/.uesf/install-state.json`.

## 4. Responsibilities
* **Architect & DevOps**: Maintain adapter profiles, `package.json`, `bin/uesf.mjs`, and `scripts/*.ps1` / `scripts/*.sh` wrappers.
* **CTO**: Governs cross-workspace topology and approves adapter additions (`management/DECISION_LOG.md`).

## 5. Relevant Workflows
1. **Build & Lifecycle Pipeline**: Run `node bin/uesf.mjs build` -> verify via `management/validation/audit.ps1` -> run `npx --yes github:m-ebrahimzadeh/uesf install` (or `update` / `check` / `doctor` / `uninstall`) -> invoke `/uesf-status` (or `$uesf-status` in Codex) in the target agent.

## 6. Relationships with Other Documents
* **Core Models**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`
* **Template**: `templates/PLATFORM_ADAPTER_TEMPLATE.md`
* **Adapters**: `adapters/antigravity-vscode/ADAPTER.md`, `adapters/gemini-strategic-workspace/ADAPTER.md`, `adapters/generic-cli-mcp/ADAPTER.md`
