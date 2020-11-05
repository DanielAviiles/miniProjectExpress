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

module.exports = {
  listarUsuarios,
  userEspecifico
};
