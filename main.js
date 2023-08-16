const ol = document.querySelector('ol');
const ul = document.querySelector('ul');
const API = 'https://api.disneyapi.dev/character?pageSize=100';
let characters = [];

function showCharacters(data) {
    data.forEach(character => {
        if (character.films.length > 0) {
            characters.push(character);
            showList(character);
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

function fetchCharacters() {
    fetch(API)
    .then(response => response.json())
    .then(data => {
        console.log(data.data.length);
        showCharacters(data.data);
    })
    .catch((error) => console.log(error));
}

fetchCharacters();