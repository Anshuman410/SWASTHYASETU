@echo off
echo ==========================================
echo   Pushing SWASTHYASETU Updates to GitHub
echo ==========================================

set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"

git add .
git commit -m "UI: Make Register Patient form modal significantly wider and spacious with 2xl size and improved paddings"
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
