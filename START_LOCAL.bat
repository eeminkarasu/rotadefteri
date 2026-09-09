@echo off
chcp 65001 >nul
where py >nul 2>nul
if not errorlevel 1 (
  start "" http://localhost:8080/
  py -m http.server 8080
  exit /b
)
where python >nul 2>nul
if not errorlevel 1 (
  start "" http://localhost:8080/
  python -m http.server 8080
  exit /b
)
echo Python bulunamadi. Firebase Hosting kullanmaniz onerilir.
pause
