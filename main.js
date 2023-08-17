const ul = document.querySelector('ul');
const fav = document.querySelector('#favs');
const API = 'https://api.disneyapi.dev/character?pageSize=100';
const characters = [];

function showCharacters(data) {
    data.forEach((character, i = 0) => {
        if (character.films.length > 0) {
            const obj = {
                id: i,
                name: character.name,
                imageUrl: character.imageUrl,
                films: character.films,
                tvSeries: character.tvSeries,
                favorite: false,
            };

            i++;
            characters.push(obj);
            createListItem(ul, obj);
        }
    });
}

function showList(character) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const span = document.createElement('span');
    const filmCounts = document.createElement('span');

    img.src = character.imageUrl;
    img.alt = 'Not found...';
    img.className = 'pic';

    span.textContent = character.name;

    filmCounts.className = 'film';
    filmCounts.textContent = character.films.length;

    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(filmCounts);
    ul.appendChild(li);
}

function createListItem(list, character) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const span = document.createElement('span');
    const filmCounts = document.createElement('span');

    img.src = character.imageUrl;
    img.alt = 'Not found...';
    img.className = 'pic';

    span.textContent = character.name;

    filmCounts.className = 'film';
    filmCounts.textContent = character.films.length;

    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(filmCounts);
    list.appendChild(li);
}

function showFavorites() {
    const favorites = characters.filter(character => character.favorite);
    favorites.forEach(favorite => createListItem(fav, favorite));
}

function fetchCharacters() {
    fetch(API)
    .then(response => response.json())
    .then(data => {
        console.log(`Amount of fetched characters: ${data.data.length}`);
        showCharacters(data.data);
    })
    .catch((error) => console.log(error));
}

fetchCharacters();