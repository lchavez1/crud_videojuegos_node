var botonEditar;
var botonRegresar;

function iniciar(){

    botonEditar = document.getElementById("editar");
    botonRegresar = document.getElementById("regresar");

    botonEditar.addEventListener("click", function(){
        confirmar.mostrar();
    });
    botonRegresar.addEventListener("click", regresar);

    confirmar = new Confirmar("confirmar", "overlay", editarUsuario);

    idUsuario = obtenerParametroDelQueryString("idUsuario");

    obtenerUsuario();
}

function regresar(){
    window.location = "/usuario"
}

function cargarUsuario(datos){
    document.getElementById("nombre").value = datos[0].nombre;
    document.getElementById("apellido").value = datos[0].apellido;
    document.getElementById("username").value = datos[0].username;
}

function obtenerUsuario(){
    var base = "/api/usuario/" + idUsuario;

    fetch(base, {
        method : "GET",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept-Language" : "application/json"
        }
    }).then(function(respuesta){
        return respuesta.json();
    }).then(function(datos){
        cargarUsuario(datos);
    });
}

function editarUsuario(){

    var usuario = {
        "nombre" : document.getElementById("nombre").value,
        "apellido" : document.getElementById("apellido").value,
        "username" : document.getElementById("username").value
    };

    var base = "/api/usuario/" + idUsuario;

    console.log("Antes del fetch");

    fetch(base, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Accept-Language" : "application/json"
        },
        body : JSON.stringify(usuario)
    }).then(function(respuesta){
        return respuesta.json;
    }).then(function(){
        alert("El usuario se edito correctamente");
        regresar();
    });
}

window.onload = iniciar;