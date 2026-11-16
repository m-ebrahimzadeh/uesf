# Capability Model
* **Document ID**: UESF-CORE-004
* **Canonical Path**: core/CAPABILITY_MODEL.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Define a standard capability taxonomy and runtime discovery protocol so agents never assume unavailable tools, filesystem access, network permissions, or inter-agent channels.

## 2. Scope
Applies to all UESF agents at session startup, task acceptance, and prior to executing any tool-dependent action.

## 3. Rules and Requirements
1. **Zero Implicit Capability Assumption**: Agents MUST treat all capabilities as `UNAVAILABLE` until confirmed via tool declarations, environment inspection, or verified execution.
2. **Standard Capability Domains**:
   * `CAP-FS` (Local Filesystem): Read, write, edit, and directory traversal on a local or container disk.
   * `CAP-TERM` (Terminal / Shell Execution): Execution of compilers, test runners, linters, and system binaries.
   * `CAP-GIT` (Version Control): Local Git operations (branch, commit, diff, status) and remote repository operations (push, pull, PR management).
   * `CAP-WS` (Connected Shared Workspace): Access to cloud documents, notebooks (e.g., Gemini Notebook), Drive files, or knowledge bases.
   * `CAP-WEB` (External Web / Browser): Web search or URL retrieval.
   * `CAP-MCP` (External Tool / MCP Integrations): Specialized model context protocol servers or APIs.
   * `CAP-AGENT` (Direct Sub-Agent Invocation): Ability to spawn or message another agent within the same runtime vs. requiring human-relayed handoffs.
3. **Capability States**:
   * `VERIFIED_AVAILABLE`: Tool declaration is present and a read/write/probe action succeeded.
   * `DECLARED_UNVERIFIED`: Tool is declared in schema but not yet exercised in the current session.
   * `RESTRICTED`: Capability exists with read-only or confirmation-gated constraints.
   * `UNAVAILABLE`: Capability does not exist in the current environment.
4. **Graceful Degradation & Handoff Rule**: When a task requires an `UNAVAILABLE` capability (e.g., `CAP-FS` or `CAP-GIT` while operating in a Strategic Workspace), the agent MUST NOT fabricate execution. It MUST complete all reasoning/specification artifacts possible in its current environment and package a formal Handoff (`protocols/HANDOFF_PROTOCOL.md`) targeting an environment that possesses the required capabilities.

## 4. Responsibilities
* **All Agents**: Perform a Capability Assessment during Phase 1 of any mission or task and report capability constraints in task handoffs.
* **CTO**: Assigns tasks to environments and roles matching required capability profiles.

## 5. Relevant Workflows
1. **Session Capability Audit**: Enumerate available tool declarations -> classify `CAP-*` domains -> document limitations -> select direct execution or cross-environment handoff.

## 6. Relationships with Other Documents
* **Operating Model**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`
* **Protocols**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/ESCALATION_PROTOCOL.md`
