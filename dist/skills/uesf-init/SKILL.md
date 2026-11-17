---
name: uesf-init
description: UESF Project Initialization Workflow (/uesf:init - A0 Audit & .uesf/ Scaffold)
version: 0.6.1
---

> **NON-AUTHORITATIVE COMPILED UESF BUNDLE — DO NOT EDIT MANUALLY**
> * **Bundle ID**: `uesf-init` (`/uesf:init`)
> * **Canonical Source**: `workflows/INIT_WORKFLOW.md` (`uesf@v0.6.1`)
> * **Source-SHA256**: `7d8c19d4912aefdac9544a625adce0d20718518908175f33330c72f988849c60` (`7d8c19d4912a`)
> * **Activation Banner Rule**: Begin your first response with: `**[UESF v0.6.1 | Active: uesf-init | Autonomy: A0 -> A1 on Approval]**`

## UESF Embedded Core & Policy Invariants (`v0.6.1`)
1. **Autonomy Tiers (`policies/AUTONOMY_POLICY.md`)**:
   * `A0` (Advisory & Discovery — Read-Only, zero file writes/edits, zero task contracting).
   * `A1` (Bounded Execution — execute only explicitly contracted steps within file boundaries).
   * `A2` (Autonomous Execution — make routine technical/governance decisions within approved scope).
   * `A3` (Human Approval Required — mandatory pause for destructive git actions, security/secret changes, scope overrides, transitioning out of Feature Discovery, or tagging `v1.0.0`).
2. **Epistemic Discipline (`policies/VERIFICATION_POLICY.md`)**:
   * Distinguish all claims into: `Verified` (reproducible tool/test/git output in current session), `Observed` (seen in state without full lifecycle test), `Reported` (from handoff/remote ledger), `Inferred` (logically deduced), and `Unknown` (inaccessible in current runtime). Never fabricate tool execution or file edits.
3. **Capability Probing & Three-Domain Knowledge Lookup (`core/CAPABILITY_MODEL.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`)**:
   * Probe available capabilities (`CAP-FS`, `CAP-TERM`, `CAP-GIT`, `CAP-WS`, `CAP-WEB`, `CAP-MCP`, `CAP-AGENT`) before acting.
   * If working in a downstream project with `.uesf/`, read operational state from `.uesf/{EXTENSION.md, KNOWLEDGE_MAP.md, ACTIVE_TASKS.md, DECISION_LOG.md, CONTEXT_SNAPSHOT.md}` and permanent project documentation from native `docs/` paths indexed in `.uesf/KNOWLEDGE_MAP.md`. If working in the UESF repository itself, read `management/`.

---
## Canonical Specification (`workflows/INIT_WORKFLOW.md`)

# Lifecycle Workflow — Project Initialization & Onboarding (`/uesf:init`)
* **Document ID**: UESF-WKFL-001
* **Canonical Path**: workflows/INIT_WORKFLOW.md
* **Workflow Trigger**: /uesf:init
* **Version**: 0.6.1
* **Status**: Verified
* **Owner**: Architect
* **Last Updated**: 2026-11-17

## 1. Purpose & Command Trigger
Define the standardized, newcomer-friendly onboarding workflow for `/uesf:init` (`@uesf-init`), enabling an agent in any new or existing software repository to audit the codebase in read-only mode (`A0`), present a clear plain-English setup proposal, and self-containedly scaffold the `.uesf/` operational control plane and automatic snapshot hook (`A1`) upon explicit human confirmation.

## 2. Scope & Autonomy Profile
* **Scope**: Applies when onboarding any new or existing downstream software project to UESF (`extensions/README.md`).
* **Two-Stage Autonomy Gate (`policies/AUTONOMY_POLICY.md`)**:
  * **Stage 1 — Read-Only Inspection & Plain-English Proposal (`A0` Lock)**: The agent inspects the repository and presents the proposed `.uesf/` setup without creating or modifying any files.
  * **Stage 2 — Self-Contained Materialization & Hook Wiring (`A1` Bounded Execution)**: Triggered ONLY after the human stakeholder explicitly approves the proposal.

## 3. Capability Detection & Environment Modes
Per `core/CAPABILITY_MODEL.md`:
* **Local Coding Agent (`CAP-FS` & `CAP-GIT` Verified Available)**: Directly inspects the local project directory tree, existing `docs/`, build/test manifests, and `git remote -v` / `git branch`, then writes `.uesf/` files, `.uesf/scripts/sync-snapshot.*`, and `.git/hooks/pre-commit` directly from the embedded payload in the compiled `uesf-init` bundle upon approval.
* **Cloud Chat Environment (`CAP-FS` Unavailable)**: Generates the complete `.uesf/` bootstrap files and setup commands in chat for the user or local coding agent to materialize.

