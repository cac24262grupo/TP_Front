const actorForm = document.querySelector("#actor-form");

actorForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    
    const actorName = actorForm["nombreActor"].value;
    
 
    const response = await fetch(`/api/actores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: actorName,
      }),
    });
    const data = await response.json(); 
    actorForm.reset();
  });