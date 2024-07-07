const generoForm = document.querySelector("#genero-form");

generoForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    
    const generoName = generoForm["nombreGenero"].value;
    
    if (generoName.trim() === "") {
        alert("Por favor, ingrese un nombre del genero.");
        return;
      }
 
    const response = await fetch(`/api/generos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genero: generoName,
      }),
    });
    if (!response.ok) {
        alert("Hubo un problema al agregar el genero.");
        return;
      }
    const data = await response.json(); 
    generoForm.reset();
  });
