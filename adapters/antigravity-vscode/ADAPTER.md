# Antigravity / VS Code Engineering Workspace Adapter
* **Document ID**: UESF-ADPT-002
* **Canonical Path**: adapters/antigravity-vscode/ADAPTER.md
* **Version**: 0.3.0
* **Status**: Verified
* **Owner**: DevOps
* **Last Updated**: 2026-11-17

## 1. Purpose & Target Runtime Profile
Bind UESF roles, policies, and protocols to the **Engineering Workspace** running **Antigravity inside Visual Studio Code** (powered by coding and orchestration models such as Gemini 4 Hydrogen, Gemini 4 Argon Orchestrator, or Gemini 3.8 Flash on Windows, macOS, or Linux).

## 2. Scope & Supported Roles
Primarily supports execution-oriented and verification-oriented roles (`Developer`, `DevOps`, `QA`, `Security`, `SRE`, `Documentation`, and `Architect` during repository inspection) operating on the local Git repository (`c:/Users/user/Project/uesf` or equivalent local clone).

## 3. Capability Mapping Matrix (CAP-* to Runtime Bindings)
| Abstract Capability (`core/CAPABILITY_MODEL.md`) | Typical Runtime State in Antigravity | Concrete Binding & Verification Probe |
| :--- | :--- | :--- |
| `CAP-FS` (Filesystem Read/Write) | `VERIFIED_AVAILABLE` | Bound to VS Code workspace file read/create/edit tools and local disk paths. Probe via directory listing and file existence check. |
| `CAP-TERM` (Terminal / Shell Execution) | `VERIFIED_AVAILABLE` | Bound to integrated VS Code terminal (PowerShell / Bash / Zsh). Probe via non-destructive command (`git --version`, `pwd`). |
| `CAP-GIT` (Local & Remote Git) | `VERIFIED_AVAILABLE` (Local) / `RESTRICTED` or `VERIFIED_AVAILABLE` (Remote) | Bound to local `git` CLI (`git status`, `git branch`, `git diff`, `git commit`, `git log`). Remote push (`git push origin ...`) requires configured credentials. |
| `CAP-WS` (Connected Strategic Workspace / Cloud Notebook) | `UNAVAILABLE` | Antigravity does not share implicit memory or direct cloud notebook state with Gemini Strategic Workspace. |
| `CAP-AGENT` (Sub-Agent Delegation) | `RESTRICTED` or `UNAVAILABLE` | If orchestrator sub-tasks are invoked locally, they must obey `protocols/AGENT_COLLABORATION.md`. Cross-workspace coordination requires `protocols/HANDOFF_PROTOCOL.md`. |

## 4. Constraint Handling & Graceful Degradation Rules
1. **Cross-Workspace Isolation (`CAP-WS` Unavailable)**: Never assume access to unmerged Strategic Workspace conversation history. Require a self-contained Outbound Handoff Package (`HO-TASK-XXX-YY`) conforming to `protocols/HANDOFF_PROTOCOL.md`.
2. **Line-Ending & OS Portability**: On Windows hosts, enforce repository `.gitattributes` (`* text=auto eol=lf` for Markdown and shell scripts) to prevent `LF`/`CRLF` drift across commits.
3. **Remote Push Fallback**: If `git push` to `origin` fails due to credential or sandbox network restrictions, preserve the verified local commit, record the exact terminal output under Epistemic Status `Observed`, and report the pending push in the Inbound Handoff (`HO-TASK-XXX-02`).

## 5. Session Initialization & Handoff Execution Workflow
1. **Receive Outbound Handoff (`HO-TASK-XXX-01`)**: Parse Task Contract fields (`Task ID`, `Responsible Role`, `Autonomy Level`, `Git Strategy`, `Scope`, `Acceptance Criteria`).
2. **Verify Capabilities & Prerequisite State**: Run `git status`, `git branch -a`, and `git rev-parse HEAD` to confirm clean working tree and expected parent commit.
3. **Branch Management (`policies/GIT_POLICY.md`)**: Create or switch to the designated feature branch (`<type>/TASK-XXX-<slug>`) unless direct-to-`main` is explicitly authorized in the Task Contract.
4. **Bounded Execution & Automated Audit**: Materialize or modify in-scope files; run automated verification scripts checking metadata headers, cross-references, and `management/KNOWLEDGE_MAP.md` parity.
5. **Commit & Emit Inbound Handoff (`HO-TASK-XXX-02`)**: Inspect `git diff --cached --stat`, commit with `[TASK-XXX]` trailer, and generate a complete Evidence Package (`EV-TASK-XXX-01`) mapped 1-to-1 to Acceptance Criteria.

## 6. Security & Isolation Guardrails
* Comply with `policies/SECURITY_POLICY.md`: never stage `.env` files, credentials, tokens, or IDE-private secret stores.
* Restrict filesystem mutations strictly to the resolved repository root (`c:/Users/user/Project/uesf`).

## 7. Relationships with Other Documents
* **Core & Capabilities**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/CAPABILITY_MODEL.md`, `adapters/README.md`
* **Policies**: `policies/AUTONOMY_POLICY.md`, `policies/GIT_POLICY.md`, `policies/SECURITY_POLICY.md`, `policies/VERIFICATION_POLICY.md`
* **Protocols**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/HANDOFF_PROTOCOL.md`, `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`
* **Template**: `templates/PLATFORM_ADAPTER_TEMPLATE.md`
