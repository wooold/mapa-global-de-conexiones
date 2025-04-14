// 🔥 Firebase Firestore
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

// ✅ Guarda una conexión en Firestore
export const guardarConexionEnFirestore = async (conexion) => {
  try {
    const docRef = await addDoc(collection(db, 'conexiones'), conexion);
    console.log('✅ Conexión guardada con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error al guardar conexión:', error);
    throw error;
  }
};

/**
 * 🤖 Lógica automática para insertar un nuevo punto y conectar cronológicamente
 *
 * @param {Object} nuevoPunto - Punto recién creado por el usuario
 * @param {string} uid - UID del usuario autenticado
 * @param {Function} obtenerTodosPuntos - Función para cargar todos los puntos
 * @param {Function} guardarPunto - Función para guardar el punto en Firestore
 * @returns {Object} puntoConId - El punto recién guardado con su ID
 */
const handleConexionAuto = async ({ nuevoPunto, uid, obtenerTodosPuntos, guardarPunto }) => {
  // 1. Guardar el nuevo punto en Firestore
  const id = await guardarPunto(nuevoPunto);
  const puntoConId = { ...nuevoPunto, id };

  // 2. Obtener y ordenar cronológicamente todos los puntos del usuario
  const puntos = await obtenerTodosPuntos();
  const puntosUsuario = puntos.filter((p) => p.uid === uid && p.anio);
  const puntosOrdenados = [...puntosUsuario, puntoConId].sort((a, b) => a.anio - b.anio);

  // 3. Identificar puntos anterior y siguiente con base en año
  const index = puntosOrdenados.findIndex((p) => p.id === id);
  const anterior = puntosOrdenados[index - 1];
  const siguiente = puntosOrdenados[index + 1];

  // 4. Crear conexión con punto anterior si existe
  if (anterior) {
    await guardarConexionEnFirestore({
      idPuntoA: anterior.id,
      idPuntoB: puntoConId.id,
      uid,
      anio: puntoConId.anio,
      mensaje: puntoConId.mensaje,
      color: puntoConId.color || '#00ffff',
      publico: puntoConId.publico || false,
    });
  }

  // 5. Crear conexión con punto siguiente si existe
  if (siguiente) {
    await guardarConexionEnFirestore({
      idPuntoA: puntoConId.id,
      idPuntoB: siguiente.id,
      uid,
      anio: siguiente.anio,
      mensaje: siguiente.mensaje,
      color: siguiente.color || '#00ffff',
      publico: siguiente.publico || false,
    });
  }

  return puntoConId;
};

export default handleConexionAuto;
