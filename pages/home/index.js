// RENDERIZAR FILTROS DE GENEROS
function renderCategoryFilters(){
  let genderList = document.querySelector(".gender-list")
  
  categories.forEach(category => {
      genderList.insertAdjacentHTML("beforeend", `
      <li class="">${category}</li>
      `)
      
  })
}


// RENDERIZAR CARDS NA TELA
let cardContainer = document.querySelector(".card-container")
function renderCards(cardList){
  
  cardContainer.innerHTML = ""
  cardList.forEach(card => {
    cardContainer.insertAdjacentHTML("beforeend", `
    <div class="card">
    <img src="./assets/img/${card.id +1}.jpg" alt="">
    <div class="card-info">
    <p class="band-name">${card.band}    ${card.year}</p>
    <p class="album-title">${card.title}</p>
    <div>
    <p>R$${card.price.toFixed(2)}</p>
    <Button>Comprar</Button>
    </div>
    </div>
            </div>
        `)
    })
}


// PRIMERIO RENDER BUSCANDO INFO NO LOCALSTORAGE (THEME E FILTROS)
function firstRender() {
  let darkModaAnalysis = JSON.parse(localStorage.getItem("dark-mode"))
  if (darkModaAnalysis) {
    document.querySelector("html").classList.add("dark-mode")
    let themeBtnImg = document.querySelector('#theme-img')
    themeBtnImg.src = "./assets/theme/sun.png"
  }
  
  if(localStorage.getItem("filters")){
    let localStorageFilters = localStorage.getItem("filters").split(",");
    localStorageFilters = localStorageFilters.map(e => (parseInt(e)));
    renderCards(filterList(localStorageFilters))
  } else {
    renderCards(products)
  }
  
  renderCategoryFilters()

}
firstRender()


// RENDERIZA VALOR FILTRO RANGE
function rangeSlide(value){
  document.getElementById('rangeValue').innerHTML = `Até R$${value}`
}


// FILTRAR POR GENERO E PREÇO
let filters = [0, 150]
function priceAndCategoryFilter(){
  let genderBtns = document.querySelectorAll("li")
  genderBtns.forEach(button => button.addEventListener('click', e => {
    let clickedBtn = e.target
    filters[0] = categories.findIndex(category => category === clickedBtn.innerText)
    
    let filteredList = filterList(filters)
    renderCards(filteredList)

    genderBtns.forEach(button => button.classList.remove('active'))
    clickedBtn.classList.toggle('active')

    localStorage.setItem("filters", filters)
  }))
  
  let range = document.querySelector(".range")
  range.addEventListener('change', e => {
    filters[1] = range.value
    
    let filteredList = filterList(filters)
    renderCards(filteredList)

    localStorage.setItem("filters", filters)
  })

}
priceAndCategoryFilter()


function filterList(filterArray){

  if (filterArray[0] === 0){
    return products.filter(product => product.price <= filterArray[1])
  } else {
    return products.filter(product => product.category === filterArray[0] && product.price <= filterArray[1])
  }
}


// ALTERNAAR DARKMODE
let darkMode;
function alternateTheme(){
  let root = document.querySelector('html')
  let themeBtn = document.querySelector('#theme-btn')

  themeBtn.addEventListener('click', e => {
    root.classList.toggle('dark-mode')

    let themeImg = document.querySelector("#theme-img");
    (root.classList.contains('dark-mode')) ? themeImg.src = "./assets/theme/sun.png" : themeImg.src = "./assets/theme/moon.png"

    // darkMode = !darkMode
    // localStorage.setItem("dark-mode", darkMode)
    root.classList.contains('dark-mode') ? localStorage.setItem("dark-mode", true) : localStorage.setItem("dark-mode", false)
  })

}
alternateTheme()