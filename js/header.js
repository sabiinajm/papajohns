const category = []
fetch("http://localhost:3000/category")
    .then(res => res.json())
    .then(res => {
        category.push(...res)
        addMenu()
    })

const menu = document.getElementById('menu')
function  addMenu(){
    category.map(item => {
        menu.innerHTML+= `
            <li class="hover:text-[#ffffff7e]"><a href="../pages/category.htm?category=${item.slug}">${item.category}</a></li>
        `
    })
}