    const products = [
        { id: 1, name: "Wireless Earbuds", price: 46.500 },
        { id: 2, name: "Smart Watch", price: 20.000 },
        { id: 3, name: "LED Ring Light", price: 33.500 },
        { id: 4, name: "Wireless Microphone", price: 10.800 },
        { id: 5, name: "USB-C Phone Cable", price: 3.000 },
        { id: 6, name: "Wireless Headphones", price: 11.000 },
        { id: 7, name: "Tripod Stand", price: 16.000 }
    ];

    let cart = [];

    const productsGrid = document.getElementById('productsGrid');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const emptyMessage = document.getElementById('emptyMessage');

    function renderProducts() {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-title">${product.name}</div>
                <div class="product-price">₦${product.price.toFixed(3)}</div>
                <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productsGrid.appendChild(card);
        });
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const cartItem = { ...product, cartInstanceId: Date.now() + Math.random() };
            cart.push(cartItem);
            updateCartUI();
        }
    };

    window.removeFromCart = function(cartInstanceId) {
        cart = cart.filter(item => item.cartInstanceId !== cartInstanceId);
        updateCartUI();
    };

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.appendChild(emptyMessage);
            emptyMessage.style.display = 'block';
            cartTotalElement.textContent = '₦0.00';
            return;
        }

        emptyMessage.style.display = 'none';
        let total = 0;

        cart.forEach(item => {
            total += item.price;

            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.name}</strong><br>
                    ₦${item.price.toFixed(3)}
                </div>
                <button class="btn-remove" onclick="removeFromCart(${item.cartInstanceId})">Remove</button>
            `;
            cartItemsContainer.appendChild(li);
        });

        cartTotalElement.textContent = `₦${total.toFixed(3)}`;
    }

    renderProducts();