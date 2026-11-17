Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
& node (Join-Path $PSScriptRoot '..\bin\uesf.mjs') build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
