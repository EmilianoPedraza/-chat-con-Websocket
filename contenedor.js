class Contenedor {
  constructor(productos) {
    this.productos = productos;
  }
  async getById(id) {
    if (this.productos.length > 0) {
      const encontrados = await this.productos.filter((prd) => prd.id == id);
      if (encontrados.length > 0) {
        return (encontrados.length === 1 ? encontrados[0] : encontrados)
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  async save(product) {
    let id = 1;
    this.productos.forEach((prd) => {
      if (prd.id >= id) {
        id = prd.id + 1;
      }
    });
    const prodSave = {...{ id: id }, ...product};
    this.productos.push(prodSave);
  }

  async getAll() {
    return this.productos;
  }

  async getDeleteById(id){
    if(this.productos.length > 0){
      const newArray = await this.productos.filter(p => p.id != id)
      if(newArray.length === this.productos.length){return false}
      else{this.productos = newArray; return true}
    }
    return false
  }
  async actualizacionProducto(id){
    if(this.productos.length > 0){
      for(let i = 0; i < this.productos.length; i++){
        if(this.productos[i].id==id){
          //retorno una función que acepta como parametro el producto a remplazar
          return (prodActual)=>{
            this.productos[i] = prodActual
          }
        }
      }
      return false
    }
    return false
  }
}

const productos = new Contenedor([]);

exports.productos = productos;
