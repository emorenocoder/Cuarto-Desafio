import { promises as fs } from 'fs';

export class ProductManager {
  constructor(path) {
    this.products = new Map();
    this.path = path;
  }

  async init() {
    try {
      await this.loadProductsFromFile();
    } catch (error) {
      console.error("Error al cargar los productos: ", error);
    }
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      const productsArray = JSON.parse(data);
     
      productsArray.products.forEach(product => {
        this.products.set(product.id, product);
      });
    } catch (error) {
      console.error("Error al cargar los productos: ", error);
    }
  }

  async saveProductsToFile() {
    const productsArray = Array.from(this.products.values());
    try {
      await fs.writeFile(this.path, JSON.stringify(productsArray, null, 2), 'utf8');
    } catch (error) {
      console.error("Error al guardar los productos: ", error);
    }
  }

  getProducts() {
    return Array.from(this.products.values());
  }

  validateProduct(product) {
    if (!product.id || !product.code) {
      throw new Error("El producto debe tener un 'id' y un 'code'.");
    }
  }

  addProduct(product) {
    this.validateProduct(product);
    if (this.products.has(product.id)) {
      throw new Error("El ID del producto ya existe.");
    }
    if (this.products.values().some(p => p.code === product.code)) {
      throw new Error("El código del producto ya existe.");
    }
    this.products.set(product.id, product);
  }

  getProductById(productId) {
    const product = this.products.get(productId);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }
    return product;
  }

  updateProduct(productId, updatedProduct) {
    if (!this.products.has(productId)) {
      throw new Error("Producto no encontrado.");
    }
    const currentProduct = this.products.get(productId);
    const mergedProduct = { ...currentProduct, ...updatedProduct };
    this.validateProduct(mergedProduct);
    this.products.set(productId, mergedProduct);
  }

  deleteProduct(productId) {
    if (!this.products.has(productId)) {
      throw new Error("Producto no encontrado.");
    }
    this.products.delete(productId);
  }
}
