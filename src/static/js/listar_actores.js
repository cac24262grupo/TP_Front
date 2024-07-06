

function addActorRow(
  actorId,
  nombre
) {
  const tableBody = document.querySelector("#tabla-actores tbody");



  /*
<tr>
                    <form id="actores-form">
                        <td hidden scope="row"><input type="text" name="id"></td>
                        <td><input type="text" name="nombre"></td>
                        <td><svg onclick="sendActorList(event)" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M22 5.5H9c-1.1 0-2 .9-2 2v9a2 2 0 0 0 2 2h13c1.11 0 2-.89 2-2v-9a2 2 0 0 0-2-2m0 11H9V9.17l6.5 3.33L22 9.17zm-6.5-5.69L9 7.5h13zM5 16.5c0 .17.03.33.05.5H1c-.552 0-1-.45-1-1s.448-1 1-1h4zM3 7h2.05c-.02.17-.05.33-.05.5V9H3c-.55 0-1-.45-1-1s.45-1 1-1m-2 5c0-.55.45-1 1-1h3v2H2c-.55 0-1-.45-1-1"/></svg><button type="submit">✔</button></td>
                    </form>
                </tr>


  */
  const row = document.createElement("tr");
  row.id = `actor-${id_actor}`;
  row.innerHTML = `
                    <form id="actores-form">
                        <td hidden scope="row"><input type="text" name="id_actor"></td>
                        <td><input type="text" name="nombre"></td>
                        <td><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M22 5.5H9c-1.1 0-2 .9-2 2v9a2 2 0 0 0 2 2h13c1.11 0 2-.89 2-2v-9a2 2 0 0 0-2-2m0 11H9V9.17l6.5 3.33L22 9.17zm-6.5-5.69L9 7.5h13zM5 16.5c0 .17.03.33.05.5H1c-.552 0-1-.45-1-1s.448-1 1-1h4zM3 7h2.05c-.02.17-.05.33-.05.5V9H3c-.55 0-1-.45-1-1s.45-1 1-1m-2 5c0-.55.45-1 1-1h3v2H2c-.55 0-1-.45-1-1"/></svg><button class="edit-btn" type="submit">✔</button></td>
                    </form>        
    `;

  
  /*

  <td>${name}</td>
        <td>${description}</td>
        <td>${release_date}</td>
        <td>${rating}</td>
        <td>${language}</td>
        <td>${author}</td>
        <td>${genres}</td>
        <td>${characters}</td>
        <td>
            <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            <button class="btn btn-warning btn-sm edit-btn">Editar</button>
        </td>
        */
  
  
    const deleteButton = row.querySelector(".delete-btn");
    deleteButton.addEventListener("click", async () => {
    const response = await fetch(`/api/movies/${movieId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    rmMovieRow(data.movie_id);
  });
  tableBody.appendChild(row);

  const editButton = row.querySelector(".edit-btn");
  editButton.addEventListener("click", async () => {
   /* moviesForm["movieId"].value = movieId;
    moviesForm["movieName"].value = name;
    moviesForm["movieDescription"].value = description;
    moviesForm["releaseDate"].valueAsDate = new Date(release_date);*/
    const response = await fetch(`/api/actores/${id_actor}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_actor: id_actor,
          nombre: nombre,
        }),
  });
  //tableBody.appendChild(row);
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


/*
function rmMovieRow(movieId) {
  const row = document.querySelector(`#movie-${movieId}`);
  row.remove();
}

moviesForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const movieId = moviesForm["movieId"].value;
  const movieName = moviesForm["movieName"].value;
  const movieDescription = moviesForm["movieDescription"].value;
  const releaseDate = moviesForm["releaseDate"].value;

  const url = movieId !== "" ? `/api/movies/${movieId}` : "/api/movies";
  const method = movieId !== "" ? `PUT` : "POST";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: movieName,
      description: movieDescription,
      release_date: releaseDate,
      author_id: 2,
      language: "English",
      rating: "8.5",
    }),
  });
  const data = await response.json();

  if (movieId !== "") {
    rmMovieRow(data.movie_id);
  }
  addMovieRow(
    data.movie_id,
    data.name,
    data.description,
    data.release_date,
    data.rating,
    data.language,
    data.author_id,
    data.genres,
    data.characters
  );

  moviesForm.reset();
});

window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/movies");
  const data = await response.json();
  for (movie of data) {
    addMovieRow(
      movie.movie_id,
      movie.name,
      movie.description,
      movie.release_date,
      movie.rating,
      movie.language,
      movie.author_id,
      movie.genres,
      movie.characters
    );
  }
});
*/