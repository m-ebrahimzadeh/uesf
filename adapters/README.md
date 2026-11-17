# Layer 5: Platform Adapters Architecture & Registry
* **Document ID**: UESF-ADPT-001
* **Canonical Path**: adapters/README.md
* **Version**: 0.3.1
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose
Define the Layer 5 Platform Adapters architecture and index all canonical runtime bindings that connect UESF's platform-independent specifications (`core/`, `policies/`, `protocols/`, `roles/`) to concrete execution environments.

## 2. Scope
Applies to all runtime environment bindings in `adapters/` (`core/FRAMEWORK_ARCHITECTURE.md`).

## 3. Rules and Requirements
1. **Strict Layer 5 Isolation**:
   * Universal layers (`core/`, `policies/`, `protocols/`, `roles/`, `templates/`) remain 100% platform-agnostic.
   * All host-specific tool names, shell syntax, IDE integrations, workspace connectors, and MCP bindings MUST be encapsulated inside `adapters/<adapter-id>/ADAPTER.md`.
2. **Canonical Adapter Registry (`v0.3.1`)**:
   | Adapter ID | Canonical Path | Target Runtime Environment | Primary Capabilities Bound |
   | :--- | :--- | :--- | :--- |
   | `UESF-ADPT-002` | `adapters/antigravity-vscode/ADAPTER.md` | Antigravity in VS Code (Engineering Workspace) | `CAP-FS`, `CAP-TERM`, `CAP-GIT` |
   | `UESF-ADPT-003` | `adapters/gemini-strategic-workspace/ADAPTER.md` | Gemini Desktop / Connected Workspace & Notebook (Strategic Workspace) | `CAP-WS` (with handoff fallback for `CAP-FS`/`CAP-GIT`) |
   | `UESF-ADPT-004` | `adapters/generic-cli-mcp/ADAPTER.md` | Generic CLI & Model Context Protocol (MCP) Agent Runtimes | Configurable `CAP-FS`, `CAP-TERM`, `CAP-GIT`, `CAP-MCP`, `CAP-WEB` |
3. **Runtime Capability Verification**: Presence of an adapter specification does NOT imply automatic tool availability. Every agent MUST still execute a runtime capability probe per `core/CAPABILITY_MODEL.md` at session start.

## 4. Responsibilities
* **Architect**: Maintains adapter interface consistency across environments.
* **DevOps**: Validates local CLI, IDE, and Git execution bindings.
* **CTO**: Governs cross-workspace topology and approves adapter additions (`management/DECISION_LOG.md`).

## 5. Relevant Workflows
1. **Runtime Binding Selection**: Identify host environment at session start -> load corresponding `adapters/<adapter-id>/ADAPTER.md` -> probe `CAP-*` domains -> activate assigned Role Skill (`roles/<role>/SKILL.md`).

## 6. Relationships with Other Documents
* **Core Models**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`
* **Template**: `templates/PLATFORM_ADAPTER_TEMPLATE.md`
* **Adapters**: `adapters/antigravity-vscode/ADAPTER.md`, `adapters/gemini-strategic-workspace/ADAPTER.md`, `adapters/generic-cli-mcp/ADAPTER.md`
