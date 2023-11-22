import express from 'express';
import ProductManager from '../Manager/ProductManager.js';
import CartManager from '../Manager/CartManager.js';
import productRouter from '../Routers/ProductRouter.js';
import cartRouter from '../Routers/CartRouter.js';

const app = express();
const productManager = new ProductManager('products.json');
const cartManager = new CartManager('Cart.json');

app.use(express.json());

app.use(async (_req, res, next) => {
  try {
    await productManager.init();
    await cartManager.init();
    next();
  } catch (error) {
    console.error("Error al inicializar los managers: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/", (_request, response) => {
  response.send("<h1> Hola mundo desde express </h1>");
});

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

const port = 8150;
app.listen(port, () => console.log(`Server listening on port ${port}`));
