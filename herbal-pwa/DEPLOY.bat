@echo off
setlocal enabledelayedexpansion

echo ================================================================
echo   HERBAL PWA - ISANG-CLICK NA DEPLOY SCRIPT
echo ================================================================
echo.
echo Ito ay awtomatikong:
echo   1. Kokopyahin ang bagong index.html papunta sa git folder mo
echo   2. Magsasagawa ng git add / commit / push
echo   3. Magde-deploy papunta sa Netlify (herbalbscs.netlify.app)
echo.

REM ============================================================
REM  IMPORTANT: i-edit ang linya sa baba kung IBA ang lokasyon
REM  ng iyong git-cloned na "herbal-pwa" folder sa Desktop mo.
REM ============================================================
set TARGET=%USERPROFILE%\Desktop\herbal-plant-is-pwa\herbal-pwa

echo Target folder: %TARGET%
echo.

if not exist "%TARGET%\index.html" (
    echo [ERROR] Hindi nahanap ang %TARGET%\index.html
    echo Siguraduhing tama ang path sa itaas, o i-edit ang DEPLOY.bat file na ito.
    pause
    exit /b 1
)

echo [1/5] Kinokopya ang bagong index.html...
copy /Y "%~dp0index.html" "%TARGET%\index.html" >nul
if errorlevel 1 (
    echo [ERROR] Hindi na-copy ang index.html. I-check kung tama ang path.
    pause
    exit /b 1
)
echo       Tapos na ang pagkopya.
echo.

cd /d "%TARGET%"

echo [2/5] Git add...
git add index.html

echo [3/5] Git commit...
git commit -m "Update: compare mode, bookmark sync fix, not-herbal detection, symptom search"
if errorlevel 1 (
    echo       (Walang bagong pagbabago na na-detect ni Git - baka na-deploy na ito dati.)
)

echo [4/5] Git push papunta sa GitHub...
git push origin main
if errorlevel 1 (
    echo [ERROR] Nabigo ang git push. Baka kailangan mo ng Personal Access Token.
    pause
    exit /b 1
)
echo.

echo [5/5] Netlify deploy...
call netlify deploy --prod
echo.

echo ================================================================
echo   TAPOS NA! I-check ang https://herbalbscs.netlify.app
echo   (Buksan sa incognito window para sigurado hindi cached)
echo ================================================================
pause
