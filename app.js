//import des packages / routes 
const express = require('express');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
bodyParser = require('body-parser');
const path = require('path');

//Création de l'application
const app = express();

//Connection avec la base de donnée mongoose
mongoose.connect('mongodb+srv://AdrienJourdin:AdrienJourdin@piiquante.0a7jl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Paramétrage de l'acces à l'API, origine, headers, methodes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(bodyParser.json());
  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

//export de l'application
module.exports = app;