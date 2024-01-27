// LOGIC FOR SET THE POST REQUEST TO THE API WITH THE FORM DATA

// Event listener for the form submit
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

    fetch("http://99.79.77.144:3000/api/contact", { // FETCH REQUEST TO THE API
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
      .then((json) => { // DISPLAY THE DATA IN SUCCES MESSAGE
        document.getElementById("succes-content").innerHTML = (JSON.stringify(json));
        
      })
      .catch((error) => {
        console.error("error en la solicitud fetch:", error);
      });
  });
