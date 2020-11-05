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

module.exports = {
  listarUsuarios,
  userEspecifico,
  listarProductos,
  productoEspecifico
};
