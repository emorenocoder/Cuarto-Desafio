import { Router } from "express";
import { productManager, cartManager } from "../Manager/index.js";

const router = Router();

router.get("/", async (req, res, next) => {
    
    const { page, limit, sort, ...query } = req.query;
   
    const productList = await productManager.findAll({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 12,
        sort,
        query
    });

    const pagination = {
        ...productList,
        pages: Array.from({ length: productList.totalPages }, (_, i) => i + 1)
    };

    res.render('home', { 
        productList: productList.docs.map(doc => doc.toObject()), 
        ...pagination, 
        sort, 
        currentQuery: query
    });

    console.log(req.session)
    
        res.render('home', { 
            productList: productList.docs.map(doc => doc.toObject()), 
            ...pagination, 
            sort, 
            currentQuery: query,
        });

});

router.get("/api/products/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;

        const product = await productManager.findById(pid);
        return res.render("product", { product: product.toObject() });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/api/carts/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;

        const cart = await cartManager.getCartById(cid);

        return res.status(200).json({ cart });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/realtimeproducts", async (req, res, next) => {
    res.render("realtimeproducts");
});

router.get("/chat", async (req, res, next) => {
    res.render("chat");
});

router.get("/login", async (req, res) => {
    res.render("login");
})

router.get("/register", async (req, res) => {
    res.render("register");
});

router.get("/noAuthorized", async (req, res) => {
    res.render("noAuthorized");
});

export default router;