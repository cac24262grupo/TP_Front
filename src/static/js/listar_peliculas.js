function addPeliculaRow(id_pelicula, titulo, sinopsis, url_pelicula, ano_extreno,duracion,genero,categoria) {
    const tableBody = document.querySelector("#tabla-peliculas tbody");
    const row = document.createElement("tr");
    row.id = `pelicula-${id_pelicula}`;
  
    row.innerHTML = `
                      <form id='peliculaform-${id_pelicula}'>
                          <td hidden scope="row">'${id_pelicula}'></td>
                          <td><input type="text" name="tituloNew" value = '${titulo}'></td>
                          <td><input type="text" name="sinopsisNew" value = '${sinopsis}'></td>
                          <td><input type="text" name="url_peliculaNew" value = '${url_pelicula}'></td>
                          <td><input type="text" name="ano_extrenoNew" value = '${ano_extreno}'></td>
                          <td><input type="text" name="duracionNew" value = '${duracion}'></td>
                          <td><input type="text" name="generoNew" value = '${genero}'></td>
                          <td><input type="text" name="categoriaNew" value = '${categoria}'></td>
                          <td>
                             <button class="edit-btn" type="submit">✔</button>
                             <button class="delete-btn">Eliminar</button>
                          </td>
                      </form>        
      `;
  
      const peliculaForm = document.querySelector(`#peliculasform-${id_pelicula}`);
    
      const deleteButton = row.querySelector(".delete-btn");
      deleteButton.addEventListener("click", async () => {
        const response = await fetch(`/api/peliculas/${id_pelicula}`, {
          method: "DELETE",
        });
        const data = await response.json();
        rmPeliculaRow(data.id_pelicula);
      });
      tableBody.appendChild(row);
        
    const editButton = row.querySelector(".edit-btn");
    editButton.addEventListener("click", async () => {
        const tituloNew = row.querySelector("input[name=tituloNew]").value;
        const sinopsisNew = row.querySelector("input[name=sinopsisNew]").value;
        const url_peliculaNew = row.querySelector("input[name=url_peliculaNew]").value;
        const ano_extrenoNew = row.querySelector("input[name=ano_extrenoNew]").value;
        const duracionNew = row.querySelector("input[name=duracionNew]").value;
        const generoNew = row.querySelector("input[name=generoNew]").value;
        const categoriaNew = row.querySelector("input[name=categoriaNew]").value;
        const response = await fetch(`/api/peliculas/${id_pelicula}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({          
            titulo : tituloNew,
            sinopsis : sinopsisNew,
            url_pelicula : url_peliculaNew,
            ano_extreno : ano_extrenoNew,
            duracion : duracionNew,
            genero : generoNew,
            categoria : categoriaNew,
            id_pelicula : id_pelicula,
          }),
      });
    });  
    tableBody.appendChild(row);
  };
  
  function rmPeliculaRow(id_pelicula) {
    const row = document.querySelector(`#pelicula-${id_pelicula}`);
    row.remove();
  }
  
  window.addEventListener("DOMContentLoaded", async () => {
      const response = await fetch("/api/peliculas");
      const data = await response.json();
      for (pelicula of data) {
        addPeliculaRow(
            pelicula.id_pelicula,
            pelicula.titulo,
            pelicula.sinopsis,
            pelicula.url_pelicula,
            pelicula.ano_extreno,
            pelicula.duracion,
            pelicula.genero,
            pelicula.categoria
        );
      }
});
