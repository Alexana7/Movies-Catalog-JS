// настройки

const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const apiKey = 'f4f926d1-0460-4a27-99a0-e32174cd75fa';
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
    if (data.pagesCount > 1) pageNumber++

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
    let movie;
    for (movie of movies) {
        
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.id = movie.filmId;
        card.onclick = openMovieDetails;

        const html = `
                        <img class="card-image" src=${movie.posterUrlPreview}>
                        <h3 class="card-title">${movie.nameRu}</h3>
                        <p class="card-year">${movie.year}</p>
                        <p class="card-rate">Рейтинг: ${movie.rating}</p>
                    `;

        card.insertAdjacentHTML('afterbegin', html)
        moviesWrapper.insertAdjacentElement('beforeend', card)
    }
}

async function openMovieDetails(e) {

    //get movie id
   const id = e.currentTarget.id;

   //get movie data by id
    const movieDetails =  await fetchData(url + id, options); 
    renderMovieData(movieDetails);   
}

function renderMovieData (movie) {

    // delete container, if it's already wes rendered
    document.querySelector('.container-right') && document.querySelector('.container-right').remove();

    //1. render container-right
    
    const containerRight = document.createElement('div');

    //2. render button close, delete container by click
    
    containerRight.classList.add('container-right');
    document.body.insertAdjacentElement('beforeend', containerRight);
    
    const btnClose = document.createElement('button');
    btnClose.classList.add('button-close');
    btnClose.innerHTML = '<img src="./img/cross.svg" alt="close" width="24">';
    containerRight.insertAdjacentElement('afterbegin', btnClose);

    btnClose.onclick = () => {
        containerRight.remove()
    }

    //3. film-details 

    const html = `
                    <div class="film">
                        <div class="film__title">${movie.nameRu}</div>
                        <div class="film__img">
                            <img src=${movie.posterUrl} alt="Cover">
                        </div>
                        <div class="film__desc">
                            <p class="film__details">${movie.year}</p>
                            <p class="film__details">Рейтинг IMDB: ${movie.ratingImdb}</p>
                            <p class="film__details">Продолжительность: ${formatMovieLength(movie.filmLength)}</p>
                            <p class="film__details">Страна: ${formatCountry(movie.countries)}</p>
                            <p class="film__text">${movie.description}</p>
                    </div>
                `
                containerRight.insertAdjacentHTML('beforeend', html)   

}

function formatMovieLength(value) {
    let length = '';

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if(hours > 0) length += hours + ' ч. '
    if(minutes > 0) length += minutes + ' мин.'
    
    return length;   
}

function formatCountry(data) {
    let countriesString = '';

    for (country of data) {
        countriesString += country.country
        if(data.indexOf(country) + 1 < data.length) countriesString += ', '
    }  
        return countriesString
}
  
fetchAndRenderMovies().catch(err => console.log(err));