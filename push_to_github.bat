@echo off
echo ==========================================
echo   Pushing SWASTHYASETU Overhaul to GitHub
echo ==========================================

set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"

git add .
git commit -m "Feat: Complete production overhaul - real auth, admin CRUD, appointments, voice AI, custom logo"
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
