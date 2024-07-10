function addGeneroRow(id_genero, genero) {
    const tableBody = document.querySelector("#tabla-generos tbody");
    const row = document.createElement("tr");
    row.id = `genero-${id_genero}`;  
    row.innerHTML = `
                      <form id='generoform-${id_genero}'>
                          <td hidden scope="row">'${id_genero}'></td>
                          <td hidden scope="row">${genero}</td>
                          <td><input type="text" name="generoNew" value = '${genero}'></td>
                          <td>
                             <button class="edit-btn" type="submit">✔</button>
                             <button class="delete-btn">Eliminar</button>
                          </td>
                      </form>        
      `;   
    const deleteButton = row.querySelector(".delete-btn");

    deleteButton.addEventListener("click", async () => {
      const response = await fetch(`/api/generos/${id_genero}`, {
        method: "DELETE",
      });
      const data = await response.json();
      rmGeneroRow(data.id_genero);
    });
    tableBody.appendChild(row);   
    const editButton = row.querySelector(".edit-btn");
    
    editButton.addEventListener("click", async () => {
      const generoNew = row.querySelector("input[name=generoNew]").value;  
      const response = await fetch(`/api/generos/${id_genero}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_genero : id_genero,
            genero : generoNew,
          }),
      });
    });  
    tableBody.appendChild(row);
};
  
function rmGeneroRow(id_genero) {
  const row = document.querySelector(`#genero-${id_genero}`);
  row.remove();
}
  
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/generos");
  const data = await response.json();
  for (genero of data) {
    addGeneroRow(genero.id_genero, genero.genero);
  }
});