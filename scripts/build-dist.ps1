Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location $repoRoot

# 1. Refresh management/CONTEXT_SNAPSHOT.md first
& (Join-Path $PSScriptRoot 'sync-snapshot.ps1') -TargetRoot $repoRoot | Out-Null

function Get-NormalizedText([string]$path) {
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

# 2. Compute deterministic source_sha256 across all canonical source directories
$sourceDirs = @('core', 'policies', 'protocols', 'roles', 'workflows', 'templates', 'adapters', 'extensions')
$sourceFiles = @()
foreach ($d in $sourceDirs) {
    $sourceFiles += Get-ChildItem -Path $d -Recurse -File -Filter *.md | ForEach-Object {
        $_.FullName.Substring($repoRoot.Length + 1).Replace('\', '/')
    }
}
$sourceFiles = @($sourceFiles | Sort-Object)
$concatSource = ($sourceFiles | ForEach-Object { "=== $_ ===`n" + (Get-NormalizedText $_) }) -join "`n"
$sourceHashFull = Get-Sha256Hex $concatSource
$sourceHashShort = $sourceHashFull.Substring(0, 12)
$fwVersion = '0.6.1'
$emDash = [string][char]0x2014

$coreInvariantsBlock = @'
## UESF Embedded Core & Policy Invariants (`v__FW_VERSION__`)
1. **Autonomy Tiers (`policies/AUTONOMY_POLICY.md`)**:
   * `A0` (Advisory & Discovery __EM__ Read-Only, zero file writes/edits, zero task contracting).
   * `A1` (Bounded Execution __EM__ execute only explicitly contracted steps within file boundaries).
   * `A2` (Autonomous Execution __EM__ make routine technical/governance decisions within approved scope).
   * `A3` (Human Approval Required __EM__ mandatory pause for destructive git actions, security/secret changes, scope overrides, transitioning out of Feature Discovery, or tagging `v1.0.0`).
2. **Epistemic Discipline (`policies/VERIFICATION_POLICY.md`)**:
   * Distinguish all claims into: `Verified` (reproducible tool/test/git output in current session), `Observed` (seen in state without full lifecycle test), `Reported` (from handoff/remote ledger), `Inferred` (logically deduced), and `Unknown` (inaccessible in current runtime). Never fabricate tool execution or file edits.
3. **Capability Probing & Three-Domain Knowledge Lookup (`core/CAPABILITY_MODEL.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`)**:
   * Probe available capabilities (`CAP-FS`, `CAP-TERM`, `CAP-GIT`, `CAP-WS`, `CAP-WEB`, `CAP-MCP`, `CAP-AGENT`) before acting.
   * If working in a downstream project with `.uesf/`, read operational state from `.uesf/{EXTENSION.md, KNOWLEDGE_MAP.md, ACTIVE_TASKS.md, DECISION_LOG.md, CONTEXT_SNAPSHOT.md}` and permanent project documentation from native `docs/` paths indexed in `.uesf/KNOWLEDGE_MAP.md`. If working in the UESF repository itself, read `management/`.
'@.Replace("`r`n", "`n").Replace('__FW_VERSION__', $fwVersion).Replace('__EM__', $emDash).Trim()

$bundles = @(
    @{ Name='discovery';     Kind='role';     Source='roles/discovery/SKILL.md';         Autonomy='A0 (Read-Only Lock)'; Desc='UESF Feature Discovery & Requirements Strategist (Iterative A0 Brainstorming)'; Templates=@('templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md') },
    @{ Name='cto';           Kind='role';     Source='roles/cto/SKILL.md';               Autonomy='A2 (A3 Human-Gated)'; Desc='UESF Founding CTO & Chief Architect (Governance, Task Contracting & Acceptance)'; Templates=@('templates/TASK_CONTRACT_TEMPLATE.md', 'templates/HANDOFF_PACKAGE_TEMPLATE.md') },
    @{ Name='architect';     Kind='role';     Source='roles/architect/SKILL.md';         Autonomy='A1/A2';               Desc='UESF Architect Role (System Design, Interface Contracts & Layer Isolation)'; Templates=@('templates/PROJECT_EXTENSION_TEMPLATE.md') },
    @{ Name='developer';     Kind='role';     Source='roles/developer/SKILL.md';         Autonomy='A1/A2';               Desc='UESF Developer Role (Bounded Implementation, Unit Tests & Branch Hygiene)'; Templates=@('templates/EVIDENCE_PACKAGE_TEMPLATE.md', 'templates/KDP_TEMPLATE.md') },
    @{ Name='qa';            Kind='role';     Source='roles/qa/SKILL.md';                Autonomy='A1/A2';               Desc='UESF QA Role (Independent Verification, Acceptance Audits & Regression Checks)'; Templates=@('templates/EVIDENCE_PACKAGE_TEMPLATE.md') },
    @{ Name='devops';        Kind='role';     Source='roles/devops/SKILL.md';            Autonomy='A1/A2';               Desc='UESF DevOps Role (Build/Dist Automation, Git Workflows & Environment Tooling)'; Templates=@('templates/EVIDENCE_PACKAGE_TEMPLATE.md') },
    @{ Name='security';      Kind='role';     Source='roles/security/SKILL.md';          Autonomy='A1/A2';               Desc='UESF Security Role (Threat Modeling, Secret Hygiene & Prompt-Injection Gates)'; Templates=@('templates/ESCALATION_RECORD_TEMPLATE.md') },
    @{ Name='sre';           Kind='role';     Source='roles/sre/SKILL.md';               Autonomy='A1/A2';               Desc='UESF SRE Role (Operational Readiness, Observability & Rollback Verification)'; Templates=@('templates/EVIDENCE_PACKAGE_TEMPLATE.md') },
    @{ Name='documentation'; Kind='role';     Source='roles/documentation/SKILL.md';     Autonomy='A1';                  Desc='UESF Documentation Role (Specification Formatting, Link Integrity & Mirrors)'; Templates=@('templates/KDP_TEMPLATE.md') },
    @{ Name='init';          Kind='workflow'; Source='workflows/INIT_WORKFLOW.md';       Autonomy='A0 -> A1 on Approval';Desc='UESF Project Initialization Workflow (/uesf:init - A0 Audit & .uesf/ Scaffold)'; Templates=@('templates/PROJECT_EXTENSION_TEMPLATE.md') },
    @{ Name='handoff';       Kind='workflow'; Source='workflows/HANDOFF_WORKFLOW.md';    Autonomy='A0/A1';               Desc='UESF Session-Exit Handoff Workflow (/uesf:handoff - Package Work & Evidence)'; Templates=@('templates/HANDOFF_PACKAGE_TEMPLATE.md', 'templates/EVIDENCE_PACKAGE_TEMPLATE.md') },
    @{ Name='status';        Kind='workflow'; Source='workflows/STATUS_WORKFLOW.md';     Autonomy='A0 (Read-Only)';      Desc='UESF Unified Session-Entry & Context Reconstruction Workflow (/uesf:status)'; Templates=@() }
)

$distRoot = Join-Path $repoRoot 'dist'
if (Test-Path $distRoot) { Remove-Item -Path $distRoot -Recurse -Force }
New-Item -ItemType Directory -Path (Join-Path $distRoot 'skills') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $distRoot 'commands/uesf') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $distRoot 'gemini-cli/uesf') -Force | Out-Null

