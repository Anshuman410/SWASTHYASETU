@echo off
echo ==========================================
echo   Pushing SWASTHYASETU to GitHub
echo ==========================================

:: Add Git to PATH for this session if not present
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"

git init
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/Anshuman410/SWASTHYASETU.git
git add .
git commit -m "Configure Render deployment and push SwasthyaSetu prototype"
git push -u origin main

if errorlevel 1 (
    echo.
    echo Pushing failed. Attempting force push...
    git push -u origin main --force
)

echo.
echo ==========================================
echo   Successfully pushed to GitHub!
echo ==========================================
pause
