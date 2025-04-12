// 📦 Importamos React y hooks necesarios
import React, { useState, useEffect } from 'react';

// 🗺️ Importamos Leaflet y componentes de react-leaflet
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 🧠 Conexiones a Firestore
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

// 🎯 Componente para capturar clics en el mapa
function MapClickHandler({ onClick }) {
  useMapEvents({ click: onClick });
  return null;
}

// 📌 Componente principal del mapa
function Mapa({ usuario }) {
  const [puntos, setPuntos] = useState([]); // 📍 Lista de puntos visibles en el mapa
  const [modalAbierto, setModalAbierto] = useState(false); // 📩 Estado para mostrar/ocultar el modal
  const [coordsTemp, setCoordsTemp] = useState(null); // 📌 Coordenadas temporales al hacer clic

  // 🚀 Carga inicial de puntos desde Firestore
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

  // 👆 Maneja clics en el mapa y abre el modal
  const manejarClickMapa = (e) => {
    setCoordsTemp({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    });
    setModalAbierto(true);
  };

  // 📝 Maneja el envío del formulario con mensaje y datos del usuario
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

      // 🔥 Guardar el nuevo punto en Firestore
      const id = await guardarPuntoEnFirestore(nuevoPunto);

      // 🧩 Actualizar el estado local con el nuevo punto
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
      <MapContainer
        center={[51.505, -0.09]} // 🌍 Coordenadas iniciales
        zoom={3}
        style={{ height: '100vh' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 👆 Escucha clics en el mapa */}
        <MapClickHandler onClick={manejarClickMapa} />

        {/* 📍 Renderiza todos los puntos guardados */}
        {puntos.map((punto, index) => (
          <MarkerPersonalizado key={index} {...punto} />
        ))}
      </MapContainer>

      {/* 🧾 Modal para escribir el mensaje al hacer clic */}
      <FormularioMensajeModal
        visible={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSubmit={handleAgregarMensaje}
        usuario={usuario}
      />
    </>
  );
}

export default Mapa;
