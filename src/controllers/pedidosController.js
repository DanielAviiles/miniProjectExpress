const pedidosModel = require('../models/pedidosModel');

async function listarUsuarios() {
  const dataUsers = await pedidosModel.mostrarUsuarios();
  return dataUsers;
}

async function userEspecifico(id_user) {
  const dataUser = await pedidosModel.usuarioEspecifico(id_user);
  return dataUser;
}

module.exports = {
  listarUsuarios,
  userEspecifico
};
