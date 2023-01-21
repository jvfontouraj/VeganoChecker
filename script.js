const cardTemplate = document.querySelector(".card-template")
const cardContainer = document.querySelector(".cards-container")
const searchInput = document.querySelector(".data-search")

let ingredients = []

searchInput.addEventListener("input", (el)=>{
  const value = el.target.value.toLowerCase()
  ingredients.forEach(user => {
    const isVisible = user.name.toLowerCase().includes(value) ||
    user.why.toLowerCase().includes(value) ||
    user.updateDate.toLowerCase().includes(value) ||
    user.font.toLowerCase().includes(value) ||
    user.itsVegan.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("../data.json").then(res => res.json()).then(data => {
  ingredients = data.Ingredientes.map(user => {
    const card = cardTemplate.content.cloneNode(true).children[0]
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

    cardContainer.append(card)

    return {name: user.name, why: user.why, updateDate: user.updateDate, font: user.font, itsVegan: user.itsVegan, element: card}
  });
})