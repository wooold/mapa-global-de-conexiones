const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // 👈 ESTE PRIMERO

const puntosRoutes = require('./routes/puntos');
app.use('/api/puntos', puntosRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((error) => console.error('❌ Error de conexión a MongoDB:', error));

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('🌍 Backend del Mapa Global de Conexiones funcionando');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
