import { fetchAllGenres } from "./api.js";
import { getTopGenreMovies } from "./movies.js";


// Fonction pour charger les genres dans le menu déroulant
export async function loadGenres(genresUrl) {
    try {
        // Récupère tous les genres en utilisant fetchAllGenres
        const genres = await fetchAllGenres(genresUrl);

        // Sélectionne le menu déroulant pour les catégories
        const categoriesMenu = document.getElementById('categories');
        
        // Réinitialise les options
        categoriesMenu.innerHTML = '';

        // Ajoute une option pour chaque genre
        genres.forEach((genre, index) => {
            const option = document.createElement('option');
            // Utilise l'ID du genre comme valeur
            option.value = genre.id;
            // Utilise le nom du genre comme texte
            option.textContent = genre.name;
            if (index === 0) {
                // Sélectionne le premier genre par défaut
                option.selected = true;
            }
            categoriesMenu.appendChild(option);
        });

        // Affiche les films pour le genre par défaut
        if (genres.length > 0) {
            const defaultGenre = genres[0];
            const baseUrl = 'http://localhost:8000/api/v1/titles/?genre=';
            getTopGenreMovies(baseUrl, defaultGenre.name); // Affiche les films du genre par défaut
        }

    } catch (error) {
        console.error("Erreur lors de la récupération des genres:", error);
    }
}


export async function handleGenreSelection() {
    // Sélectionne le menu déroulant pour les catégories
    const categoriesMenu = document.getElementById('categories');

    // Ajoute l'écouteur d'événement pour le changement de sélection
    categoriesMenu.addEventListener('change', async function() {
        const selectedGenreId = this.value;

        if (selectedGenreId) {
            // Récupère la liste des genres
            const genres = await fetchAllGenres('http://localhost:8000/api/v1/genres/');
            const selectedGenre = genres.find(genre => genre.id === parseInt(selectedGenreId));
            
            if (selectedGenre) {
                const genreName = selectedGenre.name;
                
                // URL de base pour les genres de films
                const baseUrl = 'http://localhost:8000/api/v1/titles/?genre=';
                
                // Appelle la fonction pour afficher les films selon le genre
                getTopGenreMovies(baseUrl, genreName);
            }
        }
    });

    // Déclenche le changement pour charger les films du premier genre par défaut
    const event = new Event('change');
    categoriesMenu.dispatchEvent(event);
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