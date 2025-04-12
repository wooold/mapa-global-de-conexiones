// 📂 src/components/LoginButton.jsx

import React, { useState, useEffect } from "react";
import { loginWithGoogle, authInstance } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const LoginButton = () => {
  const [user, setUser] = useState(null);          // 👤 Estado local para el usuario
  const [loading, setLoading] = useState(false);   // ⏳ Control para evitar múltiples clics

  // 🔍 Escucha cambios en la sesión de Firebase al montar el componente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (usuario) => {
      if (usuario) {
        console.log("👤 Usuario activo detectado:", usuario.email);
        setUser(usuario);
      } else {
        console.log("🚪 Sesión cerrada o sin usuario");
        setUser(null);
      }
    });

    return () => unsubscribe(); // ✅ Limpia el listener al desmontar el componente
  }, []);

  // 🔐 Maneja el inicio de sesión al hacer clic en el botón
  const handleLogin = async () => {
    if (loading) return; // Evita doble clic

    setLoading(true); // Desactiva el botón temporalmente
    console.log("🚀 Intentando iniciar sesión...");

    const userData = await loginWithGoogle();

    if (userData) {
      console.log("✅ Inicio de sesión exitoso:", userData.email);
      setUser(userData);
    } else {
      console.warn("⚠️ No se completó el inicio de sesión (cancelado o error)");
    }

    setLoading(false); // Reactiva el botón
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user ? (
        // 🟢 Si hay usuario, muestra saludo
        <p>Hola, {user.displayName || user.email} 👋</p>
      ) : (
        // 🔘 Si no hay sesión, muestra botón (deshabilitado si está cargando)
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Conectando..." : "Iniciar sesión con Google"}
        </button>
      )}
    </div>
  );
};

export default LoginButton;
