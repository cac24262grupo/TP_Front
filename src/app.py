from flask import Flask, jsonify, request, send_file
from .databases import DbSession
from .conf import settings


app = Flask(__name__)


@app.get("/")
def index():
    return send_file("static/index.html")

@app.get("/integrantes")
def integrantes():
    return send_file("static/integrantes.html")

@app.get("/listar_actores")
def listar_actores():
    return send_file("static/listar_actores.html")

@app.get("/actor")
def cargar_actores():
    return send_file("static/actor.html")

@app.get("/director")
def cargar_directores():
    return send_file("static/director.html")

@app.get("/genero")
def cargar_generos():
    return send_file("static/genero.html")

@app.get("/pelicula")
def cargar_peliculas():
    return send_file("static/pelicula.html")

@app.get("/listar_generos")
def listar_generos():
    return send_file("static/listar_generos.html")

@app.get("/listar_peliculas")
def listar_peliculas():
    return send_file("static/listar_peliculas.html")

@app.get("/listar_directores")
def listar_directores():
    return send_file("static/listar_directores.html")

@app.get("/api/peliculas")
def lista_peliculas():

    with DbSession(settings.DB_URL) as session:
        session.execute("SELECT * FROM peliculas")
        peliculas = session.fetchall()

    return jsonify(peliculas)

@app.get("/api/actores")
def lista_actores():

    with DbSession(settings.DB_URL) as session:
        session.execute("SELECT * FROM actores")
        actores = session.fetchall()

    return jsonify(actores)

@app.get("/api/directores")
def lista_directores():

    with DbSession(settings.DB_URL) as session:
        session.execute("SELECT * FROM directores")
        directores = session.fetchall()

    return jsonify(directores)

@app.get("/api/generos")
def lista_generos():

    with DbSession(settings.DB_URL) as session:
        session.execute("SELECT * FROM generos")
        generos = session.fetchall()

    return jsonify(generos)

@app.get("/api/peliculas/<id_pelicula>")
def get_pelicula(id_pelicula):

    with DbSession(settings.DB_URL) as session:
        session.execute("SELECT * FROM peliculas WHERE id_pelicula = %s", (id_pelicula,))
        pelicula = session.fetchone()

    if pelicula is None:
        return jsonify({"message": "Pelicula no encontrada"}), 404

    return jsonify(pelicula)

@app.get("/api/actores/<id_actor>")
def get_actor(id_actor):

    with DbSession(settings.DB_URL) as session:
        session.execute("SELECT * FROM actores WHERE id_actor = %s", (id_actor,))
        actor = session.fetchone()

    if actor is None:
        return jsonify({"message": "Actor no encontrado"}), 404

    return jsonify(actor)

@app.get("/api/directores/<id_director>")
def get_director(id_director):

    with DbSession(settings.DB_URL) as session:
        session.execute("SELECT * FROM directores WHERE id_director = %s", (id_director,))
        director = session.fetchone()

    if director is None:
        return jsonify({"message": "Director no encontrado"}), 404

    return jsonify(director)

@app.get("/api/generos/<id_genero>")
def get_genero(id_genero):

    with DbSession(settings.DB_URL) as session:
        session.execute("SELECT * FROM generos WHERE id_genero = %s", (id_genero,))
        genero = session.fetchone()

    if genero is None:
        return jsonify({"message": "Genero no encontrado"}), 404

    return jsonify(genero)

@app.delete("/api/peliculas/<id_pelicula>")
def borra_pelicula(id_pelicula):

    with DbSession(settings.DB_URL) as session:
        session.execute("DELETE FROM peliculas WHERE id_pelicula = %s RETURNING *", (id_pelicula,))
        pelicula = session.fetchone()
        session.commit()

    if pelicula is None:
        return jsonify({"message": "Pelicula no encontrada"}), 404

    return jsonify(pelicula)

@app.delete("/api/actores/<id_actor>")
def borra_actor(id_actor):

    with DbSession(settings.DB_URL) as session:
        session.execute("DELETE FROM actores WHERE id_actor = %s RETURNING *", (id_actor,))
        actor = session.fetchone()
        session.commit()

    if actor is None:
        return jsonify({"message": "Actor no encontrado"}), 404

    return jsonify(actor)

@app.delete("/api/directores/<id_director>")
def borra_director(id_director):

    with DbSession(settings.DB_URL) as session:
        session.execute("DELETE FROM directores WHERE id_director = %s RETURNING *", (id_director,))
        director = session.fetchone()
        session.commit()

    if director is None:
        return jsonify({"message": "Director no encontrado"}), 404

    return jsonify(director)

@app.delete("/api/generos/<id_genero>")
def borra_genero(id_genero):

    with DbSession(settings.DB_URL) as session:
        session.execute("DELETE FROM generos WHERE id_genero = %s RETURNING *", (id_genero,))
        genero = session.fetchone()
        session.commit()

    if genero is None:
        return jsonify({"message": "Genero no encontrado"}), 404

    return jsonify(genero)

