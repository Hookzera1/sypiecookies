// Arquivo principal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar aplicação
    initializeApp();
});

function initializeApp() {
    loadProducts();
    setupEventListeners();
    setupAnimations();
}

// Carregar e exibir produtos
function loadProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-cookie-bite"></i>
                <p>Nenhum produto encontrado nesta categoria.</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(productCard);
    });
}

// Criar card do produto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    // Criar badge para categorias especiais
    const getBadge = (category) => {
        const badges = {
            'veganos': { text: 'Vegano', color: '#4CAF50' },
            'sem-acucar': { text: 'Sem Açúcar', color: '#2196F3' },
            'especiais': { text: 'Especial', color: '#FF6B35' }
        };
        return badges[category] || null;
    };

    const badge = getBadge(product.category);
    const badgeHTML = badge ? 
        `<div class="product-badge" style="background: ${badge.color}">${badge.text}</div>` : '';

    card.innerHTML = `
        ${badgeHTML}
        <div class="product-image" onclick="openProductModal(${product.id})">
            ${product.emoji}
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-plus"></i>
                    Adicionar
                </button>
            </div>
        </div>
    `;

    return card;
}

// Filtrar produtos por categoria
function filterProducts(category) {
    // Atualizar botões ativos
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filtrar produtos
    loadProducts(category);
}

// Abrir modal do produto
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('modal-overlay');
    const modalContent = modal.querySelector('.modal-content');

    modalContent.innerHTML = `
        <div class="modal-image">
            ${product.emoji}
        </div>
        <div class="modal-info">
            <h2>${product.name}</h2>
            <p class="modal-description">${product.description}</p>
            
            <div class="product-details">
                <h4>Ingredientes:</h4>
                <p class="ingredients">${product.ingredients.join(', ')}</p>
                
                ${product.allergens.length > 0 ? `
                    <h4>Contém:</h4>
                    <p class="allergens">${product.allergens.join(', ')}</p>
                ` : ''}
                
                <h4>Informações Nutricionais (por unidade):</h4>
                <div class="nutritional-info">
                    <span>Calorias: ${product.nutritional.calories} kcal</span>
                    <span>Carboidratos: ${product.nutritional.carbs}g</span>
                    <span>Gorduras: ${product.nutritional.fat}g</span>
                    <span>Proteínas: ${product.nutritional.protein}g</span>
                </div>
            </div>
            
            <div class="modal-price">R$ ${product.price.toFixed(2)}</div>
            
            <div class="modal-actions">
                <div class="quantity-selector">
                    <label>Quantidade:</label>
                    <button class="quantity-btn" onclick="updateModalQuantity(-1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity" id="modal-quantity">1</span>
                    <button class="quantity-btn" onclick="updateModalQuantity(1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="modal-add-to-cart" onclick="addToCartFromModal(${product.id})">
                    <i class="fas fa-cart-plus"></i>
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Atualizar quantidade no modal
function updateModalQuantity(change) {
    const quantityElement = document.getElementById('modal-quantity');
    let quantity = parseInt(quantityElement.textContent) + change;
    quantity = Math.max(1, quantity); // Mínimo 1
    quantityElement.textContent = quantity;
}

// Adicionar ao carrinho a partir do modal
function addToCartFromModal(productId) {
    const quantity = parseInt(document.getElementById('modal-quantity').textContent);
    addToCart(productId, quantity);
    closeModal();
}

// Funções de checkout
function startCheckout() {
    if (cart.items.length === 0) {
        cart.showNotification('Seu carrinho está vazio!', 'warning');
        return;
    }
    
    const modal = document.getElementById('checkout-modal');
    updateCheckoutSummary();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focar no campo nome
    setTimeout(() => {
        document.getElementById('customer-name').focus();
    }, 300);
}

function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    
    checkoutItems.innerHTML = cart.items.map(item => `
        <div class="checkout-item">
            <span>${item.quantity}x ${item.name}</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    checkoutTotal.textContent = cart.getTotal().toFixed(2);
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Limpar campos
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
}

