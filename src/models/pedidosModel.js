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
  let pedidoId = await pool.query('INSERT INTO pedido SET ?', [pedidoNuevo]);
  return pedidoId.insertId;
}

async function moreInfoPedido(detallePedido) {
  await pool.query('INSERT INTO producto_has_pedido SET ?', [detallePedido]);
}

async function mostrarPedidos() {
  return await pool.query(`SELECT
                            pedido.id pedido_id,
                            configuracion.valor,
                            pedido.vTotal,
                            usuarios.nombre nombreCompleto,
                            usuarios.celular,
                            estado.nombre estadoName
                          FROM
                            configuracion,
                            pedido,
                            usuarios,
                            estado
                          WHERE
                            pedido.id_config = configuracion.id AND
                            pedido.id_user = usuarios.id AND
                            pedido.id_estado = estado.id`);
}

async function estadosForPedido() {
  return await pool.query('SELECT * FROM estado')
}

async function detailOfPedido() {
  return await pool.query(`SELECT 
                              producto_has_pedido.id, 
                              producto.nombre nameProduct, 
                              producto.valor valorUnitario, 
                              producto_has_pedido.cantidad, 
                              producto_has_pedido.cantidad * producto.valor valorTotalCompra,
                              pedido.id id_pedido
                            FROM 
                              producto_has_pedido, 
                              producto, 
                              pedido 
                            WHERE
                              producto_has_pedido.producto_id = producto.id AND
                              producto_has_pedido.pedido_id = pedido.id`);
}

module.exports = {
  mostrarUsuarios,
  usuarioEspecifico,
  mostrarProductos,
  productoEspecifico,
  addPedido,
  moreInfoPedido,
  mostrarPedidos,
  estadosForPedido,
  detailOfPedido
};