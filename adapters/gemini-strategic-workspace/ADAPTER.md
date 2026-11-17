# Gemini Strategic Workspace Adapter
* **Document ID**: UESF-ADPT-003
* **Canonical Path**: adapters/gemini-strategic-workspace/ADAPTER.md
* **Version**: 0.4.0
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose & Target Runtime Profile
Bind UESF governance, architecture, planning, review, and knowledge curation workflows to the **Strategic Workspace** (Gemini 4 Argon operating with connected Google Workspace / Notebook sources).

## 2. Scope & Supported Roles
Primarily supports strategic, architectural, governance, and review roles (`CTO`, `Architect`, `Documentation`, and Tier 2/Tier 3 `QA`/`Security` design review) where reasoning, specification authoring, task contracting, and evidence auditing occur.

## 3. Capability Mapping Matrix (CAP-* to Runtime Bindings)
| Abstract Capability (`core/CAPABILITY_MODEL.md`) | Typical Runtime State in Strategic Workspace | Concrete Binding & Verification Probe |
| :--- | :--- | :--- |
| `CAP-WS` (Connected Shared Workspace / Notebook) | `VERIFIED_AVAILABLE` | Bound to connected Gemini Notebook sources (`UNIVERSAL ENGINEERING SKILLS`) and Google Workspace connectors. |
| `CAP-FS` (Local Host Repository Filesystem) | `UNAVAILABLE` | No direct mount to the developer's local IDE filesystem (`c:/Users/user/Project/uesf`). |
| `CAP-TERM` (Local Host Terminal / Shell) | `UNAVAILABLE` | No access to the local host PowerShell/Bash shell. |
| `CAP-GIT` (Local / Remote Git CLI) | `UNAVAILABLE` | Cannot run `git init`, `git branch`, `git commit`, or `git push` on the local repository. |
| `CAP-AGENT` (Cross-Environment Agent IPC) | `UNAVAILABLE` | Cannot directly invoke Antigravity sessions without an explicit Handoff Package relayed by the human operator. |

## 4. Constraint Handling & Graceful Degradation Rules
1. **Strict Anti-Fabrication Enforcement (`policies/VERIFICATION_POLICY.md`)**: Because `CAP-FS`, `CAP-TERM`, and `CAP-GIT` are `UNAVAILABLE`, agents in the Strategic Workspace MUST NEVER claim to have created local files, executed terminal tests, or committed to Git.
2. **Staged Specification & Outbound Handoff Pattern**:
   * Specifications authored in the Strategic Workspace are assigned lifecycle status `Approved (Staged)` per `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`.
   * Physical repository materialization and Git operations are packaged into a self-contained Outbound Handoff (`HO-TASK-XXX-01`) conforming to `protocols/HANDOFF_PROTOCOL.md` for execution via `adapters/antigravity-vscode/ADAPTER.md`.
3. **Evidence-Based Acceptance Gate (`protocols/TASK_ACCEPTANCE_PROTOCOL.md`)**: The Strategic Workspace `CTO` role promotes tasks to `VERIFIED` / `ACCEPTED` and specifications to `Verified` only after receiving and auditing a concrete Inbound Handoff (`HO-TASK-XXX-02`) containing empirical terminal and Git proofs (`EV-TASK-XXX-01`).

## 5. Session Initialization & Handoff Execution Workflow
1. **Context & Source-of-Truth Synchronization**: Inspect connected Notebook sources and latest Inbound Handoff (`HO-TASK-XXX-02`) to determine the current repository commit baseline and active milestone state (`management/ACTIVE_TASKS.md`). Fresh cloud sessions can invoke `/uesf:status [owner/repo] [branch]` to retrieve `CONTEXT_SNAPSHOT.md` remotely (for public/connected repos, labeling state `[REPORTED — Remote @ <SHA>]` and local uncommitted state `[UNKNOWN]`) or via single-file snapshot paste (for private unconnected repos).
2. **Inbound Evidence Audit**: When reviewing Engineering Workspace deliverables, verify 1-to-1 acceptance criteria coverage, commit SHAs, and epistemic classifications (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`), and adjudicate any Knowledge Discovery Proposals (`KDP-XXX`).
3. **Specification & Task Contract Authoring**: Draft or update framework specifications, record architectural rulings in `management/DECISION_LOG.md`, and emit a standalone Outbound Handoff (`HO-TASK-YYY-01`) for the next engineering execution cycle.

## 6. Security & Isolation Guardrails
* Enforce `policies/SOURCE_OF_TRUTH_POLICY.md`: treat the Git repository as the single canonical home for all `.md` specifications post-`TASK-001`, and treat Strategic Workspace copies as synchronized mirrors or staged drafts.
* Never embed private credentials or personal tokens in Handoff prompts or Notebook sources (`policies/SECURITY_POLICY.md`).

## 7. Relationships with Other Documents
* **Core & Capabilities**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/CAPABILITY_MODEL.md`, `adapters/README.md`
* **Counterpart Adapter**: `adapters/antigravity-vscode/ADAPTER.md`
* **Policies**: `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`, `policies/VERIFICATION_POLICY.md`
* **Protocols**: `protocols/HANDOFF_PROTOCOL.md`, `protocols/KNOWLEDGE_SYNCHRONIZATION.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Template**: `templates/PLATFORM_ADAPTER_TEMPLATE.md`
