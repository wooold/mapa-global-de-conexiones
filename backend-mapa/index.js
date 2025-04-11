const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor del Mapa Global de Conexiones está corriendo 🗺️✨');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado a MongoDB Atlas');
    app.listen(3001, () => {
      console.log('🚀 Servidor corriendo en http://localhost:3001');
    });
  })
  .catch((error) => {
    console.error('🔴 Error al conectar con MongoDB:', error);
  });
