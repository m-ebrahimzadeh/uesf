# Master Knowledge Map & Source-of-Truth Registry
* **Document ID**: UESF-MGMT-004
* **Canonical Path**: management/KNOWLEDGE_MAP.md
* **Version**: 0.9.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-18

## 1. Purpose
Maintain the single authoritative registry mapping every canonical UESF specification document to its unique Document ID, canonical repository path, architectural layer, owner role, version, and verification status.

## 2. Scope
Covers all 59 canonical Markdown documents across the UESF repository (`policies/SOURCE_OF_TRUTH_POLICY.md`). Machine-generated derived artifacts (`management/CONTEXT_SNAPSHOT.md` and `dist/`) are governed by automated SHA-256 drift verification in `management/validation/audit.ps1`.

## 3. Rules and Requirements
1. **Single Canonical Home**: The Git repository (`c:/Users/user/Project/uesf` synced with `https://github.com/m-ebrahimzadeh/uesf`) is the canonical source of truth for all registered specifications.
2. **1-to-1 Inventory Parity**: Every canonical `.md` specification file in the repository MUST have an exact corresponding row in Section 4 of this registry.

## 4. Master Source-of-Truth Matrix (`v0.9.0` — 59 Canonical Documents)
| Doc ID | Canonical Repository Path | Layer / Category | Owner Role | Version | Lifecycle Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `UESF-CORE-001` | `README.md` | Core Index | CTO | `0.9.0` | Verified |
| `UESF-CORE-002` | `core/UNIVERSAL_AGENT_OPERATING_MODEL.md` | Layer 1: Core | CTO | `0.3.0` | Verified |
| `UESF-CORE-003` | `core/FRAMEWORK_ARCHITECTURE.md` | Layer 1: Core | CTO | `0.3.1` | Verified |
| `UESF-CORE-004` | `core/CAPABILITY_MODEL.md` | Layer 1: Core | CTO | `0.1.0` | Verified |
| `UESF-POL-001` | `policies/AUTONOMY_POLICY.md` | Layer 2: Policy | CTO | `0.2.0` | Verified |
| `UESF-POL-002` | `policies/GOVERNANCE_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | Verified |
| `UESF-POL-003` | `policies/SECURITY_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | Verified |
| `UESF-POL-004` | `policies/GIT_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | Verified |
| `UESF-POL-005` | `policies/VERIFICATION_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | Verified |
| `UESF-POL-006` | `policies/KNOWLEDGE_GOVERNANCE_POLICY.md` | Layer 2: Policy | CTO | `0.1.0` | Verified |
| `UESF-POL-007` | `policies/SOURCE_OF_TRUTH_POLICY.md` | Layer 2: Policy | CTO | `0.3.0` | Verified |
| `UESF-PROT-001` | `protocols/TASK_CONTRACT_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.3.0` | Verified |
| `UESF-PROT-002` | `protocols/HANDOFF_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.3.0` | Verified |
| `UESF-PROT-003` | `protocols/AGENT_COLLABORATION.md` | Layer 3: Protocol | CTO | `0.1.0` | Verified |
| `UESF-PROT-004` | `protocols/TASK_ACCEPTANCE_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | Verified |
| `UESF-PROT-005` | `protocols/KNOWLEDGE_SYNCHRONIZATION.md` | Layer 3: Protocol | CTO | `0.2.0` | Verified |
| `UESF-PROT-006` | `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | Verified |
| `UESF-PROT-007` | `protocols/ESCALATION_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.1.0` | Verified |
| `UESF-PROT-008` | `protocols/FEATURE_DISCOVERY_PROTOCOL.md` | Layer 3: Protocol | CTO | `0.5.0` | Verified |
| `UESF-WKFL-001` | `workflows/INIT_WORKFLOW.md` | Lifecycle Workflow | Architect | `0.8.0` | Verified |
| `UESF-WKFL-002` | `workflows/HANDOFF_WORKFLOW.md` | Lifecycle Workflow | Architect | `0.9.0` | Verified |
| `UESF-WKFL-003` | `workflows/STATUS_WORKFLOW.md` | Lifecycle Workflow | CTO | `0.7.0` | Verified |
| `UESF-TMPL-001` | `templates/ROLE_SKILL_TEMPLATE.md` | Templates (L4) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-002` | `templates/TASK_CONTRACT_TEMPLATE.md` | Templates (L3) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-003` | `templates/HANDOFF_PACKAGE_TEMPLATE.md` | Templates (L3) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-004` | `templates/EVIDENCE_PACKAGE_TEMPLATE.md` | Templates (L3) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-005` | `templates/KDP_TEMPLATE.md` | Templates (L3) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-006` | `templates/ESCALATION_RECORD_TEMPLATE.md` | Templates (L3) | CTO | `0.2.1` | Verified |
| `UESF-TMPL-007` | `templates/PLATFORM_ADAPTER_TEMPLATE.md` | Templates (L5) | Architect | `0.4.0` | Verified |
| `UESF-TMPL-008` | `templates/PROJECT_EXTENSION_TEMPLATE.md` | Templates (L6) | Architect | `0.6.0` | Verified |
| `UESF-TMPL-009` | `templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md` | Templates (L3) | Architect | `0.5.0` | Verified |
| `UESF-ROLE-001` | `roles/cto/SKILL.md` | Layer 4: Role Skill | CTO | `0.4.0` | Verified |
| `UESF-ROLE-002` | `roles/architect/SKILL.md` | Layer 4: Role Skill | CTO | `0.3.0` | Verified |
| `UESF-ROLE-003` | `roles/developer/SKILL.md` | Layer 4: Role Skill | CTO | `0.4.0` | Verified |
| `UESF-ROLE-004` | `roles/qa/SKILL.md` | Layer 4: Role Skill | CTO | `0.3.0` | Verified |
| `UESF-ROLE-005` | `roles/devops/SKILL.md` | Layer 4: Role Skill | CTO | `0.3.0` | Verified |
| `UESF-ROLE-006` | `roles/security/SKILL.md` | Layer 4: Role Skill | CTO | `0.3.0` | Verified |
| `UESF-ROLE-007` | `roles/sre/SKILL.md` | Layer 4: Role Skill | CTO | `0.3.0` | Verified |
| `UESF-ROLE-008` | `roles/documentation/SKILL.md` | Layer 4: Role Skill | CTO | `0.2.0` | Verified |
| `UESF-ROLE-009` | `roles/discovery/SKILL.md` | Layer 4: Role Skill | CTO | `0.6.0` | Verified |
| `UESF-ADPT-001` | `adapters/README.md` | Layer 5: Adapter | Architect | `0.5.0` | Verified |
| `UESF-ADPT-002` | `adapters/antigravity-vscode/ADAPTER.md` | Layer 5: Adapter | DevOps | `0.5.0` | Verified |
| `UESF-ADPT-003` | `adapters/gemini-strategic-workspace/ADAPTER.md` | Layer 5: Adapter | Architect | `0.5.0` | Verified |
| `UESF-ADPT-004` | `adapters/generic-cli-mcp/ADAPTER.md` | Layer 5: Adapter | Architect | `0.5.0` | Verified |
| `UESF-EXT-001` | `extensions/README.md` | Layer 6: Extension | Architect | `0.6.0` | Verified |
| `UESF-EXT-002` | `extensions/example-web-service/EXTENSION.md` | Layer 6: Extension | Architect | `0.6.0` | Verified |
| `UESF-MGMT-001` | `management/PROJECT_PROFILE.md` | Management | CTO | `0.9.0` | Verified |
| `UESF-MGMT-002` | `management/ACTIVE_TASKS.md` | Management | CTO | `0.9.0` | Verified |
| `UESF-MGMT-003` | `management/DECISION_LOG.md` | Management | CTO | `0.9.0` | Verified |
| `UESF-MGMT-004` | `management/KNOWLEDGE_MAP.md` | Management | CTO | `0.9.0` | Verified |
| `UESF-MGMT-005` | `management/RELEASE_HISTORY.md` | Management | CTO | `0.9.0` | Verified |
| `UESF-MGMT-006` | `management/IMPLEMENTATION_ROADMAP.md` | Management | CTO | `0.9.0` | Verified |
| `UESF-VAL-001` | `management/validation/VALIDATION_REPORT_001.md` | Validation Evidence | CTO | `0.1.1` | Verified |
| `UESF-VAL-002` | `management/validation/VALIDATION_REPORT_002.md` | Validation Evidence | CTO | `0.2.1` | Verified |
| `UESF-VAL-003` | `management/validation/VALIDATION_REPORT_003.md` | Validation Evidence | CTO | `0.3.0` | Verified |
| `UESF-VAL-004` | `management/validation/VALIDATION_REPORT_004.md` | Validation Evidence | CTO | `0.4.0` | Verified |
| `UESF-VAL-005` | `management/validation/VALIDATION_REPORT_005.md` | Validation Evidence | CTO | `0.5.0` | Verified |
| `UESF-VAL-006` | `management/validation/VALIDATION_REPORT_006.md` | Validation Evidence | CTO | `0.6.0` | Verified |
| `UESF-VAL-007` | `management/validation/VALIDATION_REPORT_007.md` | Validation Evidence | CTO | `0.7.0` | Verified |

## 5. Responsibilities
* **CTO**: Approves additions, deprecations, and version transitions in this registry.
* **Documentation Role**: Verifies 1-to-1 file parity during every milestone update.

## 6. Relationships with Other Documents
* **Policies**: `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`
* **Protocols**: `protocols/KNOWLEDGE_SYNCHRONIZATION.md`
