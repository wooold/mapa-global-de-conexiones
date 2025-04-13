// 📦 Importamos React y hooks necesarios
import React, { useState, useEffect } from 'react';

// 🗺️ Importamos Leaflet y componentes de react-leaflet
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 🔥 Conexiones a Firestore
import { guardarPuntoEnFirestore, obtenerPuntosDesdeFirestore } from '../../firebase/firestore';

// 🧱 Componentes propios
import MarkerPersonalizado from './MarkerPersonalizado';
import FormularioMensajeModal from '../../components/FormularioMensajeModal';

// 📍 Íconos para los marcadores
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// 🛠 Configura íconos por defecto en Leaflet
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 🎯 Componente para detectar clics en el mapa
function MapClickHandler({ onClick }) {
  useMapEvents({ click: onClick });
  return null;
}

// 🧭 Componente principal del mapa
function MapaView({ usuario }) {
  const [puntos, setPuntos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [coordsTemp, setCoordsTemp] = useState(null);

  // 🔄 Cargar puntos desde Firestore al montar el componente
  useEffect(() => {
    const obtenerPuntos = async () => {
      try {
        const data = await obtenerPuntosDesdeFirestore();
        setPuntos(data);
      } catch (err) {
        console.error('❌ Error al cargar puntos desde Firestore:', err);
      }
    };
    obtenerPuntos();
  }, []);

  // 📌 Cuando el usuario hace clic en el mapa
  const manejarClickMapa = (e) => {
    setCoordsTemp({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    });
    setModalAbierto(true);
  };

  // ✍️ Enviar nuevo punto al backend
  const handleAgregarMensaje = async ({ mensaje, autor, email, uid }) => {
    if (!coordsTemp || !mensaje) return;

    try {
      const nuevoPunto = {
        lat: coordsTemp.lat,
        lng: coordsTemp.lng,
        mensaje,
        autor,
        email,
        uid,
      };

      const id = await guardarPuntoEnFirestore(nuevoPunto);
      setPuntos([...puntos, { ...nuevoPunto, id }]);
    } catch (error) {
      console.error('💥 Error al guardar el punto en Firestore:', error);
    } finally {
      setModalAbierto(false);
      setCoordsTemp(null);
    }
  };

  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: '100vh' }}>
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
        usuario={usuario}
      />
    </>
  );
}

export default MapaView;
