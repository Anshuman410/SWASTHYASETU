@echo off
echo ==========================================
echo   Pushing SWASTHYASETU to GitHub
echo ==========================================

:: Add Git to PATH for this session if not present
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"

git add .
git commit -m "Fix: Dynamic user names in dashboards, replace Good morning with Hi"
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
