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

}
