const express = require('express');
const router = express.Router();
const pool = require('../database');

const usuariosController = require('../controllers/usuariosController');

/* GET home page. */
router.get('/usuarios', async (req, res) => {
  const datauser = await usuariosController.mostrarUsuarios();
  const roles = await usuariosController.mostrarRoles();
  res.render('layouts/view_usuarios', {
    title: `Informacion`,
    titleHeader: `Usuarios`,
    datauser,
    roles
  });
});

router.post('/usuarios', async (req, res) => {
  await usuariosController.addUsuario(req);
  res.redirect('/infoshop/usuarios');
});

router.post('/eliminar-user/:user_id', async (req, res) => {
  await usuariosController.eliminarUsuario(req);
  res.redirect('/infoshop/usuarios');
});

router.post('/editar-user/:user_id', async (req, res) => {
  await usuariosController.modificarUsuario(req);
  res.redirect('/infoshop/usuarios');
});

module.exports = router;
