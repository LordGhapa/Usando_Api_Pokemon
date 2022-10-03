//iife fechando o escopo do script js escondendo as funçoes  e auto executando ele
(() => {

const url = 'https://pokeapi.co/api/v2/pokemon/'
const form = document.querySelector('.form')
const input = document.querySelector('.input_seach')
let searchPokemon = 1

const fetchPokemon = async pokemon => {
  loading()

  const APIresponse = await fetch(`${url}${pokemon}`)
  if (APIresponse.status === 200) {
    const data = await APIresponse.json()
    return data
  } else {
    notFound()
    return
  }
}

const renderPokemon = async pokemon => {
  const data = await fetchPokemon(pokemon)

  const animatedPokemon =
    data['sprites']['versions']['generation-v']['black-white']['animated'][
      'front_default'
    ]

  /* const pngPokemon = data.sprites.front_default */
  const pngPokemon =
    data['sprites']['other']['official-artwork']['front_default']

  pokemonID.textContent = data.id + ' -'
  pokemonName.textContent = data.name
  /* pokemonImg.src = animatedPokemon */
  searchPokemon = data.id
  if (animatedPokemon === null) {
    pokemonImg.src = pngPokemon
  } else {
    pokemonImg.src = animatedPokemon
  }

  /* console.log(data) */
  input.value = ''
}

form.addEventListener('submit', event => {
  event.preventDefault()
  /* console.log(input.value) */
  renderPokemon(input.value.toLowerCase())
})

/* fetchPokemon(2222) */
function notFound() {
  pokemonID.textContent = ''
  pokemonName.textContent = 'Not Found' + String.fromCodePoint(0x1f62d)
  input.value = ''
  pokemonImg.src = 'img/not.png'
}

function loading() {
  pokemonName.textContent = 'loading'
  pokemonID.textContent = ''
  pokemonImg.src = 'img/loading.gif'
}

btnPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

btnNext.addEventListener('click', () => {
  if (searchPokemon < 905) {
    searchPokemon += 1
    renderPokemon(searchPokemon)
  }
})

renderPokemon(searchPokemon)
  
  })()
