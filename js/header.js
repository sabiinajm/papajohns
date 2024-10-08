const category = []
fetch("https://papajson.vercel.app/category")
    .then(res => res.json())
    .then(res => {
        category.push(...res)
        addMenu()
    })

const menu = document.getElementById('menu')
function  addMenu(){
    category.map(item => {
        const link = item.id > 10 ? '../pages/kompaniyalar.htm' : `../pages/category.htm?category=${item.slug}`;
        menu.innerHTML+= `
            <li class="hover:text-[#ffffff7e] px-2"><a href="${link}">${item.category}</a></li>
        `
    })
}