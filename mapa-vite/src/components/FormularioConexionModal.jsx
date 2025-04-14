// 📦 Importamos React y el hook de estado
import React, { useState } from 'react';

// 📝 Componente de formulario para agregar mensajes y conexiones
function FormularioConexionModal({ visible, onClose, onSubmit, usuario, guardando }) {
  const [mensaje, setMensaje] = useState('');
  const [autor, setAutor] = useState('');
  const [esPublico, setEsPublico] = useState(false);
  const [anio, setAnio] = useState('');
  const [color, setColor] = useState('#00FFFF'); // 🎨 Color por defecto

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const anioNumerico = parseInt(anio);
    if (!mensaje.trim() || isNaN(anioNumerico) || guardando) return;

    onSubmit({
      mensaje,
      autor: autor || usuario?.displayName || 'Anónimo',
      email: usuario?.email || null,
      uid: usuario?.uid || null,
      publico: esPublico,
      anio: anioNumerico,
      color,
    });

    setMensaje('');
    setAutor('');
    setEsPublico(false);
    setAnio('');
    setColor('#00FFFF');
  };

  const coloresDisponibles = [
    '#00FFFF', '#FF00FF', '#FF8C00', '#7CFC00', '#FFD700',
    '#00CED1', '#FF1493', '#8A2BE2', '#FF4500', '#00FF7F'
  ];

  return (
    <div style={estilos.overlay}>
      <div style={estilos.modal}>
        <h3>Escribe tu mensaje de conexión ✨</h3>

        <form onSubmit={handleSubmit}>
          {!usuario && (
            <input
              type="text"
              placeholder="Tu nombre o seudónimo (opcional)"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              style={estilos.input}
              autoFocus
              disabled={guardando}
            />
          )}

          <input
            type="number"
            placeholder="Año del evento (ej. 1994)"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            style={estilos.input}
            min="1900"
            max={new Date().getFullYear() + 10}
            required
            disabled={guardando}
          />

          <input
            type="text"
            placeholder="Mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            style={estilos.input}
            disabled={guardando}
          />

          {usuario && (
            <small style={{ color: '#666', display: 'block', marginBottom: '0.5rem' }}>
              Este mensaje se asociará a: <strong>{usuario.email}</strong>
            </small>
          )}

          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <input
              type="checkbox"
              checked={esPublico}
              onChange={(e) => setEsPublico(e.target.checked)}
              disabled={guardando}
              style={{ marginRight: '0.5rem' }}
            />
            Hacer esta huella visible en el mapa global 🌐
          </label>

          <label style={estilos.label}>Color de la conexión:</label>
          <div style={estilos.colores}>
            {coloresDisponibles.map((c) => (
              <div
                key={c}
                title={c}
                onClick={() => setColor(c)}
                style={{
                  ...estilos.colorBox,
                  backgroundColor: c,
                  border: c === color ? '3px solid #000' : '1px solid #ccc',
                }}
              />
            ))}
          </div>

          {guardando && (
            <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#007bff' }}>
              Guardando tu huella global...
            </p>
          )}

          <div style={estilos.botones}>
            <button
              type="submit"
              style={{
                ...estilos.boton,
                backgroundColor: guardando ? '#6c757d' : estilos.boton.backgroundColor,
              }}
              disabled={guardando}
            >
              {guardando ? 'Guardando...' : 'Agregar'}
            </button>

            <button
              type="button"
              onClick={onClose}
              style={estilos.cancelar}
              disabled={guardando}
            >
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
  label: {
    margin: '0.5rem 0 0.2rem',
    display: 'block',
    fontWeight: 'bold',
  },
  colores: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  colorBox: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};

export default FormularioConexionModal;