## 4. Step-by-Step Execution Workflow
1. **Dogfooding Guard Check**:
   * Check whether the current repository root contains `README.md` with `Document ID: UESF-CORE-001`. If so, inform the user that this is the canonical UESF framework repository itself (already governed via `management/`), suggest running `/uesf:status`, and halt `/uesf:init`.
   * If `.uesf/EXTENSION.md` already exists, inform the user that the project is already initialized, summarize the current `.uesf/` setup, and ask whether they want to refresh `.uesf/scripts/sync-snapshot.*` and `.git/hooks/pre-commit` or run `/uesf:status` instead.
2. **Stage 1 — Read-Only Codebase & Documentation Audit (`A0`)**:
   * Inspect existing project documentation (`README.md`, `docs/`, `adr/`) without moving or duplicating those files.
   * Detect the tech stack, directory boundaries, build/lint/test commands, default Git branch, and remote repository URL.
   * Present a clear, newcomer-friendly **Project Onboarding Proposal** with four short sections:
     1. **Detected Project Profile**: Project name, remote URL & default branch, tech stack, and key directory boundaries.
     2. **Detected Verification Gates**: Exact build, linter, and test commands discovered (`[VERIFIED]` from config files vs. `[INFERRED]`).
     3. **Existing Documentation to Index (Left in Place)**: List of permanent docs found in `README.md` or `docs/` that will be indexed in `.uesf/KNOWLEDGE_MAP.md`.
     4. **Files to Create in `.uesf/`**: `.uesf/EXTENSION.md`, `.uesf/KNOWLEDGE_MAP.md`, `.uesf/ACTIVE_TASKS.md`, `.uesf/DECISION_LOG.md`, `.uesf/CONTEXT_SNAPSHOT.md`, `.uesf/scripts/sync-snapshot.*`, and `.git/hooks/pre-commit`.
   * Ask: *"Do you approve scaffolding this `.uesf/` configuration (or would you like to adjust any build/test commands first)?"*
3. **Stage 2 — Self-Contained Scaffolding & Automatic Snapshot Hook (`A1`)**:
   * Upon human confirmation, create `.uesf/` and `.uesf/scripts/` containing:
     * `.uesf/EXTENSION.md` (conforming to `templates/PROJECT_EXTENSION_TEMPLATE.md`, pinning UESF version `0.6.1`).
     * `.uesf/KNOWLEDGE_MAP.md` (routing table indexing existing project docs in `docs/` and operational files in `.uesf/`).
     * `.uesf/ACTIVE_TASKS.md` (initialized with `TASK-001: Initialize UESF Project Control Plane (.uesf/)` marked `ACCEPTED`).
     * `.uesf/DECISION_LOG.md` (initialized with `DEC-001: Onboard Project to UESF Three-Domain Governance`).
     * `.uesf/scripts/sync-snapshot.ps1`, `.uesf/scripts/sync-snapshot.sh`, and `.git/hooks/pre-commit` (written directly from the **Embedded Project Automation Scripts** section of the compiled `uesf-init` bundle so zero external path lookup is required).
   * Execute `.uesf/scripts/sync-snapshot.ps1` (or `.sh`) to generate the initial `.uesf/CONTEXT_SNAPSHOT.md`.
4. **Stage 3 — Post-Init Welcome & Next Commands Card**:
   * Conclude by displaying a concise **"Your Project Is Ready"** summary showing the verified `.uesf/` files created and the 3 primary commands to use next:
     * `/uesf:discovery <idea>` — Brainstorm a new feature or change in read-only mode (`A0`).
     * `/uesf:cto` — Create a bounded task contract (`TASK-XXX`) for well-defined work.
     * `/uesf:status` — Reconstruct project context at the start of any future local or cloud session.

## 5. Epistemic & Output Formatting Rules
* Begin the first response with: `**[UESF v0.6.1 | Active: /uesf:init | Autonomy: A0 -> A1 on Approval]**`
* Distinguish `[VERIFIED]` repository observations (from `package.json`, `pyproject.toml`, `Cargo.toml`, `git remote -v`, etc.) from `[INFERRED]` architectural conventions (`policies/VERIFICATION_POLICY.md`).

