var botonEditar;
var botonRegresar;

function iniciar(){

    botonEditar = document.getElementById("editar");
    botonRegresar = document.getElementById("regresar");

    botonEditar.addEventListener("click", function(){
        confirmar.mostrar();
    });
    botonRegresar.addEventListener("click", regresar);

    confirmar = new Confirmar("confirmar", "overlay", editarVideojuego);

    idVideojuego = obtenerParametroDelQueryString("idVideojuego");

    obtenerVideojuego();
}

function regresar(){
    window.location = "/videojuego"
}

function cargarVideojuego(datos){
    document.getElementById("nombre").value = datos[0].nombre;
    document.getElementById("costo").value = datos[0].costo;
}

function obtenerVideojuego(){
    var base = "/api/videojuego/" + idVideojuego;

    fetch(base, {
        method : "GET",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept-Language" : "application/json"
        }
    }).then(function(respuesta){
        return respuesta.json();
    }).then(function(datos){
        cargarVideojuego(datos);
    });
}

function editarVideojuego(){

    var videojuego = {
        "nombre" : document.getElementById("nombre").value,
        "costo" : document.getElementById("costo").value
    };

    console.log(videojuego);

    var base = "/api/videojuego/" + idVideojuego;

    console.log("Antes del fetch");

    fetch(base, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Accept-Language" : "application/json"
        },
        body : JSON.stringify(videojuego)
    }).then(function(respuesta){
        console.log();
        return respuesta.json;
    }).then(function(){
        alert("El videojuego se edito correctamente");
        regresar();
    });
}

window.onload = iniciar;