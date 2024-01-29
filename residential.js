fetch("http://99.79.77.144:3000/api/agents") // FETCH REQUEST TO THE API
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Check if data is an array
    if (Array.isArray(data)) {
      globalAgentData = data;
      filterByRating();
      updateTableBody();
    } else {
      console.error("Invalid data format");
    }
  })
  .catch((error) => {
    console.error(error);
  });
function filterByRating() {
  // FUNCTION TO FILTER THE AGENTS BY RATING

  globalAgentData = globalAgentData.filter((agent) => agent.rating >= 95);
}
const nameHeader = {
  firstName: document.getElementById("first-name-header"),
  lastName: document.getElementById("last-name-header"),
};

function updateTableBody() {
  // FUNCTION TO UPDATE THE TABLE BODY
  console.log("updating table with data:", globalAgentData);

  if (Array.isArray(globalAgentData)) {
    let tableRows = "";

    globalAgentData.forEach((agent) => {
      const { first_name, last_name, email, region, rating, fee } = agent;
      tableRows += `<tr><td>${first_name}</td><td>${last_name}</td><td>${email}</td><td>${region}</td><td>${rating}</td><td>${fee}</td></tr>`;
    });

    document.getElementById("table-body").innerHTML = tableRows;
  } else {
    console.error("Invalid data format");
  }
}

function filterByRegion() {
  // FUNCTION TO FILTER THE AGENTS BY REGION
  const selectedRegion = document.getElementById("region").value;
  const filteredAgents = filterAgentsByRegion(selectedRegion);
  console.log(filteredAgents);
  updateTableBody(filteredAgents);
}

function filterAgentsByRegion(selectedRegion) {
  // FUNCTION TO FILTER THE AGENTS BY REGION SELECTING THE REGION IN THE DROPDOWN
  if (selectedRegion === "all") {
    return globalAgentData;
  } else {
    return globalAgentData.filter((agent) => agent.region === selectedRegion);
  }
}
function updateTableBodyWithFilter(filteredData) {
  // FUNCTION TO UPDATE THE TABLE BODY WITH THE FILTERED DATA

  if (Array.isArray(filteredData)) {
    let tableRows = "";
    filteredData.forEach((agent) => {
      const { first_name, last_name, email, region, rating, fee } = agent;
      tableRows += `<tr><td>${first_name}</td><td>${last_name}</td><td>${email}</td><td>${region}</td><td>${rating}</td><td>${fee}</td></tr>`;
    });

    document.getElementById("table-body").innerHTML = tableRows;
  } else {
    console.error("Invalid data format");
  }
}
function filterByRegion() {
  // FUNCTION TO UPDATE THE TABLE BODY WITH THE FILTERED DATA
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
  // EVENT LISTENER TO SORT THE AGENTS BY FIRST NAME
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
  // EVENT LISTENER TO SORT THE AGENTS BY LAST NAME
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
  // EVENT LISTENER TO FILTER THE AGENTS BY REGION
  const selectedRegion = this.value;
  const filteredAgents = filterAgentsByRegion(selectedRegion);
  updateTableBodyWithFilter(filteredAgents);
});




