import React from 'react';
import { Marker, Popup } from 'react-leaflet';

// ✅ Ahora recibe directamente las props (no un objeto punto)
const MarkerPersonalizado = ({ lat, lng, mensaje, autor }) => {
  if (!lat || !lng) return null; // Previene errores si falta algo

  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <strong>{autor || 'Anónimo'}</strong>
        <br />
        {mensaje}
      </Popup>
    </Marker>
  );
};

export default MarkerPersonalizado;
