const peliculaForm = document.querySelector("#pelicula-form");

peliculaForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    
    const peliculaTitulo = actorForm["tituloPelicula"].value;


    const peliculaSinopsis = actorForm["sinopsisPelicula"].value;
    const peliculaUrl = actorForm["urlPelicula"].value;
    const peliculaAno = actorForm["anoPelicula"].value;
    const peliculaDuracion = actorForm["duracionPelicula"].value;
    const peliculaGenero = actorForm["idGenero"].value;
    const peliculaCategoria = actorForm["categoriaPelicula"].value;

    if (peliculaTitulo.trim() === "") {
        alert("Por favor, ingrese un titulo de pelicula.");
        return;
        }
    if (peliculaSinopsis.trim() === "") {
        alert("Por favor, ingrese una sinopsis de pelicula.");
        return;
        }
    if (peliculaUrl.trim() === "") {
        alert("Por favor, ingrese una url de pelicula.");
        return;
        }
    if (peliculaAno.trim() === "") {
        alert("Por favor, ingrese un año de pelicula.");
        return;
        }
    if (peliculaCategoria.trim() === "") {
        alert("Por favor, ingrese una categoria de pelicula.");
        return;
    }
    if (peliculaGenero.trim() === "") {
        alert("Por favor, ingrese un genero de pelicula.");
        return;
    }
 
    const response = await fetch(`/api/peliculas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: peliculaTitulo,
        sinopsis: peliculaSinopsis,
        url_pelicula: peliculaUrl,
        ano_extreno: peliculaAno,
        duracion: peliculaDuracion,
        genero: peliculaGenero,
        categoria: peliculaCategoria,
      }),
    });
    if (!response.ok) {
        alert("Hubo un problema al agregar la pelicula.");
        return;
      }
    const data = await response.json(); 
    peliculaForm.reset();
  });



function addGeneroOption(id_genero, genero) {
    const opcionNew = document.getElementById("idGenero");
    opcionNew.innerHTML += `<option value="${id_genero}">${genero}</option>`;
};

window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/api/generos");
    const data = await response.json();
    for (const genero of data) {
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