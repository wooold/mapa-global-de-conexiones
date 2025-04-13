// 📦 Importamos React y el hook de estado
import React, { useState } from 'react';

// 📝 Componente de formulario para agregar mensajes al mapa
function FormularioMensajeModal({ visible, onClose, onSubmit, usuario }) {
  // ✍️ Estados locales del formulario
  const [mensaje, setMensaje] = useState('');
  const [autor, setAutor] = useState('');

  // ❌ Si el modal no está visible, no se renderiza nada
  if (!visible) return null;

  // ✅ Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🧠 Validación mínima: no enviar si el mensaje está vacío
    if (mensaje.trim() !== '') {
      // 🔁 Enviamos los datos al componente padre
      onSubmit({
        mensaje,
        autor: autor || usuario?.displayName || 'Anónimo',
        email: usuario?.email || null,
        uid: usuario?.uid || null
      });

      // 🧹 Limpiamos el formulario tras el envío
      setMensaje('');
      setAutor('');
    }
  };

  return (
    <div style={estilos.overlay}>
      <div style={estilos.modal}>
        <h3>Escribe tu mensaje de conexión ✨</h3>

        <form onSubmit={handleSubmit}>
          {/* 🖊 Campo para el nombre o seudónimo */}
          <input
            type="text"
            placeholder="Tu nombre o seudónimo (opcional)"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            style={estilos.input}
            autoFocus
          />

          {/* 💬 Campo para el mensaje */}
          <input
            type="text"
            placeholder="Mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            style={estilos.input}
          />

          {/* 👀 Información del usuario si está logueado */}
          {usuario && (
            <small style={{ color: '#666', display: 'block', marginBottom: '0.5rem' }}>
              Este mensaje se asociará a: <strong>{usuario.email}</strong>
            </small>
          )}

          {/* ⚙️ Botones de acción */}
          <div style={estilos.botones}>
            <button type="submit" style={estilos.boton}>Agregar</button>
            <button type="button" onClick={onClose} style={estilos.cancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 🎨 Estilos inline para el modal
const estilos = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  botones: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  boton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  cancelar: {
    backgroundColor: '#ccc',
    color: '#000',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default FormularioMensajeModal;
