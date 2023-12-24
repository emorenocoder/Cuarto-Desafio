export default class ProductSocket {
    constructor(io, productManager){
        this.io = io;
        this.productManager = productManager;
    }

    async registerEvents(socket){
        const defaultOptions = { page: 1, limit: 12, sort: { createdAt: -1 } };

        const products = await this.productManager.findAll(defaultOptions);

        socket.emit('products', products);

        socket.on('addProduct', async (data) => {
            try {
                await this.productManager.createOne(data);
                const updatedProducts = await this.productManager.findAll(defaultOptions);
                socket.broadcast.emit('productNotification', 'New product added!!');
                this.io.emit('productsUpdated', updatedProducts);
            } catch (error) {
                console.log(error.message);
                socket.emit('productsError', error.message);
            }
        });

        socket.on('deleteProduct', async (id) => {
            try {
                await this.productManager.deleteOne(id);
                const updatedProducts = await this.productManager.findAll(defaultOptions);
                socket.emit('productNotification', `Product with ID ${id} deleted.`);
                socket.broadcast.emit('productNotification', `Product with ID ${id} deleted.`);
                this.io.emit('productsUpdated', updatedProducts);
            } catch (error) {
                console.log(error.message);
                socket.emit('productsError', error.message);
            }
        });
    }
}