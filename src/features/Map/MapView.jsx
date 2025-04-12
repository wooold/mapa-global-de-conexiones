import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import MarkerPersonalizado from './MarkerPersonalizado';
import FormularioMensajeModal from '../../components/FormularioMensajeModal';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Corrección del ícono por defecto
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapClickHandler({ onClick }) {
  useMapEvents({
    click: onClick,
  });
  return null;
}

function Mapa() {
  const [puntos, setPuntos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [coordsTemp, setCoordsTemp] = useState(null);

  useEffect(() => {
    fetch('/api/puntos')
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

  const agregarPunto = async (mensaje) => {
    if (!coordsTemp) return;
  
    const nuevoPunto = {
      lat: coordsTemp.lat,
      lng: coordsTemp.lng,
      mensaje,
    };
  
    try {
      const res = await fetch('/api/puntos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPunto),
      });
  
      if (res.ok) {
        const puntoGuardado = await res.json();
        setPuntos((prev) => [...prev, puntoGuardado]);
        setModalAbierto(false);
        setCoordsTemp(null);
      } else {
        console.error('❌ Error al guardar el punto');
      }
    } catch (err) {
      console.error('❌ Error de conexión al backend:', err);
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
        onSubmit={agregarPunto}
      />
    </>
  );
}

export default Mapa;