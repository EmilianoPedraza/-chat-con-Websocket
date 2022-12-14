//DEPENDENCIAS
const express = require("express");
const moment = require("moment")
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const fsGestion = require("./fsGestion/fsGestion")
//almacenamiento=============================================
const mensajes = new fsGestion("./src/fsGestion/mensajes.txt")
const productos = new fsGestion("./src/fsGestion/productos.txt")

//necesarios para el servidor=========================================
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
io.on("connection", async (socket)=>{
  
  console.log("\nCliente conectado")
  const listProd = await productos.getAll()
  socket.emit("canalProductos", listProd)

  socket.on("nuevoProducto", prod=>{
     productos.save(prod)
     io.sockets.emit("actualizacionPrd", prod)
   })
  //apartado de mensajes
  const listMessage = await mensajes.getAll()
  socket.emit("mensajes", listMessage)

  socket.on("nuevoMensaje", async msjRecib=>{
       const fyh = moment(new Date()).format("DD/MM/YYYY hh:mm:ss") 
       const message = {...msjRecib,time : fyh}
       mensajes.save(message)
       io.sockets.emit("nuevoMensajeAtodos", message)   
  })
})

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

