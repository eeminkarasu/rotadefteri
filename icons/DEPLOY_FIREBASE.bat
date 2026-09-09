@echo off
chcp 65001 >nul
where firebase >nul 2>nul
if errorlevel 1 (
  echo Firebase CLI bulunamadi.
  echo Once Node.js kurun, sonra: npm install -g firebase-tools
  pause
  exit /b 1
)
firebase login
if errorlevel 1 (
  pause
  exit /b 1
)
firebase use rotadefteri-1a9d1
firebase deploy --only hosting,firestore:rules
pause
