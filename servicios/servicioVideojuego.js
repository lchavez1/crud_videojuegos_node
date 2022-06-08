const mysql = require('mysql');

class servicioVideojuego{

    constructor(cadenaConexion){
        this.cadenaConexion = cadenaConexion;
    }

    obtenerVideojuegos(parametros, limit, offset, order_by, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let queryBase = "select * from videojuego";
        let separador = " where ";

        let valores = [];

        for(const nombre in parametros){
            if(parametros[nombre] != null){
                queryBase += separador + nombre + " like ? "
                separador = " and ";
                valores.push("%" + parametros[nombre] + "%");
            }
        }

        if(limit != null){
            queryBase += " limit ?" 
            valores.push(limit);
        }

        if(offset != null){
            queryBase += " offset ?" 
            valores.push(limit);
        }

        if(order_by != null){
            queryBase += " order by " + order_by;
        }
        
        conexion.query(queryBase, valores, function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                conexion.end();
                regeresarResultado(resultado);
            }        
        });
    }

    obtenerVideojuego(id, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "select * from videojuego where idVideojuego = ?";
        let valores = [id];

        
        conexion.query(query, valores, function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                conexion.end();
                regeresarResultado(resultado);
            }
            
        });
    }

    insertarVideojuego(videojuego, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "insert into videojuego(nombre, costo) "+ "values (?, ?) ";
        var valores = [
            videojuego.nombre,
            videojuego.costo
        ];

        conexion.query(query, valores, function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
            conexion.query("select last_insert_id() as idVideojuego", function(error, id, parametros){
                conexion.end();
                regeresarResultado(id);
            });
            }   
        }); 
    }

    modificarVideojuego(id, videojuego, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "update videojuego set nombre = ?, costo = ? where idVideojuego = " + id;
        var valores = [
            videojuego.nombre,
            videojuego.costo
        ];

        conexion.query(query, valores, function(error, resultado, campos){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                if(resultado.affectedRows != 0){
                    var mensaje = "Se actualizo con exito el videojuego con id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                } else {
                    var mensaje = "No se encontro informacion para el id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                }  
                conexion.end();
            }
        });
    }

    eliminarVideojuego(id, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "delete from videojuego where idVideojuego = ?";

        let valores = [id];
        
        conexion.query(query, valores, function(error, resultado, campos){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                if(resultado.affectedRows != 0){
                    var mensaje = "Se elimino con exito el videojuego con id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                } else {
                    var mensaje = "No se encontro informacion para el id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                }  
                conexion.end();
            }
        });
    }

}

module.exports = servicioVideojuego;