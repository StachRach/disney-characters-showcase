const ul = document.querySelector('ul');
const fav = document.querySelector('#favs');
const API = 'https://api.disneyapi.dev/character?pageSize=100';
const characters = [];
const temp = [];

function fetchCharacters() {
    fetch(API)
    .then(response => response.json())
    .then(data => {
        console.log(`Amount of fetched characters: ${data.data.length}`);
        temp.push(data.data);
        showCharacters(data.data);
    })
    .catch((error) => console.log(error));
}

function createListItem(list, character) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const span = document.createElement('span');
    const name = document.createElement('p');
    const filmCounts = document.createElement('span');
    const btnContainer = document.createElement('span');
    const favBtn = document.createElement('button');

    li.className = 'character';

    img.src = character.imageUrl;
    img.alt = 'Not found...';
    img.className = 'pic';

    filmCounts.className = 'film';
    filmCounts.textContent = character.films.length;

    name.textContent = character.name;
    span.appendChild(name);
    
    if (character.tvShows.length > 0) {
        const tvShows = document.createElement('img');
        tvShows.className = 'tv';
        tvShows.src = 'tv.png';
        tvShows.alt = 'TV series';
        span.appendChild(tvShows);

        const info = document.createElement('span');

        span.className = 'info-container';
        info.className = 'info';

        info.textContent = character.tvShows.join(', ');

        span.appendChild(info);
    }

    btnContainer.className = 'btn-container';

    favBtn.textContent = 'Favorite';
    btnContainer.appendChild(favBtn);

    favBtn.addEventListener('click', () => {
        character.favorite = !character.favorite;
        showFavorites();
    });

    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(filmCounts);
    li.appendChild(btnContainer);
    list.appendChild(li);
}

function showCharacters(data) {
    data.forEach((character, i = 0) => {
        if (character.films.length > 0) {
            const obj = {
                id: i,
                name: character.name,
                imageUrl: character.imageUrl,
                films: character.films,
                tvShows: character.tvShows,
                favorite: false,
            };

            i++;
            characters.push(obj);
            createListItem(ul, obj);
        }
    });
}

function showFavorites() {
    fav.querySelectorAll(':scope > .character').forEach(n => n.remove());
    const favorites = characters.filter(character => character.favorite);
    favorites.forEach(favorite => createListItem(fav, favorite));
}

fetchCharacters();