# Sypiê Cookies - Cardápio Digital 📱🍪

Um cardápio digital completo para loja de cookies artesanais, com sistema de carrinho, checkout e QR Code para acesso mobile.

## 🚀 Deploy ao Vivo

**URL de Produção:** [https://sypie-cookies.vercel.app](https://sypie-cookies.vercel.app)

## 🎯 Funcionalidades Principais

### 🛒 Sistema de Carrinho Completo
- Carrinho lateral deslizante
- Adicionar/remover produtos
- Controle de quantidade
- Persistência com localStorage
- Checkout com dados do cliente

### 🔢 Sistema de Senhas
- Geração automática e sequencial
- Modal de confirmação com número da senha
- Controle de pedidos organizado

### 📱 QR Code Integrado
- Botão para gerar QR Code
- Acesso direto ao cardápio via celular
- API externa com fallback garantido

### 🍪 Catálogo de Produtos
- **12 variedades** de cookies artesanais
- **Interface touch-friendly** com botões grandes
- **Categorização visual** com ícones intuitivos
- **Informações detalhadas** em modals grandes:
  - Ingredientes completos
  - Alérgenos destacados
  - Informações nutricionais
  - Preços em destaque

### � Sistema de Atendimento
- **Botão "Chamar Atendente"** sempre visível
- **Notificação sonora** quando atendente é chamado
- **Modal de confirmação** tranquilizando o cliente
- **Informações da loja** facilmente acessíveis

### 🔒 Modo Quiosque
- **Prevenção de navegação** para fora do cardápio
- **Timeout de inatividade** que oferece ajuda
- **Prevenção de gestos** (zoom, seleção de texto)
- **Analytics de uso** para melhorar o cardápio

### 🎨 Design Otimizado para Tablet
- **Botões grandes** (mínimo 44px) para touch
- **Contrastes altos** para facilitar leitura
- **Animações suaves** que guiam a navegação
- **Layout responsivo** para tablets de diferentes tamanhos

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com:
  - CSS Grid e Flexbox
  - Animações e transições
  - Variáveis CSS (Custom Properties)
  - Media queries para responsividade
- **JavaScript ES6+** - Funcionalidades dinâmicas:
  - Classes ES6
  - LocalStorage
  - Intersection Observer API
  - Event delegation

## 📂 Estrutura do Projeto

```
Cookie Heaven/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos principais
├── js/
│   ├── main.js           # JavaScript principal
│   ├── cart.js           # Sistema de carrinho
│   └── products.js       # Dados dos produtos
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 🛠️ Como Configurar o Tablet

### 1. **Instalação Básica**
1. Abra `index.html` no navegador do tablet
2. Configure o navegador em **modo tela cheia** (F11)
3. Desative notificações e atualizações automáticas
4. Fixe o tablet em posição acessível no balcão

### 2. **Configurações Recomendadas**
- **Resolução**: Otimizado para 1024x768 ou superior
- **Orientação**: Landscape (horizontal) preferível
- **Navegador**: Chrome, Firefox ou Safari atualizados
- **Conexão**: WiFi estável para carregamento de fontes

### 3. **Modo Quiosque Avançado** (Opcional)
Para máxima segurança, use extensões como:
- **Kiosk Mode** para Chrome
- **SiteKiosk** para Windows
- **Guided Access** para iPad

## 💡 Como Usar na Loja

### Para Clientes:
1. **Toque para explorar** - Interface intuitiva
2. **Veja detalhes** - Toque em qualquer cookie
3. **Chame atendente** - Botão sempre visível
4. **Finalize pedido** - Atendente anota o pedido

### Para Funcionários:
- **Som de notificação** indica chamada de cliente
- **Analytics simples** no console do navegador
- **Reset fácil** para limpeza de dados

## 🔧 Personalização para Sua Loja

### 1. **Informações da Loja**
Edite em `index.html` (linhas 140-180):
```html
<p>Telefone: SEU_TELEFONE</p>
<p>E-mail: SEU_EMAIL</p>
<p>Endereço: SEU_ENDEREÇO</p>
```

### 2. **Produtos e Preços**  
Edite `js/products.js` para:
- Alterar preços
- Modificar descrições
- Adicionar/remover produtos
- Atualizar ingredientes

### 3. **Cores e Visual**
Modifique as variáveis CSS em `css/style.css`:
```css
:root {
    --primary-color: SUA_COR_PRIMARIA;
    --accent-color: SUA_COR_DESTAQUE;
}
```

## 🍪 Produtos Disponíveis

### Clássicos
- Cookie de Chocolate Chip
- Cookie de Aveia e Passas  
- Cookie Double Chocolate

### Especiais
- Cookie Red Velvet
- Cookie de Nutella
- Cookie Gourmet de Pistache
- Cookie de Limão Siciliano

### Veganos
- Cookie Vegano de Banana
- Cookie Vegano de Cacau
- Cookie Vegano de Chia

### Sem Açúcar
- Cookie Sem Açúcar de Amêndoas
- Cookie Sem Açúcar de Coco

## � Analytics e Monitoramento

O sistema inclui analytics básicas para entender o comportamento dos clientes:

```javascript
// No console do navegador
attendantSystem.showAnalytics();

// Saída exemplo:
// 📊 Analytics do Cardápio Digital:
// 👥 Visitas: 47
// 📈 Categorias mais vistas: {Especiais: 23, Clássicos: 15}
// 🍪 Produtos mais vistos: {3: 12, 1: 8, 7: 6}
```

### Reset do Sistema
Para limpar dados acumulados:
```javascript
resetKioskSystem(); // Limpa tudo e recarrega
```

## 🚨 Solução de Problemas

### **Tablet Travado ou Lento**
- Reinicie o navegador
- Limpe cache e cookies
- Verifique conexão WiFi

### **Som de Notificação não Toca**
- Verifique se o áudio não está mutado
- Alguns navegadores precisam de interação prévia
- Teste tocando na tela antes

### **Clientes Saem do Cardápio**
- Configure modo quiosque do navegador
- Use tablet com launcher específico
- Considere fixação física da interface

## 🎯 Funcionalidades Futuras

- [ ] **Integração com PDV** (Point of Sale)
- [ ] **Sistema de senhas** para chamada de atendentes
- [ ] **Dashboard admin** para analytics detalhadas  
- [ ] **Personalização** por horário/sazonalidade
- [ ] **Multi-idiomas** para turistas
- [ ] **Acessibilidade** para deficientes visuais

## 📞 Suporte Técnico

Para dúvidas sobre implementação:
- ✅ Compatibilidade com tablets modernos
- ✅ Suporte offline (após primeiro carregamento)
- ✅ Backup automático de dados no localStorage
- ✅ Performance otimizada para uso intensivo

---

**💡 Dica Pro**: Para melhor experiência, posicione o tablet em altura acessível (80-100cm) e com boa iluminação ambiente!