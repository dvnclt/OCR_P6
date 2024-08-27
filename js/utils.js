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