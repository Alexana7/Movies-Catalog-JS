const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const apiKey = '19c43354-563e-4c55-b9ff-4e50b69a8dbc';
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
}

// fetch(`${url}top`, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err));

const filmsWrapper = document.querySelector('.films');


async function fetchAndRenderFilms() {
   
    const response = await fetch(`${url}top`, options);
    const data = await response.json()
    console.log(data)
    console.log(data.films)

   for (film of data.films) {
    console.log(film)
    const html = `<div class="card">
                    <img class="card-image" src=${film.posterUrlPreview}>
                    <h3 class="card-title">${film.nameEn}</h3>
                    <p class="card-year">${film.year}</p>
                    <p class="card-rate">Рейтинг: ${film.rating}</p>
                </div>`;
    filmsWrapper.insertAdjacentHTML('beforeend', html)
   }
   

}
fetchAndRenderFilms().catch(err => console.log(err));