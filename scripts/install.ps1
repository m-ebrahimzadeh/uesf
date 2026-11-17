param(
    [switch]$Check,
    [switch]$Link,
    [string]$InitProject = "",
    [string[]]$Targets = @('auto')
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$distRoot = Join-Path $repoRoot 'dist'
$manifestPath = Join-Path $distRoot 'manifest.json'

if (-not (Test-Path $manifestPath)) {
    throw "dist/manifest.json not found. Run scripts/build-dist.ps1 first."
}
$distManifest = Get-Content $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json

# 1. Install Git pre-commit hook in UESF repo
$gitHooksDir = Join-Path $repoRoot '.git/hooks'
if ((Test-Path $gitHooksDir) -and (-not $Check)) {
    Copy-Item -Path (Join-Path $repoRoot 'scripts/hooks/pre-commit') -Destination (Join-Path $gitHooksDir 'pre-commit') -Force
    "HOOK_INSTALLED=.git/hooks/pre-commit"
}

# 2. Optional downstream project hook & script wiring
if (-not [string]::IsNullOrWhiteSpace($InitProject)) {
    $projPath = (Resolve-Path $InitProject).Path
    $projUesfScripts = Join-Path $projPath '.uesf/scripts'
    New-Item -ItemType Directory -Path $projUesfScripts -Force | Out-Null
    Copy-Item -Path (Join-Path $repoRoot 'scripts/sync-snapshot.ps1') -Destination (Join-Path $projUesfScripts 'sync-snapshot.ps1') -Force
    Copy-Item -Path (Join-Path $repoRoot 'scripts/sync-snapshot.sh') -Destination (Join-Path $projUesfScripts 'sync-snapshot.sh') -Force
    $projHooks = Join-Path $projPath '.git/hooks'
    if (Test-Path $projHooks) {
        Copy-Item -Path (Join-Path $repoRoot 'scripts/hooks/pre-commit') -Destination (Join-Path $projHooks 'pre-commit') -Force
    }
    "PROJECT_HOOK_WIRED=$projPath"
}

$userHome = $HOME
$agentTargets = @(
    @{ Name='antigravity'; BaseDir=(Join-Path $userHome '.gemini/antigravity'); SkillsDir=(Join-Path $userHome '.gemini/antigravity/skills'); CmdDir=''; Format='md' },
    @{ Name='gemini-cli';  BaseDir=(Join-Path $userHome '.gemini');             SkillsDir=(Join-Path $userHome '.gemini/skills');             CmdDir=(Join-Path $userHome '.gemini/commands/uesf'); Format='toml' },
    @{ Name='claude-code'; BaseDir=(Join-Path $userHome '.claude');             SkillsDir=(Join-Path $userHome '.claude/skills');             CmdDir=(Join-Path $userHome '.claude/commands/uesf'); Format='md' },
    @{ Name='codex';       BaseDir=(Join-Path $userHome '.codex');              SkillsDir=(Join-Path $userHome '.codex/skills');              CmdDir=''; Format='md' },
    @{ Name='kilocode';    BaseDir=(Join-Path $userHome '.kilocode');           SkillsDir='';                                                 CmdDir=(Join-Path $userHome '.kilocode/workflows/uesf'); Format='md' },
    @{ Name='cline';       BaseDir=(Join-Path $userHome 'Documents/Cline');     SkillsDir='';                                                 CmdDir=(Join-Path $userHome 'Documents/Cline/Workflows/uesf'); Format='md' }
)

foreach ($t in $agentTargets) {
    $shouldProcess = ($Targets -contains 'all') -or ($Targets -contains $t.Name) -or (($Targets -contains 'auto') -and (Test-Path $t.BaseDir))
    if (-not $shouldProcess) { continue }

    $markerDir = if (-not [string]::IsNullOrWhiteSpace($t.SkillsDir)) { $t.SkillsDir } else { $t.CmdDir }
    $installedManifestPath = Join-Path $markerDir '.uesf-manifest.json'

    if ($Check) {
        if (-not (Test-Path $installedManifestPath)) {
            "CHECK_TARGET=$($t.Name): NOT_INSTALLED"
        } else {
            $inst = Get-Content $installedManifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
            if ($inst.version -eq $distManifest.version -and $inst.source_sha256 -eq $distManifest.source_sha256) {
                "CHECK_TARGET=$($t.Name): UP_TO_DATE (v$($inst.version), SHA256=$($inst.source_sha256_short))"
            } else {
                "CHECK_TARGET=$($t.Name): OUTDATED (installed v$($inst.version) / $($inst.source_sha256_short) vs dist v$($distManifest.version) / $($distManifest.source_sha256_short))"
            }
        }
        continue
    }

    # Clean-and-Copy (or Link) Skills
    if (-not [string]::IsNullOrWhiteSpace($t.SkillsDir)) {
        New-Item -ItemType Directory -Path $t.SkillsDir -Force | Out-Null
        Get-ChildItem -Path $t.SkillsDir -Directory -Filter 'uesf-*' -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force
        foreach ($b in $distManifest.bundles) {
            $srcSkillDir = Join-Path $distRoot "skills/$($b.id)"
            $dstSkillDir = Join-Path $t.SkillsDir $b.id
            if ($Link) {
                New-Item -ItemType Junction -Path $dstSkillDir -Target $srcSkillDir | Out-Null
            } else {
                Copy-Item -Path $srcSkillDir -Destination $dstSkillDir -Recurse -Force
            }
        }
    }

    # Clean-and-Copy Commands
    if (-not [string]::IsNullOrWhiteSpace($t.CmdDir)) {
        if (Test-Path $t.CmdDir) { Remove-Item -Path $t.CmdDir -Recurse -Force }
        New-Item -ItemType Directory -Path $t.CmdDir -Force | Out-Null
        if ($t.Format -eq 'toml') {
            Copy-Item -Path (Join-Path $distRoot 'gemini-cli/uesf/*.toml') -Destination $t.CmdDir -Force
        } else {
            Copy-Item -Path (Join-Path $distRoot 'commands/uesf/*.md') -Destination $t.CmdDir -Force
        }
    }

    $installedManifestObj = [ordered]@{
        framework = $distManifest.framework
        version = $distManifest.version
        source_sha256 = $distManifest.source_sha256
        source_sha256_short = $distManifest.source_sha256_short
        uesf_repo_path = $repoRoot.Replace('\', '/')
        bundle_count = $distManifest.bundle_count
        bundles = $distManifest.bundles
    }
    $installedManifestJson = ($installedManifestObj | ConvertTo-Json -Depth 6).Replace("`r`n", "`n") + "`n"
    [System.IO.File]::WriteAllText($installedManifestPath, $installedManifestJson, (New-Object System.Text.UTF8Encoding($false)))
    "INSTALLED_TARGET=$($t.Name) (v$($distManifest.version), SHA256=$($distManifest.source_sha256_short))"
}

if ((-not $Check) -and [string]::IsNullOrWhiteSpace($InitProject)) {
    ""
    "--- UESF v$($distManifest.version) QUICKSTART ---"
    "1. Onboard any project:  Open project in your agent and run /uesf:init (or @uesf-init)"
    "2. Resume any session:   Run /uesf:status (or @uesf-status)"
    "3. Brainstorm a feature: Run /uesf:discovery (or @uesf-discovery) [A0 Read-Only]"
    "4. Check update status:  powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install.ps1 -Check"
}
