import { fetchAPI, fetchTopMovies } from "./api.js"
import { initModal } from "./modal.js";


// Fonction pour obtenir le meilleur film
export async function getBestMovie(url) {

    // Appelle fetchAPI et attend les données
    const data = await fetchAPI(url);
    // Appelle fetchAPI une seconde fois pour obtenir les détails du meilleur film
    const bestMovie = await fetchAPI(data.results[0].url);

    // Met à jour les éléments HTML avec les détails du meilleur film
    document.querySelector(".best_movie img").src = bestMovie.image_url;
    document.querySelector(".best_movie .movie_title").textContent = bestMovie.original_title;
    document.querySelector(".best_movie .description").textContent = bestMovie.description;

    // Sélection le bouton détail pour la fenêtre modale
    document.querySelector('.btn_details').addEventListener('click', function() {
    initModal(bestMovie)
    });
}


// Fonction pour obtenir les meilleurs films
export async function getTopMovies(url, cssContainer) {

    // Appelle fetchTopMovies et attend les données
    const topMovies = await fetchTopMovies(url)

    // Affiche les films dans le conteneur
    const container = document.querySelector(cssContainer);
    container.innerHTML = '';

    topMovies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img src="${movie.image_url}" alt="${movie.title}">
            <div class="overlay">
                <h3 class="movie_title">${movie.title}</h3>
                <button class="overlay_btn_details" data-url="${movie.url}">Détails</button>
            </div>
        `;

        container.appendChild(movieElement);
    });

    // Ajoute un événement pour chaque bouton Détails
    document.querySelectorAll('.overlay_btn_details').forEach(button => {
        button.addEventListener('click', async function() {
        // Récupère l'URL du film à partir de l'attribut data-url
        const movieUrl = this.getAttribute('data-url');

        // Appelle fetchAPI pour obtenir les détails du film
        const movieDetails = await fetchAPI(movieUrl);

        // Affiche les détails dans la modale
        initModal(movieDetails);
        });
    });
}


// Fonction pour afficher les films selon le genre sélectionné
export async function getTopGenreMovies(baseUrl, genreName) {
    try {
        // Encode le nom du genre pour l'URL
        const encodedGenreName = encodeURIComponent(genreName);
        // Construit l'url pour récupérer les films par genre
        const url = `${baseUrl}${encodedGenreName}&page=1&sort_by=-imdb_score`;
        
        // Appelle getTopMovies et attend les données
        await getTopMovies(url, '.top_genre_movies_container');

    } catch (error) {
        console.error("Erreur lors de la récupération des films:", error);
    }
}