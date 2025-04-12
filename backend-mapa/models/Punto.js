// 🧬 Importamos mongoose para definir un esquema de datos
const mongoose = require('mongoose');

// 🧱 Definimos la estructura del documento "Punto" en MongoDB
const PuntoSchema = new mongoose.Schema({
  // 🌍 Latitud del punto en el mapa (obligatoria)
  lat: {
    type: Number,
    required: true
  },

  // 🌍 Longitud del punto en el mapa (obligatoria)
  lng: {
    type: Number,
    required: true
  },

  // 💬 Mensaje que el usuario deja en ese punto (obligatorio)
  mensaje: {
    type: String,
    required: true
  },

  // ✍️ Autor del mensaje (puede ser un nombre, seudónimo o nulo)
  autor: {
    type: String,
    required: false
  },

  // 📧 Correo del usuario autenticado (opcional)
  email: {
    type: String,
    required: false
  },

  // 🆔 UID único del usuario de Firebase (opcional)
  uid: {
    type: String,
    required: false
  }
});

// 🧩 Exportamos el modelo "Punto" para poder usarlo en rutas
module.exports = mongoose.model('Punto', PuntoSchema);
