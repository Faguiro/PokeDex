// Data: 18/12/2022
//Fabiano Guimarães da Rocha
// Aplicação com JavaScript puro: Como desenvolver uma pokedex
//Professor: Roger Melo

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokeminPromises = () => Array(150).fill().map((_, index) =>
  fetch(getPokemonUrl(index + 1)).then((response => response.json()))
)

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
  const elementTypes = types.map(typeInfo => typeInfo.type.name)
  accumulator += `<li class="card  ${elementTypes[0]}">
      <h2 class="card-title">${id}.${name}</h2>
      <img class="card-image" alt="${name}" 
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
      <p class="card-subtitle">${elementTypes.join(' | ')}</p>
      </li>`
  return accumulator
}, '')

const InsertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector("[data-js='pokedex']")
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokeminPromises()
Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(InsertPokemonsIntoPage)



//No refactoring 
/* const fetchPokemon = () => { const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}` const pokemonPromises = [] for (let i = 1; i <= 150; i++) { pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())) } Promise.all(pokemonPromises) .then(pokemons => { const lisPokemons = pokemons.reduce((accumulator, pokemon) => { const types= pokemon.types.map(typeInfo => typeInfo.type.name) accumulator += `<li class="card  ${types[0]}"> <h2 class="card-title">${pokemon.id}.${pokemon.name}</h2> <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"> <p class="card-subtitle">${types.join(' | ')}</p> </li>` return accumulator }, '') const ul = document.querySelector("[data-js='pokedex']") ul.innerHTML = lisPokemons }) } fetchPokemon() */
