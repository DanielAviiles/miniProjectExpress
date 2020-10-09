const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('layouts/login', {title: 'Iniciar Sesion'});
});

router.get('/register', (req, res) => {
  res.render('layouts/register', {title: 'Registrar'});
});

module.exports = router;
