// 🎯 Importamos React para poder usar JSX
import React from "react";

// 🔐 Importamos la función de cerrar sesión de Firebase
import { signOut } from "firebase/auth";

// 🔑 Importamos nuestra instancia de autenticación (ya configurada)
import { authInstance } from "../firebase/auth";

// 🧠 Este componente recibe el `usuario` autenticado como prop
const UserHeader = ({ usuario }) => {

  // 🚪 Función para cerrar sesión cuando se hace clic en el botón
  const handleLogout = () => {
    signOut(authInstance) // 🔄 Cerramos sesión en Firebase
      .then(() => console.log("👋 Sesión cerrada"))
      .catch((error) => console.error("Error al cerrar sesión:", error));
  };

  // ❌ Si no hay usuario, no renderizamos nada (nada que mostrar)
  if (!usuario) return null;

  // ✅ Si hay usuario logueado, mostramos saludo + botón
  return (
    <div style={estilos.header}>
      <p style={estilos.texto}>
        Bienvenido,{" "}
        <strong>
          {/* 👤 Mostramos el nombre o el correo si no hay nombre */}
          {usuario.displayName || usuario.email}
        </strong>
      </p>
      {/* 🔘 Botón para cerrar sesión */}
      <button onClick={handleLogout} style={estilos.boton}>
        Cerrar sesión
      </button>
    </div>
  );
};

// 🎨 Estilos en línea definidos como objeto JS
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
    backgroundColor: "#dc3545", // 🔴 Rojo (color común de logout)
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

// ✅ Exportamos el componente para usarlo en App.jsx
export default UserHeader;
