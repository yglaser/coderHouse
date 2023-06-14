class ProductManager {
  static producto;
  static products;
  constructor() {
    this.products = [];
  }
  addProduct = (title, descricpion, price, thumbnail, code, stock) => {
    let producto = {
      title,
      descricpion,
      price,
      thumbnail,
      code,
      stock      
    };

    this.products?.find((el) => el.code === code)
      ? new Error("ya existe producto con ese codigo")
      : this.products.push({
          ...producto,
          id: this.products.length ? this.products[this.products.length - 1].id + 1 : 0 ,
        });
  };
  getProducts = () => {
    return this.products;
  };

  getProductById = (id) => {
    const product = this.products.find((el) => el.id === id);
    if (product === undefined) throw Error("Debe ingresar un id de evento");
    
    return product;
  };
}

let productos = new ProductManager();

productos.addProduct("hola", "probando", 24, "assdd", 1, 23);
productos.addProduct("hola", "probando", 25, "assdd", 2, 23);
productos.addProduct("hola", "probando", 24, "assdd", 3, 23);
productos.addProduct("hola", "probando", 24, "assdd", 1, 23);
productos.getProductById(2)
productos.getProductById(25)
console.log(productos)