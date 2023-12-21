export default class ProductService{
    
    constructor(productRepository){
        this.productRepository = productRepository;
    }

    async findProducts(){
        const products = this.productRepository.find();

        if(!products){
            throw new Error("sin productos");
        }

        return products;
    }

}