import { Router } from "express";
import { cartManager } from "../Manager/index.js";

const router = Router();

router.get("/api/carts", async(req, res, next) =>{
    try{
        const carts = await cartManager.getCarts();
        return res.status(200).json({ message:"Carros obtenidos.", carts });
    }catch(error){
        return res.status(500).json({ error: error.message});
    }
});

router.get("/api/carts/:cid", async(req, res, next) =>{
    try{
        const { cid } = req.params;

        const cart = await cartManager.getCartById(cid);

        return res.status(200).json({ message:"Carro obtenido.", cart });
    }catch(error){
        return res.status(500).json({ error: error.message});
    }
});

router.post("/api/carts", async(req, res, next) => {
    try{
        const cart = await cartManager.createCart();
        return res.status(201).json({ message:"Carro creado.", cart });
    }catch(error){
        return res.status(500).json({ error: error.message});
    }
});

router.post("/api/carts/:cid/product/:pid", async(req, res, next) => {
    try{
        const { cid, pid } = req.params;

        const cart = await cartManager.addProductToCart(cid, pid);

        return res.status(201).json({ message:"producto agregado al carro.", cart });

    }catch(error){
        return res.status(500).json({ error: error.message});
    }
});

router.delete("/api/carts/:cid/clear", async(req, res, next) => {
    try{
        const { cid } = req.params;

        await cartManager.clearCart(cid);

        return res.status(200).json({ message:"Carro vaciado." });
    }catch(error){
        return res.status(500).json({ error: error.message});
    }
});

export default router;