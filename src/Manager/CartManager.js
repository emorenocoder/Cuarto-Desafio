import { CartModel } from "../db/model/CartModel.js";
export default class CartManager {

    constructor(productManager) {
        this.productManager = productManager;
    }

    async createCart() {
        const cartData = { products: [] };
        return await CartModel.create(cartData);
    }

    async getCarts() {
        const carts = await CartModel.find().populate('products.product', ["title", "price", "description"]);
        if (carts.length === 0) throw new Error("no hay carros disponibles");
        return carts;
    }

    async getCartById(cartId) {
        const cart = await CartModel.findById(cartId).populate('products.product', ["title", "price", "description"]);
        if (!cart) throw new Error("Carro no encontrado");
        return cart;
    }

    async addProductToCart(cartId, productId) {

        const cart = await this.getCartById(cartId);

        const product = await this.productManager.findById(productId);

        const productIndex = cart.products.findIndex(product => product.equals(productId));

        if (productIndex === -1) {
            cart.products.push({ product: productId, quantity: 1 });
        } else {
            cart.products[productIndex].quantity++;
        }
        
        return await cart.save();
    }

    async clearCart(cartId) {
        const cart = await this.getCartById(cartId);
        cart.products = [];
        await cart.save();
    }
}