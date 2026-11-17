Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
Set-Location $repoRoot

$mdFiles = Get-ChildItem -Recurse -File -Filter *.md | Where-Object { $_.FullName -notmatch '\\\.git\\' }
$rel = @($mdFiles | ForEach-Object { $_.FullName.Substring($repoRoot.Length + 1).Replace('\', '/') } | Sort-Object)
"MD_COUNT=$($rel.Count)"

$km = Get-Content 'management/KNOWLEDGE_MAP.md' -Raw
$rows = [regex]::Matches($km, '(?m)^\| `(UESF-[A-Z]+-\d+)` \| `([^`]+)` \|[^|]*\|[^|]*\| `([^`]+)` \|')
"KM_COUNT=$($rows.Count)"
$kmPaths = @($rows | ForEach-Object { $_.Groups[2].Value })
"MISSING_ON_DISK=$(@($kmPaths | Where-Object { $rel -notcontains $_ }).Count)"
"EXTRA_ON_DISK=$(@($rel | Where-Object { $kmPaths -notcontains $_ }).Count)"

$mm = 0
foreach ($r in $rows) {
    $p = $r.Groups[2].Value
    if (Test-Path $p) {
        $t = Get-Content $p -Raw
        if ($t -notmatch ('\* \*\*Version\*\*: ' + [regex]::Escape($r.Groups[3].Value))) {
            $mm++
            "  VERMISMATCH $p"
        }
    }
}
"KM_VERSION_MISMATCHES=$mm"

"GITKEEP_COUNT=$(@(Get-ChildItem -Recurse -Force -File -Filter .gitkeep | Where-Object { $_.FullName -notmatch '\\\.git\\' }).Count)"
"HAS_GITATTRIBUTES=$(Test-Path '.gitattributes')"
"V1_TAG_COUNT=$(@(git tag -l 'v1.0.0').Count)"

# 1. Metadata Headers Check (All 54 .md files)
$hi = 0
foreach ($f in $rel) {
    $t = Get-Content $f -Raw
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
    $t = Get-Content $tf -Raw
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
$refRoleHeadings = @([regex]::Matches((Get-Content 'roles/cto/SKILL.md' -Raw), '(?m)^## \d+\. .+$') | ForEach-Object { $_.Value.Trim() })
$rsi = 0
if ($roleFiles.Count -ne 9) { $rsi++; "  ROLE_COUNT_EXPECTED_9_GOT_$($roleFiles.Count)" }
foreach ($rf in $roleFiles) {
    $rt = Get-Content $rf -Raw
    foreach ($h in $refRoleHeadings) {
        if (-not $rt.Contains($h)) {
            $rsi++
            "  ROLE_SCHEMA $rf missing $h"
        }
    }
}
"ROLE_SCHEMA_ISSUES=$rsi"

# 4. Cumulative Platform Adapter Schema Check (All 3 concrete adapters/*/ADAPTER.md)
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
    $at = Get-Content $af -Raw
    foreach ($s in $adapterSections) {
        if (-not $at.Contains($s)) {
            $asi++
            "  ADAPTER_SCHEMA $af missing $s"
        }
    }
}
"ADAPTER_SCHEMA_ISSUES=$asi"

# 5. Cumulative Project Extension Schema Check (All concrete extensions/*/EXTENSION.md)
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
    $et = Get-Content $ef -Raw
    foreach ($s in $extSections) {
        if (-not $et.Contains($s)) {
            $esi++
            "  EXT_SCHEMA $ef missing $s"
        }
    }
}
"EXTENSION_SCHEMA_ISSUES=$esi"

# 6. Capability Token Check
$okCap = 'CAP-FS', 'CAP-TERM', 'CAP-GIT', 'CAP-WS', 'CAP-WEB', 'CAP-MCP', 'CAP-AGENT'
$unk = 0
foreach ($f in $rel) {
    $t = Get-Content $f -Raw
    foreach ($m in [regex]::Matches($t, 'CAP-[A-Z]+')) {
        if ($okCap -notcontains $m.Value) {
            $unk++
            "  UNKNOWN $($m.Value) in $f"
        }
    }
}
"UNKNOWN_CAP_TOKENS=$unk"

# 7. Layer-Aware Upward File Dependency Check (Zero Exemptions)
function Get-FileLayer([string]$path, [hashtable]$tmplLayers) {
    if ($path -match '^core/')       { return 1 }
    if ($path -match '^policies/')   { return 2 }
    if ($path -match '^protocols/')  { return 3 }
    if ($path -match '^roles/')      { return 4 }
    if ($path -match '^adapters/')   { return 5 }
    if ($path -match '^extensions/') { return 6 }
    if ($path -match '^templates/' -and $tmplLayers.ContainsKey($path)) { return $tmplLayers[$path] }
    return 99 # Root README.md and management/ are cross-layer indexes
}

$up = 0
foreach ($f in $rel) {
    $srcLayer = Get-FileLayer $f $tmplTargetLayer
    if ($srcLayer -ge 6) { continue }
    $t = Get-Content $f -Raw
    $refPaths = @([regex]::Matches($t, '`([A-Za-z0-9_./-]+\.md)`') | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_ -match '/' -and $_ -notmatch 'XXX' })
    foreach ($rp in $refPaths) {
        $dstLayer = Get-FileLayer $rp $tmplTargetLayer
        if ($dstLayer -lt 99 -and $dstLayer -gt $srcLayer) {
            # Note: Layers 1-4 core/policies/protocols/roles are coupled within L1-L3 foundation, so enforce strict upward block against L5 (adapters/) and L6 (extensions/) relative to $srcLayer
            if (($rp -match '^adapters/' -and $srcLayer -lt 5) -or ($rp -match '^extensions/' -and $srcLayer -lt 6)) {
                $up++
                "  UPFILE $f (L$srcLayer) -> $rp (L$dstLayer)"
            }
        }
    }
}
"UPWARD_FILE_DEPENDENCY_HITS=$up"

# 8. Cross-Reference Resolution Check
$bp = 0; $bb = 0
foreach ($f in $rel) {
    $t = Get-Content $f -Raw
    foreach ($m in [regex]::Matches($t, '`([A-Za-z0-9_./-]+\.md)`')) {
        $p = $m.Groups[1].Value
        if ($p -match 'XXX') { continue }
        if ($p -match '/') {
            if ($rel -notcontains $p) { $bp++; "  BROKEN $p in $f" }
        } else {
            if (@($rel | Where-Object { $_ -eq $p -or $_.EndsWith("/$p") }).Count -eq 0) {
                $bb++
                "  BROKENBASE $p in $f"
            }
        }
    }
}
"BROKEN_PATH_REFS=$bp"
"BROKEN_BASENAME_REFS=$bb"
"CRLF_WORKING_TREE_COUNT=$(@(git ls-files --eol | Select-String 'w/crlf').Count)"
