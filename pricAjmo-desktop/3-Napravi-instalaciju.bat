@echo off
cd /d "%~dp0"
title pricAjmo - izrada instalacije (.exe)
echo ================================================
echo   pricAjmo - izrada instalacijske datoteke
echo ================================================
echo.
echo Gradi .exe u podmapi "dist". Koristi ovo kad
echo zelis datoteku poslati kolegama (npr. Google Drive),
echo BEZ automatskog azuriranja.
echo.
call npm run dist:win
echo.
echo Gotovo. Instalaciju potrazi u podmapi: dist
pause
