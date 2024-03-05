import { UserModel } from "../db/model/UserModel.js";
import { CartModel } from "../db/model/CartModel.js";
import { ProductModel } from "../db/model/ProductModel.js";
import { MessageModel } from "../db/model/MessageModel.js";
import { TicketModel } from "../db/model/TicketModel.js";
import UserRepository from "./UserRepository.js";
import CartRepository from "./CartRepository.js";
import ProductRepository from "./ProductRepository.js";
import MessageRepository from "./MessageRepository.js";
import TicketRepository from "./TicketRepository.js";   

const userRepository = new UserRepository(UserModel);
const cartRepository = new CartRepository(CartModel);
const productRepository = new ProductRepository(ProductModel);
const messageRepository = new MessageRepository(MessageModel);
const ticketRepository = new TicketRepository(TicketModel);

export {
    userRepository,
    cartRepository,
    productRepository,
    messageRepository,
    ticketRepository,
}