param(
    [switch]$Check,
    [switch]$Link,
    [string]$InitProject = "",
    [string[]]$Targets = @('auto'),
    [string]$Version = ""
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$cliArgs = @((Join-Path $PSScriptRoot '..\bin\uesf.mjs'), 'install')
if ($Check) { $cliArgs += '--check' }
if ($Link)  { $cliArgs += '--link' }
if (-not [string]::IsNullOrWhiteSpace($InitProject)) { $cliArgs += @('--init-project', $InitProject) }
if ($Targets.Count -gt 0) { $cliArgs += @('--target', ($Targets -join ',')) }
if (-not [string]::IsNullOrWhiteSpace($Version)) { $cliArgs += @('--version', $Version) }
& node @cliArgs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
