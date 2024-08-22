

export function bestMovie(url){
    document.addEventListener("DOMContentLoaded", function() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const bestMovieDetailsUrl = data.results[0].url;  // Correction de la faute de frappe

                fetch(bestMovieDetailsUrl)
                    .then(response => response.json())
                    .then(bestMovie => {
                        // Correction : Utilisation de l'objet bestMovie directement
                        document.querySelector(".best_movie img").src = bestMovie.image_url;
                        document.querySelector(".best_movie .movie_title").textContent = bestMovie.title;
                        document.querySelector(".best_movie .description").textContent = bestMovie.description;
        
                        // Optionnel: si le bouton Détails doit rediriger vers une page ou afficher des informations supplémentaires
                        document.querySelector('.btn_details').addEventListener('click', function() {
                            // Action à définir, comme rediriger vers une page de détails ou afficher un modal
                            window.location.href = bestMovieDetailsUrl; // Exemple de redirection
                        });
                    })
                    .catch(error => console.error("Erreur lors de la récupération des détails du film:", error));
            })
            .catch(error => console.error("Erreur lors de la récupération des films:", error));
    });
}


export async function topMovies(urlFirstPage, urlSecondPage) {
    document.addEventListener("DOMContentLoaded", async function() {
        try {
            // Récupérer les films de la première page
            const firstPageResponse = await fetch(urlFirstPage);
            const firstPageData = await firstPageResponse.json();

            // Vérifie si assez de films sur la première page
            let topSixMovies = firstPageData.results.slice(0, 6);

            // Si nous n'avons pas encore 6 films, récupérer des films supplémentaires de la deuxième page
            if (topSixMovies.length < 6) {
                const secondPageResponse = await fetch(urlSecondPage);
                if (!secondPageResponse.ok) {
                    throw new Error('Erreur réseau avec la deuxième page: ' + secondPageResponse.statusText);
                }
                const secondPageData = await secondPageResponse.json();
                // Ajouter les films de la deuxième page jusqu'à avoir 6 films
                topSixMovies = topSixMovies.concat(secondPageData.results.slice(0, 6 - topSixMovies.length));
            }

            // Récupérer les détails des films
            const movieDetailsPromises = topSixMovies.map(movie => fetch(movie.url).then(response => response.json()));
            const movieDetailsArray = await Promise.all(movieDetailsPromises);

            // Afficher les films
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

            // Ajouter un événement pour chaque bouton Détails
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


export async function topActionMovies(urlFirstPage, urlSecondPage) {
    document.addEventListener("DOMContentLoaded", async function() {
        try {
            // Récupérer les films de la première page
            const firstPageResponse = await fetch(urlFirstPage);
            const firstPageData = await firstPageResponse.json();

            // Vérifie si assez de films sur la première page
            let topSixMovies = firstPageData.results.slice(0, 6);

            // Si nous n'avons pas encore 6 films, récupérer des films supplémentaires de la deuxième page
            if (topSixMovies.length < 6) {
                const secondPageResponse = await fetch(urlSecondPage);
                if (!secondPageResponse.ok) {
                    throw new Error('Erreur réseau avec la deuxième page: ' + secondPageResponse.statusText);
                }
                const secondPageData = await secondPageResponse.json();
                // Ajouter les films de la deuxième page jusqu'à avoir 6 films
                topSixMovies = topSixMovies.concat(secondPageData.results.slice(0, 6 - topSixMovies.length));
            }

            // Récupérer les détails des films
            const movieDetailsPromises = topSixMovies.map(movie => fetch(movie.url).then(response => response.json()));
            const movieDetailsArray = await Promise.all(movieDetailsPromises);

            // Afficher les films
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

            // Ajouter un événement pour chaque bouton Détails
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


export async function topBiographyMovies(urlFirstPage, urlSecondPage) {
    document.addEventListener("DOMContentLoaded", async function() {
        try {
            // Récupérer les films de la première page
            const firstPageResponse = await fetch(urlFirstPage);
            const firstPageData = await firstPageResponse.json();

            // Vérifie si assez de films sur la première page
            let topSixMovies = firstPageData.results.slice(0, 6);

            // Si nous n'avons pas encore 6 films, récupérer des films supplémentaires de la deuxième page
            if (topSixMovies.length < 6) {
                const secondPageResponse = await fetch(urlSecondPage);
                if (!secondPageResponse.ok) {
                    throw new Error('Erreur réseau avec la deuxième page: ' + secondPageResponse.statusText);
                }
                const secondPageData = await secondPageResponse.json();
                // Ajouter les films de la deuxième page jusqu'à avoir 6 films
                topSixMovies = topSixMovies.concat(secondPageData.results.slice(0, 6 - topSixMovies.length));
            }

            // Récupérer les détails des films
            const movieDetailsPromises = topSixMovies.map(movie => fetch(movie.url).then(response => response.json()));
            const movieDetailsArray = await Promise.all(movieDetailsPromises);

            // Afficher les films
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

            // Ajouter un événement pour chaque bouton Détails
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


export async function fetchAllGenres(genreListUrl) {
    const genreList = []; // Tableau pour stocker les catégories

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
            url = data.next; // Si `data.next` existe, met à jour `url`, sinon arrête la boucle
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

        // Sélectionner le menu déroulant
        const categoriesSelect = document.getElementById('categories');
        
        // Réinitialiser les options
        categoriesSelect.innerHTML = '';

        // Ajouter une option pour chaque genre
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;  // Utiliser l'ID du genre comme valeur
            option.textContent = genre.name;  // Nom du genre comme texte
            categoriesSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des genres:", error);
    }
}


// Fonction pour gérer la sélection de catégorie
export async function handleCategorySelection() {
    // Attacher l'événement lors du chargement de la page
    document.addEventListener("DOMContentLoaded", function() {
        const categoriesSelect = document.getElementById('categories');

        categoriesSelect.addEventListener('change', async function() {
            const selectedGenreId = this.value;

            if (selectedGenreId) {
                // Récupérer la liste des genres
                const genres = await fetchAllGenres('http://localhost:8000/api/v1/genres/');
                const selectedGenre = genres.find(genre => genre.id === parseInt(selectedGenreId));
                
                if (selectedGenre) {
                    const genreName = selectedGenre.name;
                    
                    // URL de base pour les pages de films
                    const baseUrl = 'http://localhost:8000/api/v1/titles/?genre=';
                    
                    // Appeler la fonction pour afficher les films selon le genre
                    topMoviesByGenre(baseUrl, genreName);
                }
            }
        });
    });
}


// Fonction pour afficher les films par genre
export async function topMoviesByGenre(baseUrl, genreName) {
    try {
        // Encodage du nom du genre pour l'URL
        const encodedGenreName = encodeURIComponent(genreName);

        // Construire les URLs avec le genreName sélectionné
        const urlPage1 = `${baseUrl}${encodedGenreName}&page=1&sort_by=-imdb_score`;
        const urlPage2 = `${baseUrl}${encodedGenreName}&page=2&sort_by=-imdb_score`;
        console.log(urlPage1, urlPage2)

        // Récupérer les films de la première page
        const firstPageResponse = await fetch(urlPage1);
        const firstPageData = await firstPageResponse.json();

        let topSixMovies = firstPageData.results.slice(0, 6);

        // Si nous n'avons pas encore 6 films, récupérer des films supplémentaires de la deuxième page
        if (topSixMovies.length < 6) {
            const secondPageResponse = await fetch(urlPage2);
            if (!secondPageResponse.ok) {
                throw new Error('Erreur réseau avec la deuxième page: ' + secondPageResponse.statusText);
            }
            const secondPageData = await secondPageResponse.json();
            // Ajouter les films de la deuxième page jusqu'à avoir 6 films
            topSixMovies = topSixMovies.concat(secondPageData.results.slice(0, 6 - topSixMovies.length));
        }

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
