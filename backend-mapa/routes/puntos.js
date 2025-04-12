// routes/puntos.js

const express = require('express');
const router = express.Router();
const Punto = require('../models/Punto');

router.get('/', async (req, res) => {
  try {
    const puntos = await Punto.find();
    res.json(puntos);
  } catch (err) {
    console.error('❌ Error al obtener puntos:', err.message);
    res.status(500).json({ error: 'Error al obtener los puntos' });
  }
});

// Crear un nuevo punto
router.post('/', async (req, res) => {
  console.log('📦 Body recibido:', req.body); // 👈 Deja este log si quieres ver lo que llega

  const { lat, lng, mensaje, autor } = req.body; // ✅ Incluye autor aquí

  try {
    const nuevoPunto = new Punto({ lat, lng, mensaje, autor }); // ✅ Y aquí también
    await nuevoPunto.save();
    res.status(201).json(nuevoPunto);
  } catch (err) {
    console.error('❌ Error en POST /api/puntos:', err.message);
    res.status(500).json({ error: 'Error al guardar el punto' });
  }
});

module.exports = router;