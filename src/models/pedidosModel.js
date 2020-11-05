const pool = require('../database');

async function mostrarUsuarios() {
  const dataUsers = await pool.query(`SELECT * FROM usuarios WHERE estado = 0`);
  return dataUsers;
}

async function usuarioEspecifico(userid) {
  const dataUser = await pool.query(`SELECT * FROM usuarios WHERE id = ${userid}`);
  return dataUser;
}

module.exports = {
  mostrarUsuarios,
  usuarioEspecifico
};