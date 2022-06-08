const express = require('express');

const ruteador = express.Router();

module.exports = (servicios) => {

    const servicioUsuario = servicios.servicioUsuarios;

    ruteador.get("/", function(request, response){

        parametros = [];
        parametros["nombre"] = null;
        parametros["apellido"] = null;
        parametros["username"] = null;

        if(request.query.nombre && request.query.nombre != ""){
            parametros["nombre"] = request.query.nombre;
        }

        if(request.query.apellido && request.query.apellido != ""){
            parametros["apellido"] = request.query.apellido;
        }

        if(request.query.username && request.query.username != ""){
            parametros["username"] = request.query.username;
        }

        let limit = null;
        if(request.query.limit && !isNaN(parseInt(request.query.limit))){
            limit = parseInt(request.query.limit);
        }

        let offset = null;
        if(request.query.offset && !isNaN(parseInt(request.query.offset))){
            offset = parseInt(request.query.offset);
        }

        let order_by = null;
        if(request.query.order_by && request.query.order_by != ""){
            order_by = request.query.order_by;
        }

        servicioUsuario.obtenerUsuarios(parametros, limit, offset, order_by, function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.get("/:idUsuario", function(request, response){
        let idUsuario = request.params.idUsuario;
        servicioUsuario.obtenerUsuario(idUsuario, function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.post('/', function(request, response){
        var usuario = request.body;
        //console.log(videojuego);
        servicioUsuario.insertarUsuario(usuario, function(resultado){
            response.send(resultado);
        })

    });

    ruteador.put('/:idUsuario', function(request, response){
        let idUsuario = request.params.idUsuario;
        var usuario = request.body;
        servicioUsuario.modificarUsuario(idUsuario, usuario, function(resultado){
            response.send(resultado);
        });
    });

    ruteador.delete('/:idUsuario', function(request, response){
        let idUsuario = request.params.idUsuario;
        servicioUsuario.eliminarUsuario(idUsuario, function(resultado){
            response.send(resultado);
        });
        
    });

    return ruteador;
};
