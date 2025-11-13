# 🚀 Git + Vercel Deploy - Sypiê Cookies

## 📋 Opção 1: Instalar Git (Recomendado)

### 1. Baixar e Instalar Git
1. **Acesse:** https://git-scm.com/downloads
2. **Baixe:** Git for Windows (64-bit)
3. **Instale:** Aceite as configurações padrão
4. **Reinicie:** O prompt de comando

### 2. Configurar Git (Primeira vez)
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### 3. Executar Setup
```bash
cd "D:\sypie projeto"
.\setup-git.bat
```

### 4. Conectar ao GitHub
```bash
git remote add origin https://github.com/Hookzera1/sypiecookies.git
git push -u origin main
```

---

## 📁 Opção 2: Upload Manual (Mais Rápido)

### 1. Preparar Arquivos
1. **Compacte** a pasta `sypie projeto` em ZIP
2. **Ou** selecione todos os arquivos da pasta

### 2. GitHub Upload
1. **Acesse:** https://github.com/Hookzera1/sypiecookies
2. **Clique:** "uploading an existing file"
3. **Arraste:** Todos os arquivos ou o ZIP
4. **Commit:** "Initial commit - Sypie Cookies website"

### 3. Arquivos para Upload:
```
✓ index.html
✓ css/style.css
✓ js/main.js
✓ js/cart.js
✓ js/products.js
✓ logo.svg
✓ fundosypie.jpg
✓ vercel.json
✓ package.json
✓ README.md
✓ .gitignore
```

---

## 🌐 Opção 3: GitHub Desktop (Interface Visual)

### 1. Baixar GitHub Desktop
- **Acesse:** https://desktop.github.com
- **Instale** e faça login

### 2. Adicionar Repositório
- **File** → **Add Local Repository**
- **Selecione** a pasta `sypie projeto`
- **Create Repository**

### 3. Commit e Push
- **Escreva** commit message: "Initial commit"
- **Commit to main**
- **Publish repository** (conecta ao GitHub)

---

## 🚀 Depois no Vercel

### 1. Conectar GitHub
1. **Vercel:** https://vercel.com
2. **New Project**
3. **Import Git Repository**
4. **Selecione:** sypiecookies
5. **Deploy**

### 2. Configurações Automáticas
- ✅ **Framework:** Static
- ✅ **Build:** Automático
- ✅ **Domain:** sypiecookies.vercel.app

---

## ⚡ Método Mais Rápido (Recomendado Agora)

### Upload Direto para Vercel
1. **Vercel:** https://vercel.com
2. **New Project**
3. **Browse All** → **Import from Archive**
4. **Arraste** a pasta `sypie projeto`
5. **Deploy** → Pronto em 30s!

---

## 🔧 Comandos Git (Quando Instalado)

```bash
# Navegar para a pasta
cd "D:\sypie projeto"

# Inicializar repositório
git init

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Sypie Cookies website"

# Conectar ao GitHub
git remote add origin https://github.com/Hookzera1/sypiecookies.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

## ✅ Status Atual

Seu projeto está **100% pronto** para qualquer método!
Escolha a opção mais confortável para você. 🍪