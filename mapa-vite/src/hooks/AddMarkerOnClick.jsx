import { useMapEvents } from 'react-leaflet';

function AddMarkerOnClick({ onAdd }) {
  useMapEvents({
    click(e) {
      const mensajeUsuario = prompt('Escribe tu mensaje de conexión:', '¡Nuevo punto agregado! ✨');

      // Si el usuario cancela el prompt, no agregamos nada
      if (!mensajeUsuario) return;

      const nuevoPunto = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        mensaje: mensajeUsuario,
      };

      onAdd(nuevoPunto);
    },
  });

  return null;
}

export default AddMarkerOnClick;
