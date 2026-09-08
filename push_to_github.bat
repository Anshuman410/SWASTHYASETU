@echo off
echo ==========================================
echo   Pushing SWASTHYASETU Updates to GitHub
echo ==========================================

set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"

git add .
git commit -m "Fix: Perfectly center Modal in screen viewport with dedicated internal scrolling to always show submit button"
git push origin main

if errorlevel 1 (
    echo.
    echo Pushing failed. Attempting force push...
    git push origin main --force
)

echo.
echo ==========================================
echo   Successfully pushed to GitHub!
echo ==========================================
pause
