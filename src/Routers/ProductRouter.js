import { Router } from "express";
import { productManager } from "../Manager/index.js";

const router = Router();

router.get("/api/products", async (req, res, next) =>{
    try{
        const { page, limit, sort, ...otherQuery } = req.query;
        const parsedPage = page ? parseInt(page, 10) : undefined;
        const parsedLimit = limit ? parseInt(limit, 10) : undefined;


        const product = await productManager.findAll({
            page: parsedPage,
            limit: parsedLimit,
            sort,
            query: otherQuery  
        });
        
        return res.status(200).json({ product });
    }catch(error){
        return res.status(500).json({ error: error.message});
    }
});


router.get("/api/products/:id", async (req, res, next) =>{
    try{
        const { id } = req.params;

        const product = await productManager.findById(id);

        return res.status(200).json({ product });

    }catch(error){
        return res.status(500).json({ error: error.message});
    }
});

router.post("/api/products", async (req, res, next) => {
    try{
        
        const { title, status, category, description, price, thumbnail, code, stock } = req.body;

        if(title || status || category || description || price || thumbnail || code || stock){
            return res.status(400).json({ error: "Complete todos los campos." });
        }

        const product = await productManager.createOne(req.body);

        return res.status(201).json({ product });

    }catch(error){
        return res.status(500).json({ error: error.message});
    }
})

router.delete("/api/products/:id", async (req, res, next) => { 

    try{
        const { id } = req.params;

        const product = await productManager.deleteOne(id);
        
        return res.status(200).json({ product });

    }catch(error){
        return res.status(500).json({ error: error.message});
    }
}); 

export default router;