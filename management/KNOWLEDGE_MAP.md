# Knowledge Map & Source-of-Truth Registry
* **Document ID**: UESF-MGMT-004
* **Canonical Path**: management/KNOWLEDGE_MAP.md
* **Version**: 0.2.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Serve as the master index mapping every UESF document and knowledge category to its Document ID, Canonical Repository Path, Strategic Workspace Mirror, Owner Role, Version, and Lifecycle State.

## 2. Scope
Covers all 40 canonical documents across Milestone M1 (`v0.1.0`) and Milestone M2 (`v0.2.0`) and establishes the registry for future platform adapters and extensions.

## 3. Rules and Requirements
1. Every normative or management document in UESF MUST be registered in Section 4 of this document.
2. **Authoritative Backend Rule (`policies/SOURCE_OF_TRUTH_POLICY.md`)**:
   * **Target Canonical Home**: Project Git Repository (`uesf/`).
   * **Strategic Workspace Mirror**: `UNIVERSAL ENGINEERING SKILLS` Gemini Notebook.

## 4. Master Source-of-Truth Matrix (v0.2.0 Baseline)
| Doc ID | Canonical Repository Path | Strategic Workspace Source Name | Layer / Category | Owner Role | Version | Lifecycle Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `UESF-CORE-001` | `README.md` | `README.md` | Core Index | CTO | `0.1.0` | `Verified` |
| `UESF-CORE-002` | `core/UNIVERSAL_AGENT_OPERATING_MODEL.md` | `core/UNIVERSAL_AGENT_OPERATING_MODEL.md` | Layer 1: Core | CTO | `0.1.0` | `Verified` |
| `UESF-CORE-003` | `core/FRAMEWORK_ARCHITECTURE.md` | `core/FRAMEWORK_ARCHITECTURE.md` | Layer 1: Core | CTO | `0.1.0` | `Verified` |
| `UESF-CORE-004` | `core/CAPABILITY_MODEL.md` | `core/CAPABILITY_MODEL.md` | Layer 1: Core | CTO | `0.1.0` | `Verified` |
| `UESF-POL-001` | `policies/AUTONOMY_POLICY.md` | `policies/AUTONOMY_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | `Verified` |
| `UESF-POL-002` | `policies/GOVERNANCE_POLICY.md` | `policies/GOVERNANCE_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | `Verified` |
| `UESF-POL-003` | `policies/SECURITY_POLICY.md` | `policies/SECURITY_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | `Verified` |
| `UESF-POL-004` | `policies/GIT_POLICY.md` | `policies/GIT_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | `Verified` |
| `UESF-POL-005` | `policies/VERIFICATION_POLICY.md` | `policies/VERIFICATION_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | `Verified` |
| `UESF-POL-006` | `policies/KNOWLEDGE_GOVERNANCE_POLICY.md` | `policies/KNOWLEDGE_GOVERNANCE_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | `Verified` |
| `UESF-POL-007` | `policies/SOURCE_OF_TRUTH_POLICY.md` | `policies/SOURCE_OF_TRUTH_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | `Verified` |
| `UESF-PROT-001` | `protocols/TASK_CONTRACT_PROTOCOL.md` | `protocols/TASK_CONTRACT_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | `Verified` |
| `UESF-PROT-002` | `protocols/HANDOFF_PROTOCOL.md` | `protocols/HANDOFF_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | `Verified` |
| `UESF-PROT-003` | `protocols/AGENT_COLLABORATION.md` | `protocols/AGENT_COLLABORATION.md` | Layer 3: Protocol | CTO | `0.1.0` | `Verified` |
| `UESF-PROT-004` | `protocols/TASK_ACCEPTANCE_PROTOCOL.md` | `protocols/TASK_ACCEPTANCE_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | `Verified` |
| `UESF-PROT-005` | `protocols/KNOWLEDGE_SYNCHRONIZATION.md` | `protocols/KNOWLEDGE_SYNCHRONIZATION.md` | Layer 3: Protocol | CTO | `0.1.0` | `Verified` |
| `UESF-PROT-006` | `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md` | `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | `Verified` |
| `UESF-PROT-007` | `protocols/ESCALATION_PROTOCOL.md` | `protocols/ESCALATION_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | `Verified` |
| `UESF-MGMT-001` | `management/PROJECT_PROFILE.md` | `management/PROJECT_PROFILE.md` | Management | CTO | `0.2.0` | `Verified` |
| `UESF-MGMT-002` | `management/ACTIVE_TASKS.md` | `management/ACTIVE_TASKS.md` | Management | CTO | `0.2.0` | `Verified` |
| `UESF-MGMT-003` | `management/DECISION_LOG.md` | `management/DECISION_LOG.md` | Management | CTO | `0.1.0` | `Verified` |
| `UESF-MGMT-004` | `management/KNOWLEDGE_MAP.md` | `management/KNOWLEDGE_MAP.md` | Management | CTO | `0.2.0` | `Verified` |
| `UESF-MGMT-005` | `management/RELEASE_HISTORY.md` | `management/RELEASE_HISTORY.md` | Management | CTO | `0.2.0` | `Verified` |
| `UESF-MGMT-006` | `management/IMPLEMENTATION_ROADMAP.md` | `management/IMPLEMENTATION_ROADMAP.md` | Management | CTO | `0.2.0` | `Verified` |
| `UESF-VAL-001` | `management/validation/VALIDATION_REPORT_001.md` | `management/validation/VALIDATION_REPORT_001.md` | Validation Evidence | CTO | `0.1.0` | `Verified` |
| `UESF-TMPL-001` | `templates/ROLE_SKILL_TEMPLATE.md` | `templates/ROLE_SKILL_TEMPLATE.md` | Templates | CTO / Architect | `0.2.0` | `Verified` |
| `UESF-TMPL-002` | `templates/TASK_CONTRACT_TEMPLATE.md` | `templates/TASK_CONTRACT_TEMPLATE.md` | Templates | CTO | `0.2.0` | `Verified` |
| `UESF-TMPL-003` | `templates/HANDOFF_PACKAGE_TEMPLATE.md` | `templates/HANDOFF_PACKAGE_TEMPLATE.md` | Templates | CTO | `0.2.0` | `Verified` |
| `UESF-TMPL-004` | `templates/EVIDENCE_PACKAGE_TEMPLATE.md` | `templates/EVIDENCE_PACKAGE_TEMPLATE.md` | Templates | CTO | `0.2.0` | `Verified` |
| `UESF-TMPL-005` | `templates/KDP_TEMPLATE.md` | `templates/KDP_TEMPLATE.md` | Templates | CTO | `0.2.0` | `Verified` |
| `UESF-TMPL-006` | `templates/ESCALATION_RECORD_TEMPLATE.md` | `templates/ESCALATION_RECORD_TEMPLATE.md` | Templates | CTO | `0.2.0` | `Verified` |
| `UESF-ROLE-001` | `roles/cto/SKILL.md` | `roles/cto/SKILL.md` | Layer 4: Role Skill | CTO | `0.2.0` | `Verified` |
| `UESF-ROLE-002` | `roles/architect/SKILL.md` | `roles/architect/SKILL.md` | Layer 4: Role Skill | CTO / Architect | `0.2.0` | `Verified` |
| `UESF-ROLE-003` | `roles/developer/SKILL.md` | `roles/developer/SKILL.md` | Layer 4: Role Skill | CTO / Architect | `0.2.0` | `Verified` |
| `UESF-ROLE-004` | `roles/qa/SKILL.md` | `roles/qa/SKILL.md` | Layer 4: Role Skill | CTO / QA | `0.2.0` | `Verified` |
| `UESF-ROLE-005` | `roles/devops/SKILL.md` | `roles/devops/SKILL.md` | Layer 4: Role Skill | CTO / DevOps | `0.2.0` | `Verified` |
| `UESF-ROLE-006` | `roles/security/SKILL.md` | `roles/security/SKILL.md` | Layer 4: Role Skill | CTO / Security | `0.2.0` | `Verified` |
| `UESF-ROLE-007` | `roles/sre/SKILL.md` | `roles/sre/SKILL.md` | Layer 4: Role Skill | CTO / SRE | `0.2.0` | `Verified` |
| `UESF-ROLE-008` | `roles/documentation/SKILL.md` | `roles/documentation/SKILL.md` | Layer 4: Role Skill | CTO / Documentation | `0.2.0` | `Verified` |
| `UESF-VAL-002` | `management/validation/VALIDATION_REPORT_002.md` | `management/validation/VALIDATION_REPORT_002.md` | Validation Evidence | CTO / QA | `0.2.0` | `Verified` |

