import fs from "fs";

import utils from "./utils.js";
class ProductManager {
  static producto;
  static products;
  static correlativoId = 0;
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  addProduct = async (title, descricpion, price, thumbnail, code, stock) => {
    let producto = {
      title,
      descricpion,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products = [];
    this.products = await this.getProducts();
    if (this.products?.some((el) => el.code === producto.code)) {
      throw new Error("Ya existe un producto con ese código");
    }
    ProductManager.correlativoId = this.products.push({
      ...producto,
      id: this.products.length
        ? this.products[this.products.length - 1].id + 1
        : 0,
    });
    utils.writeFile(this.path, this.products);
  };
  getProducts = async () => {
    try {
      let data = await utils.readFile(this.path);
      return data?.length > 0 ? data : [];
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (id) => {
    this.products = await this.getProducts();
    const product = this.products.find((el) => el.id === id);
    if (product === undefined) {
      throw new Error("debe ingresar un id de producto existente");
    }
    return product;
  };

  deleteProduct = async (id) => {
    this.products = await this.getProducts();
    const productIndex = this.products.findIndex((el) => el.id === id);
    if (productIndex !== -1) {
      let product = this.products[productIndex];
      this.products.splice(productIndex, 1);
      await utils.writeFile(this.path, this.products);

      return { mensaje: "producto eliminado", producto: product };
    } else {
      return { mensaje: "no existe el producto solicitado" };
    }
  };

  updateProductById = async (data) => {
    try {
      let products = await this.getProducts();
      this.products = products?.length > 0 ? products : [];

      let productIndex = this.products.findIndex((dato) => dato.id === data.id);
      if (productIndex !== -1) {
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...data,
        };
        await utils.writeFile(this.path, products);
        return {
          mensaje: "producto actualizado",
          producto: this.products[productIndex],
        };
      } else {
        return { mensaje: "no existe el producto solicitado" };
      }
    } catch (error) {
      console.log(error);
    }
  };
}
// pruebas
/* let productosManagerV1 = new ProductManager("./productos.json");
console.log(await productosManagerV1.getProducts()); */
/* console.log(
  await productosManagerV1.addProduct(
    "producto prueba",
    "este es un producto prueba",
    200,
    "sin imagen",
    123,
    24
  )
); */
/* console.log(await productosManagerV1.getProducts());
console.log(await productosManagerV1.getProductById(0));
console.log(
  await productosManagerV1.updateProductById({
    title: "modificacion",
    descricpion: "este es un producto prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: 123,
    stock: 24,
    id: 0,
  })
);
console.log(await productosManagerV1.getProducts());
console.log(await productosManagerV1.deleteProduct(0)); */

export default ProductManager