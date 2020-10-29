const pool = require('../database');

async function mostrarProductos() {
  const dataProduct = await pool.query(`SELECT * FROM producto WHERE estado = 0`);
  return dataProduct;
}

async function addProductos(data) {
  await pool.query('INSERT INTO producto SET ?', [data]);
}

async function eliminarProducto(product_id) {
  await pool.query(`UPDATE producto SET estado = 1 WHERE producto.id=?`, product_id);
}

async function modificarProducto(dataProduct, idProduct) {
  await pool.query('UPDATE producto SET ? WHERE producto.id=?', [dataProduct, idProduct]);
}

module.exports = {
  mostrarProductos,
  addProductos,
  eliminarProducto,
  modificarProducto
};