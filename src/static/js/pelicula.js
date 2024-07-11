const peliculaForm = document.querySelector("#pelicula-form");

peliculaForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const peliculaTitulo = peliculaForm["tituloPelicula"].value;
    const peliculaSinopsis = peliculaForm["sinopsisPelicula"].value;
    const peliculaUrl = peliculaForm["urlPelicula"].value;
    const peliculaAno = peliculaForm["anoPelicula"].value;
    const peliculaDuracion = peliculaForm["duracionPelicula"].value;
    const peliculaGenero = peliculaForm["idGenero"].value;
    const peliculaCategoria = peliculaForm["categoriaPelicula"].value;
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
    alert("Película agregada exitosamente!!!!");
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
    addGeneroOption(genero.id_genero, genero.genero);
  }
});
