# Universal Engineering Skills Framework (UESF)
* **Document ID**: UESF-CORE-001
* **Canonical Path**: README.md
* **Version**: 1.0.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Serve as the canonical root entry point, architectural map, and master navigation index for the Universal Engineering Skills Framework (UESF)—a reusable, platform-independent collection of AI agent Skills, policies, protocols, adapters, and extension blueprints that establish a disciplined software engineering organization composed of specialized AI agents.

## 2. Scope
Applies to all human stakeholders and AI agents operating within or integrating with UESF across any runtime environment or downstream software project (`core/UNIVERSAL_AGENT_OPERATING_MODEL.md`).

## 3. Framework Architecture & Directory Index (Layers 1–6)
1. **Layer 1 — Core Operating Model (`core/`)**:
   * `core/UNIVERSAL_AGENT_OPERATING_MODEL.md` (`UESF-CORE-002`)
   * `core/FRAMEWORK_ARCHITECTURE.md` (`UESF-CORE-003`)
   * `core/CAPABILITY_MODEL.md` (`UESF-CORE-004`)
2. **Layer 2 — Universal Normative Policies (`policies/`)**:
   * `policies/AUTONOMY_POLICY.md` (`UESF-POL-001`)
   * `policies/GOVERNANCE_POLICY.md` (`UESF-POL-002`)
   * `policies/SECURITY_POLICY.md` (`UESF-POL-003`)
   * `policies/GIT_POLICY.md` (`UESF-POL-004`)
   * `policies/VERIFICATION_POLICY.md` (`UESF-POL-005`)
   * `policies/KNOWLEDGE_GOVERNANCE_POLICY.md` (`UESF-POL-006`)
   * `policies/SOURCE_OF_TRUTH_POLICY.md` (`UESF-POL-007`)
3. **Layer 3 — Execution, Collaboration & Accountability Protocols (`protocols/`)**:
   * `protocols/TASK_CONTRACT_PROTOCOL.md` (`UESF-PROT-001`)
   * `protocols/HANDOFF_PROTOCOL.md` (`UESF-PROT-002`)
   * `protocols/AGENT_COLLABORATION.md` (`UESF-PROT-003`)
   * `protocols/TASK_ACCEPTANCE_PROTOCOL.md` (`UESF-PROT-004`)
   * `protocols/KNOWLEDGE_SYNCHRONIZATION.md` (`UESF-PROT-005`)
   * `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md` (`UESF-PROT-006`)
   * `protocols/ESCALATION_PROTOCOL.md` (`UESF-PROT-007`)
4. **Layer 4 — Universal Agent Role Skills (`roles/`)**:
   * `roles/cto/SKILL.md` (`UESF-ROLE-001`), `roles/architect/SKILL.md` (`UESF-ROLE-002`), `roles/developer/SKILL.md` (`UESF-ROLE-003`), `roles/qa/SKILL.md` (`UESF-ROLE-004`), `roles/devops/SKILL.md` (`UESF-ROLE-005`), `roles/security/SKILL.md` (`UESF-ROLE-006`), `roles/sre/SKILL.md` (`UESF-ROLE-007`), `roles/documentation/SKILL.md` (`UESF-ROLE-008`)
5. **Layer 5 — Platform Adapters (`adapters/`)**:
   * `adapters/README.md` (`UESF-ADPT-001`)
   * `adapters/antigravity-vscode/ADAPTER.md` (`UESF-ADPT-002`)
   * `adapters/gemini-strategic-workspace/ADAPTER.md` (`UESF-ADPT-003`)
   * `adapters/generic-cli-mcp/ADAPTER.md` (`UESF-ADPT-004`)
6. **Layer 6 — Project-Specific Extensions (`extensions/`)**:
   * `extensions/README.md` (`UESF-EXT-001`)
   * `extensions/example-web-service/EXTENSION.md` (`UESF-EXT-002`)
7. **Reusable Artifact Templates (`templates/`)**:
   * `templates/ROLE_SKILL_TEMPLATE.md` (`UESF-TMPL-001`), `templates/TASK_CONTRACT_TEMPLATE.md` (`UESF-TMPL-002`), `templates/HANDOFF_PACKAGE_TEMPLATE.md` (`UESF-TMPL-003`), `templates/EVIDENCE_PACKAGE_TEMPLATE.md` (`UESF-TMPL-004`), `templates/KDP_TEMPLATE.md` (`UESF-TMPL-005`), `templates/ESCALATION_RECORD_TEMPLATE.md` (`UESF-TMPL-006`), `templates/PLATFORM_ADAPTER_TEMPLATE.md` (`UESF-TMPL-007`), `templates/PROJECT_EXTENSION_TEMPLATE.md` (`UESF-TMPL-008`)
8. **Project Governance, State & Validation (`management/`)**:
   * `management/PROJECT_PROFILE.md` (`UESF-MGMT-001`), `management/ACTIVE_TASKS.md` (`UESF-MGMT-002`), `management/DECISION_LOG.md` (`UESF-MGMT-003`), `management/KNOWLEDGE_MAP.md` (`UESF-MGMT-004`), `management/RELEASE_HISTORY.md` (`UESF-MGMT-005`), `management/IMPLEMENTATION_ROADMAP.md` (`UESF-MGMT-006`)
   * Validation Reports: `management/validation/VALIDATION_REPORT_001.md` (`UESF-VAL-001`), `management/validation/VALIDATION_REPORT_002.md` (`UESF-VAL-002`), `management/validation/VALIDATION_REPORT_003.md` (`UESF-VAL-003`), `management/validation/VALIDATION_REPORT_004.md` (`UESF-VAL-004`)

## 4. Responsibilities
* **CTO**: Curates and approves canonical framework specifications, governs the roadmap, and resolves cross-functional or architectural conflicts.
* **Documentation Role**: Maintains structural formatting, cross-reference integrity, and synchronized workspace mirrors under CTO approval.
* **All Agent Roles**: Read and comply with the foundational specifications listed in this index prior to executing assigned tasks.

## 5. Relevant Workflows
1. **Environment & Capability Discovery**: Assess active runtime environment (`core/CAPABILITY_MODEL.md`) and bind via the appropriate platform adapter (`adapters/README.md`).
2. **Project Overlay Loading (Optional)**: Load target project extension from `extensions/README.md` if operating on a downstream codebase.
3. **Task Initialization & Execution**: Receive or propose a Task Contract (`protocols/TASK_CONTRACT_PROTOCOL.md`), execute within assigned Autonomy Level (`policies/AUTONOMY_POLICY.md`), and delegate subtasks if authorized (`protocols/AGENT_COLLABORATION.md`).
4. **Verification, Evidence & Acceptance**: Validate deliverables (`policies/VERIFICATION_POLICY.md`), submit structured evidence (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`), complete formal task acceptance (`protocols/TASK_ACCEPTANCE_PROTOCOL.md`), and synchronize knowledge (`protocols/KNOWLEDGE_SYNCHRONIZATION.md`).

## 6. Relationships with Other Documents
* **Master Registry**: `management/KNOWLEDGE_MAP.md`
* **Project Profile & Roadmap**: `management/PROJECT_PROFILE.md`, `management/IMPLEMENTATION_ROADMAP.md`
