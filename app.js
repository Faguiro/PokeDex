// Data: 18/12/2022
//Fabiano Guimarães da Rocha
// Aplicação com JavaScript puro: Como desenvolver uma pokedex
//Professor: Roger Melo
$(document).ready(function () {

  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  const generatePokeminPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then((response => response.json()))
  )

  const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    accumulator += `<li class="card  ${elementTypes[0]} hide">
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
  const campo = document.querySelector('.form-control')
  const sugestoes = document.querySelector('.sugestoes')

  function autoComplete(nome) {
    const destino = [];
    let itens = document.getElementsByClassName("card-title")

    for (i = 0; i < itens.length; i++) {

      if (itens[i].innerHTML.toLowerCase().includes(nome.toLowerCase())) {
        destino.push(itens[i].innerHTML)
        $(itens[i]).parent().removeClass("hide")
      } else $(itens[i]).parent().addClass("hide")

    }
    console.log(destino)
    return destino.filter((valor) => {
      const valorMinusculo = valor.toLowerCase()
      const nomeMinusculo = nome.toLowerCase()
      return valorMinusculo.includes(nomeMinusculo)
    })
  }

  campo.addEventListener('keydown', ({ target }) => {
    const dadosDoCampo = target.value
    if (dadosDoCampo.length) {
      const autoCompleteValores = autoComplete(dadosDoCampo)
      /* sugestoes.innerHTML = ` ${autoCompleteValores.map((value) => { return ( `<p id="sugest">${value}</p>` ) }).join('')} ` */
    }
  })

  $('.button-all').click(function (event) {

 
    if($(this).text()==="Todos"){
      $(this).text("Limpar")
    } else $(this).text("Todos")

    const cards = document.querySelectorAll(".card")
    console.log(cards.length)
    event.preventDefault()
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].classList.contains('active')) {
        cards[i].classList.remove('active')
        cards[i].classList.add('hide')
      }
      else {
        cards[i].classList.add('active')
        cards[i].classList.remove('hide')
      }
    }
  })
})

//No refactoring 
/* const fetchPokemon = () => { const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}` const pokemonPromises = [] for (let i = 1; i <= 150; i++) { pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())) } Promise.all(pokemonPromises) .then(pokemons => { const lisPokemons = pokemons.reduce((accumulator, pokemon) => { const types= pokemon.types.map(typeInfo => typeInfo.type.name) accumulator += `<li class="card  ${types[0]}"> <h2 class="card-title">${pokemon.id}.${pokemon.name}</h2> <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"> <p class="card-subtitle">${types.join(' | ')}</p> </li>` return accumulator }, '') const ul = document.querySelector("[data-js='pokedex']") ul.innerHTML = lisPokemons }) } fetchPokemon() */
