var botonGuardar;
var botonRegresar;
var selectUsuarios;
var selectVideojuegos
var videojuegos;

function iniciar(){

    selectUsuarios = document.getElementById("usuario");
    selectVideojuegos = document.getElementById("videojuego");

    botonGuardar = document.getElementById("guardar");
    botonRegresar = document.getElementById("regresar");

    botonGuardar.addEventListener("click", function(){
        confirmar.mostrar();
    });
    botonRegresar.addEventListener("click", regresar);

    confirmar = new Confirmar("confirmar", "overlay", agregarCompra);

    traerUsuarios(llenarSelectUsuarios);
    traerVideojuegos(llenarSelectVideojuegos);
}

function regresar(){
    window.location = "/compra"
}

function agregarCompra(){

    var usuario = {
        "videojuego" : document.getElementById("videojuego").value,
        "usuario" : document.getElementById("usuario").value
    };

    var base = "/api/compra";

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
        alert("La compra se agrego correctamente");
        regresar();
    });
}

function llenarSelectUsuarios(datos){

    for(let i = 0; i < datos.length; i++){
        var option = document.createElement("option");
        option.innerHTML = datos[i].nombre;
        option.value = datos[i].idUsuario;
        selectUsuarios.appendChild(option);
    }

}

function llenarSelectVideojuegos(datos){
    
    for(let i = 0; i < datos.length; i++){
        var option = document.createElement("option");
        option.innerHTML = datos[i].nombre;
        option.value = datos[i].idVideojuego;
        selectVideojuegos.appendChild(option);
    }

}

function traerUsuarios(regresarDatos){
    var base = "/api/usuario";

    fetch(base, {
        method : "GET",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept-Language" : "application/json"
        }
    }).then(function(respuesta){
        return respuesta.json();
    }).then(function(datos){
        regresarDatos(datos);
    });
}

function traerVideojuegos(regresarDatos){
    var base = "/api/videojuego";

    fetch(base, {
        method : "GET",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept-Language" : "application/json"
        }
    }).then(function(respuesta){
        return respuesta.json();
    }).then(function(datos){
        regresarDatos(datos);
    });
}

window.onload = iniciar;