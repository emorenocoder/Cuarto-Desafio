import express from 'express';
import { config } from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import { engine } from 'express-handlebars';
import { __dirname } from '../utils/utils.js';
import passport from '../middleware/Passport.js';
import connectDB from './Database.js';
import rootRoutes from '../Routers/index.js';
import SocketManager from '../socket/SocketManager.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import errorHandler from "../middleware/error/errorHandler.middleware.js";
import { buildLogger } from "../helpers/logger.js";
import loggerMiddleware from "../middleware/loggerMiddleware.js";

const logger = buildLogger("Server");
config();

class Server {

    constructor(productManager, messageManager) {
        this.app = express();
        this.productManager = productManager;
        this.messageManager = messageManager;
        this.configPort();
        this.connectDB();
        this.middlewares();
        this.handlebars();
        this.routes();
        this.errorHandler();
    }

    configPort(){
        this.port = process.env.PORT || 3000;
    }

    async connectDB(){
        await connectDB();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(cookieParser(process.env.COOKIE_SECRET));
        this.app.use(session({
            store: new MongoStore({ mongoUrl: process.env.MONGODB_ATLAS}),
            secret: process.env.SESSION_SECRET,
            cookie: { maxAge: 120000 },
            resave: false,
            saveUninitialized: false,
        }));
        this.app.use(passport.initialize());
        this.app.use(loggerMiddleware);
        this.app.use(passport.session());
    }

    handlebars(){
        this.app.engine('hbs', engine({
            extname: 'hbs',
            partialsDir: __dirname + '/views/partials',
            helpers:{
                eq: (v1, v2) => v1 == v2 ,
            }
        }));
        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'hbs');
    }

    routes(){
        this.app.use('/', rootRoutes);
    }

    errorHandler(){
        this.app.use(errorHandler);
    }

    start(){
        this.httpServer = this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });

        this.io = new SocketIOServer(this.httpServer);
        new SocketManager(this.io, this.productManager, this.messageManager)
    }
}

export default Server;