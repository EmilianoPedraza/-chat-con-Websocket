
socket = io();
const productoHtml = (prod)=>{
    const newRow = document.createElement("tr")
    newRow.innerHTML=`<td class="text-light">${prod.title}</td>
                        <td class="text-light">${prod.price}</td>
                        <td>
                            <img src="${prod.thumbnail}" alt="${prod.title}" width="80px" />
                         </td>`
    document.querySelector(".tablaProductos").appendChild(newRow)
}

const listProdcuts = (arrayProductos) => {
    const listaProductos = document.querySelector(".listaProductos");
    const h3mensaje = document.createElement("h3")
    h3mensaje.innerText = "no hay productos</h3"
    h3mensaje.className = "text-light text-center notProducts"
    const notProduct = document.querySelector(".notProducts");
    if(arrayProductos.length > 0){
        notProduct.remove()
        listaProductos.innerHTML = `
               <div class="d-flex flex-column align-items-center divProdListContainer">
                   <div class="col-8">
                       <table class="table table-dark tablaProductos">
                           <tr class="table-active">
                               <th scope="col">Nombre</th>
                               <th scope="col">Precio</th>
                               <th scope="col">link img</th>
                           </tr>
                       </table>
                   </div>
               </div>`
         const productos = arrayProductos.forEach((prod)=>{
            productoHtml(prod)
         })
         
    }
};


const addProduct=(ev)=>{
    const newProd = {
        title : document.querySelector("#title").value,
        price: document.querySelector("#price").value,
        thumbnail: document.querySelector("#thumbnail")
    }
    socket.emit("nuevoProducto", newProd)
}

socket.on("actualizacionPrd", producto=>{
    productoHtml(producto)
})

socket.on("canalProductos", productos=>{
    listProdcuts(productos)
})

