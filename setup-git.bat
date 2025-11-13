@echo off
echo ========================================
echo   Setup Git para Sypie Cookies
echo ========================================
echo.

echo [1/4] Verificando se Git está instalado...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git não está instalado!
    echo.
    echo Por favor, instale o Git primeiro:
    echo 1. Acesse: https://git-scm.com/downloads
    echo 2. Baixe e instale o Git para Windows
    echo 3. Reinicie o prompt de comando
    echo 4. Execute este script novamente
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Git instalado!
    git --version
)

echo.
echo [2/4] Configurando repositório local...
if exist .git (
    echo ✅ Repositório já existe
) else (
    git init
    echo ✅ Repositório inicializado
)

echo.
echo [3/4] Adicionando arquivos...
git add .
echo ✅ Arquivos adicionados

echo.
echo [4/4] Fazendo commit inicial...
git commit -m "Initial commit - Sypie Cookies website"
echo ✅ Commit realizado

echo.
echo ========================================
echo   Repositório local configurado!
echo ========================================
echo.
echo Próximos passos:
echo 1. Crie um repositório no GitHub
echo 2. Execute: git remote add origin [URL_DO_SEU_REPO]
echo 3. Execute: git push -u origin main
echo.
echo Exemplo:
echo git remote add origin https://github.com/Hookzera1/sypiecookies.git
echo git push -u origin main
echo.
pause