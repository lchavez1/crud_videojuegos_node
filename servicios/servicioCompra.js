
const mysql = require('mysql');

class servicioCompra{

    constructor(cadenaConexion){
        this.cadenaConexion = cadenaConexion;
    }

    obtenerCompras(usuario, videojuego, limit, offset, order_by, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let queryBase = "select idCompra, v.nombre as videojuego, u.nombre as usuario from usuario as u inner join compra as c on u.idUsuario = c.usuario inner join videojuego as v on c.videojuego = v.idVideojuego";
        let separador = " where ";

        let valores = [];

        if(usuario != null){
            queryBase += separador + " u.nombre like ? ";
            separador = " and ";
            valores.push("%" + usuario + "%");
        }

        if(videojuego != null){
            queryBase += separador + " v.nombre like ? ";
            valores.push("%" + videojuego + "%");
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
        
        conexion.query(queryBase, valores,  function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                conexion.end();
                regeresarResultado(resultado);
            }
            
        });
    }

    obtenerCompra(id, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "select idCompra, v.nombre as videojuego, u.nombre as usuario from usuario as u inner join compra as c on u.idUsuario = c.usuario inner join videojuego as v on c.videojuego = v.idVideojuego where idCompra = ?;";
        let values = [id];

        conexion.query(query, values, function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                conexion.end();
                regeresarResultado(resultado);
            }
            
        });
    }

    insertarCompra(compra, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "insert into compra(videojuego, usuario) "+ "values (?, ?) ";
        var valores = [
            compra.videojuego,
            compra.usuario
        ];

        /* Quite mi foreign key para poder eliminar los videojuegos y los usuarios, por lo que tuve que agregar validaciones para que el usuario y el videojuego que
        se intenta poner en la nueva compra sea valido es decir que exista en la base de datos*/
        conexion.query("select idVideojuego from Videojuego where idVideojuego = ?", valores[0], function(error, resultado){
            if(resultado.length > 0){
                conexion.query("select idUsuario from Usuario where idUsuario = ?", valores[1], function(error, resultado1){
                    if(resultado1.length > 0){
                        conexion.query(query, valores, function(error, resultado, parametros){
                            if(error){
                                regeresarResultado( {"mensaje" : error});
                            } else {
                            conexion.query("select last_insert_id() as idCompra", function(error, id, parametros){
                                conexion.end();
                                regeresarResultado(id);
                            });
                            }   
                        });
                    } else {
                        regeresarResultado( {"mensaje" : "No existe un usuario con ese id"});
                    }
                });
            } else {
                regeresarResultado( {"mensaje" : "No existe un videojuego con ese id"});
            }
        });

        /*conexion.query(query, valores, function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
            conexion.query("select last_insert_id() as idCompra", function(error, id, parametros){
                conexion.end();
                regeresarResultado(id);
            });
            }   
        }); */
    }

    modificarCompra(id, compra, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "update compra set videojuego = ?, usuario = ? where idCompra = ?;";
        var valores = [
            compra.videojuego,
            compra.usuario,
            id
        ];

        conexion.query(query, valores, function(error, resultado, campos){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                if(resultado.affectedRows != 0){
                    var mensaje = "Se actualizo con exito la compra con id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                } else {
                    var mensaje = "No se encontro informacion para el id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                }  
                conexion.end();
            }
        });
    }

    eliminarCompra(id, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "delete from compra where idCompra = ?;";
        let values = [id];
        
        conexion.query(query, values,  function(error, resultado, campos){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                //console.log(resultado);
                if(resultado.affectedRows != 0){
                    var mensaje = "Se elimino con exito la compra con id = " + id;
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

module.exports = servicioCompra;