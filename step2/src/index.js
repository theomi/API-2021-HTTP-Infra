let Chance = require("chance");
let chance = new Chance();

var express = require("express");
const { accepts } = require("express/lib/request");
var app = express();

app.get("/", function (req, res) {
  res.send(generateStudents());
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

function generateStudents() {
  var studentsCount = chance.integer({
    min: 0,
    max: 10,
  });

  console.log("The students count is " + studentsCount);
  var students = [];

  for (var i = 0; i < studentsCount; i++) {
    var gender = chance.gender();
    var birthYear = chance.year({
      min: 1986,
      max: 1996,
    });

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

  console.log(students);
  return students;
}
