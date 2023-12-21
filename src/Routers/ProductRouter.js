import express from 'express';
import ProductManager from '../Manager/ProductManager.js';
import CartManager from '../Manager/CartManager.js';
import * as productController from  '../controller/ProductController.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const productManager = new ProductManager('productos.json');
const cartManager = new CartManager('Cart.json');

let io;

router.setIo = (socketIo) => {
  io = socketIo;
};

router.get('/', (req, res) => {
  const { limit } = req.query;

  if (limit && Number(limit)) {
    const limitedProducts = productManager.getLimitedProducts(Number(limit));
    res.json(limitedProducts);
  } else {
    const allProducts = productManager.getProducts();
    res.json(allProducts);
  }
});

router.get('/realtimeproducts', (_req, res) => {
  const products = productManager.getAllProducts();
  res.render('realTimeProducts', { products });
});

router.post(
  '/realtimeproducts',
  [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('price').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  ],
  (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { action, productId } = req.body;

      if (action === 'add') {
        const newProduct = {
          title: req.body.title,
          description: req.body.description,
          price: parseFloat(req.body.price),
        };

        productManager.addProduct(newProduct);
        io.emit('newProduct', newProduct);
      } else if (action === 'delete') {
        productManager.deleteProduct(productId);
        io.emit('deleteProduct', productId);
      }

      res.redirect('/realtimeproducts');
    } catch (error) {
      console.error('Error en la ruta POST /realtimeproducts:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

router.post('/carts', (_req, res) => {
  try {
    const newCart = cartManager.addCart();
    res.json(newCart);
  } catch (error) {
    console.error('Error en la ruta POST /carts:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get("/product", productController.getProducts);

export default router;
