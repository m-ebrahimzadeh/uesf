Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
Set-Location $repoRoot

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

# Scan Canonical .md files (excluding machine-generated dist/ and management/CONTEXT_SNAPSHOT.md)
$mdFiles = Get-ChildItem -Recurse -File -Filter *.md | Where-Object {
    $_.FullName -notmatch '[/\\]\.git[/\\]' -and
    $_.FullName -notmatch '[/\\]dist[/\\]' -and
    $_.FullName -notmatch 'CONTEXT_SNAPSHOT\.md$'
}
$rel = @($mdFiles | ForEach-Object { $_.FullName.Substring($repoRoot.Length + 1).Replace('\', '/') } | Sort-Object)
"MD_COUNT=$($rel.Count)"

$km = Get-Content 'management/KNOWLEDGE_MAP.md' -Raw -Encoding UTF8
$rows = [regex]::Matches($km, '(?m)^\| `(UESF-[A-Z]+-\d+)` \| `([^`]+)` \|[^|]*\|[^|]*\| `([^`]+)` \|')
"KM_COUNT=$($rows.Count)"
$kmPaths = @($rows | ForEach-Object { $_.Groups[2].Value })
"MISSING_ON_DISK=$(@($kmPaths | Where-Object { $rel -notcontains $_ }).Count)"
"EXTRA_ON_DISK=$(@($rel | Where-Object { $kmPaths -notcontains $_ }).Count)"

$mm = 0
foreach ($r in $rows) {
    $p = $r.Groups[2].Value
    if (Test-Path $p) {
        $t = Get-Content $p -Raw -Encoding UTF8
        if ($t -notmatch ('\* \*\*Version\*\*: ' + [regex]::Escape($r.Groups[3].Value))) {
            $mm++
            "  VERMISMATCH $p"
        }
    }
}
"KM_VERSION_MISMATCHES=$mm"

"GITKEEP_COUNT=$(@(Get-ChildItem -Recurse -Force -File -Filter .gitkeep | Where-Object { $_.FullName -notmatch '[/\\]\.git[/\\]' }).Count)"
"HAS_GITATTRIBUTES=$(Test-Path '.gitattributes')"
"V1_TAG_COUNT=$(@(git tag -l 'v1.0.0').Count)"

# 1. Metadata Headers Check (All 58 canonical .md files)
$hi = 0
foreach ($f in $rel) {
    $t = Get-Content $f -Raw -Encoding UTF8
    foreach ($k in 'Document ID', 'Canonical Path', 'Version', 'Status', 'Owner', 'Last Updated') {
        if ($t -notmatch ('\* \*\*' + $k + '\*\*:')) {
            $hi++
            "  HDR $f missing $k"
        }
    }
}
"HEADER_ISSUES_STRICT_OWNER=$hi"

# 2. Template Target-Layer Metadata Check (All templates/*.md)
$tmplFiles = @($rel | Where-Object { $_ -match '^templates/.+\.md$' })
$tli = 0
$tmplTargetLayer = @{}
foreach ($tf in $tmplFiles) {
    $t = Get-Content $tf -Raw -Encoding UTF8
    $m = [regex]::Match($t, '\* \*\*Target Layer\*\*: Layer ([1-6])')
    if (-not $m.Success) {
        $tli++
        "  TMPL_LAYER $tf missing valid Target Layer (Layer 1..6)"
    } else {
        $tmplTargetLayer[$tf] = [int]$m.Groups[1].Value
    }
}
"TEMPLATE_TARGET_LAYER_ISSUES=$tli"

# 3. Cumulative Role Skill Schema Check (All 9 roles/*/SKILL.md)
$roleFiles = @($rel | Where-Object { $_ -match '^roles/[^/]+/SKILL\.md$' })
"ROLE_COUNT=$($roleFiles.Count)"
$refRoleHeadings = @([regex]::Matches((Get-Content 'roles/cto/SKILL.md' -Raw -Encoding UTF8), '(?m)^## \d+\. .+$') | ForEach-Object { $_.Value.Trim() })
$rsi = 0
if ($roleFiles.Count -ne 9) { $rsi++; "  ROLE_COUNT_EXPECTED_9_GOT_$($roleFiles.Count)" }
foreach ($rf in $roleFiles) {
    $rt = Get-Content $rf -Raw -Encoding UTF8
    foreach ($h in $refRoleHeadings) {
        if (-not $rt.Contains($h)) {
            $rsi++
            "  ROLE_SCHEMA $rf missing $h"
        }
    }
}
"ROLE_SCHEMA_ISSUES=$rsi"

# 4. Cumulative Workflow Schema Check (All 3 workflows/*_WORKFLOW.md)
$wfFiles = @($rel | Where-Object { $_ -match '^workflows/[^/]+_WORKFLOW\.md$' })
"WORKFLOW_COUNT=$($wfFiles.Count)"
$wsi = 0
if ($wfFiles.Count -ne 3) { $wsi++; "  WORKFLOW_COUNT_EXPECTED_3_GOT_$($wfFiles.Count)" }
$wfSections = @(
    '## 1. Purpose & Command Trigger',
    '## 2. Scope & Autonomy Profile',
    '## 3. Capability Detection & Environment Modes',
    '## 4. Step-by-Step Execution Workflow',
    '## 5. Epistemic & Output Formatting Rules',
    '## 6. Guardrails & Non-Overlap Boundaries',
    '## 7. Relationships with Other Documents'
)
foreach ($wf in $wfFiles) {
    $wt = Get-Content $wf -Raw -Encoding UTF8
    foreach ($s in $wfSections) {
        if (-not $wt.Contains($s)) {
            $wsi++
            "  WORKFLOW_SCHEMA $wf missing $s"
        }
    }
}
"WORKFLOW_SCHEMA_ISSUES=$wsi"

# 5. Cumulative Platform Adapter Schema Check (All 3 concrete adapters/*/ADAPTER.md)
$adapterFiles = @($rel | Where-Object { $_ -match '^adapters/[^/]+/ADAPTER\.md$' })
$asi = 0
if ($adapterFiles.Count -ne 3) { $asi++; "  ADAPTER_COUNT_EXPECTED_3_GOT_$($adapterFiles.Count)" }
$adapterSections = @(
    '## 1. Purpose & Target Runtime Profile',
    '## 2. Scope & Supported Roles',
    '## 3. Capability Mapping Matrix (CAP-* to Runtime Bindings)',
    '## 4. Constraint Handling & Graceful Degradation Rules',
    '## 5. Session Initialization & Handoff Execution Workflow',
    '## 6. Security & Isolation Guardrails',
    '## 7. Relationships with Other Documents'
)
foreach ($af in $adapterFiles) {
    $at = Get-Content $af -Raw -Encoding UTF8
    foreach ($s in $adapterSections) {
        if (-not $at.Contains($s)) {
            $asi++
            "  ADAPTER_SCHEMA $af missing $s"
        }
    }
}
"ADAPTER_SCHEMA_ISSUES=$asi"

# 6. Cumulative Project Extension Schema Check
$extFiles = @($rel | Where-Object { $_ -match '^extensions/[^/]+/EXTENSION\.md$' })
$esi = 0
if ($extFiles.Count -lt 1) { $esi++; "  EXT_COUNT_EXPECTED_AT_LEAST_1" }
$extSections = @(
    '## 1. Purpose & Target Project Profile',
    '## 2. Scope & Domain Architecture Overlay',
    '## 3. Role Specialization & Domain Responsibilities',
    '## 4. Project-Specific Verification, Security & Release Gates',
    '## 5. Adapter & Tooling Bindings',
    '## 6. Strict Layer 6 Isolation & Non-Override Guarantees',
    '## 7. Relationships with Other Documents'
)
foreach ($ef in $extFiles) {
    $et = Get-Content $ef -Raw -Encoding UTF8
    foreach ($s in $extSections) {
        if (-not $et.Contains($s)) {
            $esi++
            "  EXT_SCHEMA $ef missing $s"
        }
    }
}
"EXTENSION_SCHEMA_ISSUES=$esi"

# 7. Capability Token Check
$okCap = 'CAP-FS', 'CAP-TERM', 'CAP-GIT', 'CAP-WS', 'CAP-WEB', 'CAP-MCP', 'CAP-AGENT'
$unk = 0
foreach ($f in $rel) {
    $t = Get-Content $f -Raw -Encoding UTF8
    foreach ($m in [regex]::Matches($t, 'CAP-[A-Z]+')) {
        if ($okCap -notcontains $m.Value) {
            $unk++
            "  UNKNOWN $($m.Value) in $f"
        }
    }
}
"UNKNOWN_CAP_TOKENS=$unk"

# 8. Layer-Aware Upward File Dependency Check (Zero Exemptions)
function Get-FileLayer([string]$path, [hashtable]$tmplLayers) {
    if ($path -match '^core/')       { return 1 }
    if ($path -match '^policies/')   { return 2 }
    if ($path -match '^protocols/')  { return 3 }
    if ($path -match '^roles/')      { return 4 }
    if ($path -match '^adapters/')   { return 5 }
    if ($path -match '^extensions/') { return 6 }
    if ($path -match '^templates/' -and $tmplLayers.ContainsKey($path)) { return $tmplLayers[$path] }
    return 99 # Root README.md, workflows/, and management/ are cross-layer orchestrators/indexes
}

$up = 0
foreach ($f in $rel) {
    $srcLayer = Get-FileLayer $f $tmplTargetLayer
    if ($srcLayer -ge 6) { continue }
    $t = Get-Content $f -Raw -Encoding UTF8
    $refPaths = @([regex]::Matches($t, '`([A-Za-z0-9_./-]+\.md)`') | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_ -match '/' -and $_ -notmatch 'XXX' -and $_ -notmatch '^\.uesf/' -and $_ -notmatch '^docs/' -and $_ -notmatch '^\.\.\./' })
    foreach ($rp in $refPaths) {
        $dstLayer = Get-FileLayer $rp $tmplTargetLayer
        if ($dstLayer -lt 99 -and $dstLayer -gt $srcLayer) {
            if (($rp -match '^adapters/' -and $srcLayer -lt 5) -or ($rp -match '^extensions/' -and $srcLayer -lt 6)) {
                $up++
                "  UPFILE $f (L$srcLayer) -> $rp (L$dstLayer)"
            }
        }
    }
}
"UPWARD_FILE_DEPENDENCY_HITS=$up"

# 9. Cross-Reference Resolution Check
$knownDiskMd = $rel + @('management/CONTEXT_SNAPSHOT.md')
$bp = 0; $bb = 0
foreach ($f in $rel) {
    $t = Get-Content $f -Raw -Encoding UTF8
    foreach ($m in [regex]::Matches($t, '`([A-Za-z0-9_./-]+\.md)`')) {
        $p = $m.Groups[1].Value
        if ($p -match 'XXX' -or $p -match '^\.uesf/' -or $p -match '^docs/' -or $p -match '^\.\.\./') { continue }
        if ($p -match '/') {
            if ($knownDiskMd -notcontains $p) { $bp++; "  BROKEN $p in $f" }
        } else {
            if (@($knownDiskMd | Where-Object { $_ -eq $p -or $_.EndsWith("/$p") }).Count -eq 0) {
                $bb++
                "  BROKENBASE $p in $f"
            }
        }
    }
}
"BROKEN_PATH_REFS=$bp"
"BROKEN_BASENAME_REFS=$bb"

# 10. Automatic CONTEXT_SNAPSHOT.md Integrity & Drift Check
$snapIssues = 0
$snapPath = 'management/CONTEXT_SNAPSHOT.md'
if (-not (Test-Path $snapPath)) {
    $snapIssues++
    "  SNAP_MISSING $snapPath"
} else {
    $snapText = Get-NormalizedText $snapPath
    foreach ($sec in '## 1. Empirically Verified Repository Facts (`[VERIFIED_BY_GIT_AND_FS_PROBE]`)', '## 2. Recorded Project & Governance State (`[RECORDED_IN_LEDGER]`)', '## 3. Automated Discrepancy & Drift Audit (`[DRIFT_CHECK]`)') {
        if (-not $snapText.Contains($sec)) {
            $snapIssues++
            "  SNAP_SECTION_MISSING $sec"
        }
    }
    $ledgerFiles = @('management/PROJECT_PROFILE.md', 'management/ACTIVE_TASKS.md', 'management/DECISION_LOG.md', 'management/KNOWLEDGE_MAP.md', 'management/RELEASE_HISTORY.md', 'management/IMPLEMENTATION_ROADMAP.md')
    $concatLedger = ($ledgerFiles | ForEach-Object { "=== $_ ===`n" + (Get-NormalizedText $_) }) -join "`n"
    $expectedLedgerHash = Get-Sha256Hex $concatLedger
    if (-not $snapText.Contains($expectedLedgerHash)) {
        $snapIssues++
        "  SNAP_HASH_DRIFT expected $expectedLedgerHash"
    }
}
"SNAPSHOT_DRIFT_ISSUES=$snapIssues"

# 11. Compiled dist/ Bundle Completeness & Source-Hash Drift Check
$distBundleIssues = 0
$distDriftIssues = 0
$manifestPath = 'dist/manifest.json'
if (-not (Test-Path $manifestPath)) {
    $distBundleIssues++
    "  DIST_MISSING $manifestPath"
} else {
    $manifest = Get-Content $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
    if ($manifest.bundle_count -ne 12 -or $manifest.bundles.Count -ne 12) {
        $distBundleIssues++
        "  DIST_COUNT_MISMATCH expected 12"
    }
    $sourceDirs = @('core', 'policies', 'protocols', 'roles', 'workflows', 'templates', 'adapters', 'extensions')
    $sourceFiles = @()
    foreach ($d in $sourceDirs) {
        $sourceFiles += Get-ChildItem -Path $d -Recurse -File -Filter *.md | ForEach-Object {
            $_.FullName.Substring($repoRoot.Length + 1).Replace('\', '/')
        }
    }
    $sourceFiles = @($sourceFiles | Sort-Object)
    $concatSource = ($sourceFiles | ForEach-Object { "=== $_ ===`n" + (Get-NormalizedText $_) }) -join "`n"
    $expectedSourceHash = Get-Sha256Hex $concatSource
    if ($manifest.source_sha256 -ne $expectedSourceHash) {
        $distDriftIssues++
        "  DIST_MANIFEST_DRIFT expected $expectedSourceHash got $($manifest.source_sha256)"
    }
    foreach ($b in $manifest.bundles) {
        foreach ($p in @($b.skill_path, $b.command_path, $b.gemini_toml_path)) {
            if (-not (Test-Path $p)) {
                $distBundleIssues++
                "  DIST_FILE_MISSING $p"
            } else {
                $bt = Get-NormalizedText $p
                if (-not $bt.Contains($manifest.source_sha256_short)) {
                    $distDriftIssues++
                    "  DIST_FILE_HASH_DRIFT $p"
                }
            }
        }
    }
}
"DIST_BUNDLE_ISSUES=$distBundleIssues"
"DIST_DRIFT_ISSUES=$distDriftIssues"

"CRLF_WORKING_TREE_COUNT=$(@(git ls-files --eol | Select-String 'w/crlf').Count)"
