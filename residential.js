fetch("http://99.79.77.144:3000/api/agents")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Check if data is an array
    if (Array.isArray(data)) {
      globalAgentData = data; // Asignar datos a la variable global
      filterByRating(); // Llamar a la función para filtrar los datos
      updateTableBody(); // Llamar a la función para actualizar el cuerpo de la tabla
    } else {
      console.error("Invalid data format");
    }
  })
  .catch((error) => {
    console.error(error);
  });
function filterByRating() {
  //filtrar los datos por rating mostrando solo los mayor igual a 95
  globalAgentData = globalAgentData.filter(agent => agent.rating >= 95);
}
const nameHeader = {
  firstName: document.getElementById("first-name-header"),
  lastName: document.getElementById("last-name-header"),
};

function updateTableBody() {
    console.log("updating table with data:", globalAgentData);
  // Verificar si globalAgentData está definida y es un array
  if (Array.isArray(globalAgentData)) {
    // Crear variable para almacenar HTML de las filas
    let tableRows = "";

    // Iterar sobre los agentes y construir las filas de la tabla
    globalAgentData.forEach((agent) => {
      const { first_name, last_name, email, region, rating, fee } = agent;
      tableRows += `<tr><td>${first_name}</td><td>${last_name}</td><td>${email}</td><td>${region}</td><td>${rating}</td><td>${fee}</td></tr>`;
    });

    // Mostrar resultados en el cuerpo de la tabla
    document.getElementById("table-body").innerHTML = tableRows;
  } else {
    console.error("Invalid data format");
  }
}

function filterByRegion() {
    const selectedRegion = document.getElementById("region").value;
    const filteredAgents = filterAgentsByRegion(selectedRegion);
    console.log(filteredAgents);
    updateTableBody(filteredAgents);
    }

function filterAgentsByRegion(selectedRegion) {
  if (selectedRegion === "all") {
    // Si el valor del filtro es vacío, mostrar todos los agentes
    return globalAgentData;
  } else {
    return globalAgentData.filter(agent => agent.region === selectedRegion);
  }
}
function updateTableBodyWithFilter(filteredData) {
    // Verificar si filteredData está definida y es un array
    if (Array.isArray(filteredData)) {
        // Crear variable para almacenar HTML de las filas
        let tableRows = "";

        // Iterar sobre los agentes filtrados y construir las filas de la tabla
        filteredData.forEach((agent) => {
            const { first_name, last_name, email, region, rating, fee } = agent;
            tableRows += `<tr><td>${first_name}</td><td>${last_name}</td><td>${email}</td><td>${region}</td><td>${rating}</td><td>${fee}</td></tr>`;
        });

        // Mostrar resultados en el cuerpo de la tabla
        document.getElementById("table-body").innerHTML = tableRows;
    } else {
        console.error("Invalid data format");
    }
}
function filterByRegion() {
    const selectedRegion = document.getElementById("region").value;
    const filteredAgents = filterAgentsByRegion(selectedRegion);
    console.log(filteredAgents);
    updateTableBodyWithFilter(filteredAgents);
}
let sortState = {
    firstName: "asc",
    lastName: "asc",
};

nameHeader.firstName.addEventListener("click", function () {
  globalAgentData.sort(function (a, b) {
    if (sortState.firstName === "asc") {
      return a.first_name.localeCompare(b.first_name);
    } else {
        return b.first_name.localeCompare(a.first_name);
    }
});
  sortState.firstName = sortState.firstName === "asc" ? "desc" : "asc";
    
  updateTableBody();
});

nameHeader.lastName.addEventListener("click", function () {
  globalAgentData.sort(function (a, b) {
    if (sortState.lastName === "asc") {
      return a.last_name.localeCompare(b.last_name);
    } else {
        return b.last_name.localeCompare(a.last_name);
    }
});
  sortState.lastName = sortState.lastName === "asc" ? "desc" : "asc";
  updateTableBody();
});
document.getElementById("region").addEventListener("change", function () {
  const selectedRegion = this.value;
  const filteredAgents = filterAgentsByRegion(selectedRegion);

  // Actualizar el cuerpo de la tabla con los agentes filtrados
  updateTableBodyWithFilter(filteredAgents);
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let mainname = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let company_name = document.getElementById("company-name").value;
    let project_name = document.getElementById("project-name").value;
    let project_desc = document.getElementById("project-description").value;
    let department = document.getElementById("department").value;
    let message = document.getElementById("message").value;

    let formData = {
      fullname: mainname,
      email: email,
      phone: phone,
      company_name: company_name,
      project_name: project_name,
      project_desc: project_desc,
      department: department,
      message: message,
      file: null,
    };

    fetch("http://99.79.77.144:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            if (
              json.message === "Missing required parameter." ||
              json.message === "Invalid parameter."
            ) {
              alert(json.message);
            } else {
              throw new Error("Error in request: " + json.message);
            }
          });
        }
        return response.json();
      })
      .then((json) => {
        alert(JSON.stringify(json));
      })
      .catch((error) => {
        console.error(error);
      });
  });
