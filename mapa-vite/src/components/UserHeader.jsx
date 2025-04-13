// 🎯 Importamos React para poder usar JSX
import React from "react";

// 🔐 Importamos la función para cerrar sesión de Firebase Auth
import { signOut } from "firebase/auth";

// ✅ Importamos la instancia de autenticación desde el archivo correcto
import { authInstance } from "../firebase/config"; // antes estaba mal apuntando a auth.js

// 🧠 Componente que muestra el nombre del usuario logueado y el botón de logout
const UserHeader = ({ usuario }) => {
  // 🚪 Función que se ejecuta al hacer clic en "Cerrar sesión"
  const handleLogout = () => {
    signOut(authInstance)
      .then(() => console.log("👋 Sesión cerrada"))
      .catch((error) => console.error("❌ Error al cerrar sesión:", error));
  };

  // ❌ Si no hay usuario logueado, no se muestra nada
  if (!usuario) return null;

  // ✅ Si hay usuario, mostramos un saludo y el botón para cerrar sesión
  return (
    <div style={estilos.header}>
      <p style={estilos.texto}>
        Bienvenido,{" "}
        <strong>{usuario.displayName || usuario.email}</strong>
      </p>
      <button onClick={handleLogout} style={estilos.boton}>
        Cerrar sesión
      </button>
    </div>
  );
};

// 🎨 Estilos en línea
const estilos = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: "1rem 2rem",
    borderBottom: "1px solid #ddd",
  },
  texto: {
    margin: 0,
    fontSize: "1rem",
  },
  boton: {
    backgroundColor: "#dc3545", // 🔴 Rojo: botón de logout
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

// ✅ Exportamos el componente para que se pueda usar en App.jsx
export default UserHeader;
