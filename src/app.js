const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// inicio
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 4000); // Configuracion de puerto

app.set('views', path.join(__dirname, 'views')); // Configuracion de Vistas
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Peticiones
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// variables globales
app.use((req, res, next) => {
  next();
});

// rutas
app.use(require('./routes'));
app.use('/auth',require('./routes/authentication'));
app.use('/infoshop',require('./routes/usuarios'));
app.use('/inventario', require('./routes/productos'));
app.use('/lista', require('./routes/pedidos'));
// app.use('/pedidos', require('./routes/pedidos'));

// public
app.use(express.static(path.join(__dirname, 'public')));
// app.unsubscribe(express.static(path.join(__dirname, 'public')));

// inicia el server
app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'));
});