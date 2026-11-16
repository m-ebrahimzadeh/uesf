# Universal Engineering Skills Framework (UESF)
* **Document ID**: UESF-CORE-001
* **Canonical Path**: README.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Provide the entry-point overview, architectural orientation, and canonical navigation index for the Universal Engineering Skills Framework (UESF).

## 2. Scope
Applies to all human operators and AI agents participating in UESF governance, specification authoring, role execution, platform adaptation, and project delivery. Excludes project-specific implementations and platform-proprietary runtime configurations.

## 3. Rules and Requirements
1. **Markdown-First Canonical Definitions**: All universal specifications, policies, protocols, and role definitions MUST be authored in standard Markdown with structured metadata headers.
2. **Platform Independence**: Universal definitions in `core/`, `policies/`, `protocols/`, and `roles/` MUST NOT depend on any specific LLM provider, IDE, CLI, or cloud workspace.
3. **Capability Verification**: Agents MUST evaluate runtime capabilities per `core/CAPABILITY_MODEL.md` before executing tasks.
4. **Single Source of Truth**: Every document and governance record MUST have exactly one authoritative location as defined in `policies/SOURCE_OF_TRUTH_POLICY.md` and indexed in `management/KNOWLEDGE_MAP.md`.

## 4. Responsibilities
* **CTO**: Curates and approves canonical framework specifications, governs the roadmap, and resolves cross-functional or architectural conflicts.
* **Documentation Role**: Maintains structural formatting, cross-reference integrity, and synchronized workspace mirrors under CTO approval.
* **All Agent Roles**: Read and comply with the foundational specifications listed in this index prior to executing assigned tasks.

## 5. Relevant Workflows
1. **Environment & Capability Discovery**: Assess active runtime environment (`core/CAPABILITY_MODEL.md`).
2. **Task Initialization**: Receive or propose a Task Contract (`protocols/TASK_CONTRACT_PROTOCOL.md`).
3. **Bounded Execution & Collaboration**: Execute work within assigned Autonomy Level (`policies/AUTONOMY_POLICY.md`) and delegate subtasks if authorized (`protocols/AGENT_COLLABORATION.md`).
4. **Verification & Evidence Submission**: Validate deliverables (`policies/VERIFICATION_POLICY.md`) and submit structured evidence (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`).
5. **Acceptance & Synchronization**: Complete formal task acceptance (`protocols/TASK_ACCEPTANCE_PROTOCOL.md`) and synchronize authoritative knowledge (`protocols/KNOWLEDGE_SYNCHRONIZATION.md`).

## 6. Relationships with Other Documents
* **Governed By**: `policies/GOVERNANCE_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`
* **Architecture & Operating Model**: `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`
* **Project Management Index**: `management/PROJECT_PROFILE.md`, `management/KNOWLEDGE_MAP.md`, `management/ACTIVE_TASKS.md`
