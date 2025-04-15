// 🌱 React Hooks
import { useState, useEffect } from 'react';

// 🔐 Autenticación de usuario con Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from './firebase/config';

// 📦 Función para obtener los puntos guardados desde la base de datos
import { obtenerPuntosDesdeFirestore } from './firebase/firestore';

// 🧩 Componentes personalizados
import UserHeader from './components/UserHeader';
import LoginButton from './components/LoginButton';
import MapaView from './features/Map/MapView';

// 🍏 Nuevo componente visual estilo Apple
import ButtonHIG from './ui/ButtonHIG';

function App() {
  // 👤 Estado que almacena el usuario autenticado (o null si no está logueado)
  const [usuario] = useAuthState(authInstance);

  // 📊 Estados que almacenan conteo de huellas personales y públicas
  const [totalHuellas, setTotalHuellas] = useState(0);
  const [huellasPublicas, setHuellasPublicas] = useState(0);

  // 🔄 Hook para cargar datos de Firestore al loguearse el usuario
  useEffect(() => {
    const obtenerMisHuellas = async () => {
      if (!usuario?.uid) return; // ⛔ Si no hay usuario, salimos

      const data = await obtenerPuntosDesdeFirestore(); // 📥 Obtenemos todos los puntos
      const misHuellas = data.filter((punto) => punto.uid === usuario.uid); // 🎯 Filtramos por usuario actual
      const publicas = misHuellas.filter((punto) => punto.publico === true); // 🌐 Filtramos las públicas

      setTotalHuellas(misHuellas.length);
      setHuellasPublicas(publicas.length);
    };

    obtenerMisHuellas();
  }, [usuario]);

  return (
    <>
      {/* 🔝 Si hay sesión iniciada, mostramos el encabezado de usuario */}
      {usuario ? (
        <UserHeader
          usuario={usuario}
          totalHuellas={totalHuellas}
          huellasPublicas={huellasPublicas}
        />
      ) : (
        // 🔐 Si no, mostramos el botón de login
        <LoginButton />
      )}

      {/* 🗺️ Si está logueado, mostramos el mapa con huellas */}
      {usuario && <MapaView usuario={usuario} />}

      {/* 🍏 Bloque para probar el botón visual Apple-style */}
      <div style={{ padding: '2rem' }}>
        <h1>Bienvenido al nuevo mapa</h1>
        <ButtonHIG onClick={() => alert('Hola Apple-style')}>
          Clic sobrio 🍏
        </ButtonHIG>
      </div>
    </>
  );
}

export default App;