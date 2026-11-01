param(
    [string]$InstallPath = "$env:LOCALAPPDATA\GitHubDesktop",
    [switch]$Restore,
    [switch]$VerifyOnly
)
$ErrorActionPreference = 'Stop'
$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'manifest.json') -Encoding UTF8 -Raw | ConvertFrom-Json
$root = [IO.Path]::GetFullPath($InstallPath)
$app = Join-Path $root ("app-" + $manifest.version + '\resources\app')
$package = Get-Content -LiteralPath (Join-Path $app 'package.json') -Encoding UTF8 -Raw | ConvertFrom-Json
if ($package.name -ne 'desktop' -or $package.version -ne $manifest.version) { throw 'Unsupported product or version.' }
$running = @(Get-Process GitHubDesktop -ErrorAction SilentlyContinue | Where-Object {
    !$_.Path -or $_.Path.StartsWith(($root.TrimEnd('\') + '\'), [StringComparison]::OrdinalIgnoreCase)
})
if (!$VerifyOnly -and $running.Count -gt 0) { throw 'Please completely exit GitHub Desktop before installing or restoring.' }
$backupDir = Join-Path $app ('.zh-original-' + $manifest.version)
$plans = @()
foreach ($entry in $manifest.files) {
    if ($entry.name -notin @('main.js','renderer.js','crash.js')) { throw 'Unexpected payload filename.' }
    $target = Join-Path $app $entry.name
    $payload = Join-Path $PSScriptRoot $entry.name
    $backup = Join-Path $backupDir $entry.name
    $current = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
    if ($current -ne $entry.original -and $current -ne $entry.patched) { throw "Unsupported or modified file: $($entry.name). No files were changed." }
    if ((Get-FileHash -LiteralPath $payload -Algorithm SHA256).Hash -ne $entry.patched) { throw 'Patch payload checksum mismatch.' }
    if ((Test-Path -LiteralPath $backup) -and (Get-FileHash -LiteralPath $backup -Algorithm SHA256).Hash -ne $entry.original) { throw 'Original backup checksum mismatch.' }
    if ($Restore) {
        if ($current -eq $entry.original) { continue }
        if (!(Test-Path -LiteralPath $backup)) { throw "Missing original backup: $($entry.name)" }
        $bytes = [IO.File]::ReadAllBytes($backup)
    } else {
        if ($current -eq $entry.patched) { continue }
        $bytes = [IO.File]::ReadAllBytes($payload)
    }
    $plans += @{Target=$target; Backup=$backup; Bytes=$bytes; Previous=[IO.File]::ReadAllBytes($target)}
}
if ($VerifyOnly) { Write-Host 'Verification passed; no files changed.'; exit 0 }
if ($plans.Count -eq 0) { Write-Host 'Already in the requested state; no changes needed.'; exit 0 }
if (!$Restore) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    foreach ($plan in $plans) {
        if (!(Test-Path -LiteralPath $plan.Backup)) { [IO.File]::WriteAllBytes($plan.Backup, $plan.Previous) }
    }
}
$completed = @()
try {
    foreach ($plan in $plans) {
        $temp = $plan.Target + '.zh-stage'
        [IO.File]::WriteAllBytes($temp, $plan.Bytes)
        [IO.File]::Replace($temp, $plan.Target, ($plan.Target + '.zh-previous'))
        $completed += $plan
    }
} catch {
    foreach ($plan in $completed) { [IO.File]::WriteAllBytes($plan.Target, $plan.Previous) }
    throw
}
foreach ($entry in $manifest.files) {
    $expected = if ($Restore) { $entry.original } else { $entry.patched }
    if ((Get-FileHash -LiteralPath (Join-Path $app $entry.name) -Algorithm SHA256).Hash -ne $expected) { throw 'Final file verification failed. Restore from the saved original backups.' }
}
Write-Host 'Completed. You can now start GitHub Desktop.'
