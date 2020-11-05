const pool = require('../database');

async function mostrarUsuarios() {
  const dataUsers = await pool.query(`SELECT * FROM usuarios WHERE estado = 0`);
  return dataUsers;
}

async function usuarioEspecifico(id_usuario) {
  const dataUser = await pool.query(`SELECT identificacion, celular FROM usuarios WHERE id = ${id_usuario}`);
  return dataUser;
}

module.exports = {
  mostrarUsuarios,
  usuarioEspecifico
};