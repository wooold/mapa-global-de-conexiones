const mongoose = require('mongoose');

const PuntoSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: false // 👈 Este es opcional
  }
});

module.exports = mongoose.model('Punto', PuntoSchema);