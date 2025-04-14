// 📦 React y hooks
import React, { useState, useEffect } from 'react';

// 🗺️ Componentes Leaflet
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
  Marker,
  Polyline,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 🧩 Íconos compatibles con Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 🔥 Firestore
import {
  guardarPuntoEnFirestore,
  obtenerPuntosDesdeFirestore,
  obtenerConexionesDesdeFirestore,
} from '../../firebase/firestore';

// 🧱 Componentes propios
import MarkerPersonalizado from './MarkerPersonalizado';
import FormularioConexionModal from '../../components/FormularioConexionModal'; // ⬅️ asegúrate que el nombre coincida
import handleConexionAuto from '../../utils/handleConexionAuto';

function MapClickHandler({ onClick }) {
  useMapEvents({ click: onClick });
  return null;
}

// 📍 Centrado inicial en ubicación del usuario
const Geolocalizacion = () => {
  const map = useMap();
  const [centrado, setCentrado] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation || centrado) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        map.setView([coords.latitude, coords.longitude], 13);
        setCentrado(true);
      },
      (err) => console.warn('Geoloc error:', err),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, [centrado, map]);

  return null;
};

function MapaView({ usuario }) {
  const [puntos, setPuntos] = useState([]);
  const [conexiones, setConexiones] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [coordsTemp, setCoordsTemp] = useState(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await obtenerPuntosDesdeFirestore();
        if (usuario?.uid) {
          const puntosUsuario = data.filter((p) => p.uid === usuario.uid);
          setPuntos(puntosUsuario);

          const conexionesUsuario = await obtenerConexionesDesdeFirestore(usuario.uid);
          setConexiones(conexionesUsuario);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };

    obtenerDatos();
  }, [usuario]);

  const manejarClickMapa = (e) => {
    setCoordsTemp({ lat: e.latlng.lat, lng: e.latlng.lng });
    setModalAbierto(true);
  };

  const handleAgregarMensaje = async ({ mensaje, autor, email, uid, publico, anio, color }) => {
    const anioNumerico = parseInt(anio);
    if (!coordsTemp || !mensaje || isNaN(anioNumerico)) return;
    setGuardando(true);

    try {
      const nuevoPunto = {
        lat: coordsTemp.lat,
        lng: coordsTemp.lng,
        mensaje,
        autor,
        email,
        uid,
        publico,
        anio: anioNumerico,
        color,
      };

      const puntoConId = await handleConexionAuto({
        nuevoPunto,
        uid,
        obtenerTodosPuntos: obtenerPuntosDesdeFirestore,
        guardarPunto: guardarPuntoEnFirestore,
      });

      const dataActualizada = await obtenerPuntosDesdeFirestore();
      const puntosUsuario = dataActualizada.filter((p) => p.uid === usuario.uid);
      setPuntos(puntosUsuario);

      const conexionesActualizadas = await obtenerConexionesDesdeFirestore(uid);
      setConexiones(conexionesActualizadas);

    } catch (error) {
      console.error('Error guardando punto:', error);
    } finally {
      setGuardando(false);
      setModalAbierto(false);
      setCoordsTemp(null);
    }
  };

  const nombreUsuario = usuario?.displayName || usuario?.email || 'Usuario';

  return (
    <>
      <MapContainer center={[-12.0464, -77.0428]} zoom={3} style={{ height: '100vh' }}>
        <Geolocalizacion />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onClick={manejarClickMapa} />

        {/* 🧭 Marcadores del usuario */}
        {puntos.map((punto, i) => (
          <MarkerPersonalizado key={i} {...punto} />
        ))}

        {/* 🔗 Conexiones emocionales */}
        {conexiones.map((conexion, i) => {
          const puntoA = puntos.find((p) => p.id === conexion.idPuntoA);
          const puntoB = puntos.find((p) => p.id === conexion.idPuntoB);
          if (!puntoA || !puntoB) return null;

          return (
            <React.Fragment key={i}>
              <Polyline
                positions={[[puntoA.lat, puntoA.lng], [puntoB.lat, puntoB.lng]]}
                pathOptions={{
                  color: '#000',
                  weight: 8,
                  opacity: 0.4,
                }}
              />
              <Polyline
                positions={[[puntoA.lat, puntoA.lng], [puntoB.lat, puntoB.lng]]}
                pathOptions={{
                  color: conexion.color || '#00FFFF',
                  weight: 5,
                  opacity: 0.9,
                  className: 'linea-neon',
                }}
              >
                <Popup>
                  <strong>{conexion.anio}</strong>: {conexion.mensaje}
                </Popup>
              </Polyline>
            </React.Fragment>
          );
        })}
      </MapContainer>

      <FormularioConexionModal
        visible={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSubmit={handleAgregarMensaje}
        usuario={usuario}
        guardando={guardando}
      />
    </>
  );
}

export default MapaView;
