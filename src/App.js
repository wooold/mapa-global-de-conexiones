// 📍 Importamos Leaflet (librería para mapas) y su CSS para que se rendericen bien
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 🗺️ Vista principal que contiene el mapa con sus puntos, clicks y formularios
import MapaView from './features/Map/MapView';

// 🔐 Solo traemos la instancia de autenticación (ya configurada en firebase/auth.js)
import { authInstance } from './firebase/auth';

// 👥 Hook de Firebase que detecta automáticamente si hay un usuario logueado o no
import { useAuthState } from 'react-firebase-hooks/auth';

// 👤 Muestra el saludo del usuario logueado y el botón para cerrar sesión
import UserHeader from './components/UserHeader';

// 🔘 Componente que maneja el inicio de sesión con Google y escucha sesión activa
import LoginButton from './components/LoginButton';

// 🛠 Esta parte es obligatoria en Leaflet para que los íconos se muestren correctamente
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  // 👂 Detecta automáticamente si el usuario está logueado en Firebase
  const [usuario] = useAuthState(authInstance);

  return (
    <div>
      {/* 🧭 Si el usuario está autenticado, mostramos el saludo y botón de logout */}
      {usuario ? (
        <UserHeader usuario={usuario} />
      ) : (
        // 🚪 Si NO hay sesión, mostramos el botón que inicia el login con Google
        <LoginButton />
      )}

      {/* 🗺️ El mapa se muestra siempre, reciba o no el usuario, y puede mostrar los puntos */}
      <MapaView usuario={usuario} />
    </div>
  );
}

export default App;
