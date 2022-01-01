// Instanciation de Chance.js
let Chance = require("chance");
let chance = new Chance();

// Instanciation d'express.js
let express = require("express");
const { accepts } = require("express/lib/request");
let app = express();

// On demande à express d'écouter sur le port TCP 3000 afin d'y accepter des requêtes HTTP
app.listen(3000, function () {
  // On affiche un message dans la console pour confirmer que le serveur est lancé
  console.log("Example app listening on port 3000!");
});

// Si la route racine est appelée, on exécute ce code
app.get("/", function (req, res) {
  // Retourne le résultat de la procédure generateAnimals
  res.send(generateAnimals());
});

/*
 * @brief Génère des noms d'animaux aléatoirement
 */
function generateAnimals() {
  // Le nombre d'animaux générés est sous la forme
  // d'un entier aléatoire entre compris entre 0 et 10
  var animalsCount = chance.integer({
    min: 0,
    max: 10,
  });

  console.log("The animals count is " + animalsCount);
  var animals = [];
  
  // liste de tous les types d'animaux possibles
  var types = ["ocean", "desert", "grassland", "forest", "farm", "pet", "zoo"];

  for (var i = 0; i < animalsCount; i++) {
    // Sélectionne un type d'animal aléatoirement dans la liste
    var randomType = types[Math.floor(Math.random()*types.length)];

    animals.push({
      type: randomType,
      animal: chance.animal({type: randomType}),
    });
  }

  // Affiche et retourne le résultat
  console.log(animals);
  return animals;
}