## 6. Guardrails & Non-Overlap Boundaries
* **Never Move Permanent Project Docs into `.uesf/`**: Permanent architecture, specifications, PRDs, and roadmaps remain in the project's native `docs/` structure and are indexed via `.uesf/KNOWLEDGE_MAP.md` (`policies/SOURCE_OF_TRUTH_POLICY.md`).
* **Zero Universal Rule Duplication**: Never copy UESF `core/`, `policies/`, `protocols/`, or `roles/` files into `.uesf/`.

## 7. Relationships with Other Documents
* **Architecture & Policies**: `core/FRAMEWORK_ARCHITECTURE.md`, `core/CAPABILITY_MODEL.md`, `policies/AUTONOMY_POLICY.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`
* **Protocols & Workflows**: `protocols/TASK_CONTRACT_PROTOCOL.md`, `protocols/KNOWLEDGE_SYNCHRONIZATION.md`, `workflows/STATUS_WORKFLOW.md`, `workflows/HANDOFF_WORKFLOW.md`
* **Templates & Extensions**: `templates/PROJECT_EXTENSION_TEMPLATE.md`, `extensions/README.md`
---
## Embedded Canonical Output Templates

### Template Source: `templates/PROJECT_EXTENSION_TEMPLATE.md`
# Project-Specific Extension Template
* **Document ID**: UESF-TMPL-008
* **Canonical Path**: templates/PROJECT_EXTENSION_TEMPLATE.md
* **Version**: 0.6.0
* **Status**: Verified
* **Owner**: Architect
* **Target Layer**: Layer 6
* **Last Updated**: 2026-11-17

## 1. Purpose
Provide the standardized structural schema for all Layer 6 Project-Specific Extensions (`extensions/<project-slug>/EXTENSION.md`), enabling downstream software projects to overlay domain architecture, tech-stack conventions, and custom quality gates while preserving 100% immutability of UESF Layers 1–5.

## 2. Scope
Mandatory template for all Layer 6 project extension specifications (`core/FRAMEWORK_ARCHITECTURE.md` and `extensions/README.md`).

## 3. Rules and Requirements
1. **Mandatory Sections**: Every `EXTENSION.md` specification MUST include:
   * Metadata Header (`Document ID`, `Canonical Path`, `Version`, `Status`, `Owner`, `Last Updated`)
   * `## 1. Purpose & Target Project Profile`
   * `## 2. Scope & Domain Architecture Overlay`
   * `## 3. Role Specialization & Domain Responsibilities`
   * `## 4. Project-Specific Verification, Security & Release Gates`
   * `## 5. Adapter & Tooling Bindings`
   * `## 6. Strict Layer 6 Isolation & Non-Override Guarantees`
   * `## 7. Relationships with Other Documents`
2. **Unidirectional Dependency Invariant (`DEC-009`, `DEC-018`)**: Because this template targets Layer 6 (`Target Layer: Layer 6`), both this template and concrete extensions in `extensions/` MAY depend downward on Layers 1–6 (`core/`, `policies/`, `protocols/`, `roles/`, `adapters/`, `extensions/`), while Layers 1–5 MUST NEVER reference or depend on any file inside `extensions/`.
3. **Additive-Only Constraint**: A project extension MAY tighten verification gates or add domain-specific checklists, but MUST NOT weaken universal autonomy thresholds (`policies/AUTONOMY_POLICY.md`), Git protections (`policies/GIT_POLICY.md`), security rules (`policies/SECURITY_POLICY.md`), or epistemic verification requirements (`policies/VERIFICATION_POLICY.md`).
4. **Three-Domain Project Capsule (`.uesf/` + `docs/`)**: Every project extension MUST specify its Canonical Remote Repository URL and Default Branch (enabling cloud `/uesf:status` context retrieval), keep permanent documentation in native project paths (such as `docs/`) indexed by `.uesf/KNOWLEDGE_MAP.md`, and maintain operational state in `.uesf/` (`EXTENSION.md`, `KNOWLEDGE_MAP.md`, `ACTIVE_TASKS.md`, `DECISION_LOG.md`, and the machine-generated `CONTEXT_SNAPSHOT.md`).

## 4. Responsibilities
* **Architect / CTO**: Author and approve project extension overlays prior to downstream project execution.
* **QA / Security**: Verify that project-specific gates tighten rather than relax universal UESF policies.

## 5. Relevant Workflows
1. **Project Extension Onboarding**: Copy this template to `extensions/<project-slug>/EXTENSION.md` -> define tech stack, domain boundaries, and build/test commands -> map to Layer 5 runtime adapters (`adapters/README.md`) -> register in `extensions/README.md`.