$manifestBundles = @()

foreach ($b in $bundles) {
    $name = $b.Name
    $skillId = "uesf-$name"
    $srcPath = $b.Source
    $srcText = Get-NormalizedText $srcPath

    $tmplSection = ""
    if ($b.Templates.Count -gt 0) {
        $tb = New-Object System.Text.StringBuilder
        [void]$tb.AppendLine('')
        [void]$tb.AppendLine('---')
        [void]$tb.AppendLine('## Embedded Canonical Output Templates')
        foreach ($tp in $b.Templates) {
            [void]$tb.AppendLine('')
            [void]$tb.AppendLine(('### Template Source: `{0}`' -f $tp))
            [void]$tb.AppendLine((Get-NormalizedText $tp))
        }
        $tmplSection = $tb.ToString().Replace("`r`n", "`n")
    }

    $extraSection = ""
    if ($name -eq 'init') {
        $eb = New-Object System.Text.StringBuilder
        [void]$eb.AppendLine('')
        [void]$eb.AppendLine('---')
        [void]$eb.AppendLine('## Embedded Project Automation Scripts (.uesf/scripts/ & .git/hooks/pre-commit)')
        $embeddedScripts = @(
            @{ Path='scripts/sync-snapshot.ps1'; Target='.uesf/scripts/sync-snapshot.ps1'; Lang='powershell' },
            @{ Path='scripts/sync-snapshot.sh';  Target='.uesf/scripts/sync-snapshot.sh';  Lang='sh' },
            @{ Path='scripts/hooks/pre-commit';  Target='.git/hooks/pre-commit';           Lang='sh' }
        )
        foreach ($es in $embeddedScripts) {
            [void]$eb.AppendLine('')
            [void]$eb.AppendLine(('### Target `{0}` (Source: `{1}`)' -f $es.Target, $es.Path))
            [void]$eb.AppendLine(('```{0}' -f $es.Lang))
            [void]$eb.AppendLine((Get-NormalizedText $es.Path))
            [void]$eb.AppendLine('```')
        }
        $extraSection = $eb.ToString().Replace("`r`n", "`n")
    }

    $headerBlock = @'
> **NON-AUTHORITATIVE COMPILED UESF BUNDLE __EM__ DO NOT EDIT MANUALLY**
> * **Bundle ID**: `__SKILL_ID__` (`/uesf:__NAME__`)
> * **Canonical Source**: `__SRC_PATH__` (`uesf@v__FW_VERSION__`)
> * **Source-SHA256**: `__SOURCE_HASH_FULL__` (`__SOURCE_HASH_SHORT__`)
> * **Activation Banner Rule**: Begin your first response with: `**[UESF v__FW_VERSION__ | Active: __SKILL_ID__ | Autonomy: __AUTONOMY__]**`
'@.Replace("`r`n", "`n").Replace('__EM__', $emDash).Replace('__SKILL_ID__', $skillId).Replace('__NAME__', $name).Replace('__SRC_PATH__', $srcPath).Replace('__FW_VERSION__', $fwVersion).Replace('__SOURCE_HASH_FULL__', $sourceHashFull).Replace('__SOURCE_HASH_SHORT__', $sourceHashShort).Replace('__AUTONOMY__', $b.Autonomy)

    $specHeading = ('## Canonical Specification (`{0}`)' -f $srcPath)
    $compiledBody = ($headerBlock + "`n`n" + $coreInvariantsBlock + "`n`n---`n" + $specHeading + "`n`n" + $srcText + $tmplSection + $extraSection).Trim() + "`n"

    # 1. dist/skills/uesf-<name>/SKILL.md
    $skillDir = Join-Path $distRoot "skills/$skillId"
    New-Item -ItemType Directory -Path $skillDir -Force | Out-Null
    $skillFileContent = @"
---
name: $skillId
description: $($b.Desc)
version: $fwVersion
---

$compiledBody
"@.Replace("`r`n", "`n")
    $skillRelPath = "dist/skills/$skillId/SKILL.md"
    [System.IO.File]::WriteAllText((Join-Path $repoRoot $skillRelPath), $skillFileContent, (New-Object System.Text.UTF8Encoding($false)))

    # 2. dist/commands/uesf/<name>.md
    $cmdRelPath = "dist/commands/uesf/$name.md"
    [System.IO.File]::WriteAllText((Join-Path $repoRoot $cmdRelPath), $compiledBody, (New-Object System.Text.UTF8Encoding($false)))

    # 3. dist/gemini-cli/uesf/<name>.toml
    $tomlRelPath = "dist/gemini-cli/uesf/$name.toml"
    $escapedBody = $compiledBody.Replace('\', '\\').Replace('"""', '\"\"\"')
    $tomlContent = @"
# UESF Compiled Gemini CLI Command: /uesf:$name (v$fwVersion | Source-SHA256: $sourceHashShort)
description = "$($b.Desc)"
prompt = """
$escapedBody
"""
"@.Replace("`r`n", "`n")
    [System.IO.File]::WriteAllText((Join-Path $repoRoot $tomlRelPath), $tomlContent, (New-Object System.Text.UTF8Encoding($false)))

    $manifestBundles += [ordered]@{
        id = $skillId
        command = "/uesf:$name"
        kind = $b.Kind
        canonical_source = $srcPath
        skill_path = $skillRelPath
        command_path = $cmdRelPath
        gemini_toml_path = $tomlRelPath
    }
}

$manifestObj = [ordered]@{
    framework = "Universal Engineering Skills Framework (UESF)"
    version = $fwVersion
    source_sha256 = $sourceHashFull
    source_sha256_short = $sourceHashShort
    bundle_count = $bundles.Count
    bundles = $manifestBundles
}
$manifestJson = ($manifestObj | ConvertTo-Json -Depth 6).Replace("`r`n", "`n") + "`n"
[System.IO.File]::WriteAllText((Join-Path $distRoot 'manifest.json'), $manifestJson, (New-Object System.Text.UTF8Encoding($false)))
"DIST_BUILT=12 bundles (36 files + dist/manifest.json, SHA256=$sourceHashShort)"
