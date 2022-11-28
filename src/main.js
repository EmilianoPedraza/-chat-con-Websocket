//DEPENDENCIAS
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const {productos} = require("./contenedor")

const app = express();
const puerto = 8080;
const publicRoute = "./public"
//==============================================================================================
//configuración de sockets
const htmlserver = new HttpServer(app)
const io = new IOServer(htmlserver)
//==============================================================================================

//se levanta el servidor
const server = htmlserver.listen(puerto, () => {
  console.log(`Servidor levantado con exito en puerto: ${server.address().port}`);
});
//==============================================================================================
//conección de sockets
io.on("connection", (socket)=>{
  
  console.log("\nCliente conectado")
  productos.getAll().then(r=>{
    socket.emit("canalProductos", r)
  })
  socket.on("nuevoProducto", prod=>{
    productos.save(prod)
    io.sockets.emit("actualizacionPrd", prod)
  })
})
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//==============================================================================================
//ruta de carpeta public con index.html
app.use(express.static(publicRoute))
//==============================================================================================

//endpoint que retorna la vista principal(index.html)
app.get("/",(req, res)=>{
  res.sendFile("index.html", {root:{publicRoute}})
})
server.on("error", (error) => {
  console.log(`Ah ocurrido un ${error}`);
});

