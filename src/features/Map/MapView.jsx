import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import MarkerPersonalizado from './MarkerPersonalizado';
import FormularioMensajeModal from '../../components/FormularioMensajeModal';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// 🔗 URL de tu backend en Render (reemplaza por la tuya real)
const BACKEND_URL = process.env.REACT_APP_API_URL || '';

// Corrección del ícono por defecto
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapClickHandler({ onClick }) {
  useMapEvents({ click: onClick });
  return null;
}

function Mapa() {
  const [puntos, setPuntos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [coordsTemp, setCoordsTemp] = useState(null);

  // 🔍 Este log te ayudará a verificar si Vercel recibió correctamente la variable
  console.log('📡 Backend URL en producción:', BACKEND_URL);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/puntos`)
      .then((res) => res.json())
      .then((data) => setPuntos(data))
      .catch((err) => console.error('Error al cargar puntos:', err));
  }, []);

  const manejarClickMapa = (e) => {
    console.log('📍 Clic en el mapa:', e.latlng);
    setCoordsTemp({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    });
    setModalAbierto(true);
  };

  const handleAgregarMensaje = async ({ mensaje, autor }) => {
    if (!coordsTemp) return;
  
    try {
      const response = await fetch(`${BACKEND_URL}/api/puntos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: coordsTemp.lat,
          lng: coordsTemp.lng,
          mensaje,
          autor, // 👈 aquí está la magia
        }),
      });
  
      if (response.ok) {
        const nuevoPunto = await response.json();
        setPuntos([...puntos, nuevoPunto]);
      } else {
        console.error('❌ Error al guardar el mensaje');
      }
    } catch (error) {
      console.error('💥 Error de conexión al guardar el punto:', error);
    } finally {
      setModalAbierto(false);
      setCoordsTemp(null);
    }
  };

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        style={{ height: '100vh' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onClick={manejarClickMapa} />

        {puntos.map((punto, index) => (
          <MarkerPersonalizado key={index} {...punto} />
        ))}
      </MapContainer>

      <FormularioMensajeModal
        visible={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSubmit={handleAgregarMensaje}
      />
    </>
  );
}

export default Mapa;
