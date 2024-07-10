const actorForm = document.querySelector("#actor-form");

actorForm.addEventListener("submit", async (event) => {
    event.preventDefault();    
    const actorName = actorForm["nombreActor"].value;
    
    if (actorName.trim() === "") {
      alert("Por favor, ingrese un nombre de actor.");
      return;
    }
 
    const response = await fetch(`/api/actores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: actorName,
      }),
    });
    if (!response.ok) {
      alert("Hubo un problema al agregar el actor.");
      return;
    }
    const data = await response.json(); 
    actorForm.reset();
});
