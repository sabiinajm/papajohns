const url = window.location.search.split("=").at(-1)

const DATA = []
fetch(`http://localhost:3000/${url}`)
    .then(res => res.json())
    .then(item => {
        DATA.push(...item)
        displayCards()
    })
    .catch(arr => {
        alert("Axtarisiniz uzre netice tapilmadi")
    })


function displayCards() {
    let kod = ''
    DATA.map((card, index) => {
        kod += `
            <div onclick="openItemPop(${index}), popup2()" class="flex flex-col p-4 gap-3">
                <div class="min-h-[260px]">
                    <img src="${card.img}" alt="${card.title}" class="w-full h-full object-cover" />
                </div>
                <div class="flex font-bold text-[22px] items-start justify-between p-4">
                    <h3>${card.title}</h3>
                    <button class="bg-[#0F9675] px-4 py-2 rounded-lg text-white text-[18px] whitespace-nowrap">Bunu seç</button>
                </div>
                <p class="p-4">${card.composition}</p>
            </div>
        `
    })
    pizzaGallery.innerHTML = kod
}