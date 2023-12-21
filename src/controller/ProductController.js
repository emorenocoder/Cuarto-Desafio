import { productService } from "../service/index.js"

const getProducts = async (req, res, next) => {
    try {
        const product = productService.findProducts();
        return res.status(200).json({data: product})
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

export {
    getProducts
}