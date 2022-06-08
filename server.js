const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const app = express();
const port = 80;

const cadenaConexion = {
    host : "localhost",
    user : "root",
    password : "password",
    database : "epic"
};

const conexionAzure = {
    host: "azurehost", 
    user: "azureuser", 
    password: "password", 
    database: "db", 
    port: 3306
};

const ruteador = express.Router();
const rutas = require('./rutas');

const servicioVideojuego = require('./servicios/servicioVideojuego');
const servicioVideojuegos = new servicioVideojuego(cadenaConexion);

const servicioUsuario = require('./servicios/servicioUsuario');
const servicioUsuarios = new servicioUsuario(cadenaConexion);

const servicioCompra = require('./servicios/servicioCompra');
const servicioCompras = new servicioCompra(cadenaConexion);

app.use(cookieSession({name : 'Session', keys : ['luis']}));
app.use(express.urlencoded({extended : false}));

app.get('/login', (request, response, next) => {
    if (request.session.usuario && request.session.usuario !== ""){
        next();
    }
    else{
        response.sendFile(path.join(__dirname, "./estatico/login/index.html"));
    }
});

app.post("/login", (request, response, next) => {
    if (request.body.usuario == "Luis" && request.body.password == "password"){
        request.session.usuario = "Luis";
        response.redirect("/");
    }
    else{
        response.redirect("/login");
    }
});

app.get('/logout', (request, response, next) => {
    request.session = null;
    response.redirect("/login");
});

app.use((request, response, next) => {
    if (request.session.usuario){
        if (request.session.usuario !== ""){
            return next();
        }
    }
    response.redirect("/login");
});


app.use('/api', rutas( {servicioVideojuegos, servicioUsuarios, servicioCompras} ));
app.use(express.static(path.join(__dirname, "./estatico")));

app.listen(port, function(){
    console.log("Node is listening in port " + port);
});

/*

const conexion = mysql.createConnection(paramatetrosConexion)

conexion.connect(function(error){
    if(error){
        console.log(error);
        response.send({mensaje: "Ocurrio un error"});
    }
});

app.get('/videojuego', function(request, response){
    response.setHeader('Content-Type', 'aplication/json');

    let idVideojuego = request.params.idVideojuego;
    let query = "select * from videojuego";
    conexion.query(query, function(error, resultado, parametros){
        response.send(resultado);
    });
});

app.get('/videojuego/:idVideojuego', function(request, response){
        response.setHeader('Content-Type', 'aplication/json');

        let idVideojuego = request.params.idVideojuego;
        let query = "select * from videojuego where idVideojuego = " + idVideojuego;
        conexion.query(query, function(error, resultado, parametros){
            response.send(resultado);
        });
});*/
