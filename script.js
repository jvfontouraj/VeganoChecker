const ingrTemplate = document.querySelector(".ingredients-template")
const prodTemplate = document.querySelector(".products-template")
const ingrCardContainer = document.querySelector(".ingr-cards-container")
const prodCardContainer = document.querySelector(".prod-cards-container")
const searchInput = document.querySelector(".data-search")
const ingrMessage = document.querySelector(".ingr-message")
const prodMessage = document.querySelector(".prod-message")
let selectType = document.querySelector(".select-type")
let optionValue = "Ingredientes"
prodCardContainer.classList.add("hide")

selectType.addEventListener('change', function() {
  let selectedOption = this.options[this.selectedIndex];
  optionValue = selectedOption.value;
  if(optionValue === "Ingredientes"){
    ingrCardContainer.classList.remove("hide")
    ingrCardContainer.classList.add("grid")
    prodCardContainer.classList.remove("grid")
    prodCardContainer.classList.add("hide")
  }else{
    ingrCardContainer.classList.add("hide")
    ingrCardContainer.classList.remove("grid")
    prodCardContainer.classList.add("grid")
    prodCardContainer.classList.remove("hide")
  }
});

let ingredients = []
let produtos = []
let ingrResults = 0
let prodResults = []

searchInput.addEventListener("input", (el)=>{
  const value = el.target.value.toLowerCase();
  if(optionValue === "Ingredientes"){
    ingredients.forEach(user => {
      const isVisible = user.name.toLowerCase().includes(value) ||
      user.why.toLowerCase().includes(value) ||
      user.updateDate.toLowerCase().includes(value) ||
      user.font.toLowerCase().includes(value) ||
      user.itsVegan.toLowerCase().includes(value)||
      user.objType.toLowerCase().includes(value)
      user.element.classList.toggle("hide", !isVisible || (value === "vegano" && !user.veganCheck))
    })

  } else{
    produtos.forEach(user => {
      const isVisible = user.name.toLowerCase().includes(value) ||
      user.why.toLowerCase().includes(value) ||
      user.brand.toLowerCase().includes(value) ||
      user.animalIngr.toLowerCase().includes(value) ||
      user.updateDate.toLowerCase().includes(value) ||
      user.font.toLowerCase().includes(value) ||
      user.itsVegan.toLowerCase().includes(value) ||
      user.objType.toLowerCase().includes(value)
      user.element.classList.toggle("hide", !isVisible || (value === "vegano" && !user.veganCheck))
      if(ingredients.length = 0)
      prodMessage.classList.toggle("hide")
    })
  }
})

fetch("../data.json").then(res => res.json()).then(data => {
    ingredients = data.Ingredientes.map(user => {
    const card = ingrTemplate.content.cloneNode(true).children[0]
    const header = card.querySelector(".header")
    const why = card.querySelector(".why")
    const updateDate = card.querySelector(".update-date")
    const font = card.querySelector(".font")
    const itsVegan =card.querySelector(".its-vegan")

    header.textContent = user.name
    why.textContent = user.why
    updateDate.textContent = user.updateDate
    font.textContent = user.font
    itsVegan.textContent = user.itsVegan

    font.setAttribute('href', user.fontLink)
    ingrCardContainer.append(card)

    return {objType: user.objType, name: user.name, why: user.why, updateDate: user.updateDate, font: user.font, itsVegan: user.itsVegan, veganCheck: user.veganCheck, element: card}
    });

    produtos = data.Produtos.map(user => {
    const card = prodTemplate.content.cloneNode(true).children[0]
    const header = card.querySelector(".header")
    const brand = card.querySelector(".brand")
    const why = card.querySelector(".why")
    const animalIngr = card.querySelector(".animal-ingr")
    const updateDate = card.querySelector(".update-date")
    const font = card.querySelector(".font")
    const itsVegan =card.querySelector(".its-vegan")

    header.textContent = user.name
    brand.textContent = user.brand
    why.textContent = user.why
    animalIngr.textContent = user.animalIngr
    updateDate.textContent = user.updateDate
    font.textContent = user.font
    itsVegan.textContent = user.itsVegan

    font.setAttribute('href', user.fontLink)
    prodCardContainer.append(card)

    return {objType: user.objType, name: user.name, brand: user.brand, why: user.why, animalIngr: user.animalIngr, updateDate: user.updateDate, font: user.font, itsVegan: user.itsVegan, veganCheck: user.veganCheck, element: card}
    });
})