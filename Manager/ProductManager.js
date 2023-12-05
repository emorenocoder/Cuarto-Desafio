import { promises as fs } from 'fs';

export default class ProductManager {
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

      if (!Array.isArray(productsArray.products)) {
        throw new Error("El contenido del archivo no es un array JSON válido.");
      }

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
      await fs.writeFile(this.path, JSON.stringify({ products: productsArray }, null, 2), 'utf8');
    } catch (error) {
      console.error("Error al guardar los productos: ", error);
    }
  }

  getProducts() {
    return Array.from(this.products.values());
  }

  getLimitedProducts(limit) {
    const allProducts = Array.from(this.products.values());
    return allProducts.slice(0, limit);
  }

  getAllProducts() {
    return Array.from(this.products.values());
  }

  getProductById(productId) {
    const product = this.products.get(productId);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  addProduct(newProduct) {
    const productId = `p${this.products.size + 1}`;
    const productWithId = { ...newProduct, id: productId };
    this.products.set(productId, productWithId);
    this.saveProductsToFile();
    return productWithId;
  }

  updateProduct(productId, updatedProduct) {
    const existingProduct = this.products.get(productId);
    if (!existingProduct) {
      throw new Error("Producto no encontrado");
    }

    const updatedProductWithId = { ...existingProduct, ...updatedProduct };
    this.products.set(productId, updatedProductWithId);
    this.saveProductsToFile();
    return updatedProductWithId;
  }

  deleteProduct(productId) {
    const deletedProduct = this.products.get(productId);
    if (!deletedProduct) {
      throw new Error("Producto no encontrado");
    }

    this.products.delete(productId);
    this.saveProductsToFile();
    return { message: "Producto eliminado", deletedProduct };
  }
}
