import { promises as fs } from 'fs';

export default class CartManager {
  constructor(path) {
    this.carts = new Map();
    this.path = path;
  }

  async init() {
    try {
      await this.loadCartsFromFile();
    } catch (error) {
      console.error("Error al cargar los carritos: ", error);
    }
  }

  async loadCartsFromFile() {
    try {
      const data = await fs.readFile(this.path, 'utf8');

      if (!data.trim()) {
        console.warn("El archivo de carritos está vacío.");
        return;
      }

      const cartsArray = JSON.parse(data);

      if (!Array.isArray(cartsArray)) {
        throw new Error("El contenido del archivo no es un array JSON válido.");
      }

      cartsArray.forEach(cart => {
        this.carts.set(cart.id, cart);
      });
    } catch (error) {
      console.error("Error al cargar los carritos: ", error);
    }
  }

  async saveCartsToFile() {
    const cartsArray = Array.from(this.carts.values());
    try {
      await fs.writeFile(this.path, JSON.stringify(cartsArray, null, 2), 'utf8');
    } catch (error) {
      console.error("Error al guardar los carritos: ", error);
    }
  }

  getCartById(cartId) {
    return this.carts.get(cartId);
  }

  addCart() {
    const newCartId = `c${this.carts.size + 1}`;
    const newCart = { id: newCartId, products: [] };
    this.carts.set(newCartId, newCart);
    return newCart;
  }

  addProductToCart(cartId, productId) {
    const cart = this.carts.get(cartId);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    const existingProduct = cart.products.find(p => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    this.saveCartsToFile();
    return cart;
  }
}
