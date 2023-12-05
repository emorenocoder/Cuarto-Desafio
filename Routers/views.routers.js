import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.render('home.hbs');
});

router.get('/realtimeproducts', (_req, res) => {
  res.render('realTimeProducts.hbs');
});

router.get('/productmanager', (_req, res) => {
  res.render('ProductManager.hbs');
});

export default router;
