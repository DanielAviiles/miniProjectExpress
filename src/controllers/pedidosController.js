const pedidosModel = require('../models/pedidosModel');

async function listarUsuarios() {
  const dataUsers = await pedidosModel.mostrarUsuarios();
  return dataUsers;
}

async function userEspecifico(req) {
  const { id_usuario } = req.body;
  const dataUser = await pedidosModel.usuarioEspecifico(id_usuario);
  return dataUser;
}

async function listarProductos() {
  const dataProductos = await pedidosModel.mostrarProductos();
  return dataProductos;
}

async function productoEspecifico(req) {
  const { id_product } = req.body;
  const dataProductos = await pedidosModel.productoEspecifico(id_product);
  return dataProductos;
}

async function agregarPedido(infoPedido) {
  const newPedido = {
    vTotal: infoPedido.vTotalP,
    id_user: infoPedido.user_id
  }
  let idPedido = await pedidosModel.addPedido(newPedido);
  console.log('idPedido desde el controller: ', idPedido);
  return idPedido;
}
async function infoPedidoAdd(infoPedido, pedidoId) {
  infoPedido.data.forEach(async (item) => {
    const dataPedio = {
      cantidad: item.cantidadP,
      producto_id: item.producto_id,
      pedido_id: pedidoId
    }
    await pedidosModel.moreInfoPedido(dataPedio);
  });
}

async function listarPedidos() {
  return await pedidosModel.mostrarPedidos();
}

async function estadosDeUnPedido() {
  return await pedidosModel.estadosForPedido();
}

async function detalleDePedido(idPedido) {
  return await pedidosModel.detailOfPedido(idPedido);
}

module.exports = {
  listarUsuarios,
  userEspecifico,
  listarProductos,
  productoEspecifico,
  agregarPedido,
  infoPedidoAdd,
  listarPedidos,
  estadosDeUnPedido,
  detalleDePedido
};
