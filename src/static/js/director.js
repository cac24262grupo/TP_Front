const directorForm = document.querySelector("#director-form");

directorForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    
    const directorName = directorForm["nombreDirector"].value;
    
    if (directorName.trim() === "") {
        alert("Por favor, ingrese un nombre de director.");
        return;
      }
 
    const response = await fetch(`/api/directores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: directorName,
      }),
    });
    if (!response.ok) {
        alert("Hubo un problema al agregar el director.");
        return;
      }
    const data = await response.json(); 
    directorForm.reset();
  });
