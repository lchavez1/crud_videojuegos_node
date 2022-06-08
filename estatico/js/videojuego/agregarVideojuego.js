var botonGuardar;
var botonRegresar;

function iniciar(){

    botonGuardar = document.getElementById("guardar");
    botonRegresar = document.getElementById("regresar");

    botonGuardar.addEventListener("click", function(){
        confirmar.mostrar();
    });
    botonRegresar.addEventListener("click", regresar);

    confirmar = new Confirmar("confirmar", "overlay", agregarVideojuego);
}

function regresar(){
    window.location = "/videojuego"
}

function agregarVideojuego(){

    var videojuego = {
        "nombre" : document.getElementById("nombre").value,
        "costo" : document.getElementById("costo").value
    };

    console.log(videojuego);

    var base = "/api/videojuego";

    console.log("Antes del fetch");

    fetch(base, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept-Language" : "application/json"
        },
        body : JSON.stringify(videojuego)
    }).then(function(respuesta){
        console.log();
        return respuesta.json;
    }).then(function(){
        alert("El videojuego se agrego correctamente");
        regresar();
    });
}

window.onload = iniciar;