## 6. Relationships with Other Documents
* **Architecture & Layer 6 Registry**: `core/FRAMEWORK_ARCHITECTURE.md`, `extensions/README.md`
* **Policies**: `policies/AUTONOMY_POLICY.md`, `policies/GOVERNANCE_POLICY.md`, `policies/SECURITY_POLICY.md`, `policies/VERIFICATION_POLICY.md`
* **Adapters**: `adapters/README.md`

---
## Embedded Project Automation Scripts (.uesf/scripts/ & .git/hooks/pre-commit)

### Target `.uesf/scripts/sync-snapshot.ps1` (Source: `scripts/sync-snapshot.ps1`)
```powershell
param(
    [string]$TargetRoot = ""
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($TargetRoot)) {
    $parentDir = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
    if ((Split-Path $parentDir -Leaf) -eq '.uesf') {
        $TargetRoot = (Resolve-Path (Join-Path $parentDir '..')).Path
    } else {
        $TargetRoot = $parentDir
    }
} else {
    $TargetRoot = (Resolve-Path $TargetRoot).Path
}
Set-Location $TargetRoot

function Get-NormalizedText([string]$path) {
    if (-not (Test-Path $path -PathType Leaf)) { return "" }
    return ([System.IO.File]::ReadAllText((Resolve-Path $path).Path)).Replace("`r`n", "`n").Trim()
}

function Get-Sha256Hex([string]$text) {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        return ([System.BitConverter]::ToString($sha.ComputeHash($bytes))).Replace('-', '').ToLowerInvariant()
    } finally {
        $sha.Dispose()
    }
}

$isUesfCore = (Test-Path 'management/PROJECT_PROFILE.md') -and (Test-Path 'core/UNIVERSAL_AGENT_OPERATING_MODEL.md')
if ($isUesfCore) {
    $ctrlDir = 'management'
    $profilePath = 'management/PROJECT_PROFILE.md'
    $tasksPath = 'management/ACTIVE_TASKS.md'
    $decisionsPath = 'management/DECISION_LOG.md'
    $kmPath = 'management/KNOWLEDGE_MAP.md'
    $releasesPath = 'management/RELEASE_HISTORY.md'
    $roadmapPath = 'management/IMPLEMENTATION_ROADMAP.md'
    $outPath = 'management/CONTEXT_SNAPSHOT.md'
    $ledgerFiles = @($profilePath, $tasksPath, $decisionsPath, $kmPath, $releasesPath, $roadmapPath)
} elseif (Test-Path '.uesf/EXTENSION.md') {
    $ctrlDir = '.uesf'
    $profilePath = '.uesf/EXTENSION.md'
    $tasksPath = '.uesf/ACTIVE_TASKS.md'
    $decisionsPath = '.uesf/DECISION_LOG.md'
    $kmPath = '.uesf/KNOWLEDGE_MAP.md'
    $outPath = '.uesf/CONTEXT_SNAPSHOT.md'
    $ledgerFiles = @($profilePath, $tasksPath, $decisionsPath, $kmPath)
} else {
    throw "No UESF control plane found in $TargetRoot (expected management/PROJECT_PROFILE.md or .uesf/EXTENSION.md)."
}

$concatLedger = ($ledgerFiles | ForEach-Object { "=== $_ ===`n" + (Get-NormalizedText $_) }) -join "`n"
$ledgerHashFull = Get-Sha256Hex $concatLedger
$ledgerHashShort = $ledgerHashFull.Substring(0, 12)

$profileText = Get-NormalizedText $profilePath
$verMatch = [regex]::Match($profileText, '\* \*\*Version\*\*: ([^\r\n]+)')
$projVer = if ($verMatch.Success) { $verMatch.Groups[1].Value.Trim() } else { '0.6.0' }
$updMatch = [regex]::Match($profileText, '\* \*\*Last Updated\*\*: ([^\r\n]+)')
$lastUpd = if ($updMatch.Success) { $updMatch.Groups[1].Value.Trim() } else { '2026-11-17' }

# Section 1: Deterministic Filesystem & Registry Probe
$kmText = Get-NormalizedText $kmPath
$kmRows = [regex]::Matches($kmText, '(?m)^\| `([^`]+)` \| `([^`]+)` \|[^|]*\|[^|]*\| `([^`]+)` \|')
$kmPaths = @($kmRows | ForEach-Object { $_.Groups[2].Value })

