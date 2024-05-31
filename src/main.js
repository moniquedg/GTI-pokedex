document.addEventListener('DOMContentLoaded', () => {
    const pokemonContainer = document.getElementById('pokemon-container');
    const teamList = document.getElementById('team-list');
    const teamNameInput = document.getElementById('team-name');
    const saveTeamButton = document.getElementById('save-team');

    let selectedPokemons = [];

    async function fetchPokemon(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
    }

    function createPokemonCard(pokemon) {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow-lg flex flex-col items-center cursor-pointer';
        card.onclick = () => selectPokemon(pokemon);

        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;
        img.alt = pokemon.name;
        img.className = 'h-24 w-24 mb-2';

        const name = document.createElement('h2');
        name.textContent = pokemon.name;
        name.className = 'text-lg font-semibold capitalize';

        const id = document.createElement('p');
        id.textContent = `ID: ${pokemon.id}`;
        id.className = 'text-gray-500';

        const types = document.createElement('p');
        types.textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;
        types.className = 'text-gray-500 capitalize';

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(id);
        card.appendChild(types);

        pokemonContainer.appendChild(card);
    }

    function selectPokemon(pokemon) {
        if (selectedPokemons.length < 6 && !selectedPokemons.includes(pokemon)) {
            selectedPokemons.push(pokemon);
            updateTeamList();
        }
    }

    function updateTeamList() {
        teamList.innerHTML = '';
        selectedPokemons.forEach(pokemon => {
            const li = document.createElement('li');
            li.textContent = pokemon.name;
            li.className = 'capitalize';
            teamList.appendChild(li);
        });
    }

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

    async function displayPokemons() {
        for (let i = 1; i <= 150; i++) { // Alterado de 20 para 150
            const pokemon = await fetchPokemon(i);
            createPokemonCard(pokemon);
        }
    }
  
    displayPokemons();
});
