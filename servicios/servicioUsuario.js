const mysql = require('mysql');

class servicioUsuario{

    constructor(cadenaConexion){
        this.cadenaConexion = cadenaConexion;
    }

    obtenerUsuarios(parametros, limit, offset, order_by, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let queryBase = "select * from usuario";
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

        console.log(queryBase);
        
        conexion.query(queryBase, valores, function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                conexion.end();
                regeresarResultado(resultado);
            }   
        });
    }

    obtenerUsuario(id, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "select * from usuario where idUsuario = ?";
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

    insertarUsuario(usuario, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "insert into usuario(nombre, apellido, username) "+ "values (?, ?, ?) ";
        var valores = [
            usuario.nombre,
            usuario.apellido,
            usuario.username
        ];

        conexion.query(query, valores, function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
            conexion.query("select last_insert_id() as idUsuario", function(error, id, parametros){
                conexion.end();
                regeresarResultado(id);
            });
            }   
        }); 
    }

    modificarUsuario(id, usuario, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "update usuario set nombre = ?, apellido = ?, username = ? where idUsuario = " + id;
        var valores = [
            usuario.nombre,
            usuario.apellido,
            usuario.username
        ];

        conexion.query(query, valores, function(error, resultado, campos){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                if(resultado.affectedRows != 0){
                    var mensaje = "Se actualizo con exito el usuario con id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                } else {
                    var mensaje = "No se encontro informacion para el id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                }  
                conexion.end();
            }
        });
    }

    eliminarUsuario(id, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "delete from usuario where idUsuario = ?";

        var valores = [id];
        
        conexion.query(query, valores, function(error, resultado, campos){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                if(resultado.affectedRows != 0){
                    var mensaje = "Se elimino con exito el usuario con id = " + id;
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

module.exports = servicioUsuario;