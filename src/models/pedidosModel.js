const pool = require('../database');

async function mostrarUsuarios() {
  const dataUsers = await pool.query(`SELECT * FROM usuarios WHERE estado = 0`);
  return dataUsers;
}

async function usuarioEspecifico(id_usuario) {
  const dataUser = await pool.query(`SELECT identificacion, celular FROM usuarios WHERE id = ${id_usuario}`);
  return dataUser;
}

async function mostrarProductos() {
  const dataProductos = await pool.query('SELECT id, nombre FROM producto');
  return dataProductos;
}

async function productoEspecifico(id_product) {
  const dataUser = await pool.query(`SELECT valor FROM producto WHERE id = ${id_product}`);
  return dataUser;
}

async function addPedido(pedidoNuevo) {
  await pool.query('INSERT INTO pedido SET ?', [pedidoNuevo]);
  let pedidoId = await pool.query('SELECT LAST_INSERT_ID() pedido_id');
  let idPedido = Object.values(JSON.parse(JSON.stringify(pedidoId)));
  console.log('idPedido desde el model: ', idPedido[0].pedido_id);
  return idPedido[0].pedido_id;
}

async function moreInfoPedido(detallePedido) {
  await pool.query('INSERT INTO producto_has_pedido SET ?', [detallePedido]);
}

module.exports = {
  mostrarUsuarios,
  usuarioEspecifico,
  mostrarProductos,
  productoEspecifico,
  addPedido,
  moreInfoPedido
};