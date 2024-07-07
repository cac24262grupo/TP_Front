function addDirectorRow(id_director, nombre) {
    const tableBody = document.querySelector("#tabla-directores tbody");
    const row = document.createElement("tr");
    row.id = `actor-${id_actor}`;
  
    row.innerHTML = `
                      <form id='actoresform-${id_director}'>
                          <td hidden scope="row">'${id_director}'></td>
                          <td hidden scope="row">${nombre}</td>
                          <td><input type="text" name="nombreNew" value = '${nombre}'></td>
                          <td>
                             <button class="edit-btn" type="submit">✔</button>
                             <button class="delete-btn">Eliminar</button>
                          </td>
                      </form>        
      `;
  
      const actoresForm = document.querySelector(`#actoresform-${id_director}`);
    
      const deleteButton = row.querySelector(".delete-btn");
      deleteButton.addEventListener("click", async () => {
        const response = await fetch(`/api/actores/${id_director}`, {
          method: "DELETE",
        });
        const data = await response.json();
        rmActorRow(data.id_director);
      });
      tableBody.appendChild(row);
  
    const editButton = row.querySelector(".edit-btn");
    editButton.addEventListener("click", async () => {
      const response = await fetch(`/api/actores/${id_director}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_actor : id_director,
            nombre : nombre,
          }),
      });
    });  
    tableBody.appendChild(row);
  };
  
  function rmActorRow(id_director) {
    const row = document.querySelector(`#actor-${id_director}`);
    row.remove();
  }
  
  window.addEventListener("DOMContentLoaded", async () => {
      const response = await fetch("/api/directores");
      const data = await response.json();
      for (director of data) {
        addDirectorRow(
          director.id_director,
          director.nombre
        );
      }
    });