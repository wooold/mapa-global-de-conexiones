import React from 'react';
import { Marker, Popup } from 'react-leaflet';

function MarkerPersonalizado({ lat, lng, mensaje }) {
  return (
    <Marker position={[lat, lng]}>
        <Popup>
            <div>
                <h3 style={{ margin: 0 }}>📍 Conexión</h3>
                <p style={{ margin: '4px 0' }}>{mensaje}</p>
                {/* En el futuro podemos agregar más cosas aquí, como fecha o nombre */}
            </div>
        </Popup>
    </Marker>
  );
}

export default MarkerPersonalizado;
