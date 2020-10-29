const productosModel = require('../models/productos');

async function listarProductos() {
  const listaProducts = await productosModel.mostrarProductos();
  return listaProducts;
}

async function agregarProduct(req) {
  const { nombremodal, descripcionmodal, valormodal } = req.body;
  const newProduct = {
    nombre: nombremodal,
    descripcion: descripcionmodal,
    valor: valormodal
  };
  await productosModel.addProductos(newProduct);
}

async function deleteProduct(req) {
  const { product_id } = req.params;
  await productosModel.eliminarProducto(product_id);
}

async function updateProduct(req) {
  const { product_id } = req.params;
  const { modifynombre, modifydescripcion, modifyvalor } = req.body;
  const productUpdate = {
    nombre: modifynombre,
    descripcion: modifydescripcion,
    valor: modifyvalor
  };
  await productosModel.modificarProducto(productUpdate, product_id);
}

module.exports = {
  listarProductos,
  agregarProduct,
  deleteProduct,
  updateProduct
};