## 5. Information Category Ownership Matrix
| Information Category | Canonical Source of Truth | Secondary Mirror / Summary | Approver Role | Maintainer Role |
| :--- | :--- | :--- | :--- | :--- |
| Core Operating Model & Architecture | Git Repo (`core/*.md`) | Strategic Workspace Notebook | CTO | CTO / Architect |
| Normative Policies | Git Repo (`policies/*.md`) | Strategic Workspace Notebook | CTO | CTO / Documentation |
| Interaction & Execution Protocols | Git Repo (`protocols/*.md`) | Strategic Workspace Notebook | CTO | CTO / Documentation |
| Universal Agent Role Skills (Phase 2) | Git Repo (`roles/<role>/SKILL.md`) | Strategic Workspace Notebook | CTO | Architect / Documentation |
| Active Task Contracts & Decision Log | Git Repo (`management/*.md`) | Strategic Workspace Notebook | CTO | CTO |
| Uncodified Strategic Research & Session Notes | Strategic Workspace Notebook | N/A (Promoted to Git via KDP) | CTO | CTO / Documentation |
| Local Execution Logs & Git Commit History | Engineering Workspace / Git Repo | Inbound Handoff Evidence Packages | Reviewer Role / CTO | DevOps / Developer |

## 6. Relationships with Other Documents
* **Policies**: `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`
* **Protocols**: `protocols/KNOWLEDGE_SYNCHRONIZATION.md`
