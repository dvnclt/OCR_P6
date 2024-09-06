import { getValidImageUrl } from './utils.js';

export async function initModal(movie) {

    // Sélectionne la modale et les éléments à l'intérieur
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImg = document.getElementById("modal-img");
    const modalYearGenres = document.getElementById("modal-year-genres");
    const modalDurationCountries = document.getElementById("modal-duration-countries");
    const modalImdb_score = document.getElementById("modal-imdb_score");
    const modalDirectors = document.getElementById("modal-directors");
    const modalDescription = document.getElementById("modal-long_description");
    const modalActors = document.getElementById("modal-actors");

    // Met à jour le contenu de la modale avec les informations du film
    modalTitle.textContent = movie.title;
    modalImg.src = await getValidImageUrl(movie.image_url, movie.id);
    modalYearGenres.textContent = `${movie.year} - ${movie.genres.join(', ')}`;
    modalDurationCountries.textContent = `${movie.duration + " minutes"} ${"("+movie.countries.join(' / ')+")"}`
    modalImdb_score.textContent = "IMDB score: " + movie.imdb_score + "/10";
    modalDirectors.textContent = movie.directors.join(', ');
    modalDescription.textContent = movie.long_description;
    modalActors.textContent = movie.actors.join(', ');


    // Affiche la modale
    modal.style.display = "block";
    
    // Ferme la modale lorsqu'on clique sur le bouton de fermeture
    document.querySelector('.close').addEventListener('click', function() {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
    });

    // Ferme la modale lorsqu'on clique sur le bouton de fermeture
    document.querySelector('.modal-close_button').addEventListener('click', function() {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
    });
    
    // Ferme la modale lorsqu'on clique en dehors de celle-ci
    window.addEventListener('click', function(event) {
        const modal = document.getElementById("modal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}