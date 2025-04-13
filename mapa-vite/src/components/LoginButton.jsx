// 📂 src/components/LoginButton.jsx

import React, { useState, useEffect } from "react";

// 🔐 Importamos la función de login y la instancia de auth
import { loginWithGoogle } from "../firebase/auth";
import { authInstance } from "../firebase/config"; // 👈 cambio aquí

import { onAuthStateChanged } from "firebase/auth"; // 📡 Listener de sesión

const LoginButton = () => {
  const [user, setUser] = useState(null);          // 👤 Estado del usuario
  const [loading, setLoading] = useState(false);   // ⏳ Estado para evitar múltiples clics

  // 🔍 Al montar, escuchamos si hay usuario logueado
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

    // ✅ Limpiar listener al desmontar
    return () => unsubscribe();
  }, []);

  // 🧠 Maneja el clic de inicio de sesión con Google
  const handleLogin = async () => {
    if (loading) return; // Protege contra múltiples clics

    setLoading(true);
    console.log("🚀 Intentando iniciar sesión...");

    const userData = await loginWithGoogle();

    if (userData) {
      console.log("✅ Inicio de sesión exitoso:", userData.email);
      setUser(userData);
    } else {
      console.warn("⚠️ No se completó el inicio de sesión (cancelado o error)");
    }

    setLoading(false);
  };

  // 🎨 Renderizado condicional según si hay sesión activa
  return (
    <div style={{ textAlign: "center" }}>
      {user ? (
        <p>Hola, {user.displayName || user.email} 👋</p>
      ) : (
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Conectando..." : "Iniciar sesión con Google"}
        </button>
      )}
    </div>
  );
};

export default LoginButton;
