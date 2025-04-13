// 📍 Importamos Leaflet y su CSS
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 🛠 Corrección de íconos para Vite (usando `import` en lugar de `require`)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// 🔧 Aplicamos los íconos a Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/icons/marker-icon-2x.png',
  iconUrl: '/icons/marker-icon.png',
  shadowUrl: '/icons/marker-shadow.png',
});

// 🗺️ Vista principal del mapa
import MapaView from './features/Map/MapView';

// 🔐 Autenticación de Firebase
import { authInstance } from './firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

// 🧑 Componentes de sesión
import UserHeader from './components/UserHeader';
import LoginButton from './components/LoginButton';

function App() {
  const [usuario] = useAuthState(authInstance);

  return (
    <div>
      {/* 👤 Mostrar header si hay sesión, sino botón de login */}
      {usuario ? (
        <UserHeader usuario={usuario} />
      ) : (
        <LoginButton />
      )}

      {/* 🗺️ Mapa visible para todos */}
      <MapaView usuario={usuario} />
    </div>
  );
}

export default App;
