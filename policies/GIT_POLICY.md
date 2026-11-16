# Git Policy
* **Document ID**: UESF-POL-004
* **Canonical Path**: policies/GIT_POLICY.md
* **Version**: 0.1.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-16

## 1. Purpose
Govern branch management, commit hygiene, merge verification, and history protection for the UESF repository and all UESF-managed engineering repositories.

## 2. Scope
Applies to all agents and human operators with `CAP-GIT` access performing version control operations.

## 3. Rules and Requirements
1. **Branch-By-Default Strategy**:
   * Feature, specification, fix, and chore work MUST use dedicated branches by default (`<type>/<task-id>-<short-slug>`, e.g., `feat/TASK-002-role-specs`, `docs/TASK-001-foundation`).
2. **Controlled Direct-to-`main` Exception**:
   * Small, isolated, low-risk changes MAY be committed directly to `main` ONLY when ALL of the following conditions are satisfied:
     a. The active Task Contract (`protocols/TASK_CONTRACT_PROTOCOL.md`) explicitly authorizes direct commit to `main`.
     b. All required verification checks (`policies/VERIFICATION_POLICY.md`) have passed prior to commit.
     c. Repository branch protection rules are respected.
3. **Pre-Commit Review Discipline**: Agents MUST inspect `git status` and `git diff` prior to creating any commit to prevent unintended file inclusions, formatting corruption, or secret leakage.
4. **Structured Commit Messages**: Commits MUST use the format: `<type>(<scope>): <concise summary> [TASK-ID]`
   Valid types: `feat`, `fix`, `docs`, `arch`, `gov`, `test`, `chore`, `refactor`.
5. **Prohibited Operations without `A3` Human Approval**:
   * `git push --force` / `git push --force-with-lease` on `main` or shared branches.
   * Deleting `main` or release tags.
   * Bypassing verification hooks (`--no-verify`).

## 4. Responsibilities
* **DevOps & Developer Roles**: Execute repository initialization, branching, and commits in compliance with this policy.
* **Reviewer / CTO**: Verifies branch hygiene and commit traceability before approving merges or task acceptance.

## 5. Relevant Workflows
1. **Standard Branch Workflow**: Sync `main` -> create `<type>/<task-id>-<slug>` -> implement & verify -> inspect diff -> commit with `[TASK-ID]` -> submit evidence for review & merge.
2. **Authorized Direct `main` Workflow**: Verify explicit Task Contract authorization -> apply isolated low-risk change -> run verification checks -> inspect diff -> commit with `[TASK-ID]`.

## 6. Relationships with Other Documents
* **Verification & Acceptance**: `policies/VERIFICATION_POLICY.md`, `protocols/TASK_ACCEPTANCE_PROTOCOL.md`
* **Task Contracts**: `protocols/TASK_CONTRACT_PROTOCOL.md`
* **Security & Autonomy**: `policies/SECURITY_POLICY.md`, `policies/AUTONOMY_POLICY.md`
