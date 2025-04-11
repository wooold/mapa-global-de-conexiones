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
  }
});

module.exports = mongoose.model('Punto', PuntoSchema);