function confirmOrder() {
    const customerName = document.getElementById('customer-name').value.trim();
    
    if (!customerName) {
        document.getElementById('customer-name').focus();
        cart.showNotification('Por favor, digite seu nome', 'warning');
        return;
    }
    
    // Gerar senha do pedido
    const orderPassword = generateOrderPassword();
    
    // Salvar pedido
    const order = {
        id: Date.now(),
        password: orderPassword,
        customer: {
            name: customerName,
            phone: document.getElementById('customer-phone').value.trim()
        },
        items: [...cart.items],
        total: cart.getTotal(),
        timestamp: new Date().toISOString(),
        status: 'preparing'
    };
    
    saveOrder(order);
    
    // Mostrar confirmação
    showOrderConfirmation(order);
    
    // Limpar carrinho
    cart.clear();
    closeCheckoutModal();
}

function generateOrderPassword() {
    // Gerar senha sequencial baseada na data/hora e contador
    const today = new Date().toDateString();
    let orderCount = parseInt(localStorage.getItem(`orderCount_${today}`)) || 0;
    orderCount++;
    localStorage.setItem(`orderCount_${today}`, orderCount.toString());
    
    // Formatar senha com 3 dígitos
    return orderCount.toString().padStart(3, '0');
}

function saveOrder(order) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function showOrderConfirmation(order) {
    const modal = document.getElementById('order-confirmation-modal');
    
    document.getElementById('order-password').textContent = order.password;
    document.getElementById('confirmed-name').textContent = order.customer.name;
    document.getElementById('confirmed-total').textContent = order.total.toFixed(2);
    document.getElementById('confirmed-items').textContent = order.items.reduce((total, item) => total + item.quantity, 0);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Tocar som de confirmação
    playConfirmationSound();
}

function printOrder() {
    const orderPassword = document.getElementById('order-password').textContent;
    const customerName = document.getElementById('confirmed-name').textContent;
    const total = document.getElementById('confirmed-total').textContent;
    
    // Criar conteúdo para impressão
    const printContent = `
        <div style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
            <h1>🍪 S Y P I Ê Cookies </h1>
            <h2>Comprovante de Pedido</h2>
            <hr>
            <h3>Senha: ${orderPassword}</h3>
            <p><strong>Cliente:</strong> ${customerName}</p>
            <p><strong>Total:</strong> R$ ${total}</p>
            <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            <hr>
            <p><small>Guarde este comprovante para retirar seu pedido</small></p>
        </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

function newOrder() {
    const modal = document.getElementById('order-confirmation-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset da tela
    setTimeout(() => {
        window.scrollTo(0, 0);
        attendantSystem.showNotification('Pronto para um novo pedido!', 'info', 2000);
    }, 300);
}

function playConfirmationSound() {
    // Som mais elaborado para confirmação
    if (typeof(AudioContext) !== "undefined" || typeof(webkitAudioContext) !== "undefined") {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Tocar sequência de notas
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            const startTime = audioContext.currentTime + (index * 0.2);
            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + 0.4);
        });
    }
}

// Scroll suave para o menu
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Fechar modals com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeCheckoutModal();
            closeInfoModal();
            if (document.getElementById('cart-sidebar').classList.contains('open')) {
                toggleCart();
            }
        }
    });

    // Scroll do header
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Animação dos cards ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observar cards de produtos
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });

    // Validação do formulário de checkout
    const customerNameInput = document.getElementById('customer-name');
    if (customerNameInput) {
        customerNameInput.addEventListener('input', (e) => {
            const confirmBtn = document.getElementById('confirm-order-btn');
            confirmBtn.disabled = !e.target.value.trim();
        });
        
        customerNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                confirmOrder();
            }
        });
    }

    // Modo quiosque - prevenir algumas ações do usuário
    setupKioskMode();
}

// Mostrar informações da loja
function showStoreInfo() {
    const modal = document.getElementById('info-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fechar modal de informações
function closeInfoModal() {
    const modal = document.getElementById('info-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Funções globais para manipular o carrinho
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
    
    // Impedir scroll do body quando o carrinho estiver aberto
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : '';
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product, quantity);
    }
}

// Modo Quiosque para tablet
function setupKioskMode() {
    // Prevenir menu de contexto (clique direito)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Prevenir seleção de texto
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
    });

    // Prevenir arrastar
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // Prevenir zoom com gestos (em dispositivos touch)
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    });

    // Prevenir zoom duplo toque
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Auto-refresh para manter o cardápio atualizado
    setInterval(() => {
        // Aqui você pode adicionar lógica para atualizar dados
        console.log('Verificando atualizações...');
    }, 300000); // 5 minutos
}

// Configurar animações
function setupAnimations() {
    // Animação de entrada dos elementos
    const animatedElements = document.querySelectorAll('.hero-content, .section-title, .category-tabs');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.animation = `slideUp 0.8s ease-out ${index * 0.2}s forwards`;
    });
}

// Utilitários
function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function showLoading(container) {
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Busca de produtos
function searchProducts(query) {
    if (!query.trim()) {
        loadProducts();
        return;
    }

    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(query.toLowerCase())
        )
    );

    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <p>Nenhum produto encontrado para "${query}".</p>
                <button onclick="loadProducts()" class="btn-secondary">Ver todos os produtos</button>
            </div>
        `;
        return;
    }

    filtered.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(productCard);
    });
}

