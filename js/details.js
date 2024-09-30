const urlCurr = window.location.search.split("&")
const categ = urlCurr[0].split("=").at(-1)
const id = urlCurr[1].split("=").at(-1)
const MEHSUL = []

fetch(`http://localhost:3000/${categ}/${id}`)
    .then(res => res.json())
    .then(data => {
        MEHSUL.push(data)
        handleCard()
    })
const content = document.getElementById("content")
function handleCard() {
    MEHSUL.map(item =>
        content.innerHTML +=
        `
            <div>
                <div class="flex justify-center object-cover"><img class="w-[600px] min-w-[280px]" src="${item.img}" alt="${item.title}"/></div>
                <div class="w-full text-xl mt-4 flex justify-between h-11 rounded-md bg-gray-100">
                    <button class="flex-1 text-white bg-[#0F9675] rounded-l-md">Enenevi</button>
                    <button class="flex-1 rounded-r-md">Nazik</button>
                </div>
            </div>
            <div class="pl-8 max-w-[600px] flex flex-col justify-evenly">
                <h1 class="text-3xl font-bold py-2">${item.title}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis maximus ipsum, ut sollicitudin quam aliquam non. Aenean nec pretium augue. Etiam quis blandit turpis. Nulla imperdiet facilisis nisi sed consequat. Etiam ultricies orci quis felis pharetra, eu sollicitudin mauris tristique. Maecenas euismod eu sem id fermentum. Mauris bibendum leo.</p>
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
                        <button onclick="chooseItem('${item.id}','${item.img}','${item.title}','${item.price}')"
                        class="bg-[#0F9675] px-4 py-2 rounded-lg text-white text-[18px] whitespace-nowrap">Elave
                        et</button>
                    </div>
                </div>
            </div>
            `
    )
}
