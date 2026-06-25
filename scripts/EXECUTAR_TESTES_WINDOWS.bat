@echo off
REM 🚀 GUIA PARA WINDOWS - EXECUTAR TESTES PLAYWRIGHT
REM Login-Att | Maio 2026

setlocal enabledelayedexpansion

cls
echo.
echo ===========================================================
echo   ^|^|  PLANO DE TESTES - APLICACAO LOGIN-ATT (WINDOWS)
echo ===========================================================
echo.

echo [INFO] Antes de executar os testes, certifique-se:
echo.
echo 1. ABRA TRES TERMINAIS PowerShell SEPARADOS:
echo.
echo    Terminal 1 - EXPO SERVER:
echo    ^> npm start
echo    (Deixe rodando. Aguarde opcoes de plataforma)
echo.
echo    Terminal 2 - JSON SERVER:
echo    ^> npx json-server --watch data/data/bancoDeDados.json --port 3000
echo    (Deixe rodando. Aguarde: "JSON Server is running")
echo.
echo    Terminal 3 - TESTES (este arquivo):
echo    ^> scripts/EXECUTAR_TESTES_WINDOWS.bat
echo.
echo ===========================================================
echo.

echo [DADOS DE TESTE]
echo.
echo  Usuarios disponiveis:
echo    - Username: admin   / Password: 123
echo    - Username: Maria   / Password: 456
echo.

echo ===========================================================
echo   MENU DE OPCOES - ESCOLHA O QUE DESEJA FAZER
echo ===========================================================
echo.
echo   1 - Executar TODOS os testes
echo   2 - Executar apenas testes de LOGIN
echo   3 - Executar apenas testes de TAREFAS
echo   4 - Executar apenas testes de NAVEGACAO
echo   5 - Executar apenas testes de PERFORMANCE
echo   6 - Testar: ENTRAR COM USUARIO INVALIDO
echo   7 - Testar: ADICIONAR NOVA TAREFA
echo   8 - Testar: EDITAR TAREFA EXISTENTE
echo   9 - Testar: MARCAR TAREFA COMO CONCLUIDA
echo  10 - Executar em MODO DEBUG (interativo)
echo  11 - Executar em MODO HEADED (ver o browser)
echo  12 - Ver RELATORIO HTML
echo   0 - Sair
echo.
set /p choice="Digite a opcao desejada (0-12): "

if "%choice%"=="1" goto teste_todos
if "%choice%"=="2" goto teste_login
if "%choice%"=="3" goto teste_tarefas
if "%choice%"=="4" goto teste_navegacao
if "%choice%"=="5" goto teste_performance
if "%choice%"=="6" goto teste_invalido
if "%choice%"=="7" goto teste_adicionar
if "%choice%"=="8" goto teste_editar
if "%choice%"=="9" goto teste_concluir
if "%choice%"=="10" goto teste_debug
if "%choice%"=="11" goto teste_headed
if "%choice%"=="12" goto relatorio
if "%choice%"=="0" goto sair
echo Opcao invalida!
goto menu

:teste_todos
cls
echo.
echo [EXECUTANDO] Todos os testes...
echo.
npx playwright test tests/login-tarefas.spec.ts
pause
goto menu

:teste_login
cls
echo.
echo [EXECUTANDO] Apenas testes de LOGIN
echo.
npx playwright test tests/login-tarefas.spec.ts -g "Testes de Login"
pause
goto menu

:teste_tarefas
cls
echo.
echo [EXECUTANDO] Apenas testes de TAREFAS
echo.
npx playwright test tests/login-tarefas.spec.ts -g "Testes de Gerenciamento de Tarefas"
pause
goto menu

:teste_navegacao
cls
echo.
echo [EXECUTANDO] Apenas testes de NAVEGACAO
echo.
npx playwright test tests/login-tarefas.spec.ts -g "Testes de Navegacao"
pause
goto menu

:teste_performance
cls
echo.
echo [EXECUTANDO] Apenas testes de PERFORMANCE
echo.
npx playwright test tests/login-tarefas.spec.ts -g "Testes de Performance"
pause
goto menu

:teste_invalido
cls
echo.
echo [EXECUTANDO] Teste: Entrar com usuario invalido
echo.
npx playwright test tests/login-tarefas.spec.ts -g "Falha ao entrar com usuario invalido"
pause
goto menu

:teste_adicionar
cls
echo.
echo [EXECUTANDO] Teste: Adicionar nova tarefa
echo.
npx playwright test tests/login-tarefas.spec.ts -g "Adicionar nova tarefa com sucesso"
pause
goto menu

:teste_editar
cls
echo.
echo [EXECUTANDO] Teste: Editar tarefa existente
echo.
npx playwright test tests/login-tarefas.spec.ts -g "Editar tarefa existente"
pause
goto menu

:teste_concluir
cls
echo.
echo [EXECUTANDO] Teste: Marcar tarefa como concluida
echo.
npx playwright test tests/login-tarefas.spec.ts -g "Marcar tarefa como concluida"
pause
goto menu

:teste_debug
cls
echo.
echo [EXECUTANDO] Teste em MODO DEBUG (interativo)
echo.
echo Dicas:
echo   - Clique em elementos para ver seletores
echo   - Use console para executar JS
echo   - Feche browser para continuar
echo.
npx playwright test tests/login-tarefas.spec.ts --debug
pause
goto menu

:teste_headed
cls
echo.
echo [EXECUTANDO] Teste em MODO HEADED (visualizar browser)
echo.
npx playwright test tests/login-tarefas.spec.ts --headed
pause
goto menu

:relatorio
cls
echo.
echo [GERANDO] Relatorio HTML dos ultimos testes
echo.
npx playwright show-report
pause
goto menu

:sair
cls
echo.
echo Ate logo! 👋
echo.
pause
exit /b 0

REM Voltar ao menu
:menu
cls
echo ===========================================================
echo   MENU DE OPCOES - ESCOLHA O QUE DESEJA FAZER
echo ===========================================================
echo.
echo   1 - Executar TODOS os testes
echo   2 - Executar apenas testes de LOGIN
echo   3 - Executar apenas testes de TAREFAS
echo   4 - Executar apenas testes de NAVEGACAO
echo   5 - Executar apenas testes de PERFORMANCE
echo   6 - Testar: ENTRAR COM USUARIO INVALIDO
echo   7 - Testar: ADICIONAR NOVA TAREFA
echo   8 - Testar: EDITAR TAREFA EXISTENTE
echo   9 - Testar: MARCAR TAREFA COMO CONCLUIDA
echo  10 - Executar em MODO DEBUG (interativo)
echo  11 - Executar em MODO HEADED (ver o browser)
echo  12 - Ver RELATORIO HTML
echo   0 - Sair
echo.
set /p choice="Digite a opcao desejada (0-12): "

if "%choice%"=="1" goto teste_todos
if "%choice%"=="2" goto teste_login
if "%choice%"=="3" goto teste_tarefas
if "%choice%"=="4" goto teste_navegacao
if "%choice%"=="5" goto teste_performance
if "%choice%"=="6" goto teste_invalido
if "%choice%"=="7" goto teste_adicionar
if "%choice%"=="8" goto teste_editar
if "%choice%"=="9" goto teste_concluir
if "%choice%"=="10" goto teste_debug
if "%choice%"=="11" goto teste_headed
if "%choice%"=="12" goto relatorio
if "%choice%"=="0" goto sair
echo Opcao invalida!
goto menu
