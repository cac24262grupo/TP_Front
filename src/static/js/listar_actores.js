

function addActorRow(
  id_actor,
  nombre
) {
  const tableBody = document.querySelector("#tabla-actores tbody");
  const row = document.createElement("tr");
  row.id = `actor-${id_actor}`;
  row.innerHTML = `
                    <form id='actoresform-${id_actor}'>
                        <td hidden scope="row">'${id_actor}'></td>
                        <td hidden scope="row">${nombre}</td>
                        <td><input type="text" name="nombreNew" value = '${nombre}'></td>
                        <td>
                           <button class="edit-btn" type="submit">✔</button>
                           <button class="delete-btn">Eliminar</button>
                        </td>
                    </form>        
    `;

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
  
  editButton.addEventListener("click", async () => {
    const campotexto = document.getElementById('actoresform-${id_actor}');
    nombreNew = campotexto['nombreNew'].value;
    const response = await fetch(`/api/actores/${id_actor}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id_actor : id_actor,
          nombre : nombreNew
        }),
    });
  });  
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
});*/


