setInterval(async() => {
    const animals = await fetch('/api/animals/').then(response => response.json());
    
    let message = "Nobody is here"
    if (animals.length > 0) {
        message = animals[0].type + " : " + animals[0].animal
    }

    document.getElementById("api-animals").innerHTML = message
}, 2000)