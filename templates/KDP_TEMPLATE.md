# Knowledge Discovery Proposal (KDP) Template
* **Document ID**: UESF-TMPL-005
* **Canonical Path**: templates/KDP_TEMPLATE.md
* **Version**: 0.2.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Provide the standardized template for submitting implementation discoveries or proposed specification updates (`KDP-XXX`) per `protocols/KNOWLEDGE_SYNCHRONIZATION.md`.

## 2. Canonical KDP Block
```markdown
### Knowledge Discovery Proposal: KDP-XXX
* **Discovery ID**: `KDP-XXX`
* **Originating Task & Role**: `TASK-XXX` — <Role>
* **Epistemic Status**: `Verified` | `Observed`
* **Affected Canonical Document(s)**: `<Canonical Path(s) in management/KNOWLEDGE_MAP.md>`
* **Discovery Summary**: <Concise description of environmental reality, edge case, or specification gap discovered>
* **Supporting Evidence**: <Command output, error log, or structural finding>
* **Proposed Specification Change**:
  * **Target Section**: <Section #>
  * **Recommended Update**: <Exact wording or diff proposal>
  * **Recommended SemVer Bump**: `MAJOR` | `MINOR` | `PATCH`
* **CTO Evaluation Status**: `Proposed` | `Approved` | `Rejected`
```

## 3. Relationships with Other Documents
* **Governing Specs**: `protocols/KNOWLEDGE_SYNCHRONIZATION.md`, `policies/KNOWLEDGE_GOVERNANCE_POLICY.md`, `management/KNOWLEDGE_MAP.md`
