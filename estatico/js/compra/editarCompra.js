var botonEditar;
var botonRegresar;
var selectUsuarios;
var selectVideojuegos;
var pIdCompra;
var todosVideojuegos;
var todosUsuarios;

function iniciar(){

    selectUsuarios = document.getElementById("usuario");
    selectVideojuegos = document.getElementById("videojuego");
    pIdCompra = document.getElementById("idCompra");

    botonEditar = document.getElementById("editar");
    botonRegresar = document.getElementById("regresar");

    botonEditar.addEventListener("click", function(){
        confirmar.mostrar();
    });
    botonRegresar.addEventListener("click", regresar);

    confirmar = new Confirmar("confirmar", "overlay", editarUsuario);

    idCompra = obtenerParametroDelQueryString("idCompra");

    

    traerUsuarios(llenarSelectUsuarios);
    traerVideojuegos(llenarSelectVideojuegos);   

    obtenerCompra();
}

function regresar(){
    window.location = "/compra"
}

function cargarCompra(datos){
    pIdCompra.innerHTML = "idCompra: " + datos[0].idCompra;
    for(let j = 0; j < selectVideojuegos.length; j++){  
        if(datos[0].videojuego == selectVideojuegos.options[j].innerHTML){
            selectVideojuegos.selectedIndex[j];
            selectVideojuegos.options[j].selected=true;
        }
     }

     for(let j = 0; j < selectUsuarios.length; j++){  
        if(datos[0].usuario == selectUsuarios.options[j].innerHTML){
            console.log(datos[0].usuario)
            console.log(selectUsuarios.options[j].innerHTML)
            selectUsuarios.options[j].selected=true;
        }
     }
}

function obtenerCompra(){
    var base = "/api/compra/" + idCompra;

    fetch(base, {
        method : "GET",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept-Language" : "application/json"
        }
    }).then(function(respuesta){
        return respuesta.json();
    }).then(function(datos){
        cargarCompra(datos);
    });
}

function editarUsuario(){

    var compra = {
        "videojuego" : document.getElementById("videojuego").value,
        "usuario" : document.getElementById("usuario").value
    };

    console.log(idCompra)

    var base = "/api/compra/" + idCompra;

    console.log("Antes del fetch");

    fetch(base, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Accept-Language" : "application/json"
        },
        body : JSON.stringify(compra)
    }).then(function(respuesta){
        return respuesta.json;
    }).then(function(){
        alert("La compra se edito correctamente");
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
        todosUsuarios = datos;
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
        todosVideojuegos = datos;
        regresarDatos(datos);
    });
}

window.onload = iniciar;