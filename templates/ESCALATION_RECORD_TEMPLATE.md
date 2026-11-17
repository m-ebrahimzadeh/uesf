# Escalation Record Template
* **Document ID**: UESF-TMPL-006
* **Canonical Path**: templates/ESCALATION_RECORD_TEMPLATE.md
* **Version**: 0.2.1
* **Status**: Verified
* **Owner**: CTO
* **Target Layer**: Layer 3
* **Last Updated**: 2026-11-17

## 1. Purpose
Provide the standardized template for halting unsafe/ambiguous execution and escalating blockers (`ESC-<TASK-ID>-<SEQ>`) per `protocols/ESCALATION_PROTOCOL.md`.

## 2. Canonical Escalation Record Block
```markdown
### Escalation Record: ESC-TASK-XXX-01
* **Escalation ID**: `ESC-TASK-XXX-01`
* **Task ID & Escalating Role**: `TASK-XXX` — <Role>
* **Trigger Category**: `Capability Blocker` | `Autonomy Threshold (A3)` | `Architectural/Policy Ambiguity` | `Role Deadlock` | `Security Anomaly`
* **Severity Level**: `SEV-1 (Critical/Security/Destructive)` | `SEV-2 (Architectural/Cross-Functional)` | `SEV-3 (Local Scope/Capability)`
* **Safe Halt Confirmation**: <Confirm that all state-changing actions on the blocked path have been paused and completed work is preserved>
* **Options Analysis**:
  1. **Option A**: <Description> — *Pros*: <...> / *Cons & Risks*: <...>
  2. **Option B**: <Description> — *Pros*: <...> / *Cons & Risks*: <...>
  3. **Option C (Optional)**: <Description> — *Pros*: <...> / *Cons & Risks*: <...>
* **Agent / CTO Recommendation**: <Recommended option and rationale>
* **Decision Required From**: `CTO (A2)` | `Human Stakeholder (A3)`
```

## 3. Relationships with Other Documents
* **Governing Specs**: `protocols/ESCALATION_PROTOCOL.md`, `policies/AUTONOMY_POLICY.md`, `policies/SECURITY_POLICY.md`
