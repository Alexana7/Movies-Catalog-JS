const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const apiKey = '19c43354-563e-4c55-b9ff-4e50b69a8dbc';
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
}

const moviesWrapper = document.querySelector('.films');

async function fetchData(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;

}

async function fetchAndRenderMovies() {
    const data = await fetchData(`${url}top`, options)
    renderMovies(data.films)

}

function renderMovies(movies) {
    for (movie of movies) {
        console.log(movie)
        const html = `<div class="card">
                        <img class="card-image" src=${movie.posterUrlPreview}>
                        <h3 class="card-title">${movie.nameEn}</h3>
                        <p class="card-year">${movie.year}</p>
                        <p class="card-rate">Рейтинг: ${movie.rating}</p>
                    </div>`;
        moviesWrapper.insertAdjacentHTML('beforeend', html)
        }

}
   



fetchAndRenderMovies().catch(err => console.log(err));