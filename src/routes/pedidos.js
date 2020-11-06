const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidosController');

// Trae la informacion de los usuarios para modal de agregar un pedido
router.get('/pedidos', async (req, res) => {
  const usuarios = await pedidoController.listarUsuarios();
  const listaPedidos = await pedidoController.listarPedidos();
  res.render('layouts/view_pedidos', {
    title: `Lista Pedidos`,
    titleHeader: `Pedidos`,
    usuarios,
    listaPedidos
  });
});

router.post('/pedidos', async (req, res) => {
  let infoPedido = Object.keys(req.body);
  infoPedido = JSON.parse(infoPedido[0]);

  let pedido_id = await pedidoController.agregarPedido(infoPedido);
  console.log('idPedido desde el Back: ', pedido_id);
  await pedidoController.infoPedidoAdd(infoPedido, pedido_id);

  res.redirect('/lista/pedidos');
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

router.get('/pedidos/detailsPedido/:id_pedido', async (req, res) => {
  const { id_pedido } = req.params;
  const dataEstadosPedido = await pedidoController.estadosDeUnPedido();
  const detailPedido = await pedidoController.detalleDePedido(id_pedido);

  res.json({
    infoEstados: dataEstadosPedido,
    detallePedido: detailPedido
  });
});

module.exports = router;
