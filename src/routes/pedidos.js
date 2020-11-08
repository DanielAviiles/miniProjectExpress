const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidosController');

router.get('/pedidos', async (req, res) => {
  const usuarios = await pedidoController.listarUsuarios();
  const listaPedidos = await pedidoController.listarPedidos();
  const dataEstadosPedido = await pedidoController.estadosDeUnPedido();
  const detailPedido = await pedidoController.detalleDePedido();

  res.render('layouts/view_pedidos', {
    title: `Lista Pedidos`,
    titleHeader: `Pedidos`,
    usuarios,
    listaPedidos,
    dataEstadosPedido,
    detailPedido
  });
});

router.post('/pedidos', async (req, res) => {
  let infoPedido = Object.keys(req.body);
  infoPedido = JSON.parse(infoPedido[0]);

  let pedido_id = await pedidoController.agregarPedido(infoPedido);
  await pedidoController.infoPedidoAdd(infoPedido, pedido_id);

  res.redirect('/lista/pedidos');
});

router.post('/edit-pedido/:idPedido', async (req, res) => {
  const { idPedido } = req.params;
  const body = req.body;
  await pedidoController.editarPedido(idPedido, body);
  res.redirect('/lista/pedidos');
});

// AJAX. START
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

// AJAX. END

module.exports = router;
