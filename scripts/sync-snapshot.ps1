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
