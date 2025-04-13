// 📦 Importamos React y los componentes de Leaflet
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

// 🌍 Importamos el ícono personalizado
import DefaultIcon from './defaultIcon';

// 📍 Componente para representar un punto personalizado en el mapa
function MarkerPersonalizado({ lat, lng, mensaje, autor }) {
  return (
    <Marker position={[lat, lng]} icon={DefaultIcon}>
      <Popup>
        <div style={{ maxWidth: '220px' }}>
          {/* 🔖 Título del popup */}
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>📍 Conexión</h3>

          {/* 👤 Si hay autor, lo mostramos con estilo */}
          {autor && (
            <p style={{
              margin: '0 0 0.5rem 0',
              color: '#6a1b9a',
              fontWeight: 'bold',
              fontSize: '0.95rem'
            }}>
              ✨ {autor} dejó su huella
            </p>
          )}

          {/* 💬 El mensaje dejado por el usuario */}
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#333' }}>
            {mensaje}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

export default MarkerPersonalizado;
