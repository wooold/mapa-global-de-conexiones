// 📂 src/firebase/auth.js

// 🔐 Importamos funciones necesarias de Firebase Auth
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

// 🔧 Importamos la app de Firebase ya inicializada
import { authInstance } from './config';

// ✅ Obtenemos la instancia de autenticación asociada a la app
const auth = getAuth(app);

// ☁️ Creamos el proveedor de Google (para iniciar sesión con cuenta Google)
const provider = new GoogleAuthProvider();

// 🚀 Función que abre el popup de Google para iniciar sesión
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    // 👀 Mostramos los datos del usuario autenticado en consola
    console.log("✅ Usuario autenticado:", result.user);

    return result.user; // Devolvemos el usuario si fue exitoso
  } catch (error) {
    // 🧨 Si el usuario cancela el popup o hay error, lo mostramos en consola
    console.error("❌ Error al autenticar:", error.message);
    return null;
  }
};

// 🔁 Exportamos auth para usar con useAuthState
export const authInstance = auth;
