# Reference Project Extension — Modular Web Service Blueprint
* **Document ID**: UESF-EXT-002
* **Canonical Path**: extensions/example-web-service/EXTENSION.md
* **Version**: 0.4.0
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose & Target Project Profile
Provide a canonical, vendor-neutral Layer 6 reference extension demonstrating how a downstream software engineering project overlays concrete build, test, security, and reliability conventions onto UESF Layers 1–5 (`templates/PROJECT_EXTENSION_TEMPLATE.md`).

## 2. Scope & Domain Architecture Overlay
Applies only when explicitly activated for the reference modular web service target project. Defines a three-tier application boundary (`api/`, `domain/`, `infrastructure/`) where `domain/` has zero outward dependency on `api/` or `infrastructure/`.

## 3. Role Specialization & Domain Responsibilities
* **Discovery (`roles/discovery/SKILL.md`)**: Leads pre-specification feature discovery, API/domain requirement clarification, and architectural conflict checks under `protocols/FEATURE_DISCOVERY_PROTOCOL.md` (locked at `A0` until human approval).
* **CTO (`roles/cto/SKILL.md`)**: Owns project milestone acceptance and cross-service architectural rulings.
* **Architect (`roles/architect/SKILL.md`)**: Enforces API schema contracts (OpenAPI/JSON Schema) and `domain/` layer purity.
* **Developer (`roles/developer/SKILL.md`)**: Implements domain logic, API handlers, and unit tests on `<type>/TASK-XXX-<slug>` branches.
* **QA (`roles/qa/SKILL.md`)**: Executes independent integration test suites and performs Tier 1 acceptance for routine feature tasks.
* **DevOps (`roles/devops/SKILL.md`)**: Maintains reproducible container builds and CI verification workflows.
* **Security (`roles/security/SKILL.md`)**: Enforces mandatory security gates on authentication middleware, input validation, and dependency manifests.
* **SRE (`roles/sre/SKILL.md`)**: Verifies health-check endpoints, structured telemetry, latency budgets, and zero-downtime rollback readiness.
* **Documentation (`roles/documentation/SKILL.md`)**: Keeps API specifications and architectural runbooks synchronized with verified commits.

## 4. Project-Specific Verification, Security & Release Gates
In addition to universal requirements in `policies/VERIFICATION_POLICY.md` and `policies/SECURITY_POLICY.md`, tasks under this extension require:
1. **Automated Test & Lint Gate (`Developer` / `QA`)**: Unit test suite, static linter, and type checker must exit with code `0` and attach output to `EV-TASK-XXX-YY`.
2. **API Contract Compatibility Gate (`Architect`)**: Any public endpoint modification requires schema diff verification.
3. **Security & Secret Scan Gate (`Security`)**: Dependency audit and secret scan must confirm zero critical/high vulnerabilities and zero hardcoded secrets.
4. **Rollback & Health Probe Gate (`SRE` / `DevOps`)**: Every deployment or migration change must document and dry-run its rollback command sequence.

## 5. Adapter & Tooling Bindings
* **Strategic Governance & Planning**: Bound via `adapters/gemini-strategic-workspace/ADAPTER.md`.
* **Local Implementation, Git & Test Execution**: Bound via `adapters/antigravity-vscode/ADAPTER.md` or `adapters/generic-cli-mcp/ADAPTER.md` using `CAP-FS`, `CAP-TERM`, and `CAP-GIT`.

## 6. Strict Layer 6 Isolation & Non-Override Guarantees
* This extension resides strictly at Layer 6 (`extensions/example-web-service/EXTENSION.md`) per `core/FRAMEWORK_ARCHITECTURE.md`.
* None of the universal specifications in `core/`, `policies/`, `protocols/`, `roles/`, `adapters/`, or `templates/` reference this file.
* All autonomy caps (`A0`–`A3`), Git branch rules, and epistemic evidence classifications remain governed 100% by Layer 2 policies and Layer 3 protocols.

## 7. Relationships with Other Documents
* **Layer 6 Standard & Template**: `extensions/README.md`, `templates/PROJECT_EXTENSION_TEMPLATE.md`
* **Core & Policies**: `core/FRAMEWORK_ARCHITECTURE.md`, `policies/AUTONOMY_POLICY.md`, `policies/GIT_POLICY.md`, `policies/SECURITY_POLICY.md`, `policies/VERIFICATION_POLICY.md`
* **Protocols & Roles**: `protocols/FEATURE_DISCOVERY_PROTOCOL.md`, `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`, `protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`, `roles/discovery/SKILL.md`, `roles/cto/SKILL.md`, `roles/architect/SKILL.md`, `roles/developer/SKILL.md`, `roles/qa/SKILL.md`, `roles/devops/SKILL.md`, `roles/security/SKILL.md`, `roles/sre/SKILL.md`, `roles/documentation/SKILL.md`
* **Adapters**: `adapters/README.md`, `adapters/antigravity-vscode/ADAPTER.md`, `adapters/gemini-strategic-workspace/ADAPTER.md`, `adapters/generic-cli-mcp/ADAPTER.md`
