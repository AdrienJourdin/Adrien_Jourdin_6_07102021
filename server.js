//import des packages et de l'application
const http = require('http');
const app = require('./app');

//Renvoi du port qu'il soit sous forme de numéro ou de chaine
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//Configuration du port de l'application
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//recherche et gestion des erreurs 
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Creation du serveur
const server = http.createServer(app);


server.on('error', errorHandler);

//Affichage dans la console des evenements
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Ecoute des evenements
server.listen(port);

