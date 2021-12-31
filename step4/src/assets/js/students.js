setInterval(async() => {
    const students = await fetch('/api/students/').then(response => response.json());
    
    let message = "Nobody is here"
    if (students.length > 0) {
        message = students[0].firstName + " " + students[0].lastName
    }

    document.getElementById("api-students").innerHTML = message
}, 2000)