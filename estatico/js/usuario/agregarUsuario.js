var botonGuardar;
var botonRegresar;

function iniciar(){

    botonGuardar = document.getElementById("guardar");
    botonRegresar = document.getElementById("regresar");

    botonGuardar.addEventListener("click", function(){
        confirmar.mostrar();
    });
    botonRegresar.addEventListener("click", regresar);

    confirmar = new Confirmar("confirmar", "overlay", agregarUsuario);
}

function regresar(){
    window.location = "/usuario"
}

function agregarUsuario(){

    var usuario = {
        "nombre" : document.getElementById("nombre").value,
        "apellido" : document.getElementById("apellido").value,
        "username" : document.getElementById("username").value
    };

    var base = "/api/usuario";

    fetch(base, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept-Language" : "application/json"
        },
        body : JSON.stringify(usuario)
    }).then(function(respuesta){
        return respuesta.json;
    }).then(function(){
        alert("El usuario se agrego correctamente");
        regresar();
    });
}

window.onload = iniciar;