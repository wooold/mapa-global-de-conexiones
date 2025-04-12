import React, { useState } from 'react';

// 🛠 Recibe `usuario` como prop para usar su nombre, email y uid
function FormularioMensajeModal({ visible, onClose, onSubmit, usuario }) {
  const [mensaje, setMensaje] = useState('');
  const [autor, setAutor] = useState('');

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🛠 Validación simple: no envíes si el mensaje está vacío
    if (mensaje.trim() !== '') {
      onSubmit({
        mensaje,
        autor: autor || usuario?.displayName || 'Anónimo', // 🛠 Usa autor escrito o el nombre de sesión
        email: usuario?.email || null, // 🛠 Captura el correo del usuario logueado
        uid: usuario?.uid || null      // 🛠 Captura el UID único de Firebase
      });

      // 🛠 Limpia los campos después de enviar
      setMensaje('');
      setAutor('');
    }
  };

  return (
    <div style={estilos.overlay}>
      <div style={estilos.modal}>
        <h3>Escribe tu mensaje de conexión ✨</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tu nombre o seudónimo (opcional)"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            style={estilos.input}
            autoFocus
          />
          <input
            type="text"
            placeholder="Mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            style={estilos.input}
          />

          {/* 🧠 OPCIONAL: muestra qué cuenta se está usando */}
          {usuario && (
            <small style={{ color: '#666' }}>
              Este mensaje se asociará a: <strong>{usuario.email}</strong>
            </small>
          )}

          <div style={estilos.botones}>
            <button type="submit" style={estilos.boton}>
              Agregar
            </button>
            <button type="button" onClick={onClose} style={estilos.cancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
