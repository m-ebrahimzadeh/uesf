# Handoff Protocol
* **Document ID**: UESF-PROT-002
* **Canonical Path**: protocols/HANDOFF_PROTOCOL.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

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

## 4. Responsibilities
* **Sending Agent**: Packages complete context, verifies zero secret leakage (`policies/SECURITY_POLICY.md`), and emits the structured handoff block.
* **Receiving Agent**: Validates incoming handoff completeness and capability prerequisites before transitioning task state to `IN_PROGRESS`.

## 5. Relevant Workflows
1. **Cross-Environment Handoff**: Strategic Workspace (CTO) generates `HO-TASK-XXX-01` -> Human or connector relays package to Engineering Workspace -> Engineering Agent executes & verifies -> Returns `HO-TASK-XXX-02` with Evidence Package -> Reviewer/CTO validates and accepts.

## 6. Relationships with Other Documents
* **Capabilities**: `core/CAPABILITY_MODEL.md`
* **Task Contracts & Evidence**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`, `protocols/AGENT_COLLABORATION.md`
