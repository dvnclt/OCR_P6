import { scoreUrlPage1, topActionMoviesURL, topBiographyMoviesURL, genreBaseUrl } from "./config.js";

import { getBestMovie, getTopMovies } from "./movies.js";
import { loadGenres, handleGenreSelection } from "./utils.js";


// Fonction principale qui coordonne l'exécution des différentes tâches
export async function initializeApplication() {
    
    // Récupère le meilleur film
    await getBestMovie(scoreUrlPage1);

    // Récupère les six meilleurs films
    await getTopMovies(scoreUrlPage1, '.top_movies_container');

    //Récupère les six meilleurs films pour une catégorie 1 donnée
    await getTopMovies(topActionMoviesURL, '.genre1_top_movies_container');

    //Récupère les six meilleurs films pour une catégorie 2 donnée
    await getTopMovies(topBiographyMoviesURL, '.genre2_top_movies_container');

    //Récupère les six meilleurs films pour la catégorie sélectionnée
    await handleGenreSelection();
    await loadGenres(genreBaseUrl);

}