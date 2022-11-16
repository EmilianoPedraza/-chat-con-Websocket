//DEPENDENCIAS
const { productos } = require("./contenedor");
const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
const puerto = 8080;

const server = app.listen(puerto, () => {
  console.log(
    `Servidor levantado con exito en puerto: ${server.address().port}`
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebar
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");
//==============================================================================================

app.post("/productos", (req, res) => {
  const producto = req.body;
  if (!isNaN(producto.price)) {
    producto.price = parseFloat(producto.price);
    productos.save(producto);
    res.render("lista", { productos });
  } else {
    res
      .json({ error: "Error, solo números a la hora de ingresar price" })
      .status(404);
  }
});

app.get("/productos",(req, res)=>{
    res.render("lista", {productos})
})

app.get("/", (req, res) => {
  res.render("form");
});

server.on("error", (error) => {
  console.log(`Ah ocurrido un ${error}`);
});
