const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidosController');

// const pool = require('../database');

/* GET home page. */
// Trae la informacion de los usuarios para modal de agregar un pedido
router.get('/pedidos', async (req, res) => {
  const usuarios = await pedidoController.listarUsuarios();
  res.render('layouts/view_pedidos', {
    title: `Lista Pedidos`,
    titleHeader: `Pedidos`,
    usuarios
  });
});

// Trae la informacion de los usuarios para modal de agregar un pedido
router.post('/pedidos/addPedido', async (req, res) => {
  res.render('layouts/view_pedidos', { title: `Lista Pedidos`, titleHeader: `Pedidos` });
});

// AJAX
router.post('/pedidos/infoUsuario', async (req, res) => {
  const infoUser = await pedidoController.userEspecifico(req);
  res.json({ resp: infoUser });
});

router.get('/pedidos/listaproductos', async (req, res) => {
  const infoProductos = await pedidoController.listarProductos();
  res.json({ dataProductos: infoProductos });
});

router.post('/pedidos/pedidoEspecifico', async (req, res) => {
  const infoProduct = await pedidoController.productoEspecifico(req);
  res.json({ resp: infoProduct });
});

module.exports = router;
