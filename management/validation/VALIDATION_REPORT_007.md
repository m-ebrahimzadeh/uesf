# Milestone M7 Validation Report — Native Single-Skill Agent Adapters, Metadata/Duplicate Fixes & Lifecycle CLI (`v0.7.0`)
* **Document ID**: UESF-VAL-007
* **Canonical Path**: management/validation/VALIDATION_REPORT_007.md
* **Version**: 0.7.0
* **Status**: Verified
* **Owner**: CTO
* **Last Updated**: 2026-11-17

## 1. Purpose
Document the Phase 1 forensic multi-agent runtime audit (`EV-TASK-028-01`) and the Phase 2–4 `v0.7.0` implementation and round-trip verification matrix (`EV-TASK-029-01`) across all six local coding agent platforms (**Antigravity**, **Kilo Code**, **Codex**, **Claude Code**, **Gemini CLI**, **Cline**) and the five user-facing lifecycle CLI commands (`install`, `update`, `check`, `doctor`, `uninstall`).

## 2. Scope
Covers all **59 canonical Markdown documents**, the machine-generated `management/CONTEXT_SNAPSHOT.md`, the 37 compiled distribution artifacts in `dist/`, the Node.js CLI engine (`package.json`, `bin/uesf.mjs`), thin script forwarders (`scripts/install.ps1`, `scripts/install.sh`), host agent installations under `$HOME`, and `management/validation/audit.ps1`.

## 3. Rules and Requirements
Evaluated against `core/FRAMEWORK_ARCHITECTURE.md` (`0.3.1`), `policies/SOURCE_OF_TRUTH_POLICY.md` (`0.2.0`), `policies/VERIFICATION_POLICY.md` (`0.1.0`), `adapters/README.md` (`0.5.0`), and `management/DECISION_LOG.md` (`DEC-028`).

## 4. Phase 1 Forensic Runtime Findings (`EV-TASK-028-01`)
| Agent Runtime | Verified Native Discovery Root | Root Cause Identified in `v0.6.3` | `v0.7.0` Resolution (`DEC-028`) |
| :--- | :--- | :--- | :--- |
| **Antigravity (VS Code `1.12.0`)** | `~/.gemini/config/skills/` (`.migrated` present) | Legacy `~/.gemini/antigravity/skills/uesf-*` path was stale after Antigravity migrated to `~/.gemini/config/skills/`. | Detect `~/.gemini/config/.migrated`, install only to `~/.gemini/config/skills/`, and clean legacy `~/.gemini/antigravity/skills/uesf-*`. |
| **Claude Code (`2.1.326`)** | `~/.claude/skills/` | Installing `~/.claude/commands/uesf/` `.md` files without YAML frontmatter caused duplicate `/uesf:*` + `/uesf-*` commands and leaked line-1 compiler boilerplate (`> **NON-AUTHORITATIVE...`) as the slash-command description. | Install only to `~/.claude/skills/`, remove `~/.claude/commands/uesf`, strip top-of-body boilerplate, and move provenance metadata to a bottom HTML comment. |
| **Gemini CLI** | `~/.gemini/skills/` | Installing `~/.gemini/commands/uesf/` `.toml` files alongside `~/.gemini/skills/` caused duplicate `/uesf:*` and `/uesf-*` commands. | Install only to `~/.gemini/skills/` and remove `~/.gemini/commands/uesf`. |
| **Cline (`4.1.26`)** | `~/.cline/skills/` (via `_6i`/`yTn`/`Dkp`) | Flat `~/Documents/Cline/Workflows/uesf-*.md` files appeared under "Workflow Commands" with `.md` suffixes via `jSt()`/`wae()`, while `A5u` excludes non-builtin skills from `/` workflow expansion; plugin skill parser `EUo` strictly rejects unknown frontmatter keys (including `version:`). | Install only to `~/.cline/skills/` with strict 2-key (`name`, quoted `description`) frontmatter, remove `~/Documents/Cline/Workflows/uesf*`, and manage via Cline's Skills tab / `use_skill`. |
| **Kilo Code (`7.8.27`)** | `~/.kilo/skills/` | Legacy `~/.kilocode/workflows/uesf/` path superseded by native `~/.kilo/skills/` (deduplicated by `name` across `~/.kilo/skills/` and `~/.claude/skills/`). | Install only to `~/.kilo/skills/` and clean legacy `~/.kilocode/workflows/uesf`. |
| **Codex (`26.51021`)** | `~/.codex/skills/` | `quick_validate.py` rejects top-level `version:` in `SKILL.md` frontmatter and rejects unquoted colons or `<`/`>` characters in `description`. | Emit strictly `name` + JSON-quoted `description` in `SKILL.md` frontmatter with zero `version:` key. |

