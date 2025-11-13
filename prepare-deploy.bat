@echo off
echo ========================================
echo   Preparando Sypiê Cookies para Deploy
echo ========================================
echo.

echo [1/3] Verificando arquivos principais...
if exist index.html (
    echo ✓ index.html encontrado
) else (
    echo ✗ index.html não encontrado!
    pause
    exit /b 1
)

if exist css\style.css (
    echo ✓ style.css encontrado
) else (
    echo ✗ style.css não encontrado!
    pause
    exit /b 1
)

if exist js\main.js (
    echo ✓ main.js encontrado
) else (
    echo ✗ main.js não encontrado!
    pause
    exit /b 1
)

echo.
echo [2/3] Verificando assets...
if exist logo.svg (
    echo ✓ logo.svg encontrado
) else (
    echo ⚠ logo.svg não encontrado
)

if exist fundosypie.jpg (
    echo ✓ fundosypie.jpg encontrado
) else (
    echo ⚠ fundosypie.jpg não encontrado
)

echo.
echo [3/3] Arquivo de configuração...
if exist vercel.json (
    echo ✓ vercel.json criado
) else (
    echo ⚠ vercel.json não encontrado
)

echo.
echo ========================================
echo   Projeto pronto para deploy!
echo ========================================
echo.
echo Próximos passos:
echo 1. Acesse: https://vercel.com
echo 2. Faça login/cadastro
echo 3. Clique em "New Project"
echo 4. Arraste esta pasta ou conecte ao Git
echo 5. Deploy automático!
echo.
pause