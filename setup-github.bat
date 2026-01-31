@echo off
echo ============================================
echo CivikLink SL - GitHub Setup Script
echo ============================================
echo.

REM Get GitHub username
set /p GITHUB_USER="Enter your GitHub username: "

REM Get repository name
set /p REPO_NAME="Enter repository name (default: civiklink): "
if "%REPO_NAME%"=="" set REPO_NAME=civiklink

echo.
echo ============================================
echo Setting up remote repository...
echo ============================================

REM Add remote origin
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git

REM Verify remote was added
git remote -v

echo.
echo ============================================
echo Pushing code to GitHub...
echo ============================================

REM Push to GitHub
git branch -M main
git push -u origin main

echo.
echo ============================================
echo SUCCESS! Repository pushed to GitHub
echo ============================================
echo.
echo Repository URL: https://github.com/%GITHUB_USER%/%REPO_NAME%
echo.
echo Next steps:
echo 1. Go to: https://github.com/%GITHUB_USER%/%REPO_NAME%/settings/access
echo 2. Click "Add people"
echo 3. Add collaborators:
echo    - 2001zaz
echo    - NuzrathR
echo.
pause
