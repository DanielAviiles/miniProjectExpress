const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidosController');

// const pool = require('../database');

/* GET home page. */
router.get('/pedidos', async (req, res) => {
  // const productos = await pool.query(`SELECT * FROM producto WHERE estado = 0`);
  const usuarios = await pedidoController.listarUsuarios();
  res.render('layouts/view_pedidos', {
    title: `Lista Pedidos`,
    titleHeader: `Pedidos`,
    usuarios
  });
});
router.post('/pedidos/addPedido', async (req, res) => {
  // const productos = await pool.query(`SELECT * FROM producto WHERE estado = 0`);
  const usuarios = await pedidoController.listarUsuarios();
  res.render('layouts/view_pedidos', {
    title: `Lista Pedidos`,
    titleHeader: `Pedidos`,
    usuarios
  });
});

// AJAX
router.post('/pedidos/infoUsuario', async (req, res) => {
  const infoUser = await pedidoController.userEspecifico(req);
  res.json({ resp: infoUser });
});

module.exports = router;
