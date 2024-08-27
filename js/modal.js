

export function initModal(movie) {

    // Sélectionne la modale et les éléments à l'intérieur
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");

    // Met à jour le contenu de la modale avec les informations du film
    modalTitle.textContent = movie.title;
    modalDescription.textContent = movie.description;

    // Affiche la modale
    modal.style.display = "block";
    
    // Ferme la modale lorsqu'on clique sur le bouton de fermeture
    document.querySelector('.close').addEventListener('click', function() {
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