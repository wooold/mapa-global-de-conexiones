import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const MarkerPersonalizado = ({ lat, lng, mensaje, autor, anio, color, publico }) => {
  if (!lat || !lng) return null;

  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <div style={{ maxWidth: '200px' }}>
          <h4 style={{ marginBottom: '0.25rem' }}>{autor || 'Anónimo'}</h4>
          <p style={{ margin: 0 }}>{mensaje}</p>
          <hr />
          <div style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>
            <strong>Año:</strong> {anio} <br />
            <strong>Visibilidad:</strong> {publico ? 'Público 🌍' : 'Privado 🔒'}
          </div>
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{
              width: '16px', height: '16px', backgroundColor: color || '#00FFFF',
              borderRadius: '50%', display: 'inline-block', border: '1px solid #333'
            }}></span>
            <span style={{ fontSize: '0.75rem' }}>Color de huella</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default MarkerPersonalizado;