// Favoritos (localStorage)
class FavoriteManager {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('cookieFavorites')) || [];
    }

    toggle(productId) {
        const index = this.favorites.indexOf(productId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(productId);
        }
        this.save();
        this.updateUI();
    }

    isFavorite(productId) {
        return this.favorites.includes(productId);
    }

    save() {
        localStorage.setItem('cookieFavorites', JSON.stringify(this.favorites));
    }

    updateUI() {
        // Atualizar ícones de favorito na interface
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            btn.classList.toggle('active', this.isFavorite(productId));
        });
    }
}

const favoriteManager = new FavoriteManager();

// Adicionar estilos CSS dinâmicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .product-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
        z-index: 1;
    }

    .product-details {
        margin: 1.5rem 0;
        padding: 1rem;
        background: var(--bg-cream);
        border-radius: var(--border-radius);
    }

    .product-details h4 {
        color: var(--secondary-color);
        margin: 1rem 0 0.5rem 0;
        font-size: 1rem;
    }

    .product-details h4:first-child {
        margin-top: 0;
    }

    .ingredients, .allergens {
        color: var(--text-light);
        margin-bottom: 1rem;
        line-height: 1.4;
    }

    .nutritional-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: var(--text-light);
    }

    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem 1rem;
        color: var(--text-light);
    }

    .no-products i {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }

    .btn-secondary {
        background: var(--bg-cream);
        color: var(--secondary-color);
        border: 2px solid var(--primary-color);
        padding: 10px 20px;
        border-radius: var(--border-radius);
        cursor: pointer;
        margin-top: 1rem;
        transition: var(--transition);
    }

    .btn-secondary:hover {
        background: var(--primary-color);
        color: var(--white);
    }

    .header {
        transition: transform 0.3s ease;
    }

    @media (max-width: 768px) {
        .nutritional-info {
            grid-template-columns: 1fr;
        }
        
        .modal-actions {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
        }
        
        .quantity-selector {
            margin: 0;
            justify-content: center;
        }
    }
