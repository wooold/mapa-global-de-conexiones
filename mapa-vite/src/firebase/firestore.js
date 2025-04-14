// 🔥 Firebase Firestore
import { db } from './config';
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore';

// 📍 Guardar un nuevo punto
export const guardarPuntoEnFirestore = async (punto) => {
  try {
    const docRef = await addDoc(collection(db, 'puntos'), {
      ...punto,
      creadoEn: serverTimestamp(),
    });
    console.log('📝 Punto guardado con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error al guardar el punto:', error);
    throw error;
  }
};

// 📤 Obtener todos los puntos
export const obtenerPuntosDesdeFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'puntos'));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('❌ Error al obtener los puntos:', error);
    return [];
  }
};

// 🔗 Guardar una conexión entre puntos
export const guardarConexionEnFirestore = async (conexion) => {
  try {
    const docRef = await addDoc(collection(db, 'conexiones'), {
      ...conexion,
      creadoEn: serverTimestamp(),
    });
    console.log('🔗 Conexión guardada con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error al guardar la conexión:', error);
    throw error;
  }
};

// 🔍 Obtener conexiones de un usuario
export const obtenerConexionesDesdeFirestore = async (uid) => {
  try {
    const ref = collection(db, 'conexiones');
    const q = query(ref, where('uid', '==', uid));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('❌ Error al obtener conexiones:', error);
    return [];
  }
};
