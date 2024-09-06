// initializer.js
import { scoreUrlPage1, topActionMoviesURL, topBiographyMoviesURL, genreBaseUrl } from "./config.js";
import { getBestMovie, getTopMovies } from "./movies.js";
import { getTopMoviesByGenre, initializeDropdown, displayMore } from "./utils.js";

// Fonction principale qui coordonne l'exécution des différentes tâches
export async function initializeApp() {
    // Récupère le meilleur film
    await getBestMovie(scoreUrlPage1);

    // Récupère les six meilleurs films
    await getTopMovies(scoreUrlPage1, '.top_movies_container');

    // Récupère les six meilleurs films pour un genre 1 donné
    await getTopMovies(topActionMoviesURL, '.genre1_top_movies_container');

    // Récupère les six meilleurs films pour un genre 2 donné
    await getTopMovies(topBiographyMoviesURL, '.genre2_top_movies_container');

    // Récupère les six meilleurs films pour le genre sélectionné
    await getTopMoviesByGenre(genreBaseUrl);

    // Appelle de la fonction responsive pour l'affichage de films supplémentaires
    displayMore('.top_movies_container', '#show-more-btn-genre0');
    displayMore('.genre1_top_movies_container', '#show-more-btn-genre1');
    displayMore('.genre2_top_movies_container', '#show-more-btn-genre2');
    displayMore('.genre_top_movies_container', '#show-more-btn-genreX');

    // Initialiser le comportement du menu déroulant
    initializeDropdown();
}
