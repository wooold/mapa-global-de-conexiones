// 📂 src/firebase/auth.js

// 🔐 Importamos funciones necesarias de Firebase Auth
import {
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

// ✅ Usamos authInstance directamente desde config
import { authInstance } from './config';

// ☁️ Creamos el proveedor de Google
const provider = new GoogleAuthProvider();

// 🚀 Función para iniciar sesión con Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(authInstance, provider);
    console.log("✅ Usuario autenticado:", result.user);
    return result.user;
  } catch (error) {
    console.error("❌ Error al autenticar:", error.message);
    return null;
  }
};

// 👌 Ya NO exportes `authInstance` desde aquí (evitamos conflicto)
