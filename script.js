"use strict"

const vegIngrTemplate = document.querySelector(".veg-ingredients-template")
const nvegIngrTemplate = document.querySelector(".nveg-ingredients-template")
const undfIngrTemplate = document.querySelector(".undf-ingredients-template")
const vegProdTemplate = document.querySelector(".veg-products-template")
const nvegProdTemplate = document.querySelector(".nveg-products-template")
const undfProdTemplate = document.querySelector(".undf-products-template")

const ingrCardContainer = document.querySelector(".ingr-cards-container")
const prodCardContainer = document.querySelector(".prod-cards-container")
const searchInput = document.querySelector(".data-search")

let selectType = document.querySelector(".select-type")
let optionValue = "Ingredientes"
prodCardContainer.classList.add("hide")
let ingredients = []
let produtos = []

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
    })
  }
})

fetch("../data.json").then(res => res.json()).then(data => {
  ingredients = data.Ingredientes.map(user => {
    let card
    if(user.itsVegan === "Vegano"){
      card = vegIngrTemplate.content.cloneNode(true).children[0]
    }else if(user.itsVegan === "Não Vegano"){
      card = nvegIngrTemplate.content.cloneNode(true).children[0]
    }else{
      card = undfIngrTemplate.content.cloneNode(true).children[0]
    }
    const header = card.querySelector(".header")
    const itsVegan =card.querySelector(".its-vegan")
    const why = card.querySelector(".why")
    const updateDate = card.querySelector(".update-date")
    const font = card.querySelector(".font")

    header.textContent = user.name
    itsVegan.textContent = user.itsVegan
    why.textContent = user.why
    updateDate.textContent = user.updateDate
    font.textContent = user.font

    font.setAttribute('href', user.fontLink)
    ingrCardContainer.append(card)

    return {objType: user.objType, name: user.name, itsVegan: user.itsVegan, why: user.why, updateDate: user.updateDate, font: user.font, veganCheck: user.veganCheck, element: card}
  });

  produtos = data.Produtos.map(user => {
  let card
  if(user.itsVegan === "Vegano"){
    card = vegProdTemplate.content.cloneNode(true).children[0]
  }else if(user.itsVegan === "Não Vegano"){
    card = nvegProdTemplate.content.cloneNode(true).children[0]
  }else{
    card = undfProdTemplate.content.cloneNode(true).children[0]
  }
  const header = card.querySelector(".header")
  const itsVegan =card.querySelector(".its-vegan")
  const brand = card.querySelector(".brand")
  const why = card.querySelector(".why")
  const animalIngr = card.querySelector(".animal-ingr")
  const updateDate = card.querySelector(".update-date")
  const font = card.querySelector(".font")

  header.textContent = user.name
  itsVegan.textContent = user.itsVegan
  brand.textContent = user.brand
  why.textContent = user.why
  animalIngr.textContent = user.animalIngr
  updateDate.textContent = user.updateDate
  font.textContent = user.font

  font.setAttribute('href', user.fontLink)
  prodCardContainer.append(card)

  return {objType: user.objType, name: user.name, itsVegan: user.itsVegan, brand: user.brand, why: user.why, animalIngr: user.animalIngr, updateDate: user.updateDate, font: user.font, veganCheck: user.veganCheck, element: card}
  });
})