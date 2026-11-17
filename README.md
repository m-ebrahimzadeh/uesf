# Universal Engineering Skills Framework (UESF)
* **Document ID**: UESF-CORE-001
* **Canonical Path**: README.md
* **Version**: 0.6.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Serve as the canonical root entry point, architectural map, and master navigation index for the Universal Engineering Skills Framework (UESF)—a reusable, platform-independent collection of AI agent Skills, policies, protocols, lifecycle workflows, adapters, and compiled multi-agent bundles that establish a disciplined software engineering organization composed of nine specialized AI agent roles.

## 2. Scope
Applies to all human stakeholders and AI agents operating within or integrating with UESF across any local coding agent, cloud chat session, or downstream software project (`core/UNIVERSAL_AGENT_OPERATING_MODEL.md`).

## 3. Framework Architecture & Directory Index (Layers 1–6 & Cross-Cutting Modules)
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
3. **Layer 3 — Discovery, Execution, Collaboration & Accountability Protocols (`protocols/`)**:
   * `protocols/FEATURE_DISCOVERY_PROTOCOL.md` (`UESF-PROT-008`)
   * `protocols/TASK_CONTRACT_PROTOCOL.md` (`UESF-PROT-001`)
   * `protocols/HANDOFF_PROTOCOL.md` (`UESF-PROT-002`)
   * `protocols/AGENT_COLLABORATION.md` (`UESF-PROT-003`)
   * `protocols/TASK_ACCEPTANCE_PROTOCOL.md` (`UESF-PROT-004`)
   * `protocols/KNOWLEDGE_SYNCHRONIZATION.md` (`UESF-PROT-005`)
   * `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md` (`UESF-PROT-006`)
   * `protocols/ESCALATION_PROTOCOL.md` (`UESF-PROT-007`)
4. **Layer 4 — Universal Agent Role Skills (`roles/` — 9 Canonical Roles)**:
   * `roles/discovery/SKILL.md` (`UESF-ROLE-009`), `roles/cto/SKILL.md` (`UESF-ROLE-001`), `roles/architect/SKILL.md` (`UESF-ROLE-002`), `roles/developer/SKILL.md` (`UESF-ROLE-003`), `roles/qa/SKILL.md` (`UESF-ROLE-004`), `roles/devops/SKILL.md` (`UESF-ROLE-005`), `roles/security/SKILL.md` (`UESF-ROLE-006`), `roles/sre/SKILL.md` (`UESF-ROLE-007`), `roles/documentation/SKILL.md` (`UESF-ROLE-008`)
5. **Lifecycle Workflows (`workflows/` — 3 Cross-Cutting Commands)**:
   * `workflows/INIT_WORKFLOW.md` (`UESF-WKFL-001` — `/uesf:init`)
   * `workflows/HANDOFF_WORKFLOW.md` (`UESF-WKFL-002` — `/uesf:handoff`)
   * `workflows/STATUS_WORKFLOW.md` (`UESF-WKFL-003` — `/uesf:status`)
6. **Layer 5 — Platform Adapters & Compiled Distribution (`adapters/`, `scripts/`, `dist/`)**:
   * `adapters/README.md` (`UESF-ADPT-001`), `adapters/antigravity-vscode/ADAPTER.md` (`UESF-ADPT-002`), `adapters/gemini-strategic-workspace/ADAPTER.md` (`UESF-ADPT-003`), `adapters/generic-cli-mcp/ADAPTER.md` (`UESF-ADPT-004`)
   * Automation & Distribution: `scripts/sync-snapshot.ps1`, `scripts/build-dist.ps1`, `scripts/install.ps1`, and compiled 12-command bundles in `dist/`
7. **Layer 6 — Project-Specific Extensions (`extensions/`)**:
   * `extensions/README.md` (`UESF-EXT-001`), `extensions/example-web-service/EXTENSION.md` (`UESF-EXT-002`)
8. **Layer-Targeted Reusable Artifact Templates (`templates/`)**:
   * `templates/ROLE_SKILL_TEMPLATE.md` (`UESF-TMPL-001`), `templates/TASK_CONTRACT_TEMPLATE.md` (`UESF-TMPL-002`), `templates/HANDOFF_PACKAGE_TEMPLATE.md` (`UESF-TMPL-003`), `templates/EVIDENCE_PACKAGE_TEMPLATE.md` (`UESF-TMPL-004`), `templates/KDP_TEMPLATE.md` (`UESF-TMPL-005`), `templates/ESCALATION_RECORD_TEMPLATE.md` (`UESF-TMPL-006`), `templates/PLATFORM_ADAPTER_TEMPLATE.md` (`UESF-TMPL-007`), `templates/PROJECT_EXTENSION_TEMPLATE.md` (`UESF-TMPL-008`), `templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md` (`UESF-TMPL-009`)
9. **Project Governance, State & Validation (`management/`)**:
   * `management/PROJECT_PROFILE.md` (`UESF-MGMT-001`), `management/ACTIVE_TASKS.md` (`UESF-MGMT-002`), `management/DECISION_LOG.md` (`UESF-MGMT-003`), `management/KNOWLEDGE_MAP.md` (`UESF-MGMT-004`), `management/RELEASE_HISTORY.md` (`UESF-MGMT-005`), `management/IMPLEMENTATION_ROADMAP.md` (`UESF-MGMT-006`), and machine-generated `management/CONTEXT_SNAPSHOT.md`
   * Validation Reports & Tooling: `management/validation/VALIDATION_REPORT_001.md` (`UESF-VAL-001`) through `management/validation/VALIDATION_REPORT_006.md` (`UESF-VAL-006`), and `management/validation/audit.ps1`

## 4. Responsibilities
* **Discovery Role**: Conducts iterative pre-specification feature discovery (`A0` read-only) until explicit human confirmation (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`).
* **CTO**: Curates and approves canonical framework specifications, governs the roadmap, and resolves cross-functional or architectural conflicts.
* **Documentation & DevOps Roles**: Maintain structural formatting, cross-reference integrity, and automated `dist/` / `CONTEXT_SNAPSHOT.md` synchronization.

## 5. Relevant Workflows
1. **Install & Update Across Coding Agents**: Run `powershell -File scripts/install.ps1` (or `sh scripts/install.sh`) to install all 12 UESF skills/commands and the automatic `.git/hooks/pre-commit` snapshot hook.
2. **Resume or Inspect Any Project (`/uesf:status`)**: Invoke `/uesf:status` (`workflows/STATUS_WORKFLOW.md`) at session start in any coding agent or cloud chat to reconstruct verified repository state, active tasks, decisions, and next steps.
3. **Onboard a Project (`/uesf:init`)**: Invoke `/uesf:init` (`workflows/INIT_WORKFLOW.md`) to audit a project in `A0` mode and scaffold `.uesf/`.
4. **Discover, Contract, Execute & Handoff**: Refine new ideas via `/uesf:discovery`, contract via `/uesf:cto`, implement via domain roles, and package session outputs via `/uesf:handoff` (`workflows/HANDOFF_WORKFLOW.md`).

## 6. Relationships with Other Documents
* **Master Registry**: `management/KNOWLEDGE_MAP.md`
* **Project Profile & Roadmap**: `management/PROJECT_PROFILE.md`, `management/IMPLEMENTATION_ROADMAP.md`
