const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productsController');

/* GET home page. */
router.get('/products', async (req, res) => {
  const productos = await productosController.listarProductos();
  res.render('layouts/view_productos', {
    title: `Info Productos`,
    titleHeader: `Productos`,
    productos
  });
});

router.post('/products', async (req, res) => {
  await productosController.agregarProduct(req);
  res.redirect('/inventario/products');
});

router.post('/eliminar-product/:product_id', async (req, res) => {
  await productosController.deleteProduct(req);
  res.redirect('/inventario/products');
});

router.post('/editar-producto/:product_id', async (req, res) => {
  await productosController.updateProduct(req);
  res.redirect('/inventario/products');
});

module.exports = router;
