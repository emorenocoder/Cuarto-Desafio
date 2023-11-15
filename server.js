import http from 'http'
import { ProductManager } from './ProductManager.js';
 

const productManager = new ProductManager('products.json');

const server = http.createServer(async (request, response) => {
  console.log(request.url);

  if (request.method === "GET" && request.url === "/") {
    try {
      await productManager.init();
      const allProducts = productManager.getProducts();
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(allProducts, null, 2));
    } catch (error) {
      console.error("Error al obtener productos: ", error);
      response.statusCode = 500;
      response.end("Error interno del servidor");
    }
  } else {
    response.statusCode = 404;
    response.end("Error página no encontrada");
  }
});

server.listen(8150, () => {
  console.log("Server listening on port 8150");
});
