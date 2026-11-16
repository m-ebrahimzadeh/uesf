# Release History
* **Document ID**: UESF-MGMT-005
* **Canonical Path**: management/RELEASE_HISTORY.md
* **Version**: 0.2.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Record all formal version milestones, baseline states, and verification statuses of the Universal Engineering Skills Framework (UESF).

## 2. Scope
Applies to all tagged and untagged milestone releases of UESF.

## 3. Release Log
### `v0.2.0` — Universal Agent Role Skills & Reusable Templates (2026-11-16)
* **Milestone**: Milestone M2 — Universal Agent Role Skills & Protocol Templates (`TASK-002`..`TASK-006`)
* **Release State**: In Review on branch `feat/TASK-002-universal-role-skills` (Pending CTO Tier 2 Merge Acceptance)
* **Summary of Deliverables**:
  * Authored 6 reusable Markdown templates in `templates/`: `ROLE_SKILL_TEMPLATE.md`, `TASK_CONTRACT_TEMPLATE.md`, `HANDOFF_PACKAGE_TEMPLATE.md`, `EVIDENCE_PACKAGE_TEMPLATE.md`, `KDP_TEMPLATE.md`, and `ESCALATION_RECORD_TEMPLATE.md`.
  * Authored all 8 platform-independent Layer 4 Universal Agent Role Skills (`roles/<role>/SKILL.md`): `CTO`, `Architect`, `Developer`, `QA`, `DevOps`, `Security`, `SRE`, and `Documentation`.
  * Completed Milestone M2 structural, non-overlap, delegation-safety, and unidirectional-dependency validation (`management/validation/VALIDATION_REPORT_002.md`).
* **Verification Evidence**: `EV-TASK-006-01` (`management/validation/VALIDATION_REPORT_002.md`) and `EV-TASK-002-01` (Branch Materialization Verification).

### `v0.1.0` — Foundational Architecture & Governance Baseline (2026-11-16)
* **Milestone**: Mission 001 — Project Initialization and Foundational Architecture
* **Release State**: Verified & Accepted on `main` (`288d6dc62a154cf41b0dff40f9e421f22e48f56e`, `TASK-001`)
* **Summary of Deliverables**:
  * Established 6-layer platform-independent architecture (`core/FRAMEWORK_ARCHITECTURE.md`).
  * Defined Universal Agent Operating Model (`core/UNIVERSAL_AGENT_OPERATING_MODEL.md`) and runtime Capability Model (`core/CAPABILITY_MODEL.md`).
  * Established 7 normative policies: Autonomy (`A0`–`A3`), Governance, Security, Git, Verification, Knowledge Governance, and Source of Truth.
  * Established 7 operational protocols: Task Contract, Handoff, Agent Collaboration, Task Acceptance, Knowledge Synchronization, Evidence Submission, and Escalation.
  * Initialized project management suite (`PROJECT_PROFILE.md`, `ACTIVE_TASKS.md`, `DECISION_LOG.md`, `KNOWLEDGE_MAP.md`, `RELEASE_HISTORY.md`, `IMPLEMENTATION_ROADMAP.md`) and completed Phase 6 validation (`management/validation/VALIDATION_REPORT_001.md`).
* **Verification Evidence**: `EV-TASK-000-01` (`management/validation/VALIDATION_REPORT_001.md`) and `EV-TASK-001-01` (Repository Materialization Verification).

## 4. Relationships with Other Documents
* **Roadmap & Tasks**: `management/IMPLEMENTATION_ROADMAP.md`, `management/ACTIVE_TASKS.md`
* **Validation**: `management/validation/VALIDATION_REPORT_001.md`, `management/validation/VALIDATION_REPORT_002.md`
