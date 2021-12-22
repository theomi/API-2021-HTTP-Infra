(function($) {
    function loadStudents() {
        $.getJSON("/api/students/", function(students) {
            console.log(students)
            let message = "Nobody is here"
            if (students.length > 0) {
                message = students[0].firstName + " " + students[0].lastName
            }
            $("#api-students").text(message)
        })
    }

    loadStudents();

    setInterval(loadStudents, 2000)

})(jQuery);