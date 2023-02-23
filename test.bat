@echo off
set loginusername = "administrator"
for /f "tokens=3-4" %%a in ('query session %loginusername%') do @if "%%b"=="运行中" set RDP_SESSION=%%a
::echo %RDP_SESSION%
tscon %RDP_SESSION% /dest:console

