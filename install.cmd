@echo off
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0patch.ps1" %*
if errorlevel 1 echo Installation failed. Read the error above.
pause
