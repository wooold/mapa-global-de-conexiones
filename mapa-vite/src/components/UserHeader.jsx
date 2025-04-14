// 🎯 Importamos React para poder usar JSX
import React from "react";

// 🔐 Función de logout de Firebase
import { signOut } from "firebase/auth";
import { authInstance } from "../firebase/config";

// 🧠 Recibimos también los contadores
const UserHeader = ({ usuario, totalHuellas, huellasPublicas }) => {
  const handleLogout = () => {
    signOut(authInstance)
      .then(() => console.log("👋 Sesión cerrada"))
      .catch((error) => console.error("❌ Error al cerrar sesión:", error));
  };

  if (!usuario) return null;

  return (
    <div style={estilos.header}>
      <p style={estilos.texto}>
        Bienvenido,{" "}
        <strong>{usuario.displayName || usuario.email}</strong> | Has dejado{" "}
        <strong>{totalHuellas}</strong> huella{totalHuellas !== 1 && "s"}
        {huellasPublicas > 0 && (
          <>
            {" "}
            (<strong>{huellasPublicas}</strong> pública
            {huellasPublicas !== 1 && "s"})
          </>
        )}
      </p>
      <button onClick={handleLogout} style={estilos.boton}>
        Cerrar sesión
      </button>
    </div>
  );
};

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
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default UserHeader;