@app.post("/api/peliculas")
def crea_pelicula():

    pelicula_data = request.get_json()

    query = """
    INSERT INTO peliculas (titulo, sinopsis, url_pelicula, ano_extreno, duracion, genero, categoria)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    RETURNING *
    """

    with DbSession(settings.DB_URL) as session:
        session.execute(query, 
            vars=(
            pelicula_data["titulo"],
            pelicula_data["sinopsis"],
            pelicula_data["url_pelicula"],
            pelicula_data["ano_extreno"],
            pelicula_data["duracion"],
            pelicula_data["genero"],
            pelicula_data["categoria"],
        ),
    )
        pelicula = session.fetchone()               
        session.commit()

    if pelicula is None:
        return jsonify({"message": "Pelicula no creada"}), 400
    
    return jsonify(pelicula), 201

@app.post("/api/actores")
def crea_actor():

    actor_data = request.get_json()

    query = """
    INSERT INTO actores (nombre)
    VALUES (%s)
    RETURNING *
    """
    with DbSession(settings.DB_URL) as session:
        session.execute(query, 
            vars=(
            actor_data["nombre"],
        ),
    )
        actor = session.fetchone()               
        session.commit()

    if actor is None:
        return jsonify({"message": "Actor no creado"}), 400
    
    return jsonify(actor), 201

@app.post("/api/directores")
def crea_director():

    director_data = request.get_json()

    query = """
    INSERT INTO directores (nombre)
    VALUES (%s)
    RETURNING *
    """
    with DbSession(settings.DB_URL) as session:
        session.execute(query, 
            vars=(
            director_data["nombre"],
        ),
    )
        director = session.fetchone()               
        session.commit()

    if director is None:
        return jsonify({"message": "Director no creado"}), 400
    
    return jsonify(director), 201

@app.post("/api/generos")
def crea_genero():

    genero_data = request.get_json()

    query = """
    INSERT INTO generos (genero)
    VALUES (%s)
    RETURNING *
    """
    with DbSession(settings.DB_URL) as session:
        session.execute(query, 
            vars=(
            genero_data["genero"],
        ),
    )
        genero = session.fetchone()               
        session.commit()

    if genero is None:
        return jsonify({"message": "Genero no creado"}), 400
    
    return jsonify(genero), 201

@app.put("/api/peliculas/<id_pelicula>")
def actualizar_pelicula(id_pelicula):
    
        pelicula_data = request.get_json()
    
        query = """
        UPDATE peliculas
        SET
            titulo = %s,
            sinopsis = %s,
            url_pelicula = %s,
            ano_extreno = %s,
            duracion = %s,
            genero = %s,
            categoria = %s
        WHERE id_pelicula = %s
        RETURNING *
        """ 
        with DbSession(settings.DB_URL) as session:
            session.execute(query, 
                vars=(
                pelicula_data["titulo"],
                pelicula_data["sinopsis"],
                pelicula_data["url_pelicula"],
                pelicula_data["ano_extreno"],
                pelicula_data["duracion"],
                pelicula_data["genero"],
                pelicula_data["categoria"],
                id_pelicula,
            ),
        )
            pelicula = session.fetchone()               
            session.commit()
    
        if pelicula is None:
            return jsonify({"message": "Pelicula no encontrada"}), 404
        
        return jsonify(pelicula), 201


@app.put("/api/actores/<id_actor>")
def actualizar_actor(id_actor):
    
        actor_data = request.get_json()
    
        query = """
        UPDATE actores
        SET
            nombre = %s
        WHERE id_actor = %s
        RETURNING *
        """
        with DbSession(settings.DB_URL) as session:
            session.execute(query, 
                vars=(
                actor_data["nombre"],
                id_actor,
            ),
        )
            actor = session.fetchone()               
            session.commit()
    
        if actor is None:
            return jsonify({"message": "Actor no encontrado"}), 404
        
        return jsonify(actor), 201

@app.put("/api/directores/<id_director>")
def actualizar_director(id_director):
    
        director_data = request.get_json()
    
        query = """
        UPDATE directores
        SET
            nombre = %s
        WHERE id_director = %s
        RETURNING *
        """
        with DbSession(settings.DB_URL) as session:
            session.execute(query, 
                vars=(
                director_data["nombre"],
                id_director,
            ),
        )
            director = session.fetchone()               
            session.commit()
    
        if director is None:
            return jsonify({"message": "Director no encontrado"}), 404
        
        return jsonify(director), 201

@app.put("/api/generos/<id_genero>")
def actualizar_genero(id_genero):

        genero_data = request.get_json()

        query = """
        UPDATE generos
        SET
            genero = %s
        WHERE id_genero = %s
        RETURNING *
        """
        with DbSession(settings.DB_URL) as session:
            session.execute(query, 
                vars=(
                genero_data["genero"],
                id_genero,
            ),
        )
            genero = session.fetchone()               
            session.commit()

        if genero is None:
            return jsonify({"message": "Genero no encontrado"}), 404
        
        return jsonify(genero), 201
