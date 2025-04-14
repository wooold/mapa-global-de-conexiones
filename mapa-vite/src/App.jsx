// 🔍 Contador de huellas personales (lo ideal es calcularlo aquí con datos de Firestore)
import { useState, useEffect } from 'react';
import { obtenerPuntosDesdeFirestore } from './firebase/firestore';

// 🔐 Firebase + auth
import { authInstance } from './firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

// 🧩 Componentes
import UserHeader from './components/UserHeader';
import LoginButton from './components/LoginButton';
import MapaView from './features/Map/MapView';

function App() {
  const [usuario] = useAuthState(authInstance);

  const [totalHuellas, setTotalHuellas] = useState(0);
  const [huellasPublicas, setHuellasPublicas] = useState(0);

  useEffect(() => {
    const obtenerMisHuellas = async () => {
      if (!usuario?.uid) return;

      const data = await obtenerPuntosDesdeFirestore();
      const misHuellas = data.filter((punto) => punto.uid === usuario.uid);
      const publicas = misHuellas.filter((punto) => punto.publico === true);

      setTotalHuellas(misHuellas.length);
      setHuellasPublicas(publicas.length);
    };

    obtenerMisHuellas();
  }, [usuario]);

  return (
    <div>
      {usuario ? (
        <UserHeader
          usuario={usuario}
          totalHuellas={totalHuellas}
          huellasPublicas={huellasPublicas}
        />
      ) : (
        <LoginButton />
      )}

      {usuario && <MapaView usuario={usuario} />}
    </div>
  );
}

export default App;
