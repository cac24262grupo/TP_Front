
function addGeneroOption(id_genero, genero) {
    const opcionNew = document.getElementById("idGenero");
    const opt = document.createElement("option");
    opt.value = id_genero;
    opt.text = '${genero}';
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
var select = document.getElementById("año");
for (var i = 2000; i <= 2050; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    select.appendChild(option);
}

const generoForm = document.getElementById("generoForm"); // Ensure you have this element in your HTML

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
  });*/