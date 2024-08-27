

// Récupère la liste des films depuis l'URL
export async function fetchAPI(url) {
    try{
        // Envoie la requête fetch et attend la réponse
        let response = await fetch(url);
        // Vérifie si la réponse est correcte, sinon message d'erreur
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
        // Convertit la réponse en JSON et la retourne si la réponse est correcte
        let data = await response.json();
        return data;
    } catch (error) {
        // Gère les erreurs, que ce soit des erreurs réseau ou de parsing
        console.error('Erreur lors de la récupération des données :', error);
        throw error;
    }
}


// Récupère les meilleurs films (max = 6) pour une catégorie donnée
export async function fetchTopMovies(url) {

    try {
        // Appelle fetchAPI et attend les données
        const data = await fetchAPI(url);

        // S'assure que data et data.results sont définis
        if (data && data.results) {
            // Extrait les 6 premiers films
            let topMovies = data.results.slice(0, 6);
            
            // Gestion des cas ou la page contient moins de 5 films
            if (topMovies.length < 5) {
                // Crée un tableau de promesses pour récupérer les détails de chaque film
                const movieDetailsPromises = topMovies.map(movie => fetchAPI(movie.url));
                // Attend la résolution de toutes les promesses et stock les détails des films
                const movieDetails = await Promise.all(movieDetailsPromises);
                return movieDetails;
            }

            // Gestion du cas où la page ne contient pas les six premiers films
            if (topMovies.length < 6 && data.results.length > 0) {
                // Passe à la page suivante
                const nextPageData = await fetchAPI(data.next);
                if (nextPageData && nextPageData.results) {
                    topMovies = topMovies.concat(nextPageData.results.slice(0, 6 - topMovies.length));
                }
            }

            // Crée un tableau de promesses pour récupérer les détails de chaque film
            const movieDetailsPromises = topMovies.map(movie => fetchAPI(movie.url));
            // Attend la résolution de toutes les promesses et stock les détails des films
            const movieDetails = await Promise.all(movieDetailsPromises);
            return movieDetails;
        } else {
            console.warn('Aucune donnée trouvée ou résultats non disponibles.');
            return [];
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        return [];
    }
}


// Fonction pour récupérer tous les genres de films
export async function fetchAllGenres(genresUrl) {
    // Tableau pour stocker les genres
    const genres = [];

    // Contient l'URL initiale pour commencer la récupération
    let url = genresUrl;

    try {
        while (url) {
            const data = await fetchAPI(url);
            // Ajoute les genres actuels au tableau
            data.results.forEach(genre => {
                genres.push({ id: genre.id, name: genre.name });
            });
            // Vérifie s'il y a une page suivante
            url = data.next; // Met à jour `url` avec l'URL de la page suivante si existante
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des genres:', error);
    }
    return genres;
}