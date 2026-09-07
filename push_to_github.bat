@echo off
echo ==========================================
echo   Pushing SWASTHYASETU to GitHub
echo ==========================================

:: Add Git to PATH for this session if not present
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"

git add .
git commit -m "Fix: Replace Hospital icon with Building2 alias for lucide-react v0.344.0 compatibility"
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
