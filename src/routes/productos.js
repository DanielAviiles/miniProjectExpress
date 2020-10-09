const express = require('express');
const router = express.Router();
const pool = require('../database');

/* GET home page. */
router.get('/products', async (req, res) => {
  const productos = await pool.query(`SELECT * FROM producto WHERE estado = 0`);
  res.render('layouts/view_productos', {title: `Info Productos`, titleHeader: `Productos`, productos});
});

router.post('/products', async (req, res) => {
  // console.log('Cuerpo del add: ', req.body);
  const { nombremodal, descripcionmodal, valormodal } = req.body;
  const newProduct = {
    nombre: nombremodal,
    descripcion: descripcionmodal,
    valor: valormodal
  };

  await pool.query('INSERT INTO producto SET ?', [newProduct]);
  res.redirect('/inventario/products');
});

router.post('/eliminar-product/:product_id', async (req, res) => {
  const { product_id } = req.params;
  await pool.query(`UPDATE producto SET estado = 1 WHERE producto.id=?`, product_id);
  res.redirect('/inventario/products');
});

router.post('/editar-producto/:product_id', async (req, res) => {
  const { product_id } = req.params;
  const { modifynombre, modifydescripcion, modifyvalor } = req.body;
  const productUpdate = {
    nombre: modifynombre,
    descripcion: modifydescripcion,
    valor: modifyvalor
  };
  await pool.query('UPDATE producto SET ? WHERE producto.id=?', [productUpdate, product_id]);
  res.redirect('/inventario/products');
});

module.exports = router;
