//Global variables
const products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery'
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery'
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Pleated skirt',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Wide-leg jeans',
        price: 9.99,
        type: 'clothes'
    }
]
const cartList = [];
const cart = [];
const subtotal = {
    grocery: {
        value: 0, 
        discount: 0
    },
    beauty: {
        value: 0, 
        discount: 0
    },
    clothes: {
        value: 0, 
        discount: 0
    },
};

//Getting DOM elements
const list = document.querySelector('.list');
const priceItem = document.querySelector('.bill');


// Exercise 1
function buy(id) {
    let selectedItem = products.find((item) => item.id === id);
    cartList.push(selectedItem);
}


// Exercise 2
function cleanCart() {
    cart = [];
}


// Exercise 3
function calculateSubtotals() {
    cart.forEach((product) => {
        switch (product.type) {
            case 'grocery':
                subtotal.grocery.value += product.subtotal();
                subtotal.grocery.discount += product.subtotalWithDiscont();
                break;
            case 'beauty':
                subtotal.beauty.value += product.subtotal();
                subtotal.beauty.discount += product.subtotalWithDiscont();
                break;
            case 'clothes':
                subtotal.clothes.value += product.subtotal();
                subtotal.clothes.discount += product.subtotalWithDiscont();
                break;
        }
    });
}


// Exercise 4
function calculateTotal() {
    applyPromotionsCart(); 
    let total = 0;
    cart.forEach((product) => {
        total += product.subtotalWithDiscont();
    });
    return total.toFixed(2);
}


// Exercise 5
function generateCart() {
    cartList.forEach((item) => {
        let repeatedProduct = cart.find((product) => item.id === product.id);
        if (!repeatedProduct) {
            cart.push({
                ...item,
                quantity: 1,
                subtotal: function() {
                    return this.price*this.quantity;
                },
                subtotalWithDiscont: function() {
                    return this.subtotal();
                }
            });
        } else {
            repeatedProduct.quantity += 1;
        }
    });
}


// Exercise 6
function applyPromotionsCart() {
    let cookingOil = cart.find((product) => product.id === 1);
    let cupcakeMixture = cart.find((product) => product.id === 3);
    if (cookingOil && cookingOil.quantity >= 3) {
        cookingOil.subtotalWithDiscont = function() {
            return this.quantity*10;
        }    
    } else if (cookingOil) {
        cookingOil.subtotalWithDiscont = function() {
            return this.subtotal();
        } 
    }
    if (cupcakeMixture && cupcakeMixture.quantity >= 10) {
        cupcakeMixture.subtotalWithDiscont = function() {
            return this.subtotal()*2/3;
        }    
    } else if (cupcakeMixture) {
        cupcakeMixture.subtotalWithDiscont = function() {
            return this.subtotal();
        }
    }
}


// Exercise 7
function addToCart(id) {
    let selectedItem = products.find((item) => item.id === id);
    let repeatedProduct = cart.find((product) => selectedItem.id === product.id);

    if (!repeatedProduct) {
        cart.push({
            ...selectedItem,
            quantity: 1,
            subtotal: function() {
                return this.price*this.quantity;
            },
            subtotalWithDiscont: function() {
                return this.subtotal();
            }
        });
    } else {
        repeatedProduct.quantity += 1;
    }
}


// Exercise 9
function removeFromCart(id) {
    let itemIndex = cart.findIndex((product) => product.id === id);
    let item = cart[itemIndex];

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.splice(itemIndex, 1);
    }
}


// Exercise 10
function printCart() {
    reloadCart();
    
    cart.forEach((product) => {
        let listItem = document.createElement('li');
        list.appendChild(listItem);
        listItem.setAttribute('id', `item${product.id}`);
        listItem.innerHTML = product.name;

        let counter = document.createElement('div');
        listItem.appendChild(counter);

        let plusBtn = document.createElement('button');
        let minusBtn = document.createElement('button');
        let productQuantity = document.createElement('span');
        counter.append(minusBtn, productQuantity, plusBtn);

        plusBtn.innerHTML = "+";
        minusBtn.innerHTML = "-";
        productQuantity.innerHTML = product.quantity;

        plusBtn.setAttribute('onclick', `addToCart(${product.id}); reloadItem(${product.id}); reloadTotal()`);
        minusBtn.setAttribute('onclick', `removeFromCart(${product.id}); reloadItem(${product.id}), reloadTotal()`);
    })

    priceItem.innerHTML = `Total: $${calculateTotal()}`;
}


//Auxiliar functions
function reloadCart() {
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
    } 
}
function reloadItem(id) {
    let selectedProduct = cart.find((product) => product.id === id);
    let itemTag = document.querySelector(`#item${id}`);
    let itemQuantityTag = itemTag.querySelector('span');
    if (!selectedProduct) {
        itemTag.remove();
    } else {
        itemQuantityTag.innerHTML = selectedProduct.quantity;
    }
}
function reloadTotal() {
    priceItem.innerHTML = `Total: $${calculateTotal()}`;
}