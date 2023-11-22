import express from 'express';
import ProductManager from '../Manager/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager('productos.json');

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

router.get('/:pid', (req, res) => {
  const { pid } = req.params;

  try {
    const product = productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  res.json(productManager.addProduct(newProduct));
});

router.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;

  try {
    const result = productManager.updateProduct(Number(pid), updatedProduct);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.delete('/:pid', (req, res) => {
  const { pid } = req.params;

  try {
    const result = productManager.deleteProduct(Number(pid));
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

export default router;
