fetch('http://99.79.77.144:3000/api/agents')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Check if data is an array
            if (Array.isArray(data)) {
                // Create a variable to store HTML rows
                let tableRows = "";

                data.forEach(agent => {
                    // Extract only the needed fields
                    const { first_name, last_name, email, region, rating, fee } = agent;
                    tableRows += `<tr><td>${first_name}</td><td>${last_name}</td><td>${email}</td><td>${region}</td><td>${rating}</td><td>${fee}</td></tr>`;
                });

                // Display results in the table body
                document.getElementById("table-body").innerHTML = tableRows;
            } else {
                console.error("Invalid data format");
            }
        })
        .catch(error => {
            console.error(error);
        });

        // $(document).ready(function() {
        //     $('#dynamic-table-agents').DataTable();
        // });
fetch('http://99.79.77.144:3000/api/contact', {
    method: 'POST',
    body: JSON.stringify({
        "fullname": 'document.getElementById("name").value',
        "email": 'document.getElementById("email").value',
        "phone": 'document.getElementById("phone").value',
        "company_name": 'document.getElementById("company-name").value',
        "project_name": 'document.getElementById("project-name").value',
        "project_desc": 'document.getElementById("project-description").value',
        "department": 'document.getElementById("department").value',
        "message": 'document.getElementById("message").value',
        "file": null
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
.then(response => response.json())
.then(json => console.log(json))
.catch(error => {
        console.error(error);
    });        





