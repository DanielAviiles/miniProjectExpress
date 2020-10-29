const pool = require('../database');

async function listarUsuarios() {
  return await pool.query(`SELECT 
                              usuarios.id, 
                              usuarios.nombre username,
                              usuarios.identificacion,
                              usuarios.celular,
                              usuarios.email,
                              usuarios.direccion,
                              rol.id rol_idUser,
                              rol.nombre rolname  
                            FROM usuarios, rol 
                            WHERE usuarios.rol_id = rol.id AND usuarios.estado = 0`);
}
async function listarRoles() {
  return await pool.query(`SELECT rol.id rol_id, rol.nombre namerol FROM rol`);
}

async function agregarUser(dataNewUser) {
  await pool.query('INSERT INTO usuarios SET ?', [dataNewUser]);
}

async function deleteUser(usuarioId) {
  await pool.query(`UPDATE usuarios SET estado = 1 WHERE usuarios.id=?`, usuarioId);
}

async function modifyUser(dataUser, userId) {
  await pool.query('UPDATE usuarios SET ? WHERE usuarios.id=?', [dataUser, userId]);
}

module.exports = {
  listarUsuarios,
  listarRoles,
  agregarUser,
  deleteUser,
  modifyUser
};