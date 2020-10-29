const modelUsuarios = require('../models/usuariosModel');

async function mostrarUsuarios() {
  return await modelUsuarios.listarUsuarios();
}
async function mostrarRoles() {
  return await modelUsuarios.listarRoles();
}

async function addUsuario(req) {
  const { fullnamemodaladd, identifmodaladd, celmodaladd, emailmodaladd, direcmodaladd, rolmodaladd } = req.body;
  const newUser = {
    nombre: fullnamemodaladd,
    identificacion: identifmodaladd,
    celular: celmodaladd,
    email: emailmodaladd,
    direccion: direcmodaladd,
    rol_id: rolmodaladd
  };
  await modelUsuarios.agregarUser(newUser);
}

async function eliminarUsuario(req) {
  const { user_id } = req.params;
  await modelUsuarios.deleteUser(user_id);
}

async function modificarUsuario(req) {
  const { user_id } = req.params;
  const { fullnamemodify, identifmodify, celmodify, emailmodify, direcmodify } = req.body;
  const updateUser = {
    nombre: fullnamemodify,
    identificacion: identifmodify,
    celular: celmodify,
    email: emailmodify,
    direccion: direcmodify
  };

  await modelUsuarios.modifyUser(updateUser, user_id);
}

module.exports = {
  mostrarUsuarios,
  mostrarRoles,
  addUsuario,
  eliminarUsuario,
  modificarUsuario
};