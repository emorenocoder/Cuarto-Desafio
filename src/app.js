import Server from "./config/Server.js";
import { productManager, messageManager } from "./Manager/index.js";

console.clear();
const server = new Server(productManager, messageManager);
server.start();
