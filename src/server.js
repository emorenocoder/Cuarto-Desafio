import express from "express";
import { ProductManager } from "../src/ProductManager"; 

const app = express();
const productManager = new ProductManager('products.json'); 

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await productManager.init();
    next();
  } catch (error) {
    console.error("Error al inicializar ProductManager: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/", (request, response) => {
  response.send("<h1> Hola mundo desde express </h1>");
});

app.get("/productos", (request, response) => {
  const allProducts = productManager.getProducts();
  response.json(allProducts);
});

app.listen(8150, () => console.log("Server listening on port 8150"));
