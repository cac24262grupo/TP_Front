

function addActorRow(id_actor,nombre) {
  const tableBody = document.querySelector("#tabla-actores tbody");
  const row = document.createElement("tr");
  row.id = `actor-${id_actor}`;

  // Crear un elemento form para envolver los elementos del formulario
  const form = document.createElement("form");
  form.id = `actoresform-${id_actor}`;


 // Agregar contenido al formulario, incluyendo los campos y botones
  form.innerHTML = `
    <td hidden scope="row">${id_actor}</td>
    <td hidden scope="row">${nombre}</td>
    <td><input type="text" name="nombreNew" value='${nombre}'></td>
    <td>
      <button class="edit-btn" type="submit">✔</button>
      <button type="button" class="delete-btn">Eliminar</button>
    </td>
  `;
    // Añadir el formulario al row en lugar de establecer innerHTML directamente en el row
    row.appendChild(form);

    // Añadir el row al cuerpo de la tabla
    tableBody.appendChild(row);

   /*
    const deleteButton = row.querySelector(".delete-btn");
    deleteButton.addEventListener("click", async () => {
      const response = await fetch(`/api/actores/${id_actor}`, {
        method: "DELETE",
      });
      const data = await response.json();
      rmActorRow(data.id_actor);
    });
    tableBody.appendChild(row);

  const editButton = row.querySelector(".edit-btn");
  editButton.addEventListener("click", async () => {
    const response = await fetch(`/api/actores/${id_actor}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_actor : id_actor,
          nombre : nombreNew,
        }),
    });
  });  
};
*/

//document.addEventListener("DOMContentLoaded", async () => {
 // const tableBody = document.querySelector("#tabla-actores tbody");

  // Suponiendo que hay más código aquí para poblar la tabla inicialmente...

  tableBody.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const id_actor = event.target.closest("tr").id.split("-")[1];
      const response = await fetch(`/api/actores/${id_actor}`, {
        method: "DELETE",
      });
      if (response.ok) {
        rmActorRow(id_actor);
      }
    } else if (event.target.classList.contains("edit-btn")) {
      event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
      const row = event.target.closest("tr");
      const id_actor = row.id.split("-")[1];
      const nombreNew = row.querySelector("input[name='nombreNew']").value;

      const response = await fetch(`/api/actores/${id_actor}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_actor: id_actor,
          nombre: nombreNew,
        }),
      });

      if (response.ok) {
        // Actualizar la interfaz de usuario según sea necesario, por ejemplo, mostrar un mensaje de éxito
      }
    }
  });
//});
// Añadir el row al cuerpo de la tabla
tableBody.appendChild(row);
};
function rmActorRow(id_actor) {
  const row = document.querySelector(`#actor-${id_actor}`);
  row.remove();
}

window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/api/actores");
    const data = await response.json();
    for (actor of data) {
      addActorRow(
        actor.id_actor,
        actor.nombre
      );
    }
  });
