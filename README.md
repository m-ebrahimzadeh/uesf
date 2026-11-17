# Universal Engineering Skills Framework (UESF)
* **Document ID**: UESF-CORE-001
* **Canonical Path**: README.md
* **Version**: 0.6.3
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. What Is UESF & Why Use It?

The **Universal Engineering Skills Framework (UESF)** is a reusable, platform-independent AI engineering organization that installs **9 specialized engineering roles** and **3 project lifecycle workflows** directly into your favorite coding agents (**Antigravity in VS Code**, **Claude Code**, **Gemini CLI**, **Codex CLI**, **Cline**, **Kilo Code**) and cloud chat environments (**Gemini**).

Instead of treating an AI coding assistant as a single generalist prompt that jumps straight into writing code on guesswork, UESF gives your agents structured roles, explicit authority boundaries, and an automatic project memory control plane.

### What Problems Does UESF Solve?
| Common AI Coding Failure Mode | How UESF Solves It |
| :--- | :--- |
| **1. Premature Coding & Misunderstood Intent** — Agents take rough ideas literally, make silent assumptions, and start editing files before you agree on the design. | **`/uesf:discovery` (Read-Only `A0` Lock)** brainstorms with you, challenges assumptions, audits architectural conflicts, and separates your requests from agent recommendations—never touching a file until you explicitly say *"Approved"* (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`). |
| **2. Hallucinated "All Tests Passed" Claims** — Agents claim tasks are complete without running verification or distinguish guesses from facts. | **Epistemic Accountability (`policies/VERIFICATION_POLICY.md`)** forces every role to label claims as `Verified`, `Observed`, `Reported`, `Inferred`, or `Unknown` inside structured Evidence Packages (`protocols/EVIDENCE_SUBMISSION_PROTOCOL.md`). |
| **3. Session Amnesia Across Chats & Tools** — Opening a new chat or switching tools requires re-explaining your project's architecture, history, and current tasks. | **Automatic Context Snapshots + `/uesf:status`** (`workflows/STATUS_WORKFLOW.md`) automatically maintain a machine-verified `.uesf/CONTEXT_SNAPSHOT.md` on every Git commit so any new local or cloud session can reconstruct full project context in one command. |
| **4. Agents Grading Their Own Homework** — The same prompt writes code and declares it production-ready without independent review or Git hygiene. | **Separation of Duties (`core/UNIVERSAL_AGENT_OPERATING_MODEL.md`)** separates contracting (`/uesf:cto`), design (`/uesf:architect`), branch-based coding (`/uesf:developer`), and independent verification (`/uesf:qa`, `/uesf:security`, `/uesf:sre`). |

---

## 2. 2-Minute Quickstart: Install & Onboard Your First Project

### Step 1 — Install UESF Globally Across Your Coding Agents
Run the cross-platform Node.js CLI installer (requires **Node.js >= 18**). It automatically detects your installed coding agents (`Antigravity`, `Claude Code`, `Gemini CLI`, `Codex`, `Cline`, `Kilo Code`) and installs all 12 self-contained UESF skills and slash commands:

* **Option A — One-Command Install via `npx` (Windows, macOS, Linux — No Manual Clone Needed):**
  ```sh
  npx --yes github:m-ebrahimzadeh/uesf install
  ```

* **Option B — Install a Specific UESF Version or Tag:**
  ```sh
  npx --yes github:m-ebrahimzadeh/uesf#v0.6.3 install
  # Or from a local clone:
  node bin/uesf.mjs install --version 0.6.3
  ```

* **Option C — Local Clone & Contributor CLI:**
  ```sh
  git clone https://github.com/m-ebrahimzadeh/uesf.git
  cd uesf
  node bin/uesf.mjs install
  ```
  *(Thin pass-through wrappers `scripts/install.ps1` and `scripts/install.sh` remain available and delegate directly to `bin/uesf.mjs`.)*

### Step 2 — Open Any Project (New or Existing) & Run `/uesf:init`
Open your target software project in your coding agent and invoke:
```text
/uesf:init
```
*(Or `@uesf-init` in Antigravity / Codex; see Section 3.3 for exact per-agent syntax.)*

What `/uesf:init` (`workflows/INIT_WORKFLOW.md`) does automatically:
1. **Audits in Read-Only Mode (`A0` First)**: Inspects your project's tech stack, directory structure, build/test commands, and existing documentation in `docs/` without modifying any files.
2. **Asks for Your Confirmation**: Presents a plain-English summary of the proposed setup and waits for your approval.
3. **Scaffolds `.uesf/` & Automatic Snapshot Hook (`A1`)**: Creates a lightweight `.uesf/` control plane (`EXTENSION.md`, `KNOWLEDGE_MAP.md`, `ACTIVE_TASKS.md`, `DECISION_LOG.md`, `CONTEXT_SNAPSHOT.md`) and wires a Git `pre-commit` hook that keeps `.uesf/CONTEXT_SNAPSHOT.md` up to date on every commit.

### Step 3 — Use the 4-Step Daily Engineering Loop
1. **Discover (`/uesf:discovery`)**: Brainstorm new features or changes in read-only mode (`A0`) until you approve the direction.
2. **Contract (`/uesf:cto` or `/uesf:architect`)**: Turn the approved idea into a bounded Task Contract (`TASK-XXX`) with testable acceptance criteria.
3. **Build & Verify (`/uesf:developer` + `/uesf:qa`)**: Implement on a feature branch (`policies/GIT_POLICY.md`), run tests, and verify against acceptance criteria.
4. **Handoff & Resume (`/uesf:handoff` & `/uesf:status`)**: Package session results with `/uesf:handoff` and resume work in any future local or cloud session with `/uesf:status`.

---

## 3. Command & Role Reference (The 12 Installed Capabilities)

### 3.1 The 3 Lifecycle Workflow Commands (`workflows/`)
| Command / Skill | Default Autonomy | When to Use It | What It Does |
| :--- | :--- | :--- | :--- |
| **`/uesf:init`** (`@uesf-init`) | `A0` Audit $\rightarrow$ `A1` on Approval | Once when setting up UESF in a brand-new or existing repository (`workflows/INIT_WORKFLOW.md`). | Audits the repo in read-only mode, indexes existing `docs/`, scaffolds `.uesf/`, and installs the automatic `CONTEXT_SNAPSHOT.md` Git hook. |
| **`/uesf:status`** (`@uesf-status`) | `A0` (Read-Only) | At the start of any coding session or fresh cloud CTO chat (`workflows/STATUS_WORKFLOW.md`). Supports optional target: `/uesf:status <TASK-ID or topic>`. | Reconstructs project architecture, verified Git state vs. recorded tasks, blockers, and next steps from `.uesf/CONTEXT_SNAPSHOT.md` and live Git probes. |
| **`/uesf:handoff`** (`@uesf-handoff`) | `A0` / `A1` | At the end of a work session or when transferring work between chat and IDE (`workflows/HANDOFF_WORKFLOW.md`). | Refreshes `CONTEXT_SNAPSHOT.md` and packages completed work, diffs, test outputs, and epistemic status into an `HO-TASK-XXX` / `EV-TASK-XXX` block. |

### 3.2 The 9 Universal Engineering Agent Roles (`roles/`)
| Command / Skill | Role Name | Default Autonomy | When to Invoke This Role & What It Delivers |
| :--- | :--- | :--- | :--- |
| **`/uesf:discovery`** (`@uesf-discovery`) | **Discovery** (`roles/discovery/SKILL.md`) | **`A0` (Read-Only Lock)** | **Start here for new ideas or ambiguous features.** Extracts true intent, challenges assumptions, checks conflicts against existing architecture/decisions, and iterates until you say *"Approved"*. |
| **`/uesf:cto`** (`@uesf-cto`) | **CTO** (`roles/cto/SKILL.md`) | `A2` (`A3` Human-Gated) | **Technical governance & task contracting.** Translates approved discovery briefs into `TASK-XXX` contracts, records `DEC-XXX` decisions, and performs milestone acceptance. |
| **`/uesf:architect`** (`@uesf-architect`) | **Architect** (`roles/architect/SKILL.md`) | `A1` / `A2` | **System & interface design.** Designs module boundaries, API/schema contracts, and architectural trade-offs; performs Tier 1 design reviews. |
| **`/uesf:developer`** (`@uesf-developer`) | **Developer** (`roles/developer/SKILL.md`) | `A1` / `A2` | **Feature & fix implementation.** Writes production code and unit tests on dedicated Git branches strictly within an approved `TASK-XXX` contract. |
| **`/uesf:qa`** (`@uesf-qa`) | **QA** (`roles/qa/SKILL.md`) | `A1` / `A2` | **Independent verification & quality sign-off.** Audits deliverables against acceptance criteria, runs regression/edge-case tests, and issues Tier 1 review verdicts. |
| **`/uesf:devops`** (`@uesf-devops`) | **DevOps** (`roles/devops/SKILL.md`) | `A1` / `A2` | **CI/CD, build & repository automation.** Maintains build scripts, environment tooling, release packaging, and authorized branch merges. |
| **`/uesf:security`** (`@uesf-security`) | **Security** (`roles/security/SKILL.md`) | `A1` / `A2` | **Threat modeling & security gates.** Audits authentication, permissions, dependencies, secret hygiene, and untrusted input boundaries (`policies/SECURITY_POLICY.md`). |
| **`/uesf:sre`** (`@uesf-sre`) | **SRE** (`roles/sre/SKILL.md`) | `A1` / `A2` | **Reliability, observability & rollback readiness.** Verifies health probes, telemetry, latency/error budgets, and safe rollback procedures. |
| **`/uesf:documentation`** (`@uesf-documentation`) | **Documentation** (`roles/documentation/SKILL.md`) | `A1` | **Technical docs & index maintenance.** Keeps approved specifications, `KNOWLEDGE_MAP.md` routing tables, and READMEs synchronized without altering policy decisions. |

### 3.3 How to Invoke Commands in Each Agent Platform
Because different coding agents use different native triggers, `bin/uesf.mjs` (also wrapped by `scripts/install.ps1` / `scripts/install.sh`) installs UESF in each tool's native format (`adapters/README.md`):

| Agent / Environment | Installed Location | How to Invoke a Role or Workflow |
| :--- | :--- | :--- |
| **Claude Code** | `~/.claude/commands/uesf/` & `~/.claude/skills/` | Type `/uesf:discovery`, `/uesf:cto`, `/uesf:developer`, `/uesf:init`, `/uesf:status`, `/uesf:handoff` |
| **Gemini CLI** | `~/.gemini/commands/uesf/` & `~/.gemini/skills/` | Type `/uesf:discovery`, `/uesf:cto`, `/uesf:developer`, `/uesf:init`, `/uesf:status`, `/uesf:handoff` |
| **Antigravity (VS Code)** | `~/.gemini/antigravity/skills/` | Mention `@uesf-discovery`, `@uesf-cto`, `@uesf-developer`, `@uesf-init`, `@uesf-status`, `@uesf-handoff` |
| **Codex CLI** | `~/.codex/skills/` | Invoke skill `$uesf-discovery`, `$uesf-cto`, `$uesf-developer`, `$uesf-init`, `$uesf-status`, `$uesf-handoff` |
| **Cline / Kilo Code** | `~/Documents/Cline/Workflows/uesf/` & `~/.kilocode/workflows/uesf/` | Trigger workflow `/uesf/discovery`, `/uesf/init`, `/uesf/status`, `/uesf/handoff` |
| **Gemini Cloud Chat** | Remote GitHub Raw / Snapshot Paste (`adapters/gemini-strategic-workspace/ADAPTER.md`) | Start session with `/uesf:status <owner/repo> [branch]` (or paste `.uesf/CONTEXT_SNAPSHOT.md`) |

---

## 4. Practical End-to-End Walkthroughs

### Walkthrough 1: Building a New Feature from a Rough Idea
1. **Brainstorm Safely (`A0` Read-Only)**:
   ```text
   /uesf:discovery I want to add webhook retry handling with dead-letter storage, but I'm not sure whether to use our existing Postgres database or Redis.
   ```
   *The Discovery agent inspects your `.uesf/EXTENSION.md` and `docs/`, challenges assumptions, compares Postgres vs. Redis against your current stack, flags any architectural conflicts, and iterates with you without editing a single file.*
2. **Approve & Contract (`A2`)**:
   Once you reply `"Approved"`, switch to `/uesf:cto` (or ask the CTO in your strategic chat) to issue a bounded Task Contract (`TASK-005`) in `.uesf/ACTIVE_TASKS.md` and log the database choice in `.uesf/DECISION_LOG.md`.
3. **Implement & Verify (`A1`/`A2`)**:
   ```text
   /uesf:developer Execute TASK-005 on branch feat/TASK-005-webhook-retries.
   ```
   *After implementation, run `/uesf:qa` to independently verify acceptance criteria and `/uesf:handoff` to package the evidence.*

### Walkthrough 2: Resuming Work in a Fresh IDE Session or Cloud Chat (`/uesf:status`)
* **In a Local Coding Agent (General Resume)**:
  ```text
  /uesf:status
  ```
  *Refreshes `.uesf/CONTEXT_SNAPSHOT.md`, runs live `git status` and `git log`, separates `[VERIFIED]` repository state from `[RECORDED_IN_LEDGER]` task tables, highlights any drift or blockers, and recommends the next command.*
* **In a Local Coding Agent (Deep-Dive into a Specific Task or Topic)**:
  ```text
  /uesf:status TASK-005
  ```
  *Reconstructs project status AND uses `.uesf/KNOWLEDGE_MAP.md` to selectively load only the architecture/spec files in `docs/` relevant to `TASK-005`.*
* **In a Cloud Chat Without Local Disk Access**:
  ```text
  /uesf:status my-org/my-repo main
  ```
  *Fetches `.uesf/CONTEXT_SNAPSHOT.md` from GitHub (or prompts you to drop `.uesf/CONTEXT_SNAPSHOT.md` if the repo is private and unconnected), giving the cloud chat complete project awareness in one step.*

### Walkthrough 3: Onboarding an Existing Project Under Active Development (`/uesf:init`)
1. Open your existing repository in VS Code / Claude Code / Gemini CLI and run `/uesf:init`.
2. The agent inspects your codebase in `A0` read-only mode, discovers your existing documentation in `docs/` (leaving those files right where they are), detects your test/build commands, and shows you a proposed onboarding summary.
3. Reply `"Approved"`—the agent creates `.uesf/{EXTENSION.md, KNOWLEDGE_MAP.md, ACTIVE_TASKS.md, DECISION_LOG.md, CONTEXT_SNAPSHOT.md}` and installs `.git/hooks/pre-commit`.

---

## 5. How Project Knowledge Is Organized (The 3-Domain Model)

UESF never mixes its own framework files with your application code and never forces you to move your existing `docs/` into a proprietary folder (`policies/SOURCE_OF_TRUTH_POLICY.md`):

```text
your-project/
├── README.md                        # Standard project overview
├── docs/                            # DOMAIN 2: Permanent Project Documentation (Native Repo Paths)
│   ├── architecture/                # System architecture, diagrams & domain models
│   ├── specs/                       # Technical & feature specifications
│   ├── product/                     # Product requirements (PRDs)
│   └── ROADMAP.md                   # High-level product roadmap
└── .uesf/                           # DOMAIN 3: Operational State & Governance Control Plane
    ├── EXTENSION.md                 # Project profile, remote URL/branch, tech stack & quality gates
    ├── KNOWLEDGE_MAP.md             # Routing index pointing to docs/... so agents load only what they need
    ├── ACTIVE_TASKS.md              # Active task contracts (TASK-001, TASK-002...) & states
    ├── DECISION_LOG.md              # Architectural decisions (DEC-001...) & open questions (OQ-001...)
    ├── CONTEXT_SNAPSHOT.md          # 100% machine-generated snapshot (auto-updated on every git commit)
    ├── bin/
    │   └── uesf.mjs                 # Standalone zero-dependency snapshot engine installed by init-project
    └── scripts/
        └── sync-snapshot.ps1        # Thin local wrapper invoking .uesf/bin/uesf.mjs via .git/hooks/pre-commit
```
*(Meanwhile, **Domain 1 — Universal UESF Knowledge** lives cleanly in your central UESF clone and compiled `dist/` skill bundles.)*

---

## 6. Updating, Maintaining & Verifying UESF

### Updating UESF to the Latest Version
Run the `npx` installer at any time (or pull and run `bin/uesf.mjs` from a local clone) to refresh all detected coding agents:
```sh
npx --yes github:m-ebrahimzadeh/uesf install
# Or from a local clone:
cd path/to/uesf
git pull
node bin/uesf.mjs install
```
*(Your downstream projects' `.uesf/` task and decision ledgers live inside their own repositories and are never overwritten when you update UESF.)*

### Checking If Installed Agents Are Up to Date
```sh
node bin/uesf.mjs check
# Or without a local clone:
npx --yes github:m-ebrahimzadeh/uesf check
```
Compares the SHA-256 source hash in each agent's `.uesf-manifest.json` against `dist/manifest.json` and reports `UP_TO_DATE` or `OUTDATED`.

### Rebuilding `dist/` Bundles & Running the Repository Audit (For UESF Contributors)
If you modify any canonical specification inside `core/`, `policies/`, `protocols/`, `roles/`, `workflows/`, `adapters/`, `extensions/`, or `templates/`:
```powershell
node bin/uesf.mjs build
powershell -NoProfile -ExecutionPolicy Bypass -File management/validation/audit.ps1
```

---

## 7. Framework Architecture & Master Specification Index (58 Canonical Documents)

### 7.1 Scope & Responsibilities
* **Purpose & Scope**: Serves as the canonical root entrypoint, newcomer onboarding guide, and master specification index for UESF (`core/UNIVERSAL_AGENT_OPERATING_MODEL.md`).
* **Discovery Role**: Conducts iterative pre-specification feature discovery (`A0` read-only) until explicit human confirmation (`protocols/FEATURE_DISCOVERY_PROTOCOL.md`).
* **CTO**: Curates and approves canonical framework specifications, governs the roadmap, and resolves cross-functional or architectural conflicts (`policies/GOVERNANCE_POLICY.md`).
* **Documentation & DevOps Roles**: Maintain structural formatting, cross-reference integrity, and automated `dist/` / `management/CONTEXT_SNAPSHOT.md` synchronization (`protocols/KNOWLEDGE_SYNCHRONIZATION.md`).

### 7.2 Complete Six-Layer Specification Index
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
6. **Layer 5 — Platform Adapters & Compiled Distribution (`adapters/`, `bin/`, `scripts/`, `dist/`)**:
   * `adapters/README.md` (`UESF-ADPT-001`), `adapters/antigravity-vscode/ADAPTER.md` (`UESF-ADPT-002`), `adapters/gemini-strategic-workspace/ADAPTER.md` (`UESF-ADPT-003`), `adapters/generic-cli-mcp/ADAPTER.md` (`UESF-ADPT-004`)
   * Automation & Distribution: `package.json`, `bin/uesf.mjs`, `scripts/sync-snapshot.ps1`, `scripts/build-dist.ps1`, `scripts/install.ps1`, and compiled 12-command bundles in `dist/`
7. **Layer 6 — Project-Specific Extensions (`extensions/`)**:
   * `extensions/README.md` (`UESF-EXT-001`), `extensions/example-web-service/EXTENSION.md` (`UESF-EXT-002`)
8. **Layer-Targeted Reusable Artifact Templates (`templates/`)**:
   * `templates/ROLE_SKILL_TEMPLATE.md` (`UESF-TMPL-001`), `templates/TASK_CONTRACT_TEMPLATE.md` (`UESF-TMPL-002`), `templates/HANDOFF_PACKAGE_TEMPLATE.md` (`UESF-TMPL-003`), `templates/EVIDENCE_PACKAGE_TEMPLATE.md` (`UESF-TMPL-004`), `templates/KDP_TEMPLATE.md` (`UESF-TMPL-005`), `templates/ESCALATION_RECORD_TEMPLATE.md` (`UESF-TMPL-006`), `templates/PLATFORM_ADAPTER_TEMPLATE.md` (`UESF-TMPL-007`), `templates/PROJECT_EXTENSION_TEMPLATE.md` (`UESF-TMPL-008`), `templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md` (`UESF-TMPL-009`)
9. **Project Governance, State & Validation (`management/`)**:
   * `management/PROJECT_PROFILE.md` (`UESF-MGMT-001`), `management/ACTIVE_TASKS.md` (`UESF-MGMT-002`), `management/DECISION_LOG.md` (`UESF-MGMT-003`), `management/KNOWLEDGE_MAP.md` (`UESF-MGMT-004`), `management/RELEASE_HISTORY.md` (`UESF-MGMT-005`), `management/IMPLEMENTATION_ROADMAP.md` (`UESF-MGMT-006`), and machine-generated `management/CONTEXT_SNAPSHOT.md`
   * Validation Reports & Tooling: `management/validation/VALIDATION_REPORT_001.md` (`UESF-VAL-001`), `management/validation/VALIDATION_REPORT_002.md` (`UESF-VAL-002`), `management/validation/VALIDATION_REPORT_003.md` (`UESF-VAL-003`), `management/validation/VALIDATION_REPORT_004.md` (`UESF-VAL-004`), `management/validation/VALIDATION_REPORT_005.md` (`UESF-VAL-005`), `management/validation/VALIDATION_REPORT_006.md` (`UESF-VAL-006`), and `management/validation/audit.ps1`

## 8. Relationships with Other Documents
* **Master Registry**: `management/KNOWLEDGE_MAP.md`
* **Project Profile & Roadmap**: `management/PROJECT_PROFILE.md`, `management/IMPLEMENTATION_ROADMAP.md`
