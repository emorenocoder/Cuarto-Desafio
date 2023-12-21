import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import ProductRouter from '../src/Routers/ProductRouter.js';
import viewRouter from '../src/Routers/views.routers.js';
import { __dirname } from './utils/utils.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  socket.emit("products", await nuevoProductManager.getProducts());

  socket.on("product_send", async (data) => {
    nuevoProductManager.addProduct(data);

    socket.emit("productosActualizados", await nuevoProductManager.getProducts());
  });
});

try {
  app.use('/api/products', ProductRouter);
} catch (error) {
  console.error('Error al cargar las rutas de productos:', error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.engine('handlebars', engine());
app.set('views', __dirname + '/view');
app.set('view engine', 'handlebars');

app.use('/', viewRouter);

ProductRouter.setIo(io);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
