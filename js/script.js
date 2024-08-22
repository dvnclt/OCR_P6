// Fonction pour récupérer et afficher le meilleur film
export function bestMovie(url) {
    document.addEventListener("DOMContentLoaded", function() {
        // Récupère la liste des films depuis l'URL
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Obtient les détails du meilleur film
                const bestMovieDetailsUrl = data.results[0].url;

                fetch(bestMovieDetailsUrl)
                    .then(response => response.json())
                    .then(bestMovie => {
                        // Met à jour les éléments HTML avec les détails du meilleur film
                        document.querySelector(".best_movie img").src = bestMovie.image_url;
                        document.querySelector(".best_movie .movie_title").textContent = bestMovie.title;
                        document.querySelector(".best_movie .description").textContent = bestMovie.description;
        
                        // Action pour le bouton Détails : redirige vers la page des détails du film
                        document.querySelector('.btn_details').addEventListener('click', function() {
                            window.location.href = bestMovieDetailsUrl;
                        });
                    })
                    .catch(error => console.error("Erreur lors de la récupération des détails du film:", error));
            })
            .catch(error => console.error("Erreur lors de la récupération des films:", error));
    });
}

// Fonction pour récupérer et afficher les 6 meilleurs films
export async function topMovies(urlFirstPage, urlSecondPage) {
    document.addEventListener("DOMContentLoaded", async function() {
        try {
            // Récupère les films de la première page
            const firstPageResponse = await fetch(urlFirstPage);
            const firstPageData = await firstPageResponse.json();

            // Prend les 6 premiers films de la première page
            let topSixMovies = firstPageData.results.slice(0, 6);

            // Si moins de 6 films, récupère les films de la deuxième page
            if (topSixMovies.length < 6) {
                const secondPageResponse = await fetch(urlSecondPage);
                if (!secondPageResponse.ok) {
                    throw new Error('Erreur réseau avec la deuxième page: ' + secondPageResponse.statusText);
                }
                const secondPageData = await secondPageResponse.json();
                topSixMovies = topSixMovies.concat(secondPageData.results.slice(0, 6 - topSixMovies.length));
            }

            // Récupère les détails des films
            const movieDetailsPromises = topSixMovies.map(movie => fetch(movie.url).then(response => response.json()));
            const movieDetailsArray = await Promise.all(movieDetailsPromises);

            // Affiche les films dans le conteneur
            const container = document.querySelector('.top_movies_container');
            container.innerHTML = '';

            movieDetailsArray.forEach(movie => {
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
                button.addEventListener('click', function() {
                    const movieUrl = this.getAttribute('data-url');
                    window.location.href = movieUrl;
                });
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des films:", error);
        }
    });
}

// Fonction pour récupérer et afficher les meilleurs films d'action
export async function topActionMovies(urlFirstPage, urlSecondPage) {
    document.addEventListener("DOMContentLoaded", async function() {
        try {
            // Récupère les films de la première page
            const firstPageResponse = await fetch(urlFirstPage);
            const firstPageData = await firstPageResponse.json();

            // Prend les 6 premiers films de la première page
            let topSixMovies = firstPageData.results.slice(0, 6);

            // Si moins de 6 films, récupère les films de la deuxième page
            if (topSixMovies.length < 6) {
                const secondPageResponse = await fetch(urlSecondPage);
                if (!secondPageResponse.ok) {
                    throw new Error('Erreur réseau avec la deuxième page: ' + secondPageResponse.statusText);
                }
                const secondPageData = await secondPageResponse.json();
                topSixMovies = topSixMovies.concat(secondPageData.results.slice(0, 6 - topSixMovies.length));
            }

            // Récupère les détails des films
            const movieDetailsPromises = topSixMovies.map(movie => fetch(movie.url).then(response => response.json()));
            const movieDetailsArray = await Promise.all(movieDetailsPromises);

            // Affiche les films d'action dans le conteneur
            const container = document.querySelector('.top_action_movies_container');
            container.innerHTML = '';

            movieDetailsArray.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');

                movieElement.innerHTML = `
                    <img src="${movie.image_url}" alt="${movie.title}">
                    <div class="overlay">
                        <h3 class="movie_title">${movie.original_title}</h3>
                        <button class="overlay_btn_details" data-url="${movie.url}">Détails</button>
                    </div>
                `;

                container.appendChild(movieElement);
            });

            // Ajoute un événement pour chaque bouton Détails
            document.querySelectorAll('.overlay_btn_details').forEach(button => {
                button.addEventListener('click', function() {
                    const movieUrl = this.getAttribute('data-url');
                    window.location.href = movieUrl;
                });
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des films:", error);
        }
    });
}

// Fonction pour récupérer et afficher les meilleurs films biographiques
export async function topBiographyMovies(urlFirstPage, urlSecondPage) {
    document.addEventListener("DOMContentLoaded", async function() {
        try {
            // Récupère les films de la première page
            const firstPageResponse = await fetch(urlFirstPage);
            const firstPageData = await firstPageResponse.json();

            // Prend les 6 premiers films de la première page
            let topSixMovies = firstPageData.results.slice(0, 6);

            // Si moins de 6 films, récupère les films de la deuxième page
            if (topSixMovies.length < 6) {
                const secondPageResponse = await fetch(urlSecondPage);
                if (!secondPageResponse.ok) {
                    throw new Error('Erreur réseau avec la deuxième page: ' + secondPageResponse.statusText);
                }
                const secondPageData = await secondPageResponse.json();
                topSixMovies = topSixMovies.concat(secondPageData.results.slice(0, 6 - topSixMovies.length));
            }

            // Récupère les détails des films
            const movieDetailsPromises = topSixMovies.map(movie => fetch(movie.url).then(response => response.json()));
            const movieDetailsArray = await Promise.all(movieDetailsPromises);

            // Affiche les films biographiques dans le conteneur
            const container = document.querySelector('.top_biography_movies_container');
            container.innerHTML = '';

            movieDetailsArray.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');

                movieElement.innerHTML = `
                    <img src="${movie.image_url}" alt="${movie.title}">
                    <div class="overlay">
                        <h3 class="movie_title">${movie.original_title}</h3>
                        <button class="overlay_btn_details" data-url="${movie.url}">Détails</button>
                    </div>
                `;

                container.appendChild(movieElement);
            });

            // Ajoute un événement pour chaque bouton Détails
            document.querySelectorAll('.overlay_btn_details').forEach(button => {
                button.addEventListener('click', function() {
                    const movieUrl = this.getAttribute('data-url');
                    window.location.href = movieUrl;
                });
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des films:", error);
        }
    });
}

// Fonction pour récupérer tous les genres de films
export async function fetchAllGenres(genreListUrl) {
    const genreList = []; // Tableau pour stocker les genres

    let url = genreListUrl; // URL initiale pour commencer la récupération

    try {
        while (url) {
            const response = await fetch(url);
            const data = await response.json();

            // Ajoute les genres actuels au tableau
            data.results.forEach(genre => {
                genreList.push({ id: genre.id, name: genre.name });
            });

            // Vérifie s'il y a une page suivante
            url = data.next; // Met à jour `url` avec l'URL de la page suivante, ou `null` si aucune page suivante
        }

    } catch (error) {
        console.error('Erreur lors de la récupération des genres:', error);
    }

    return genreList; // Retourne le tableau des genres
}

// Fonction pour charger les genres dans le menu déroulant
export async function loadGenres(genreListUrl) {
    try {
        // Récupère tous les genres en utilisant fetchAllGenres
        const genres = await fetchAllGenres(genreListUrl);

        // Sélectionne le menu déroulant pour les catégories
        const categoriesSelect = document.getElementById('categories');
        
        // Réinitialise les options
        categoriesSelect.innerHTML = '';

        // Ajoute une option pour chaque genre
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;  // Utilise l'ID du genre comme valeur
            option.textContent = genre.name;  // Nom du genre comme texte
            categoriesSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des genres:", error);
    }
}

// Fonction pour gérer la sélection de catégorie
export async function handleCategorySelection() {
    document.addEventListener("DOMContentLoaded", function() {
        const categoriesSelect = document.getElementById('categories');

        categoriesSelect.addEventListener('change', async function() {
            const selectedGenreId = this.value;

            if (selectedGenreId) {
                // Récupère la liste des genres
                const genres = await fetchAllGenres('http://localhost:8000/api/v1/genres/');
                const selectedGenre = genres.find(genre => genre.id === parseInt(selectedGenreId));
                
                if (selectedGenre) {
                    const genreName = selectedGenre.name;
                    
                    // URL de base pour les pages de films
                    const baseUrl = 'http://localhost:8000/api/v1/titles/?genre=';
                    
                    // Appelle la fonction pour afficher les films selon le genre
                    topMoviesByGenre(baseUrl, genreName);
                }
            }
        });
    });
}

// Fonction pour afficher les films selon le genre sélectionné
export async function topMoviesByGenre(baseUrl, genreName) {
    try {
        // Encode le nom du genre pour l'URL
        const encodedGenreName = encodeURIComponent(genreName);

        // Construit les URLs pour récupérer les films par genre
        const urlPage1 = `${baseUrl}${encodedGenreName}&page=1&sort_by=-imdb_score`;
        const urlPage2 = `${baseUrl}${encodedGenreName}&page=2&sort_by=-imdb_score`;

        // Récupère les films de la première page
        const firstPageResponse = await fetch(urlPage1);
        const firstPageData = await firstPageResponse.json();

        let topSixMovies = firstPageData.results.slice(0, 6);

        // Si moins de 6 films, récupère les films de la deuxième page
        if (topSixMovies.length < 6) {
            const secondPageResponse = await fetch(urlPage2);
            if (!secondPageResponse.ok) {
                throw new Error('Erreur réseau avec la deuxième page: ' + secondPageResponse.statusText);
            }
            const secondPageData = await secondPageResponse.json();
            topSixMovies = topSixMovies.concat(secondPageData.results.slice(0, 6 - topSixMovies.length));
        }

        // Affiche les films dans le conteneur
        const container = document.querySelector('.top_genre_movies_container');
        container.innerHTML = '';

        topSixMovies.forEach(movie => {
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
            button.addEventListener('click', function() {
                const movieUrl = this.getAttribute('data-url');
                window.location.href = movieUrl;
            });
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des films:", error);
    }
}
