var videojuegos = [];
var botonBuscar;
var botonRegresar;
var wrapper;
var confirmarBorrar;
var VideojuegoId;

function iniciar(){
    wrapper = document.getElementById("videojuego");
    botonBuscar = wrapper.getElementsByClassName("buscar")[0];
    botonRegresar = wrapper.getElementsByClassName("agregar")[0];
    textoABuscar = wrapper.getElementsByClassName("textoBuscar")[0];
    confirmarBorrar = new Confirmar("confirmar", "overlay", eliminarVideojuego)
    

    botonBuscar.addEventListener("click", buscarPorNombre);

    botonRegresar.addEventListener("click", irAAgregarVideojuego);

    obtenerVideojuegos("", cargarVideojuegos);

    textoABuscar.addEventListener("keyup", function(evento){
        if(evento.key == "Enter"){
            buscarPorNombre();
        }
    });



}

function cargarVideojuegos(videojuegos){

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
            "<th>idVideojuego</th>" +
            "<th>Nombre</th>" +
            "<th>Costo</th>" +
            "<th>Acciones</th>" +
            "</tr>";

        tabla.appendChild(encabezado);
    
        tabla.appendChild(cuerpo);
    }

    

    if(videojuegos.length > 0){

        videojuegos.forEach(function(elemento, indice){

        var fila = document.createElement("tr");

        for(const propiedad in elemento){
            var celda = document.createElement("td");
            if(propiedad == 'idVideojuego' || propiedad == 'nombre'){
                var enlace = document.createElement("a");
                enlace.innerHTML = elemento[propiedad];
                enlace.setAttribute("href", "editarVideojuego.html?idVideojuego="+ elemento["idVideojuego"]);
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
            VideojuegoId = elemento["idVideojuego"];
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

function eliminarVideojuego(){
    var base = "/api/videojuego/" + VideojuegoId;

    fetch(base, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept-Language" : "application/json"
        }
    }).then(function(respuesta){
        return respuesta.json();
    }).then(function(){
        alert("El videojuego fue eliminado");
        obtenerVideojuegos("", cargarVideojuegos);
    });
}

function obtenerVideojuegos(nombreBuscar, regresarDatos){

    var base = "/api/videojuego";

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
        videojuegos = datos;
        regresarDatos(datos);
    });
}

function buscarPorNombre(){
    textoABuscar = wrapper.getElementsByClassName("textoBuscar")[0].value;
    obtenerVideojuegos(textoABuscar, cargarVideojuegos);
}

function irAAgregarVideojuego(){
    window.location = "agregarVideojuego.html";
}

window.onload = iniciar;