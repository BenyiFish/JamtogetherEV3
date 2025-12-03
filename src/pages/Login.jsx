import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/styleLogin.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Limpiar errores previos
    setErrorUsername('');
    setErrorPassword('');

    const usernameInput = username.trim();
    const passwordInput = password.trim();

    // Validaciones locales
    if (usernameInput === '' || passwordInput === '') {
      // alert('Por favor, completa todos los campos'); // Opcional si ya muestras errores abajo
      if (usernameInput === '') setErrorUsername('Campo requerido');
      if (passwordInput === '') setErrorPassword('Campo requerido');
      return;
    }

    // Petición al Backend
    axios.post("http://localhost:8080/api/auth/login", {
      username: usernameInput,
      password: passwordInput
    })
    .then((response) => {
      // --- ÉXITO ---
      
      // 1. Guardar el objeto Usuario (para tener sus datos: nombre, email, etc.)
      localStorage.setItem('currentUser', JSON.stringify(response.data));

      // 2. Guardar el Token (IMPORTANTE: Esto es lo que revisa tu Home.jsx para el botón)
      // Como el backend aún no manda JWT, usamos un string simple o el ID del usuario
      localStorage.setItem('token', 'sesion_activa'); 

      alert('¡Inicio de sesión exitoso!');
      navigate('/'); // Redirigir al Home para ver los cambios
    })
    .catch((error) => {
      // --- ERROR ---
      console.error("Error en login:", error);

      if (error.response && error.response.status === 401) {
        // Credenciales malas
        // alert('Usuario o contraseña incorrectos'); 
        setErrorPassword('Usuario o contraseña incorrectos');
      } else if (error.code === "ERR_NETWORK") {
        alert('No se pudo conectar con el servidor. Revisa que el backend esté corriendo.');
      } else {
        alert('Ocurrió un error inesperado. Intenta más tarde.');
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form id="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario:</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          {errorUsername && <span className="error">{errorUsername}</span>}

          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {errorPassword && <span className="error">{errorPassword}</span>}

          <button type="submit">Iniciar sesión</button>

          <span className="register-label">¿No tienes una cuenta?</span>
          <Link to="/registro" className="link-btn">Registrarse</Link>
          <Link to="/" className="link-btn">Volver al inicio</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;