`;

document.head.appendChild(dynamicStyles);

// Funções do QR Code
function openQRModal() {
    const modal = document.getElementById('qrModal');
    const qrContainer = document.getElementById('qrcode');
    const urlElement = document.getElementById('qrUrl');
    
    console.log('Abrindo modal QR Code...'); // Debug
    
    // Limpar QR code anterior
    qrContainer.innerHTML = '';
    
    // Construir URL acessível para o cardápio
    let menuUrl;
    
    if (window.location.protocol === 'file:') {
        // Se estiver rodando localmente, pedir URL personalizada
        const customUrl = localStorage.getItem('cookieHeaven_customUrl');
        
        if (!customUrl) {
            const userUrl = prompt(
                'Para gerar um QR Code funcional, insira a URL onde o site será hospedado:\n\n' +
                'Exemplo: https://meusite.com.br\n' +
                'Ou: https://sypie-cookies.vercel.app\n\n' +
                'Esta URL será salva e reutilizada.',
                'https://sypie-cookies.vercel.app'
            );
            
            if (userUrl) {
                localStorage.setItem('cookieHeaven_customUrl', userUrl);
                menuUrl = userUrl + '#menu';
            } else {
                // Se cancelar, usar URL de exemplo
                menuUrl = 'https://sypie-cookies.vercel.app/#menu';
            }
        } else {
            menuUrl = customUrl + '#menu';
        }
        
        console.log('Usando URL personalizada para ambiente local');
    } else {
        // Se estiver hospedado online, usar URL real
        const baseUrl = window.location.origin + window.location.pathname;
        menuUrl = baseUrl + '#menu';
    }
    
    urlElement.textContent = menuUrl;
    console.log('URL para QR Code:', menuUrl); // Debug
    
    // Tentar usar biblioteca QRCode primeiro
    if (typeof QRCode !== 'undefined') {
        QRCode.toCanvas(qrContainer, menuUrl, {
            width: 250,
            height: 250,
            margin: 3,
            color: {
                dark: '#2c2c2c',
                light: '#ffffff'
            },
            errorCorrectionLevel: 'M'
        }, function (error) {
            if (error) {
                console.error('Erro ao gerar QR Code:', error);
                generateQRCodeFallback(qrContainer, menuUrl);
            } else {
                console.log('QR Code gerado com sucesso para:', menuUrl);
            }
        });
    } else {
        // Fallback: usar API online
        console.log('Biblioteca QRCode não encontrada, usando fallback...');
        generateQRCodeFallback(qrContainer, menuUrl);
    }
    
    // Mostrar modal
    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function generateQRCodeFallback(container, url) {
    // Usar API online para gerar QR code
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`;
    
    const img = document.createElement('img');
    img.src = qrApiUrl;
    img.alt = 'QR Code';
    img.style.borderRadius = '8px';
    img.style.maxWidth = '100%';
    
    img.onload = function() {
        console.log('QR Code carregado via API externa');
    };
    
    img.onerror = function() {
        console.error('Erro ao carregar QR Code via API');
        container.innerHTML = `
            <div style="
                background: #f0f0f0; 
                padding: 2rem; 
                border-radius: 12px; 
                text-align: center;
                border: 2px dashed #ccc;
            ">
                <p style="color: #666; margin-bottom: 1rem;">
                    <i class="fas fa-qrcode" style="font-size: 3rem; margin-bottom: 1rem;"></i><br>
                    Acesse o cardápio copiando esta URL:
                </p>
                <p style="
                    background: white; 
                    padding: 1rem; 
                    border-radius: 8px; 
                    font-family: monospace; 
                    word-break: break-all;
                    border: 1px solid #ddd;
                ">${url}</p>
            </div>
        `;
    };
    
    container.appendChild(img);
}

function closeQRModal() {
    const modal = document.getElementById('qrModal');
    modal.style.display = 'none';
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fechar modal clicando fora dele
document.addEventListener('click', function(event) {
    const modal = document.getElementById('qrModal');
    if (event.target === modal) {
        closeQRModal();
    }
});

// Função para resetar URL personalizada (para desenvolvimento)
function resetCustomUrl() {
    localStorage.removeItem('cookieHeaven_customUrl');
    alert('URL personalizada removida. Na próxima geração de QR Code, você poderá inserir uma nova URL.');
}

// Adicionar evento de duplo clique na URL para permitir alteração
document.addEventListener('DOMContentLoaded', function() {
    const urlElement = document.getElementById('qrUrl');
    if (urlElement) {
        urlElement.addEventListener('dblclick', function() {
            if (window.location.protocol === 'file:') {
                resetCustomUrl();
            }
        });
    }
});