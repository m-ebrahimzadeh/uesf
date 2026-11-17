# Evidence Package Template
* **Document ID**: UESF-TMPL-004
* **Canonical Path**: templates/EVIDENCE_PACKAGE_TEMPLATE.md
* **Version**: 0.2.1
* **Status**: Verified
* **Owner**: CTO
* **Target Layer**: Layer 3
* **Last Updated**: 2026-11-17

## 1. Purpose
Provide the standardized Evidence Package template (`EV-<TASK-ID>-<SEQ>`) enforcing epistemic discipline (`Verified`, `Observed`, `Reported`, `Inferred`, `Unknown / Pending`) per `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`.

## 2. Canonical Evidence Package Block
```markdown
### Evidence Package: EV-TASK-XXX-01
* **Evidence ID**: `EV-TASK-XXX-01`
* **Task ID**: `TASK-XXX`
* **Submitting Role**: <Role>
* **Execution Environment & Verified Capabilities**: <Workspace> (`CAP-*`)
* **Date**: YYYY-MM-DD

#### 1. Epistemic Classification Table
| Epistemic State | Summary of Claims in This State | Supporting Artifact / Reason |
| :--- | :--- | :--- |
| **Verified** | <Claims directly confirmed via reproducible tool/command execution in this session> | <Command output, exit code, commit SHA, file check> |
| **Observed** | <Claims seen in environment state without full lifecycle test> | <Observation details> |
| **Reported** | <Claims inherited from prior handoff or external report> | <Source Handoff / Doc ID> |
| **Inferred** | <Logically deduced claims> | <Reasoning chain> |
| **Unknown / Pending** | <Checks not executable in current environment> | <Missing `CAP-*` and follow-up Task ID> |

#### 2. Acceptance Criteria Mapping Table
| Criterion # | Acceptance Criterion | Epistemic Status | Verification Method | Concrete Evidence / Output |
| :--- | :--- | :--- | :--- | :--- |
| 1 | <Criterion 1> | `Verified` | <Command / Audit> | <Output snippet / Hash> |
| 2 | <Criterion 2> | `Verified` | <Command / Audit> | <Output snippet / Hash> |

#### 3. Limitations & Deferred Verifications
* <Explicitly list any unexecuted checks and the follow-up task responsible>
```

## 3. Relationships with Other Documents
* **Governing Specs**: `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`, `policies/VERIFICATION_POLICY.md`, `core/UNIVERSAL_AGENT_OPERATING_MODEL.md`
