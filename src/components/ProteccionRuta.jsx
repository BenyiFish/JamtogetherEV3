import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProteccionRuta = ({ soloAdmin = false }) => {
  // 1. Leer el usuario actual del localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // 2. Verificar si está logueado
  if (!currentUser) {
    // Si no hay usuario, mandar al login
    return <Navigate to="/login" replace />;
  }

  // 3. Si la ruta requiere admin, verificar el rol
  if (soloAdmin && currentUser.rol !== 'admin') {
    alert("Acceso denegado: Se requieren permisos de administrador.");
    // Si está logueado pero no es admin, mandar al inicio
    return <Navigate to="/" replace />;
  }

  // 4. Si pasa las verificaciones, mostrar la página solicitada (Outlet)
  return <Outlet />;
};

export default ProteccionRuta;