import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios"; 
import "../styles/admin.css"; 

export default function Admin() {
 
  const [usuarios, setUsuarios] = useState([]);

  
  useEffect(() => {
    cargarUsuarios();
  }, []);

  
  const cargarUsuarios = () => {
    axios.get("http://localhost:8080/api/auth/usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar usuarios:", error);
        alert("Error al conectar con el servidor. Asegúrate de que el backend esté corriendo.");
      });
  };

  const handleDelete = (usernameToDelete) => {
    
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${usernameToDelete}?`)) {
      
    
      axios.delete(`http://localhost:8080/api/auth/usuarios/${usernameToDelete}`)
        .then(() => {
          alert("Usuario eliminado correctamente.");
        
          cargarUsuarios();
        })
        .catch((error) => {
          console.error("Error al eliminar:", error);
          
          
          if (error.response && error.response.status === 403) {
            alert("ACCESO DENEGADO: No se puede eliminar a un administrador.");
          } else if (error.response && error.response.status === 404) {
            alert("El usuario ya no existe.");
            cargarUsuarios(); 
          } else {
            alert("Ocurrió un error al intentar eliminar el usuario.");
          }
        });
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#1a1a1a' }}>
      <Navbar />
      
      <main className="main-content admin-container">
        <h1>Panel de Administración</h1>
        <p>Gestión de usuarios registrados en la Base de Datos</p>

        {usuarios.length === 0 ? (
          <div className="no-users">No hay usuarios registrados o no hay conexión con el servidor.</div>
        ) : (
          <div className="table-responsive">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Ciudad</th>
                  <th>Instrumento</th>
                  <th>Rol</th> 
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id || user.username}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.city}</td>
                    <td>{user.instrumento}</td>
                    <td>{user.rol || 'usuario'}</td>
                    <td>
                      {/* Si es admin, mostramos botón deshabilitado. Si no, botón borrar */}
                      {user.rol === 'admin' ? (
                        <button className="btn-disabled" disabled>
                          Protegido
                        </button>
                      ) : (
                        <button 
                          className="btn-delete" 
                          onClick={() => handleDelete(user.username)}
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}