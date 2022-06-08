var videojuegos = [];
var botonBuscar;
var botonRegresar;
var wrapper;
var confirmarBorrar;
var UsuarioId;

function iniciar(){
    wrapper = document.getElementById("usuario");
    botonBuscar = wrapper.getElementsByClassName("buscar")[0];
    botonRegresar = wrapper.getElementsByClassName("agregar")[0];
    textoABuscar = wrapper.getElementsByClassName("textoBuscar")[0];
    confirmarBorrar = new Confirmar("confirmar", "overlay", eliminarUsuario)
    

    botonBuscar.addEventListener("click", buscarPorNombre);

    botonRegresar.addEventListener("click", irAAgregarUsuario);

    obtenerUsuarios("", cargarUsuarios);

    textoABuscar.addEventListener("keyup", function(evento){
        if(evento.key == "Enter"){
            buscarPorNombre();
        }
    });



}

function cargarUsuarios(usuarios){

    var divTabla = wrapper.getElementsByClassName("tabla")[0];

    var tabla = wrapper.getElementsByTagName("table")[0];

    var encabezado;
    var cuerpo;

    if(tabla){

        cuerpo = tabla.getElementsByTagName("tbody")[0];
        cuerpo.innerHTML = "";

    } else {
        var tabla = document.createElement("table");

        encabezado  = document.createElement("thead");
        cuerpo = document.createElement("tbody");

        encabezado.innerHTML = "<tr>" +
            "<th>idUsuario</th>" +
            "<th>Nombre</th>" +
            "<th>Apellido</th>" +
            "<th>Username</th>" +
            "<th>Acciones</th>" +
            "</tr>";

        tabla.appendChild(encabezado);
    
        tabla.appendChild(cuerpo);
    }

    

    if(usuarios.length > 0){

        usuarios.forEach(function(elemento, indice){

        var fila = document.createElement("tr");

        for(const propiedad in elemento){
            var celda = document.createElement("td");
            if(propiedad == 'idUsuario' || propiedad == 'nombre'){
                var enlace = document.createElement("a");
                enlace.innerHTML = elemento[propiedad];
                enlace.setAttribute("href", "editarUsuario.html?idUsuario="+ elemento["idUsuario"]);
                celda.append(enlace);
                fila.appendChild(celda);
            } else {
                celda.innerHTML = elemento[propiedad];
                fila.appendChild(celda);
            }
        }

        var botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.addEventListener("click", function(){
            UsuarioId = elemento["idUsuario"];
            confirmarBorrar.mostrar();
        });

        var celda = document.createElement("td");
        celda.appendChild(botonEliminar);
        fila.appendChild(celda);

        cuerpo.appendChild(fila);

        });

        tabla.appendChild(cuerpo);

    } else {

    }

    divTabla.appendChild(tabla);
}

function eliminarUsuario(){
    var base = "/api/usuario/" + UsuarioId;

    fetch(base, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept-Language" : "application/json"
        }
    }).then(function(respuesta){
        return respuesta.json();
    }).then(function(){
        alert("El usuario fue eliminado");
        obtenerUsuarios("", cargarUsuarios);
    });
}

function obtenerUsuarios(nombreBuscar, regresarDatos){

    var base = "/api/usuario";

    if(nombreBuscar && nombreBuscar != ""){
        base += "?nombre=" + nombreBuscar;
    }

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

function buscarPorNombre(){
    textoABuscar = wrapper.getElementsByClassName("textoBuscar")[0].value;
    obtenerUsuarios(textoABuscar, cargarUsuarios);
}

function irAAgregarUsuario(){
    window.location = "agregarUsuario.html";
}

window.onload = iniciar;