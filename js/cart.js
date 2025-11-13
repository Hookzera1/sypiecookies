// Sistema de Carrinho de Compras para Tablet
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cookieCart')) || [];
        this.updateCartUI();
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${product.name} adicionado ao carrinho!`, 'success');
        
        // Abrir carrinho automaticamente se estiver vazio
        if (this.items.length === 1 && quantity === 1) {
            setTimeout(() => {
                if (!document.getElementById('cart-sidebar').classList.contains('open')) {
                    toggleCart();
                }
            }, 500);
        }
    }

    removeItem(productId) {
        const removedItem = this.items.find(item => item.id === productId);
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        
        if (removedItem) {
            this.showNotification(`${removedItem.name} removido do carrinho`, 'info');
        }
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }

    saveCart() {
        localStorage.setItem('cookieCart', JSON.stringify(this.items));
    }

    updateCartUI() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.getTotalItems();
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        
        // Animar o contador quando items são adicionados
        if (totalItems > 0) {
            cartCount.style.animation = 'pulse 0.3s ease-out';
            setTimeout(() => {
                cartCount.style.animation = '';
            }, 300);
        }
    }

    updateCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Seu carrinho está vazio</p>
                    <small>Adicione alguns cookies deliciosos!</small>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    ${item.emoji}
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)} cada</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})" title="Diminuir quantidade">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})" title="Aumentar quantidade">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="item-total">
                        <strong>Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                </div>
                <button class="remove-item" onclick="cart.removeItem(${item.id})" title="Remover item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    updateCartTotal() {
        const cartTotal = document.getElementById('cart-total');
        const checkoutBtn = document.querySelector('.checkout-btn');
        const total = this.getTotal();
        
        cartTotal.textContent = total.toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
        
        // Destacar o total com animação se houver items
        if (this.items.length > 0) {
            cartTotal.parentElement.style.animation = 'highlight 0.5s ease-out';
            setTimeout(() => {
                cartTotal.parentElement.style.animation = '';
            }, 500);
        }
    }

    showNotification(message, type = 'info') {
        // Remove notificação existente se houver
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;

        // Cores baseadas no tipo
        const colors = {
            success: 'linear-gradient(135deg, #4CAF50, #45a049)',
            warning: 'linear-gradient(135deg, #FF9800, #F57C00)',
            info: 'linear-gradient(135deg, #2196F3, #1976D2)',
            error: 'linear-gradient(135deg, #F44336, #D32F2F)'
        };

        // Adicionar estilos dinâmicos
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            z-index: 1003;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
            max-width: 350px;
            font-size: 1rem;
        `;

        document.body.appendChild(notification);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getOrderSummary() {
        return {
            items: this.items,
            total: this.getTotal(),
            itemCount: this.getTotalItems(),
            timestamp: new Date().toISOString()
        };
    }
}

// Inicializar carrinho
const cart = new ShoppingCart();

// Sistema de Pedidos e Senhas
class OrderManager {
    constructor() {
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
        this.initializeOrderCounter();
    }

    initializeOrderCounter() {
        // Inicializar contador do dia se necessário
        const today = new Date().toDateString();
        if (!localStorage.getItem(`orderCount_${today}`)) {
            localStorage.setItem(`orderCount_${today}`, '0');
        }
    }

    createOrder(customer, cartItems) {
        const orderPassword = this.generateOrderPassword();
        
        const order = {
            id: Date.now(),
            password: orderPassword,
            customer: customer,
            items: [...cartItems],
            total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            timestamp: new Date().toISOString(),
            status: 'preparing',
            estimatedTime: this.calculateEstimatedTime(cartItems)
        };

        this.orders.push(order);
        this.saveOrders();
        
        return order;
    }

    generateOrderPassword() {
        const today = new Date().toDateString();
        let orderCount = parseInt(localStorage.getItem(`orderCount_${today}`)) || 0;
        orderCount++;
        localStorage.setItem(`orderCount_${today}`, orderCount.toString());
        
        return orderCount.toString().padStart(3, '0');
    }

    calculateEstimatedTime(items) {
        // Calcular tempo estimado baseado na quantidade de itens
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const baseTime = 10; // 10 minutos base
        const additionalTime = Math.floor(totalItems / 6) * 5; // 5 min extras a cada 6 cookies
        
        return baseTime + additionalTime;
    }

    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    getTodayOrders() {
        const today = new Date().toDateString();
        return this.orders.filter(order => 
            new Date(order.timestamp).toDateString() === today
        );
    }

    getOrderByPassword(password) {
        return this.orders.find(order => order.password === password);
    }
}

// Inicializar gerenciador de pedidos
const orderManager = new OrderManager();

// Adicionar estilos CSS para as animações
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    @keyframes highlight {
        0% { background: var(--bg-cream); }
        50% { background: #FFE0B2; }
        100% { background: var(--bg-cream); }
    }

    .item-total {
        margin-top: 0.5rem;
        color: var(--accent-color);
        font-size: 0.95rem;
    }

    .cart-count {
        animation: none !important;
    }

    /* Melhorar responsividade do carrinho */
    @media (max-width: 768px) {
        .cart-sidebar {
            width: 100%;
            right: -100%;
        }
        
        .cart-item {
            padding: 1rem 0;
        }
        
        .cart-item-image {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
        }
        
        .quantity-controls {
            gap: 0.5rem;
        }
        
        .quantity-btn {
            width: 32px;
            height: 32px;
            font-size: 0.9rem;
        }
    }
`;

document.head.appendChild(cartStyles);