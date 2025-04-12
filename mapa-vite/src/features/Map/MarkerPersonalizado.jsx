import React from 'react';
import { Marker, Popup } from 'react-leaflet';

function MarkerPersonalizado({ lat, lng, mensaje, autor }) {
  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <div>
          <h3 style={{ margin: 0 }}>📍 Conexión</h3>
          {autor && (
            <p style={{ margin: '4px 0', color: '#6a1b9a', fontWeight: 'bold' }}>
              ✨ {autor} dejó su huella
            </p>
          )}
          <p style={{ margin: '4px 0' }}>{mensaje}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default MarkerPersonalizado;