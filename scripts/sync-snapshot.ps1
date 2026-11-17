param([string]$TargetRoot = "")
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$cli = Join-Path $PSScriptRoot '..\bin\uesf.mjs'
if ([string]::IsNullOrWhiteSpace($TargetRoot)) {
    & node $cli sync-snapshot
} else {
    & node $cli sync-snapshot --target-root $TargetRoot
}
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
