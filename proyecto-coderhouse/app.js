import express from "express";
import ProductManager from "./ProductManager.js";

// product manager 
const productosManagerV1 = new ProductManager("./productos.json");

// express init
const app = express();
app.use(express.urlencoded({ extended: true }));

// gets methods 
app.get("/products", async (req, res) => {
  const limite = req.query.limit;
  try {
    let products = await productosManagerV1.getProducts();    
    if (limite) {
      products = products.filter((el, index) => {
        return index < limite;
      });
    }
    res.json(products.length);
  } catch (err) {
    console.log(err);
  }
});

app.get("/products/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  try {
    const producto = await productosManagerV1.getProductById(pid);
    res.json(producto);
  } catch (err) {
    console.log(err);
  }
});
app.listen(8080, () => {
  console.log("listening at 8080");
});
