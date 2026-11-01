@echo off
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0patch.ps1" -Restore %*
if errorlevel 1 echo Restore failed. Read the error above.
pause
