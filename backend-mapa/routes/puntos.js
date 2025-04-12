// 🚂 Importamos Express para crear el enrutador
const express = require('express');

// 🛣️ Creamos un enrutador con Express
const router = express.Router();

// 📦 Importamos el modelo de datos "Punto" para acceder a MongoDB
const Punto = require('../models/Punto');


// 🟢 Ruta GET: obtener todos los puntos del mapa
router.get('/', async (req, res) => {
  try {
    // 🗃️ Busca todos los puntos almacenados en la base de datos
    const puntos = await Punto.find();

    // 📤 Devuelve los puntos encontrados como JSON
    res.json(puntos);
  } catch (err) {
    // ⚠️ Muestra error en consola y responde con error 500
    console.error('❌ Error al obtener puntos:', err.message);
    res.status(500).json({ error: 'Error al obtener los puntos' });
  }
});


// 🔴 Ruta POST: crear un nuevo punto con mensaje en el mapa
router.post('/', async (req, res) => {
  // 🛠️ Para depuración: imprime en consola el cuerpo recibido
  console.log('📦 Body recibido:', req.body);

  // 🧩 Extraemos datos del cuerpo del request (esperados desde el frontend)
  const { lat, lng, mensaje, autor, email, uid } = req.body; // ✅ añadimos email y uid

  try {
    // 🆕 Creamos un nuevo documento de tipo Punto con los datos recibidos
    const nuevoPunto = new Punto({
      lat,
      lng,
      mensaje,
      autor,   // ✍️ nombre o seudónimo
      email,   // 📧 correo (si hay sesión)
      uid      // 🆔 ID único del usuario en Firebase
    });

    // 💾 Guardamos el punto en MongoDB
    await nuevoPunto.save();

    // 📤 Respondemos con el punto recién creado
    res.status(201).json(nuevoPunto);
  } catch (err) {
    // ⚠️ Si ocurre un error al guardar, lo registramos y enviamos un error 500
    console.error('❌ Error en POST /api/puntos:', err.message);
    res.status(500).json({ error: 'Error al guardar el punto' });
  }
});

// 🧩 Exportamos el enrutador para que pueda ser usado en server.js
module.exports = router;
