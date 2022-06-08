const express = require('express');

const ruteador = express.Router();

module.exports = (servicios) => {

    const servicioVideojuego = servicios.servicioVideojuegos;

    ruteador.get("/", function(request, response){

        parametros = [];
        parametros["nombre"] = null;
        parametros["costo"] = null;

        if(request.query.nombre && request.query.nombre != ""){
            parametros["nombre"] = request.query.nombre;
        }

        if(request.query.costo && request.query.costo != ""){
            parametros["costo"] = request.query.costo;
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

        servicioVideojuego.obtenerVideojuegos(parametros, limit, offset, order_by, function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.get("/:idVideojuego", function(request, response){
        let idVideojuego = request.params.idVideojuego;
        servicioVideojuego.obtenerVideojuego(idVideojuego, function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.post('/', function(request, response){
        var videojuego = request.body;    
        servicioVideojuego.insertarVideojuego(videojuego, function(resultado){
            response.send(resultado);
        })

    });

    ruteador.put('/:idVideojuego', function(request, response){
        let idVideojuego = request.params.idVideojuego;
        var videojuego = request.body;
        servicioVideojuego.modificarVideojuego(idVideojuego, videojuego, function(resultado){
            response.send(resultado);
    });
        });
        

    ruteador.delete('/:idVideojuego', function(request, response){
        let idVideojuego = request.params.idVideojuego;
        servicioVideojuego.eliminarVideojuego(idVideojuego, function(resultado){
            response.send(resultado);
        });
        
    });

    return ruteador;
};
