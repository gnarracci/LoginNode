const mongoose = require('mongoose');
const {mongodb} = require('./keys');

mongoose.connect(mongodb.URI, { useNewUrlParser: true })
.then(db => console.log('La Base de Datos esta Conectada!!!'))
.catch(err => console.erro(err));