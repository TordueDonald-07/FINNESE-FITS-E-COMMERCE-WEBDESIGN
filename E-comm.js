
let ArrProducts = [
    {   id: 1, 
        name: "Shot And Shirt Sets Black Color",
        brand: "adddis", 
        image: "Black Color.jpg", 
        price: "90.98", 
        rating: 5 
    },
    {   id: 2, 
        name: "Shot And Shirt Sets Brown Color",
        brand: "adddis", 
        image: "Brown Color.png",
        price: "100.00", 
        rating: 5 
    },
    {   id: 3, 
        name: "Trouser And Shirt Sets Pink Color",
        brand: "adddis", 
        image: "Crop Top Pink Color.jpg", 
        price: "120.96", 
        rating: 5 
    },
    {   id: 4, 
        name: "Shot And Shirt Sets Yellow Color",
        brand: "adddis", 
        image: "Pink Color.png", 
        price: "210.80", 
        rating: 5 
    },
    {   id: 5, 
        name: "Shot And Shirt Sets Black/White Color",
        brand: "adddis", 
        image: "Shot Black Color.jpg", 
        price: "110.11", 
        rating: 5 
    },
    {   id: 6, 
        name: "Shot And Shirt Up & Down Green Color",
        brand: "adddis", 
        image: "Trouser Brown Color.jpg", 
        price: "30.00", 
        rating: 5 
    },
    {   id: 7, 
        name: "Trouser And Shirt Sets Brown Color",
        brand: "adddis", 
        image: "Up & Down Green Color.jpg", price: "150.98", 
        rating: 5 
    },
    {   id: 8, 
        name: "Crop Top Plus Trouser Pink Color",
        brand: "adddis",
        image: "Yellow Color.jpg", 
        price: "800.00", 
        rating: 5 
    },

    {   id: 9, 
        name: "Shot And Shirt Sets milk Color",
        brand: "adddis", 
        image: "milk Color.jpg", 
        price: "110.11", 
        rating: 5 
    },
    {   id: 10, 
        name: "Shot And Shirt Up & Down purple Color",
        brand: "adddis", 
        image: "purple Color.jpg", 
        price: "30.00", 
        rating: 5 
    },
    {   id: 10, 
        name: "Trouser And Shirt Sets Ash Color",
        brand: "adddis", 
        image: "ash Color.jpg",
        price: "150.98", 
        rating: 5 
    },
    {   id: 12, 
        name: "Sanate Wear Trouser white Color",
        brand: "adddis",
        image: "sanate Color.jpg", 
        price: "800.00", 
        rating: 5 
    },
];

const body = document.querySelector("body"),
products = document.querySelector(".pro-container"),
shoppingBasket = document.querySelector(".shoppingBasket"),
productList = document.querySelector(".productList"),
quantity = document.querySelector(".quantity"),
total = document.querySelector(".totalprice");

let checkOutList = [];

document.getElementById('bar').onclick = function () {
    document.getElementById('navbar').classList.add('active');
};

// Close mobile menu
document.getElementById('close').onclick = function () {
    document.getElementById('navbar').classList.remove('active');
};

// Clear the cart and reset everything
function clearCart() {
checkOutList = [];
localStorage.removeItem('cart');
localStorage.removeItem('cartSubtotal');
reloadCart();
}

// Show cart when shopping basket is clicked
shoppingBasket.onclick = () => {
body.classList.add("active");
};

// Initialize products on the page
function onInIt() {
ArrProducts.forEach((item, key) => {
    let div = document.createElement("div");
    div.classList.add("item");

    let star = "";
    for (let i = 1; i <= item.rating; i++) {
        star += '<i class="fas fa-star"></i>';
    }

    div.innerHTML = `
        <img onclick="window.location.href='product.description.html';" class="img" src="images/${item.image}" />
        <div class="brand">${item.brand}</div>
        <div class="name">${item.name}</div>
        <div class="star">${star}</div>
        <div class="price"><span></span> $${item.price}</div>
        <button onclick="addToCart(${key})"> <i class="fas fa-shopping-cart"></i></button>
    `;
    products.appendChild(div);
});
}
onInIt();

// Add product to cart
function addToCart(id) {
if (checkOutList[id] == null) {
    checkOutList[id] = ArrProducts[id];
    checkOutList[id].quantity = 1;
} else {
    checkOutList[id].quantity += 1;
}
saveCart();
reloadCart();
}

// Change product quantity in cart
function changeQuantity(key, quantity) {
if (quantity == 0) {
    delete checkOutList[key];
} else {
    checkOutList[key].quantity = quantity;
}
saveCart();
reloadCart();
}

// Reload cart display and update subtotal
function reloadCart() {
    productList.innerHTML = "";
    let count = 0;
    let totalprice = 0;

    checkOutList.forEach((item, key) => {
        if (item) {
            totalprice += parseFloat(item.price) * item.quantity;
            count += item.quantity;
            let li = document.createElement("li");
            li.className = "cart-item"; // Add class for custom styling
            li.innerHTML = `
                <img src="images/${item.image}" alt="${item.name}" />
                <div>${item.name}</div>
                <div>$${item.price}</div>
                <div class="quantity-control">
                    <button onclick="changeQuantity(${key},${item.quantity-1})">-</button>
                    <div class="count">${item.quantity}</div>
                    <button onclick="changeQuantity(${key},${item.quantity+1})">+</button>
                </div>
            `;
            productList.appendChild(li);
        }
    });

    total.innerHTML = `<small>Subtotal (${count} items)</small> $${totalprice.toFixed(2)}`;
    quantity.innerHTML = count;

    localStorage.setItem('cartSubtotal', totalprice.toFixed(2));
}


// Load cart data from localStorage on page load
function loadCart() {
const savedCart = localStorage.getItem('cart');
if (savedCart) {
    checkOutList = JSON.parse(savedCart);
    reloadCart();
}
}

// Save cart data to localStorage
function saveCart() {
localStorage.setItem('cart', JSON.stringify(checkOutList));
}

// Consolidate DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
loadCart();

const subtotal = localStorage.getItem('cartSubtotal');
if (subtotal) {
    const reviewAmount = document.getElementById('review-amount');
    const billingSubtotal = document.getElementById('billing-subtotal');
    if (reviewAmount) reviewAmount.textContent = `$${subtotal}`;
    if (billingSubtotal) billingSubtotal.textContent = `$${subtotal}`;
}

const billingForm = document.getElementById('billing-info');
if (billingForm) {
    billingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Perform billing validation (if needed)
        // ...

        // If valid, finalize the order
        localStorage.setItem('orderSuccess', 'true');
        window.location.href = 'Order-confirm.html';

        // Clear cart after placing order
        clearCart();
    });
}

const orderSuccess = localStorage.getItem('orderSuccess');
if (orderSuccess === 'true') {
    alert('Thank you for your order! Your order has been successfully placed.');
    localStorage.removeItem('orderSuccess');
}

// Attach clearCart function to the clear cart button
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
});