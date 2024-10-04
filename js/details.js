const urlCurr = window.location.search.split("&")
const categ = urlCurr[0].split("=").at(-1)
const id = urlCurr[1].split("=").at(-1)
let MEHSUL = []

fetch(`https://papajson.vercel.app/${categ}/${id}`)
    .then(res => res.json())
    .then(data => {
        MEHSUL.push(data)
        handleCard()
    })
const content = document.getElementById("content")
function handleCard() {
    content.innerHTML = '' 

    MEHSUL.map(item => {
        content.innerHTML += `
            <div>
                <div class="flex justify-center object-cover">
                    <img class="w-[600px] min-w-[280px]" src="${item.img}" alt="${item.title}"/>
                </div>
                ${categ === "pizza" ? `
                    <div class="w-full flex text-xl my-4 justify-between h-11 rounded-md bg-gray-100">
                        <button onclick="chooseBtn('Ənənəvi', this)" class="pizza-btn flex-1 text-white bg-[#0F9675] rounded-l-md">Ənənəvi</button>
                        <button onclick="chooseBtn('Nazik', this)" class="pizza-btn flex-1 rounded-r-md">Nazik</button>
                    </div>
                    <select id="selectOp" onchange="updateCost()" class="rounded-md h-11 w-full bg-[#0F9675] text-white text-center">
                        ${item.variations.filter(elm => elm.type === "Ənənəvi")
                    .map(elm => `<option value="${elm.price}">${elm.size}</option>`).join("")}
                    </select>` : ''}
            </div>
            <div class="pl-8 max-w-[600px] flex flex-col justify-evenly">
                <h1 class="text-3xl font-bold py-2">${item.title}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis maximus ipsum...</p>
                <div class="flex justify-between h-20 items-center">
                    <div class="flex text-xl">
                        <button onclick="decrease()" id="minus" class="text-white bg-gray-500 rounded-l-md w-10 h-12">-</button>
                        <div id="amountItem" class="w-10 h-12 bg-gray-200 flex justify-center items-center">1</div>
                        <button onclick="increase()" class="text-white bg-[#0F9675] rounded-r-md w-10 h-12">+</button>
                    </div>
                    <p><span class="total font-semibold text-2xl">${item.price} ₼</span></p>
                </div>
                <div class="flex justify-between">
                    <div onclick="popup()" class="relative cursor-pointer">
                        <i class="fa fa-shopping-basket block text-3xl"></i>
                        <span class="totalBasket">0 ₼</span>
                        <div class="totalCount bg-red-600 w-[20px] h-[20px] absolute top-0 right-0 rounded-full font-thin text-[12px] flex justify-center items-center text-white">0</div>
                    </div>
                    <button onclick="chooseItem('${item.id}','${item.img}','${item.title}','${item.price}')" class="bg-[#0F9675] px-4 py-2 rounded-lg text-white text-[18px] whitespace-nowrap">Elave et</button>
                </div>
            </div>
        `
    })

}


function chooseBtn(type, btn) {
    const selectOp = document.getElementById('selectOp')
    selectOp.innerHTML = ""
    MEHSUL[0].variations
        .filter(elm => elm.type == type)
        .map(elm => {
            selectOp.innerHTML += `<option value="${elm.price}">${elm.size}</option>`
        })

    const buttons = document.querySelectorAll('.pizza-btn')
    buttons.forEach(button => {
        button.classList.remove('bg-[#0F9675]', 'text-white')
    })
    btn.classList.toggle('bg-[#0F9675]')
    btn.classList.toggle('text-white')
}
function updateCost() {
    const selectOp = document.getElementById('selectOp')
    const total = document.querySelector('.total')
    total.innerHTML = `${selectOp.value} ₼`
    MEHSUL[0].price = selectOp.value
    handleCard()
}
