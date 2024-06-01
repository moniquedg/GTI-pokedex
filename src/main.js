document.addEventListener('DOMContentLoaded', () => {
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonIdName = document.getElementById('pokemon-id-name');
    const pokemonTypes = document.getElementById('pokemon-types');
    const addToTeamButton = document.getElementById('add-to-team');
    const prevPokemonButton = document.getElementById('prev-pokemon');
    const nextPokemonButton = document.getElementById('next-pokemon');
    const saveTeamButton = document.getElementById('save-team');
    const teamNameInput = document.getElementById('team-name');

    let currentPokemonIndex = 0;
    const selectedPokemons = [];
    const pokemons = [];

    async function fetchPokemon(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
    }

    async function loadPokemons() {
        for (let i = 1; i <= 150; i++) { // Alterado de 20 para 150
            const pokemon = await fetchPokemon(i);
            pokemons.push(pokemon);
        }
        displayPokemon(pokemons[currentPokemonIndex]);
    }

    function displayPokemon(pokemon) {
        pokemonImage.src = pokemon.sprites.front_default;
        pokemonImage.alt = pokemon.name;
        pokemonIdName.textContent = `${pokemon.id} - ${pokemon.name}`;
        pokemonTypes.textContent = `Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`;
    }

    function selectPokemon(pokemon) {
        if (!selectedPokemons.includes(pokemon) && selectedPokemons.length < 6) {
            selectedPokemons.push(pokemon);
            addToTeamButton.classList.add('bg-green-500');
            addToTeamButton.textContent = "Selecionado!";
        } else {
            alert('Você já selecionou este Pokémon ou atingiu o limite de 6 Pokémons.');
        }
    }

    function updateTeamList() {
        // Atualiza a lista de Pokémons selecionados (se necessário)
    }

    addToTeamButton.addEventListener('click', () => {
        const currentPokemon = pokemons[currentPokemonIndex];
        selectPokemon(currentPokemon);
        updateTeamList();
    });

    prevPokemonButton.addEventListener('click', () => {
        if (currentPokemonIndex > 0) {
            currentPokemonIndex--;
            displayPokemon(pokemons[currentPokemonIndex]);
            addToTeamButton.classList.remove('bg-green-500');
            addToTeamButton.textContent = "Adicionar ao Time";
        }
    });

    nextPokemonButton.addEventListener('click', () => {
        if (currentPokemonIndex < pokemons.length - 1) {
            currentPokemonIndex++;
            displayPokemon(pokemons[currentPokemonIndex]);
            addToTeamButton.classList.remove('bg-green-500');
            addToTeamButton.textContent = "Adicionar ao Time";
        }
    });

    saveTeamButton.addEventListener('click', () => {
        const teamName = teamNameInput.value.trim();
        if (teamName && selectedPokemons.length > 0) {
            const team = {
                name: teamName,
                pokemons: selectedPokemons.map(pokemon => ({
                    id: pokemon.id,
                    name: pokemon.name,
                    type: pokemon.types.map(type => type.type.name)
                }))
            };
            const teamData = encodeURIComponent(JSON.stringify(team));
            window.location.href = `team.html?team=${teamData}`;
        } else {
            alert('Por favor, insira um nome para o time e selecione pelo menos um Pokémon.');
        }
    });

    loadPokemons();
});
