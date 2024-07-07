const peliculaForm = document.querySelector("#pelicula-form");



function addGeneroOption(id_genero, genero) {
    const opcionNew = document.querySelector("#form-select-genero");
    const opt = document.createElement("option");
    opt.value = id_genero;
    opt.text = genero;
    opcionNew.appendChild(opt);
  };

window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/api/generos");
    const data = await response.json();
    for (genero of data) {
      addGeneroOption(
        genero.id_genero,
        genero.genero
      );
    }
  });

/*
generoForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    
    const generoName = generoForm["nombreGenero"].value;
    
    if (generoName.trim() === "") {
        alert("Por favor, ingrese un nombre del genero.");
        return;
      }
 
    const response = await fetch(`/api/generos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genero: generoName,
      }),
    });
    if (!response.ok) {
        alert("Hubo un problema al agregar el genero.");
        return;
      }
    const data = await response.json(); 
    generoForm.reset();
  });






<option th:each="agente : ${agentes}" th:value="${agente.id}" th:text="${agente.nombre}" />

*/