$allMd = Get-ChildItem -Recurse -File -Filter *.md | Where-Object {
    $_.FullName -notmatch '[/\\]\.git[/\\]' -and
    $_.FullName -notmatch '[/\\]dist[/\\]' -and
    $_.FullName -notmatch 'CONTEXT_SNAPSHOT\.md$'
}
$relMd = @($allMd | ForEach-Object { $_.FullName.Substring($TargetRoot.Length + 1).Replace('\', '/') } | Sort-Object)
$missingOnDisk = @($kmPaths | Where-Object { $relMd -notcontains $_ })
$extraOnDisk = @($relMd | Where-Object { $kmPaths -notcontains $_ })

$verMismatches = @()
foreach ($r in $kmRows) {
    $p = $r.Groups[2].Value
    $expectedV = $r.Groups[3].Value
    if (Test-Path $p) {
        $ft = Get-NormalizedText $p
        if ($ft -notmatch ('\* \*\*Version\*\*: ' + [regex]::Escape($expectedV))) {
            $verMismatches += $p
        }
    }
}

$tasksText = Get-NormalizedText $tasksPath
$taskRows = [regex]::Matches($tasksText, '(?m)^\| `(TASK-\d+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| `([^`]+)` \| `([^`]+)` \|')
$acceptedCount = @($taskRows | Where-Object { $_.Groups[7].Value.Trim() -eq 'ACCEPTED' }).Count

$decisionsText = Get-NormalizedText $decisionsPath
$decRows = [regex]::Matches($decisionsText, '(?m)^\| `(DEC-\d+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \|')
$openQuestions = [regex]::Matches($decisionsText, '(?m)^\| `(OQ-\d+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \|')
$unresolvedOq = @($openQuestions | Where-Object { $_.Groups[4].Value -notmatch 'Closed|Resolved' })

$driftAlerts = @()
if ($missingOnDisk.Count -gt 0) { $driftAlerts += "MISSING_ON_DISK: $($missingOnDisk -join ', ')" }
if ($extraOnDisk.Count -gt 0)   { $driftAlerts += "UNINDEXED_MD_ON_DISK: $($extraOnDisk -join ', ')" }
if ($verMismatches.Count -gt 0) { $driftAlerts += "KM_VERSION_MISMATCH: $($verMismatches -join ', ')" }
$driftStatus = if ($driftAlerts.Count -eq 0) { 'CLEAN (0 discrepancies between canonical ledgers and on-disk specification tree)' } else { "DRIFT_DETECTED ($($driftAlerts.Count) issue(s))" }

$emDash = [string][char]0x2014

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('# UESF Context Snapshot (Machine-Generated)')
[void]$sb.AppendLine(('> **NON-AUTHORITATIVE DERIVED ARTIFACT {0} DO NOT EDIT MANUALLY**' -f $emDash))
[void]$sb.AppendLine('> Generated deterministically by `scripts/sync-snapshot.ps1` per `policies/SOURCE_OF_TRUTH_POLICY.md` (`DEC-023`).')
[void]$sb.AppendLine(('> * **Canonical Control Plane**: `{0}/`' -f $ctrlDir))
[void]$sb.AppendLine(('> * **Snapshot Version**: `{0}`' -f $projVer))
[void]$sb.AppendLine(('> * **Source-Ledger-SHA256**: `{0}` (`{1}`)' -f $ledgerHashFull, $ledgerHashShort))
[void]$sb.AppendLine(('> * **Last Ledger Update**: `{0}`' -f $lastUpd))
[void]$sb.AppendLine('')
[void]$sb.AppendLine('## 1. Empirically Verified Repository Facts (`[VERIFIED_BY_GIT_AND_FS_PROBE]`)')
[void]$sb.AppendLine(('* **Canonical Specification Files on Disk**: `{0}`' -f $relMd.Count))
[void]$sb.AppendLine(('* **Registered Documents in `KNOWLEDGE_MAP.md`**: `{0}`' -f $kmRows.Count))
[void]$sb.AppendLine(('* **Missing Registered Files on Disk**: `{0}`' -f $missingOnDisk.Count))
[void]$sb.AppendLine(('* **Unindexed Canonical Markdown Files on Disk**: `{0}`' -f $extraOnDisk.Count))
[void]$sb.AppendLine(('* **Header-to-Registry Version Mismatches**: `{0}`' -f $verMismatches.Count))
[void]$sb.AppendLine(('* **Total Recorded Tasks (`ACCEPTED` / Total)**: `{0} / {1}`' -f $acceptedCount, $taskRows.Count))
[void]$sb.AppendLine(('* **Total Recorded Decisions (`DEC-*`)**: `{0}`' -f $decRows.Count))
[void]$sb.AppendLine(('* **Unresolved Open Questions (`OQ-*`)**: `{0}`' -f $unresolvedOq.Count))
[void]$sb.AppendLine('')
[void]$sb.AppendLine('## 2. Recorded Project & Governance State (`[RECORDED_IN_LEDGER]`)')
[void]$sb.AppendLine(('### 2.1 Project Identity & Architecture Profile (`{0}`)' -f $profilePath))
[void]$sb.AppendLine((Get-NormalizedText $profilePath))
[void]$sb.AppendLine('')
[void]$sb.AppendLine(('### 2.2 Active & Recent Task Ledger (`{0}`)' -f $tasksPath))
[void]$sb.AppendLine((Get-NormalizedText $tasksPath))
[void]$sb.AppendLine('')
[void]$sb.AppendLine(('### 2.3 Architectural & Governance Decisions (`{0}`)' -f $decisionsPath))
[void]$sb.AppendLine((Get-NormalizedText $decisionsPath))
[void]$sb.AppendLine('')
[void]$sb.AppendLine(('### 2.4 Master Knowledge Map Routing Index (`{0}`)' -f $kmPath))
[void]$sb.AppendLine((Get-NormalizedText $kmPath))
[void]$sb.AppendLine('')
[void]$sb.AppendLine('## 3. Automated Discrepancy & Drift Audit (`[DRIFT_CHECK]`)')
[void]$sb.AppendLine(('* **Drift Audit Verdict**: `{0}`' -f $driftStatus))
if ($driftAlerts.Count -gt 0) {
    foreach ($a in $driftAlerts) {
        [void]$sb.AppendLine(('  * **Alert**: `{0}`' -f $a))
    }
}
[void]$sb.AppendLine(('* **Cloud / Remote Session Note**: When reading this file remotely without local `CAP-FS`/`CAP-GIT`, treat Section 1 as verified at the time of the commit that produced `Source-Ledger-SHA256: {0}`, treat Section 2 as `[REPORTED {1} Remote Ledger]`, and treat any uncommitted local working-tree edits as `[UNKNOWN {1} Local FS Unavailable]`.' -f $ledgerHashShort, $emDash))

$finalContent = $sb.ToString().Replace("`r`n", "`n")
$fullOut = Join-Path $TargetRoot $outPath
[System.IO.File]::WriteAllText($fullOut, $finalContent, (New-Object System.Text.UTF8Encoding($false)))
"SNAPSHOT_SYNCED=$outPath (SHA256=$ledgerHashShort)"
```

### Target `.uesf/scripts/sync-snapshot.sh` (Source: `scripts/sync-snapshot.sh`)
```sh
#!/usr/bin/env sh
set -e
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
if command -v pwsh >/dev/null 2>&1; then
    pwsh -NoProfile -ExecutionPolicy Bypass -File "$SCRIPT_DIR/sync-snapshot.ps1" "$@"
elif command -v powershell.exe >/dev/null 2>&1; then
    powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$SCRIPT_DIR/sync-snapshot.ps1" "$@"
else
    echo "Error: PowerShell (pwsh or powershell.exe) is required to run sync-snapshot.ps1" >&2
    exit 1
fi
```

### Target `.git/hooks/pre-commit` (Source: `scripts/hooks/pre-commit`)
```sh
#!/usr/bin/env sh
# UESF Automatic Context Snapshot Pre-Commit Hook (DEC-023)
set -e
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

if [ -f "scripts/sync-snapshot.ps1" ]; then
    SYNC_PS1="scripts/sync-snapshot.ps1"
    SNAP_OUT="management/CONTEXT_SNAPSHOT.md"
elif [ -f ".uesf/scripts/sync-snapshot.ps1" ]; then
    SYNC_PS1=".uesf/scripts/sync-snapshot.ps1"
    SNAP_OUT=".uesf/CONTEXT_SNAPSHOT.md"
else
    exit 0
fi

if command -v pwsh >/dev/null 2>&1; then
    pwsh -NoProfile -ExecutionPolicy Bypass -File "$SYNC_PS1" >/dev/null
elif command -v powershell.exe >/dev/null 2>&1; then
    powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$SYNC_PS1" >/dev/null
fi

if [ -f "$SNAP_OUT" ]; then
    git add "$SNAP_OUT"
fi
```
