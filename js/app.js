// let DATA = []
let CART = []

// fetch("https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/papajosn.json")
//     .then(res => res.json())
//     .then(mehsul => {
//         DATA.push(...mehsul)
//         displayCards()
//     })

const pizzaGallery = document.getElementById("pizza-gallery")
const cartItems = document.getElementById("cartItems")
const itemShow = document.getElementById("itemShow")
function popup() {
    cartItems.classList.toggle('hidden')
    cartItems.classList.toggle('flex')
    if (itemShow.classList.contains('flex')) itemShow.classList.toggle('hidden')
}

function popup2() {
    itemShow.classList.toggle('hidden')
    itemShow.classList.toggle('flex')
    if (cartItems.classList.contains('flex')) cartItems.classList.toggle('hidden')
}

function chooseItem(index) {
    const chosenItem = DATA[index]
    const existingItem = CART.find(item => item.id === chosenItem.id)
    const amountItem = Number(document.getElementById("amountItem").innerHTML)

    if (existingItem) {
        existingItem.quantity += amountItem
    } else {
        CART.push({ ...chosenItem, quantity: amountItem })
    }

    updateCart()
    updateBasketTotal()
}


function updateCart() {
    const addedItems = document.getElementById("addedItems")
    addedItems.innerHTML = ''
    let totalPrice = 0

    CART.forEach((card) => {
        addedItems.innerHTML += `
            <li class="flex flex-col py-6 sm:flex-row sm:justify-between">
                <div class="flex w-full space-x-2 sm:space-x-4">
                    <img class="flex-shrink-0 object-cover w-20 h-20 border- rounded outline-none sm:w-32 sm:h-32 bg-gray-500"
                        src="${card.img}"
                        alt="${card.title}">
                    <div class="flex flex-col justify-between w-full pb-4">
                        <div class="flex justify-between w-full pb-2 space-x-2">
                            <div class="space-y-1">
                                <h3 class="text-lg font-semibold leading-snug sm:pr-8">${card.title}</h3>
                            </div>
                            <div class="text-right">
                                <p class="text-lg font-semibold">${card.price} ₼</p>
                                <p class="text-lg font-semibold">Amount: <span class="amountItem">${card.quantity}</span></p>
                                <p class="text-lg font-semibold">Total: <span>${(card.quantity * card.price)} ₼</span></p>
                            </div>
                        </div>
                        <div class="flex text-sm divide-x">
                            <button onclick="removeFromCart('${card.id}')" class="flex items-center px-2 py-1 pl-0 space-x-1">
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        `
        totalPrice += card.quantity * card.price
    })

}


function removeFromCart(id) {
    CART = CART.filter(item => item.id !== id)
    updateCart()
    updateBasketTotal()
}

const popUpItems = document.getElementById('popUpItems')
function openItemPop(index) {
    const item = DATA[index]
    popUpItems.innerHTML = `
        <div class="flex justify-center object-cover"><img class="w-[600px]" src="${item.img}" alt="${item.title}"/></div>
                    <h1 class="text-3xl font-bold py-2">${item.title}</h1>
                    <div class="w-full text-xl flex justify-between h-11 rounded-md bg-gray-100">
                        <button class="flex-1 text-white bg-[#0F9675] rounded-l-md">Enenevi</button>
                        <button class="flex-1 rounded-r-md">Nazik</button>
                    </div>
                    <div class="flex justify-between h-20 items-center">
                        <div class="flex text-xl">
                            <button onclick="decrease(${item.price})" class="text-white bg-gray-500 rounded-l-md w-10 h-12">-</button>
                            <div id="amountItem" class="w-10 h-12 bg-gray-200 flex justify-center items-center"> 1 </div>
                            <button onclick="increase(${item.price})" class="text-white bg-[#0F9675] rounded-r-md w-10 h-12">+</button>
                        </div>
                        <p><span id="total" class="font-semibold text-2xl">${item.price} ₼</span></p>
                    </div>
                    <div class="flex justify-between">
                        <div onclick="popup()" class=" relative cursor-pointer">
                            <i class="fa fa-shopping-basket block text-3xl"></i>
                            <span id="totalPrice">0 ₼ </span>
                            <div id="totalItems"
                                class="bg-red-600 w-[20px] h-[20px] absolute top-0 right-0 rounded-full font-thin text-[12px] flex justify-center items-center text-white">
                                0</div>
                        </div>
                        <button onclick="chooseItem(${index})" 
                            class="bg-[#0F9675] px-4 py-2 rounded-lg text-white text-[18px] whitespace-nowrap">Elave
                            et</button>
                    </div>
        `
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

const total = document.getElementById("total")
function updateBasketTotal() {
    let totalPrice = 0
    let totalItems = 0

    CART.forEach(item => {
        totalPrice += item.quantity * item.price
        totalItems += item.quantity
    })

    const totalBasket = document.getElementById("totalBasket")
    totalBasket.innerHTML = `${totalPrice} ₼`
    total.innerHTML = `${totalPrice} ₼`
    totalBasket.nextElementSibling.innerHTML = `${totalItems}`
    document.getElementById("totalPrice").innerHTML = `${totalPrice} ₼`;
    document.getElementById("totalItems").innerHTML = `${totalItems}`;

}