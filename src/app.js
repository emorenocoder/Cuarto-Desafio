import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import ProductRouter from '../Routers/ProductRouter.js';
import viewRouter from '../Routers/views.routers.js';
import { __dirname } from '../utils/utils.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

try {
  app.use('/api/products', ProductRouter);
} catch (error) {
  console.error('Error al cargar las rutas de productos:', error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('views', __dirname + '/view');
app.set('view engine', 'handlebars');

app.use('/', viewRouter);


ProductRouter.setIo(io);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use('/api/products', ProductRouter);

