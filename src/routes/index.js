const express = require('express');
const router = express.Router();

/* GET home page. */
router.get(['/', '/home'], (req, res) => {
  res.render('layouts/home', {title: `Tienda Daniel's`, titleHeader: 'Inicio'});
});

module.exports = router;
