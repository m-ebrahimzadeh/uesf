param(
    [string]$Command = "install",
    [switch]$Update,
    [switch]$Uninstall,
    [switch]$Doctor,
    [switch]$Fix,
    [switch]$Check,
    [switch]$Link,
    [string]$InitProject = "",
    [string]$Project = "",
    [string[]]$Targets = @(),
    [string]$Version = ""
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$sub = $Command
if ($Update)        { $sub = 'update' }
elseif ($Uninstall) { $sub = 'uninstall' }
elseif ($Doctor)    { $sub = 'doctor' }
elseif ($Check)     { $sub = 'check' }

$cliArgs = @((Join-Path $PSScriptRoot '..\bin\uesf.mjs'), $sub)
if ($Fix)  { $cliArgs += '--fix' }
if ($Link) { $cliArgs += '--link' }
if (-not [string]::IsNullOrWhiteSpace($InitProject)) { $cliArgs += @('--init-project', $InitProject) }
if (-not [string]::IsNullOrWhiteSpace($Project))     { $cliArgs += @('--project', $Project) }
if ($Targets.Count -gt 0) { $cliArgs += @('--target', ($Targets -join ',')) }
if (-not [string]::IsNullOrWhiteSpace($Version))     { $cliArgs += @('--version', $Version) }

& node @cliArgs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
