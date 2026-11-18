# Handoff Protocol
* **Document ID**: UESF-PROT-002
* **Canonical Path**: protocols/HANDOFF_PROTOCOL.md
* **Version**: 0.3.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-18

## 1. Purpose
Define the self-contained communication package required when transferring tasks, context, or deliverables between agents or across disconnected environments (e.g., Strategic Workspace <-> Engineering Workspace).

## 2. Scope
Applies to all inter-environment transfers and inter-role transitions where shared session memory or automatic file access cannot be assumed.

## 3. Rules and Requirements
1. **Zero Shared-Memory Assumption**: Handoff packages MUST be completely self-contained or reference verified canonical paths accessible to the receiving environment. Never assume the receiving agent can read the sender's chat history.
2. **Mandatory Outbound Handoff Schema (Dispatching Work)**:
   * `Handoff ID`: `HO-<TASK-ID>-<SEQ>` (e.g., `HO-TASK-001-01`).
   * `Source Role & Environment`: Sending role and runtime.
   * `Target Role & Environment`: Receiving role and runtime.
   * `Embedded Task Contract`: Full contract per `protocols/TASK_CONTRACT_PROTOCOL.md`.
   * `Authoritative Context & Payloads`: Canonical file references, version numbers, or inline content payloads needed to execute without guesswork.
   * `Capability Prerequisites`: Required `CAP-*` domains in the target environment.
   * `Return Instructions`: Expected Evidence Package format (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`).
3. **Mandatory Inbound Handoff Schema (Returning Results)**:
   * `Handoff ID` & `Task ID`.
   * `Execution Status`: `COMPLETED_FOR_REVIEW`, `PARTIAL`, `BLOCKED`, or `FAILED`.
   * `Deliverables Summary`: Exact files created/modified, commit hashes, or artifacts generated.
   * `Attached Evidence Package`: Structured verification output per `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`.
   * `Discoveries / Escalations`: Any implementation discoveries (`protocols/KNOWLEDGE_SYNCHRONIZATION.md`) or blockers (`protocols/ESCALATION_PROTOCOL.md`).
4. **Lifecycle Command Integration (`/uesf:handoff` & `/uesf:status`)**:
   * Executing `/uesf:handoff` (`workflows/HANDOFF_WORKFLOW.md`) at session exit packages the Outbound or Inbound Handoff and refreshes `CONTEXT_SNAPSHOT.md` when `CAP-FS` is available.
   * Executing `/uesf:status` (`workflows/STATUS_WORKFLOW.md`) at session entry reconstructs context from `CONTEXT_SNAPSHOT.md` and live Git probes without duplicating handoff packaging duties.
5. **File-Backed Handoff Spool, Odd/Even Sequence Pickup & Compact Chat Cards (`DEC-031`)**:
   * **Flat Spool Location & Naming**: When local filesystem or MCP access (`CAP-FS` or `CAP-MCP`) is available, handoff packages are written to and read from `<ctrlDir>/handoffs/HO-TASK-XXX-<SEQ>.md` (`management/handoffs/` in UESF, `.uesf/handoffs/` in downstream projects).
   * **Deterministic Odd/Even Sequence Convention**:
     * *Odd Sequence (`HO-TASK-XXX-01.md`, `HO-TASK-XXX-03.md`)*: Outbound Handoff (embeds the `TASK-XXX` contract and payloads). When the highest sequence file for an active task in `<ctrlDir>/handoffs/` is odd, it is waiting for execution by the target role.
     * *Even Sequence (`HO-TASK-XXX-02.md`, `HO-TASK-XXX-04.md`)*: Inbound Handoff (embeds the `EV-TASK-XXX` Evidence Package and any `KDP-XXX` / `ESC-TASK-XXX`). When the highest sequence file for an unaccepted task is even, it is waiting for review by the Reviewer Role or CTO.
   * **File-First with Compact Chat Card (and Inline Fallback)**:
     * Whenever `CAP-FS` or `CAP-MCP` is available, the sending agent writes the full Markdown handoff package to `<ctrlDir>/handoffs/HO-TASK-XXX-<SEQ>.md` and outputs a **compact 5-line Handoff Dispatch/Return Summary Card** in chat (stating `Handoff ID`, `On-Disk Path`, `Task & Role`, `Branch/Commit Status`, and `Next Command`).
     * If `CAP-FS` and `CAP-MCP` are both unavailable, the agent falls back automatically to emitting the full Markdown handoff block inline in chat.

## 4. Responsibilities
* **Sending Agent**: Packages complete context, verifies zero secret leakage (`policies/SECURITY_POLICY.md`), and emits the structured handoff block.
* **Receiving Agent**: Validates incoming handoff completeness and capability prerequisites before transitioning task state to `IN_PROGRESS`.

## 5. Relevant Workflows
1. **Cross-Environment Handoff**: Strategic Workspace (CTO) generates `HO-TASK-XXX-01` -> Human or connector relays package to Engineering Workspace -> Engineering Agent executes & verifies -> Returns `HO-TASK-XXX-02` with Evidence Package -> Reviewer/CTO validates and accepts.

## 6. Relationships with Other Documents
* **Capabilities**: `core/CAPABILITY_MODEL.md`
* **Task Contracts & Evidence**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`, `protocols/AGENT_COLLABORATION.md`
