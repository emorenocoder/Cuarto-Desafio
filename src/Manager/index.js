import CartManager from "./CartManager.js";
import MessageManager from "./MessageManager.js";
import ProductsManager from "./ProductsManager.js";

export const messageManager = new MessageManager();
export const productManager = new ProductsManager();
export const cartManager = new CartManager(ProductsManager);
