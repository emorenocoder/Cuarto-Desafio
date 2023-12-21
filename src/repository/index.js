import { ProductModel } from "../model/ProductModel.js";
import ProductRepository from "./ProductRepository.js";

const productRepository = new ProductRepository(ProductModel);

export {
    productRepository,
}