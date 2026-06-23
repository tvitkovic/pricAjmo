@echo off
cd /d "%~dp0"
title pricAjmo - instalacija alata
echo ================================================
echo   pricAjmo - instalacija potrebnih alata
echo ================================================
echo.
echo Ovo pokreni JEDNOM (ili nakon nove verzije koja
echo donosi nove pakete). Preuzima Electron i alate.
echo.
call npm install
echo.
echo Gotovo. Ako nema crvenih gresaka, sve je spremno.
pause
