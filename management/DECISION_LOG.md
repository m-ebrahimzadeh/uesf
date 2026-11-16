# Decision Log
* **Document ID**: UESF-MGMT-003
* **Canonical Path**: management/DECISION_LOG.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Maintain the authoritative chronological record of confirmed stakeholder constraints, CTO architectural/governance decisions, and open questions requiring human resolution.

## 2. Scope
Covers all architectural, governance, workflow, and repository topology decisions for UESF.

## 3. Confirmed Architectural & Governance Decisions (Human Stakeholder + CTO Baseline)
| Decision ID | Category | Decision Summary | Status | Authority | Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DEC-001` | Role Topology | Establish exactly 8 initial universal engineering agent roles: CTO, Architect, Developer, QA, DevOps, Security, SRE, Documentation. Explicit role activation is required. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-002` | Task Acceptance | Use tiered task acceptance: routine low-risk tasks are accepted by the designated independent reviewer role; the CTO governs cross-functional milestones, foundational specs, and high-impact changes. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-003` | Git Governance | Branches are the default for all code/spec changes. Small, isolated, low-risk changes (and initial repo bootstrap) may commit directly to `main` only when explicitly authorized in the Task Contract and verified. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-004` | Hybrid Knowledge Backend | Use a hybrid arrangement combining the Project Git Repository and Connected Shared Workspace, with a strict Single Source of Truth per document registered in `management/KNOWLEDGE_MAP.md`. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-005` | Multi-Agent Collaboration | Permit bounded direct agent-to-agent subtask delegation within an approved Task Contract without mandatory CTO mediation; original task owner retains full accountability. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-006` | Knowledge Ownership | The CTO is the primary curator and sole approver of authoritative project knowledge. Documentation agents maintain approved artifacts but cannot redefine normative decisions. | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-007` | Phased Delivery Strategy | Build the platform-independent universal foundation first (Mission 001), followed by the 8 universal Role Skills (Mission 002), platform adapters (Mission 003), and project-specific extensions last (Mission 004+). | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-008` | Autonomy Model | Standardize on four autonomy levels: `A0` (Advisory), `A1` (Bounded Execution), `A2` (Autonomous Execution within scope), and `A3` (Human Approval Required). | Confirmed | Human Stakeholder | 2026-11-16 |
| `DEC-009` | Six-Layer Directory Architecture | Organize the repository into `core/`, `policies/`, `protocols/`, `management/`, `roles/`, `adapters/`, `templates/`, and `extensions/` with strict unidirectional dependencies (`core -> policies -> protocols -> roles -> adapters -> extensions`). | Approved | CTO (`A2`) | 2026-11-16 |
| `DEC-010` | Strategic Workspace Staging & Repo Transition | Because `CAP-FS` and `CAP-GIT` are unavailable in the Strategic Workspace during Mission 001, persist all 25 v0.1.0 canonical Markdown specifications into the connected `UNIVERSAL ENGINEERING SKILLS` Gemini Notebook as `Approved (Staged)` and dispatch `TASK-001` (`HO-TASK-001-01`) to materialize the Git repository in Antigravity/VS Code. | Approved | CTO (`A2`) | 2026-11-16 |

## 4. Open Questions & Pending Human Decisions (`A3` / Clarification Items)
| Question ID | Topic | Context & Impact | Options | CTO Recommendation | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `OQ-001` | Canonical Remote Git Hosting & Path | No existing Git repository was found in the connected workspace, and local disk/Git hosting (`CAP-FS`/`CAP-GIT`) lives in the Engineering Workspace. We need the human stakeholder to confirm the target local path and remote Git host (e.g., GitHub/GitLab URL and visibility) when executing `TASK-001`. | **Option A**: Initialize local Git repo at `./uesf` in Antigravity/VS Code first, then attach remote origin later.<br>**Option B**: Provision remote GitHub/GitLab repo first, clone in Antigravity, and execute `TASK-001`. | **Option A** for immediate frictionless local execution of `TASK-001`, followed by remote attachment once repository URL is provided. | Open (Awaiting Human Input) |
| `OQ-002` | Automated vs. Manual Workspace-to-Repo Bridge | Currently, the Strategic Workspace (Gemini Notebook) and Engineering Workspace (Antigravity/VS Code) do not share an automatic filesystem bridge. | **Option A**: Use explicit Markdown Task Handoffs (`HO-TASK-XXX`) relayed by the human operator.<br>**Option B**: Configure a Google Drive desktop sync or MCP connector in Antigravity in Phase 3 (Platform Adapters). | **Option A** for Missions 001–002 to maintain zero tool coupling, then evaluate **Option B** during Phase 3 (`adapters/`). | Open (Non-Blocking for Mission 001) |

## 5. Responsibilities
* **CTO**: Logs all architectural and governance rulings prior to or alongside specification changes.

## 6. Relationships with Other Documents
* **Governance & Knowledge**: `policies/GOVERNANCE_POLICY.md`, `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `management/KNOWLEDGE_MAP.md`
