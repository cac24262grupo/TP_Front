

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

    const actoresForm = document.querySelector(`#actoresform-${id_actor}`);
  
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
  const { nombreNew } = actoresForm.getElementsByTagName("nombreNew");
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
