import { productRepository } from "../repository/index.js";
import ProductService from "./ProductService.js";
const productService = new ProductService(productRepository);

export{
    productService
}