## 5. Phase 2–4 Round-Trip & Validator Verification Matrix (`EV-TASK-029-01`)
| Check ID | Validation Dimension | Verification Method | Result | Concrete Evidence |
| :--- | :--- | :--- | :--- | :--- |
| `M7-CHK-01` | **59-Document Canonical Inventory & Audit** | Executed `node bin/uesf.mjs build` and `management/validation/audit.ps1`. | **PASS** | `MD_COUNT=59`, `KM_COUNT=59`, `MISSING_ON_DISK=0`, `EXTRA_ON_DISK=0`, `KM_VERSION_MISMATCHES=0`, `DIST_BUNDLE_ISSUES=0`, `DIST_DRIFT_ISSUES=0`, `CLI_ENGINE_ISSUES=0`, `SNAPSHOT_DRIFT_ISSUES=0`, `CRLF_WORKING_TREE_COUNT=0`. |
| `M7-CHK-02` | **Lifecycle Round-Trip (`uninstall -> install -> update -> check -> doctor -> --project`)** | Executed `uninstall`, `install`, `update`, `check`, `doctor`, `scripts/install.ps1 -Check/-Doctor`, and temporary-project `init-project` + `uninstall --project`. | **PASS** | `uninstall` removed all `uesf-*` folders and `~/.uesf/install-state.json` while preserving 25 non-UESF Claude skills + `.git`, 11 non-UESF Codex skills + `.system`, 11 Cline skills, 14 Kilo skills, and 1 Antigravity skill; `install`/`update`/`check`/`doctor` reported all 6 targets `UP_TO_DATE (v0.7.0, SHA256=06309527c703)` and `DOCTOR_STATUS=HEALTHY`. |
| `M7-CHK-03` | **Codex `quick_validate.py` & `codex.exe app-server`** | Validated all 12 `~/.codex/skills/uesf-*` skills with `quick_validate.py` and invoked JSON-RPC `skills/list` (`forceReload: true`) on `codex.exe app-server --stdio`. | **PASS** | `CODEX_QUICK_VALIDATE: passed=12, failed=0`; `CODEX_APP_SERVER_SKILLS_LIST: total=37, uesf_count=12, uesf_errors=0, total_errors=0`. |
| `M7-CHK-04` | **Kilo Code `kilo.exe debug skill`** | Executed `kilo.exe debug skill` and parsed discovered skills JSON. | **PASS** | `total=61, uesf_count=12, unique_names=12`, resolved cleanly from `~/.kilo/skills` with zero duplicates. |
| `M7-CHK-05` | **Claude Code, Gemini CLI, Cline & Antigravity Host Parity** | Verified legacy command/workflow removal and strict 2-key frontmatter + HTML-comment footer across all 6 installed agent skill directories. | **PASS** | `claude_commands_uesf_exists=False`, `gemini_commands_uesf_exists=False`, `cline_workflows_uesf_count=0`, `ag_legacy_uesf_count=0`; all 6 agents reported `count=12, valid=12, invalid=0`. |

## 6. Responsibilities
* **CTO**: Reviews `HO-TASK-029-02` (`EV-TASK-029-01`) and authorizes merge of `feat/TASK-029-native-agent-installer-v0.7.0` to `main` after human live UI confirmation.
* **DevOps / Developer / QA**: Maintains `bin/uesf.mjs`, runs native agent validators, and executes `management/validation/audit.ps1`.

## 7. Relationships with Other Documents
* **Prior Validations**: `management/validation/VALIDATION_REPORT_001.md`, `management/validation/VALIDATION_REPORT_002.md`, `management/validation/VALIDATION_REPORT_003.md`, `management/validation/VALIDATION_REPORT_004.md`, `management/validation/VALIDATION_REPORT_005.md`, `management/validation/VALIDATION_REPORT_006.md`
* **Adapters & Workflows**: `adapters/README.md`, `adapters/antigravity-vscode/ADAPTER.md`, `adapters/gemini-strategic-workspace/ADAPTER.md`, `adapters/generic-cli-mcp/ADAPTER.md`, `workflows/INIT_WORKFLOW.md`
* **Management Registries**: `management/PROJECT_PROFILE.md`, `management/ACTIVE_TASKS.md`, `management/DECISION_LOG.md`, `management/KNOWLEDGE_MAP.md`, `management/RELEASE_HISTORY.md`, `management/IMPLEMENTATION_ROADMAP.md`
