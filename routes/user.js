//import des frameworks
const express = require('express');

//Creation de la route
const router = express.Router();

//import des controllers
const userCtrl = require('../controllers/user');

//Definition des routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//Export des routes
module.exports = router;