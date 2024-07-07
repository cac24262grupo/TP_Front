function addGeneroRow(id_genero, genero) {
    const tableBody = document.querySelector("#tabla-generos tbody");
    const row = document.createElement("tr");
    row.id = `actor-${id_genero}`;
  
    row.innerHTML = `
                      <form id='actoresform-${id_genero}'>
                          <td hidden scope="row">'${id_genero}'></td>
                          <td hidden scope="row">${genero}</td>
                          <td><input type="text" name="nombreNew" value = '${genero}'></td>
                          <td>
                             <button class="edit-btn" type="submit">✔</button>
                             <button class="delete-btn">Eliminar</button>
                          </td>
                      </form>        
      `;
  
      const actoresForm = document.querySelector(`#actoresform-${id_genero}`);
    
      const deleteButton = row.querySelector(".delete-btn");
      deleteButton.addEventListener("click", async () => {
        const response = await fetch(`/api/actores/${id_genero}`, {
          method: "DELETE",
        });
        const data = await response.json();
        rmActorRow(data.id_genero);
      });
      tableBody.appendChild(row);
  
    const editButton = row.querySelector(".edit-btn");
    editButton.addEventListener("click", async () => {
      const response = await fetch(`/api/actores/${id_genero}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_actor : id_genero,
            nombre : genero,
          }),
      });
    });  
    tableBody.appendChild(row);
  };
  
  function rmActorRow(id_genero) {
    const row = document.querySelector(`#actor-${id_genero}`);
    row.remove();
  }
  
  window.addEventListener("DOMContentLoaded", async () => {
      const response = await fetch("/api/generos");
      const data = await response.json();
      for (genero of data) {
        addGeneroRow(
          genero.id_genero,
          genero.genero
        );
      }
    });