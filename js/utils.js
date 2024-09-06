import { fetchAllGenres } from "./api.js";
import { getTopGenreMovies } from "./movies.js";


// Fonction pour charger les genres dans le menu déroulant
export async function getTopMoviesByGenre(genresUrl) {
    try {
        // Récupère tous les genres en utilisant fetchAllGenres
        const genres = await fetchAllGenres(genresUrl);

        // Sélectionne les éléments du menu déroulant personnalisé
        const genreSelected = document.querySelector('.genre-selected');
        const genreItems = document.querySelector('.genre-items');

        // Réinitialise les options
        genreItems.innerHTML = '';

        // Ajoute une option pour chaque genre
        genres.forEach((genre, index) => {
            const genreDiv = document.createElement('div');
            genreDiv.textContent = genre.name;
            genreDiv.dataset.value = genre.id;

            // Ajoute un élément pour le symbole check
            const checkSymbol = document.createElement('span');
            checkSymbol.textContent = '✅'; // Symbole check
            checkSymbol.classList.add('check-symbol');
            checkSymbol.style.visibility = 'hidden'; // Cacher par défaut
            genreDiv.appendChild(checkSymbol);

            // Ajoute l'événement de sélection pour chaque genre
            genreDiv.addEventListener('click', function() {
                // Retire la classe 'selected' des autres éléments et masque leur check symbol
                genreItems.querySelectorAll('.selected').forEach(item => {
                    item.classList.remove('selected');
                    item.querySelector('.check-symbol').style.visibility = 'hidden';
                });

                // Ajoute la classe 'selected' à l'élément cliqué et montre le check symbol
                genreDiv.classList.add('selected');
                checkSymbol.style.visibility = 'visible';

                // Met à jour le texte dans l'élément genreSelected
                genreSelected.textContent = genre.name;
                genreItems.classList.add('dropdown-hide'); // Masque le menu après sélection

                // Appelle la fonction pour charger les films selon le genre sélectionné
                const baseUrl = 'http://localhost:8000/api/v1/titles/?genre=';
                getTopGenreMovies(baseUrl, genre.name);
            });

            // Si c'est le premier genre, le sélectionne par défaut
            if (index === 0) {
                genreSelected.textContent = genre.name;
                genreDiv.classList.add('selected');
                checkSymbol.style.visibility = 'visible';

                // Charge les films pour le genre par défaut
                const baseUrl = 'http://localhost:8000/api/v1/titles/?genre=';
                getTopGenreMovies(baseUrl, genre.name);
            }

            // Ajoute chaque genre au conteneur d'options
            genreItems.appendChild(genreDiv);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des genres:", error);
    }
}



// Fonction pour initialiser le comportement du menu déroulant personnalisé
export function initializeDropdown() {
    // Sélectionne les éléments du menu déroulant
    const genreSelected = document.querySelector(`${".dropdown"} .genre-selected`);
    const genreItems = document.querySelector(`${".dropdown"} .genre-items`);

    // Ajoute un écouteur d'événement pour afficher/masquer le menu déroulant
    genreSelected.addEventListener('click', function() {
        genreItems.classList.toggle('dropdown-hide');
    });
    // Ajoute un écouteur global pour fermer le menu lorsqu'on clique en dehors
    document.addEventListener('click', function(event) {
        if (!genreSelected.contains(event.target)) {
            genreItems.classList.add('dropdown-hide');
        }
    });
}


// Fonction pour vérifier et obtenir l'URL valide d'une image de film
export async function getValidImageUrl(imageUrl, movieId) {
    // Définition des images de fallback spécifiques aux films
    const fallbackImages = {
        259534: '../assets/images/ramayana_the_legend_of_prince_rama.jpg',
        70696: '../assets/images/dvaergen.jpg',
        75467: '../assets/images/az_otodik_pecset.jpg',
        64116: '../assets/images/cera_una_volta_il_west.jpg',
        59578: '../assets/images/per_qualche_dollaro_in_piu.jpg',
    };

    try {
        // Effectue une requête fetch pour vérifier si l'image existe
        const response = await fetch(imageUrl);
        // Si l'image existe (status 200), retourne l'URL de l'image d'origine
        if (response.ok) {
            return imageUrl;
        } else {
            // Si l'image n'existe pas (ex: 404), retourne l'URL de fallback spécifique au film
            return fallbackImages[movieId];
        }
    } catch (error) {
        // En cas d'erreur (ex: problème de réseau), retourne l'URL de fallback spécifique au film
        return fallbackImages[movieId];
    }
}


// Fonction pour afficher ou masquer les films (responsive)
export function displayMore(container, button) {
    const showMoreBtn = document.querySelector(button);
    const movieContainer = document.querySelector(container);

    // Fonction pour ajuster l'affichage des films selon la taille de l'écran
    function adjustDisplay() {
        const screenWidth = window.innerWidth;
        const movies = movieContainer.querySelectorAll('.movie');

        if (screenWidth > 1024) {
            // Grand écran, toujours afficher 6 films
            movies.forEach((movie, index) => {
                movie.style.display = (index < 6) ? 'block' : 'none';
            });
            showMoreBtn.style.display = 'none'; // Cache le bouton sur grand écran
        } else if (screenWidth <= 1024 && screenWidth >= 730) {
            // Écran intermédiaire, afficher 4 films par défaut
            movies.forEach((movie, index) => {
                movie.style.display = (index < 4) ? 'block' : 'none';
            });
            showMoreBtn.style.display = 'inline-block'; // Affiche le bouton sur petit écran
            showMoreBtn.textContent = 'Voir plus'; // Réinitialise le texte du bouton
        } else {
            // Petit écran (inférieur à 730px), afficher 1 film par défaut
            movies.forEach((movie, index) => {
                movie.style.display = (index < 2) ? 'block' : 'none';
            });
            showMoreBtn.style.display = 'inline-block'; // Affiche le bouton sur petit écran
            showMoreBtn.textContent = 'Voir plus'; // Réinitialise le texte du bouton
        }
    }

    // Appelle cette fonction au chargement de la page pour s'adapter à la taille actuelle de l'écran
    adjustDisplay();

    // Écoute les redimensionnements de la fenêtre et ajuste l'affichage des films
    window.addEventListener('resize', adjustDisplay);

    // Afficher ou cacher les films supplémentaires au clic sur le bouton
    showMoreBtn.addEventListener('click', function () {
        const isShowingMore = showMoreBtn.textContent === 'Afficher moins';
        const movies = movieContainer.querySelectorAll('.movie');

        if (isShowingMore) {
            // Masquer les films supplémentaires en fonction de la taille de l'écran
            const screenWidth = window.innerWidth;
            const limit = screenWidth < 730 ? 2 : (screenWidth < 1024 ? 4 : 6);
            
            movies.forEach((movie, index) => {
                if (index >= limit) {
                    movie.style.display = 'none'; // Cache les films au-delà de la limite
                }
            });
            showMoreBtn.textContent = 'Voir plus'; // Change le texte du bouton
        } else {
            // Afficher tous les films
            movies.forEach((movie) => {
                movie.style.display = 'block'; // Affiche tous les films
            });
            showMoreBtn.textContent = 'Afficher moins'; // Change le texte du bouton
        }
    });
}


