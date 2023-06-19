// настройки

const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const apiKey = '19c43354-563e-4c55-b9ff-4e50b69a8dbc';
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
}

// DOM elements

const moviesWrapper = document.querySelector('.films');
const loader = document.querySelector('.loader-wrapper');
const btnShowMore = document.querySelector('.show-more');
btnShowMore.onclick = fetchAndRenderMovies;

let pageNumber = 1;


// get and render TOP 250 movies
async function fetchAndRenderMovies() {

    // show preloader
    loader.classList.remove('none')

    //fetch movies data
    const data = await fetchData(`${url}top?page=${pageNumber}`, options);
    console.log(pageNumber)
    if (data.pagesCount > 1) pageNumber++
    
    console.log(data)

    ////render button 'show-more', if the next page is availible
     if(data.pagesCount > 1) btnShowMore.classList.remove('none')

    //Hide preloader
    
    loader.classList.add('none')

    //render movies on page
    renderMovies(data.films)

    //hide button 'show-more', if the next page is not availible
    if(pageNumber > data.pagesCount) btnShowMore.classList.add('none')

}
async function fetchData(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;

}

function renderMovies(movies) {
    for (movie of movies) {
        const html = `<div class="card">
                        <img class="card-image" src=${movie.posterUrlPreview}>
                        <h3 class="card-title">${movie.nameRu}</h3>
                        <p class="card-year">${movie.year}</p>
                        <p class="card-rate">Рейтинг: ${movie.rating}</p>
                    </div>`;
        moviesWrapper.insertAdjacentHTML('beforeend', html)
        }

}
   

fetchAndRenderMovies().catch(err => console.log(err));