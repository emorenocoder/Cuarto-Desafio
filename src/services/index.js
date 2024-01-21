import ProductService from "./ProductService.js";
import CartServices from "./CartServices.js"
import UserService from "./UserService.js";


const productService = new ProductService();
const cartService = new CartServices(productService);
const userService = new UserService();

export { productService, cartService, userService };