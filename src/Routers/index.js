import { Router } from "express";
import productRoutes from "./ProductRouter.js";
import viewRoutes from "./ViewRouter.js";
import cartRoutes from "./CartRouter.js";
import sessionRoutes from "./sessionRouter.js"

const router = Router();

router.use('/', productRoutes);
router.use('/', cartRoutes);
router.use('/', viewRoutes);
router.use('/api/', sessionRoutes)

export default router;