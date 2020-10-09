const express = require('express');
const router = express.Router();
const pool = require('../database');

/* GET home page. */
router.get('/usuarios', async (req, res) => {
  const datauser = await pool.query(`SELECT 
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
  const roles = await pool.query(`SELECT rol.id rol_id, rol.nombre namerol FROM rol`)
  res.render('layouts/view_usuarios', {title: `Informacion`, titleHeader: `Usuarios`, datauser, roles});
});

router.post('/usuarios', async (req, res) => {
  // console.log('Cuerpo del add: ', req.body);
  const { fullnamemodaladd, identifmodaladd, celmodaladd, emailmodaladd, direcmodaladd, rolmodaladd } = req.body;
  const newUser = {
    nombre: fullnamemodaladd,
    identificacion: identifmodaladd,
    celular: celmodaladd,
    email: emailmodaladd,
    direccion: direcmodaladd,
    rol_id: rolmodaladd
  };

  await pool.query('INSERT INTO usuarios SET ?', [newUser]);
  res.redirect('/infoshop/usuarios');
});

router.post('/eliminar-user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  await pool.query(`UPDATE usuarios SET estado = 1 WHERE usuarios.id=?`, user_id);
  res.redirect('/infoshop/usuarios');
});

router.post('/editar-user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { fullnamemodify, identifmodify, celmodify, emailmodify, direcmodify } = req.body;
  const updateUser = {
    nombre: fullnamemodify,
    identificacion: identifmodify,
    celular: celmodify,
    email: emailmodify,
    direccion: direcmodify
  };
  await pool.query('UPDATE usuarios SET ? WHERE usuarios.id=?', [updateUser, user_id]);
  res.redirect('/infoshop/usuarios');
});

module.exports = router;
