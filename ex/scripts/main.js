/*********************************************************************************
 * 
 * Point d'entrée, c'est lui qui intialise le jeu et lance la boucle de jeu. 
 * 
 *********************************************************************************/

lancerJeu()


let userInput = document.getElementById("inputEcriture");
console.log(userInput);

let validationBtn = document.getElementById("btnValiderMot");
console.log(validationBtn)


let zoneProposition = document.querySelector(".zoneProposition");
console.log(zoneProposition);

let zoneScore = document.querySelector(".zoneScore");
console.log(zoneScore);


let listeInputRadio = document.querySelectorAll(".optionSource input");
console.log(listeInputRadio);
