let CART = []

const pizzaGallery = document.getElementById("pizza-gallery")
const cartItems = document.getElementById("cartItems")
const cart = document.getElementById("cart")
const itemShow = document.getElementById("itemShow")

function popup() {
    cart.classList.toggle('hidden')
    cart.classList.toggle('flex')
    cartItems.classList.toggle('hidden')
    cartItems.classList.toggle('flex')
}

function chooseItem(id, img, title, price) {
    const amountItem = document.getElementById('amountItem')
    const obj = {
        id,
        img,
        title,
        price,
        count: +amountItem.innerHTML
    }
    let existingProduct = CART.find(item => item.id === id)
    if (!existingProduct) {
        CART.push(obj)
    } else {
        existingProduct.count += obj.count
    }
    updateCart()
    updateBasketTotal()
    saveCartToLocalStorage()
}

function updateCart() {
    const addedItems = document.getElementById("addedItems")
    addedItems.innerHTML = ''

    CART.forEach((item) => {
        addedItems.innerHTML += `
            <li class="flex flex-col py-6 sm:flex-row sm:justify-between">
                <div class="flex w-full space-x-2 sm:space-x-4">
                    <img class="flex-shrink-0 object-cover w-20 h-20 border rounded outline-none sm:w-32 sm:h-32 bg-gray-500"
                        src="${item.img}"
                        alt="${item.title}">
                    <div class="flex flex-col justify-between w-full pb-4">
                        <div class="flex justify-between w-full pb-2 space-x-2">
                            <div class="space-y-1">
                                <h3 class="text-lg font-semibold leading-snug sm:pr-8">${item.title}</h3>
                            </div>
                            <div class="text-right">
                                <p class="text-lg font-semibold">${item.price} ₼</p>
                                <p class="text-lg font-semibold">Amount: <span class="amountItem">${item.count}</span></p>
                                <p class="text-lg font-semibold">Total: <span>${(item.count * item.price).toFixed(2)} ₼</span></p>
                            </div>
                        </div>
                        <div class="flex text-sm divide-x">
                            <button onclick="removeFromCart('${item.id}')" class="flex items-center px-2 py-1 pl-0 space-x-1">
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        `
    })
    saveCartToLocalStorage()
}

function removeFromCart(id) {
    CART = CART.filter(item => item.id !== id)
    updateCart()
    updateBasketTotal()
}


function decrease() {
    const amountItem = document.getElementById("amountItem")
    if (amountItem.innerHTML > 1) {
        amountItem.innerHTML = amountItem.innerHTML - 1
    }
}

function increase() {
    const amountItem = document.getElementById("amountItem")
    amountItem.innerHTML = Number(amountItem.innerHTML) + 1
}

function updateBasketTotal() {
    let totalPrice = 0
    let totalItems = 0

    CART.forEach(item => {
        totalPrice += item.count * item.price
        totalItems += item.count
    })

    const totalBasket = document.getElementById("totalBasket")
    totalBasket.innerHTML = `${totalPrice.toFixed(2)} ₼`
    const total = document.getElementById("total")
    total.innerHTML = `${totalPrice.toFixed(2)} ₼`
    totalBasket.nextElementSibling.innerHTML = `${totalItems}`
    document.getElementById("totalPrice").innerHTML = `${totalPrice.toFixed(2)} ₼`
    document.getElementById("totalItems").innerHTML = `${totalItems}`
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(CART));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        CART = JSON.parse(savedCart)
        updateCart();
        updateBasketTotal();
    }
}

window.onload = loadCartFromLocalStorage
function clearCart() {
    CART = [];
    localStorage.removeItem('cart');
    updateCart();
    updateBasketTotal();
}
