// src/firebase/firestore.js
import { db } from './config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore'; // asegúrate de tenerlo

// 📍 Guarda un punto en la colección 'puntos'
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

// 📤 Carga todos los puntos guardados desde Firestore
export const obtenerPuntosDesdeFirestore = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'puntos'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('❌ Error al obtener los puntos:', error);
      return [];
    }
  };