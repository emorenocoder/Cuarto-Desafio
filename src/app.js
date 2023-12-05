import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import ProductRouter from '../Routers/ProductRouter';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

try {
  app.use('/api/products', ProductRouter);
} catch (error) {
  console.error('Error al cargar las rutas de productos:', error);
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ProductRouter.setIo(io);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use('/api/products', ProductRouter);

