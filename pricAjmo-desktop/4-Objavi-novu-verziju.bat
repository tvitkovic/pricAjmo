@echo off
cd /d "%~dp0"
title pricAjmo - objava nove verzije (auto-update)
echo ================================================
echo   pricAjmo - objava nove verzije na GitHub
echo ================================================
echo.
echo Ovime objavljujes novu verziju koju korisnici
echo dobivaju AUTOMATSKI (preko auto-update-a).
echo.
echo Treba ti GitHub token (vidi: KAKO-NAPRAVITI-GITHUB-TOKEN.txt).
echo.
if "%GH_TOKEN%"=="" (
  echo Zalijepi svoj GitHub token pa pritisni Enter.
  echo ^(Zalijepi desnim klikom misa ili Ctrl+V.^)
  set /p GH_TOKEN=GitHub token: 
)
echo.
echo [1/3] Povecavam broj verzije...
call npm version patch --no-git-tag-version
echo.
echo [2/3] Gradim i objavljujem na GitHub Releases...
call npm run publish:win
echo.
echo [3/3] Spremam promjenu na GitHub (git)...
git add -A
git commit -m "Objava nove verzije"
git push
echo.
echo ================================================
echo Gotovo! Ako iznad nema crvenih gresaka, nova
echo verzija je objavljena. Korisnici ce je dobiti
echo automatski kad sljedeci put otvore pricAjmo.
echo ================================================
pause
