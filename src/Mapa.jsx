import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = () => {
  const position = [51.505, -0.09]; // Coordenadas de Londres (puedes cambiarlo luego)

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={position} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Aquí empieza tu historia 🌍
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapa;