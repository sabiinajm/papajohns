let DATA = []
let CART = []

async function fetchData(url) {
    const res = await fetch(url)
    return res.json()
}

async function datalar() {
    DATA = await fetchData("https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/papajosn.json")
    displayCards()
}

const pizzaGallery = document.getElementById("pizza-gallery")

function displayCards() {
    pizzaGallery.innerHTML = ''
    DATA.forEach((card, index) => {
        pizzaGallery.innerHTML += `
            <div class="flex flex-col p-4 gap-3">
                <div class="min-h-[260px]">
                    <img src="${card.img}" alt="${card.name}" class="w-full h-full object-cover" />
                </div>
                <div class="flex font-bold text-[22px] items-start justify-between p-4">
                    <h3>${card.name}</h3>
                    <button onclick="addToCart(${index})" class="bg-[#0F9675] px-4 py-2 rounded-lg text-white text-[18px] whitespace-nowrap">Bunu seç</button>
                </div>
                <p class="p-4">${card.composition}</p>
            </div>
        `
    })
}

function addToCart(index) {
    const selectedItem = DATA[index]
    CART.push(selectedItem)
    displayItems()
}

function displayItems() {
    const addedItems = document.getElementById("addedItems")
    addedItems.innerHTML = ''
    CART.forEach((card, index) => {
        addedItems.innerHTML += `
            <li class="flex flex-col py-6 sm:flex-row sm:justify-between">
                <div class="flex w-full space-x-2 sm:space-x-4">
                    <img class="flex-shrink-0 object-cover w-20 h-20 border- rounded outline-none sm:w-32 sm:h-32 bg-gray-500"
                        src="${card.img}"
                        alt="${card.name}">
                    <div class="flex flex-col justify-between w-full pb-4">
                        <div class="flex justify-between w-full pb-2 space-x-2">
                            <div class="space-y-1">
                                <h3 class="text-lg font-semibold leading-snug sm:pr-8">${card.name}</h3>
                            </div>
                            <div class="text-right">
                                <p class="text-lg font-semibold">${card.price} ₼</p>
                            </div>
                        </div>
                        <div class="flex text-sm divide-x">
                            <button onclick="removeFromCart(${index})" class="flex items-center px-2 py-1 pl-0 space-x-1">
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        `
    })
}

function removeFromCart(index) {
    CART.splice(index, 1)
    displayItems()
}

const cartItems = document.getElementById("cartItems")
function showCart() {
    if (cartItems.classList.contains('hidden')) {
        cartItems.classList.remove('hidden')
        cartItems.classList.add('flex')
    } else {
        cartItems.classList.remove('flex')
        cartItems.classList.add('hidden')
    }
}

datalar()
