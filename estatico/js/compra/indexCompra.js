var botonBuscar;
var botonRegresar;
var wrapper;
var confirmarBorrar;
var CompraId;

function iniciar(){
    wrapper = document.getElementById("compra");
    botonBuscar = wrapper.getElementsByClassName("buscar")[0];
    botonRegresar = wrapper.getElementsByClassName("agregar")[0];
    textoABuscar = wrapper.getElementsByClassName("textoBuscar")[0];
    confirmarBorrar = new Confirmar("confirmar", "overlay", eliminarCompra)
    

    botonBuscar.addEventListener("click", buscarPorNombre);

    botonRegresar.addEventListener("click", irAAgregarCompra);

    obtenerCompras("", cargarCompras);

    textoABuscar.addEventListener("keyup", function(evento){
        if(evento.key == "Enter"){
            buscarPorNombre();
        }
    });



}

function cargarCompras(compras){

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
            "<th>idCompra</th>" +
            "<th>Videojuego</th>" +
            "<th>Usuario</th>" +
            "<th>Acciones</th>" +
            "</tr>";

        tabla.appendChild(encabezado);
    
        tabla.appendChild(cuerpo);
    }

    

    if(compras.length > 0){

        compras.forEach(function(elemento, indice){

        var fila = document.createElement("tr");

        for(const propiedad in elemento){
            var celda = document.createElement("td");
            if(propiedad == 'idCompra'){
                var enlace = document.createElement("a");
                enlace.innerHTML = elemento[propiedad];
                enlace.setAttribute("href", "editarCompra.html?idCompra="+ elemento["idCompra"]);
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
            CompraId = elemento["idCompra"];
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

function eliminarCompra(){
    var base = "/api/compra/" + CompraId;

    fetch(base, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept-Language" : "application/json"
        }
    }).then(function(respuesta){
        return respuesta.json();
    }).then(function(){
        alert("La compra fue eliminada");
        obtenerCompras("", cargarCompras);
    });
}

function obtenerCompras(nombreBuscar, regresarDatos){

    var base = "/api/compra";

    if(nombreBuscar && nombreBuscar != ""){
        base += "?videojuego=" + nombreBuscar;
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
    obtenerCompras(textoABuscar, cargarCompras);
}

function irAAgregarCompra(){
    window.location = "agregarCompra.html";
}

window.onload = iniciar;