document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamData = urlParams.get('team');
    const team = JSON.parse(decodeURIComponent(teamData));

    const teamNameElement = document.getElementById('team-name');
    const teamContainer = document.getElementById('team-container');

    teamNameElement.textContent = team.name;

    function createPokemonCard(pokemon) {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow-lg flex flex-col items-center';

        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        img.alt = pokemon.name;
        img.className = 'h-24 w-24 mb-2';

        const name = document.createElement('h2');
        name.textContent = pokemon.name;
        name.className = 'text-lg font-semibold capitalize';

        const id = document.createElement('p');
        id.textContent = `ID: ${pokemon.id}`;
        id.className = 'text-gray-500';

        const types = document.createElement('p');
        types.textContent = `Type: ${pokemon.type.join(', ')}`;
        types.className = 'text-gray-500 capitalize';

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(id);
        card.appendChild(types);

        teamContainer.appendChild(card);
    }

    team.pokemons.forEach(pokemon => {
        createPokemonCard(pokemon);
    });
});
