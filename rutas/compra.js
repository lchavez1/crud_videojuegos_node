const express = require('express');

const ruteador = express.Router();

module.exports = (servicios) => {

    const servicioCompra = servicios.servicioCompras;

    ruteador.get("/", function(request, response){

        let usuario = null;
        let videojuego = null;

        if(request.query.usuario && request.query.usuario != ""){
            usuario = request.query.usuario;
        }

        if(request.query.videojuego && request.query.videojuego != ""){
            videojuego = request.query.videojuego;
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

        servicioCompra.obtenerCompras(usuario, videojuego, limit, offset, order_by, function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.get("/:idCompra", function(request, response){
        let idCompra = request.params.idCompra;
        servicioCompra.obtenerCompra(idCompra, function(resultado){
            response.send(resultado);
        });    
    });


    ruteador.post('/', function(request, response){
        var compra = request.body;
        servicioCompra.insertarCompra(compra, function(resultado){
            response.send(resultado);
        });
    });

    ruteador.put('/:idCompra', function(request, response){
        let idCompra = request.params.idCompra;
        var compra = request.body;
        servicioCompra.modificarCompra(idCompra, compra, function(resultado){
            response.send(resultado);
        });
        
    });

    ruteador.delete('/:idCompra', function(request, response){
        let idCompra = request.params.idCompra;
        servicioCompra.eliminarCompra(idCompra, function(resultado){
            response.send(resultado);
        });
        
    });
    
    return ruteador;
};
