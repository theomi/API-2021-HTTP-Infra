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
  // Retourne le résultat de la procédure generateStudents
  res.send(generateStudents());
});

/*
 * @brief Génère des coordonnées d'étudiants aléatoirement
 */
function generateStudents() {
  // Le nombre d'étudiants générés est sous la forme
  // d'un entier aléatoire entre compris entre 0 et 10
  var studentsCount = chance.integer({
    min: 0,
    max: 10,
  });

  console.log("The students count is " + studentsCount);
  var students = [];

  // Détermine un genre et une date de naissance pour chaque étudiant
  for (var i = 0; i < studentsCount; i++) {
    var gender = chance.gender();
    var birthYear = chance.year({
      min: 1986,
      max: 1996,
    });

    // Génère un prénon, nom et date d'anniversaire
    students.push({
      firstName: chance.first({
        gender: gender,
      }),
      lastName: chance.last(),
      gender: gender,
      birthday: chance.birthday({
        year: birthYear,
      }),
    });
  }

  // Affiche et retourne le résultat
  console.log(students);
  return students;
}
