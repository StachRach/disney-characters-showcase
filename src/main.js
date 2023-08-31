const ul = document.querySelector('ul');
const fav = document.querySelector('#favs');
const input = document.querySelector('input');
const API = 'https://api.disneyapi.dev/character?pageSize=100';
const characters = [];

function fetchCharacters() {
    fetch(API)
    .then(response => response.json())
    .then(data => {
        console.log(`Amount of fetched characters: ${data.data.length}`);
        showCharacters(data.data);
    })
    .catch((error) => console.error(error));
}

function createListItem(list, character) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const span = document.createElement('span');
    const name = document.createElement('p');
    const filmCounts = document.createElement('span');
    const btnContainer = document.createElement('span');
    const favBtn = document.createElement('button');
    const star = document.createElement('img');

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
        tvShows.src = 'images/tv.png';
        tvShows.alt = 'TV series';
        span.appendChild(tvShows);

        const info = document.createElement('span');

        span.className = 'info-container';
        info.className = 'info';

        info.textContent = character.tvShows.join(', ');

        span.appendChild(info);
    }

    btnContainer.className = 'btn-container';

    star.src = character.btnSource;
    star.alt = 'star';
    star.className = 'star';

    favBtn.appendChild(star);
    btnContainer.appendChild(favBtn);

    favBtn.addEventListener('click', () => {
        character.favorite = !character.favorite;
        character.btnSource = character.favorite ? 'images/star.png' : 'images/empty-star.png';
        star.src = character.btnSource;

        showDisney();
        showFavorites();
    });

    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(filmCounts);
    li.appendChild(btnContainer);
    list.appendChild(li);
}

function showCharacters(data) {
    data.forEach((character, i) => {
        if (character.films.length > 0) {
            const obj = {
                id: i,
                name: character.name,
                imageUrl: character.imageUrl,
                films: character.films,
                tvShows: character.tvShows,
                favorite: false,
                btnSource: 'images/empty-star.png',
            };

            characters.push(obj);
            createListItem(ul, obj);
        }
    });

    makeTopList();
}

function showFavorites() {
    fav.querySelectorAll(':scope > .character').forEach(n => n.remove());
    const favorites = characters.filter(character => character.favorite);
    favorites.forEach(favorite => createListItem(fav, favorite));
}

function showDisney() {
    ul.querySelectorAll(':scope > .character').forEach(n => n.remove());
    characters.forEach(character => createListItem(ul, character));
}

function makeTopList() {
    const sorted = characters.slice().sort((a, b) => b.films.length - a.films.length);
    const images = document.querySelectorAll('.top-char > img');
    const names = document.querySelectorAll('.name');
    const films = document.querySelectorAll('.film-val');
    const tvs = document.querySelectorAll('.tv-val');

    images.forEach((image, i) => {
        image.src = sorted[i].imageUrl;
        image.alt = sorted[i].name;

        names[i].textContent = sorted[i].name;
        films[i].textContent = sorted[i].films.length;
        tvs[i].textContent = sorted[i].tvShows.length;
    });
}

fetchCharacters();

input.addEventListener('input', e => {
    const value = e.target.value.toLowerCase();
    const filtered = characters
        .filter(character => character.name.toLowerCase().includes(value))
        .filter(character => character.favorite);
    fav.querySelectorAll(':scope > .character').forEach(n => n.remove());
    filtered.forEach(character => createListItem(fav, character));
})