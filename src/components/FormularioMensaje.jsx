// src/components/FormularioMensaje.jsx
import React, { useState } from 'react';

function FormularioMensaje({ onSubmit, onCancel }) {
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    onSubmit(mensaje.trim());
    setMensaje('');
    setAutor('');
  };

  return (
    <div style={{
      position: 'absolute',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'white',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1000
    }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mensaje">Escribe tu mensaje:</label>
        <input
          id="mensaje"
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Agregar</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>Cancelar</button>
      </form>
    </div>
  );
}

export default FormularioMensaje;
