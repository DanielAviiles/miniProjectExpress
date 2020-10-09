const express = require('express');
const router = express.Router();
const pool = require('../database');

/* GET home page. */
router.get('/pedidos', async (req, res) => {
  // const productos = await pool.query(`SELECT * FROM producto WHERE estado = 0`);
  res.render('layouts/view_pedidos', {title: `Lista Pedidos`, titleHeader: `Pedidos`});
});

module.exports = router;
