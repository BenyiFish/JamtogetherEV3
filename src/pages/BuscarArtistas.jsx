import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarBuscarArtistas from "../components/SidebarBuscarArtistas"; 
import ArtistasDestacados from "../components/ArtistasDestacados";
import axios from "axios"; 
import "../styles/buscarBandas.css"; 
import "../styles/buscarArtistas.css";

export default function BuscarArtistas() {
  const [filtros, setFiltros] = useState({
    nombre: "",
    instrumento: "",
    ciudad: "",
    descripcion: "",
  });

  const [artistasFiltrados, setArtistasFiltrados] = useState([]);
  const [todosLosArtistas, setTodosLosArtistas] = useState([]);

  // --- ESTADOS PARA MODAL Y LOGIN ---
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false); // Por defecto falso

  const [nuevoArtista, setNuevoArtista] = useState({
    nombre: "",
    instrumento: "",
    ciudad: "",
    descripcion: "",
    image: "" 
  });

  useEffect(() => {
    // 1. VERIFICACIÓN REAL DE LOGIN
    const token = localStorage.getItem("token");
    if (token) {
      setUsuarioLogueado(true);
    } else {
      setUsuarioLogueado(false);
    }

    // 2. Cargar datos
    cargarArtistas();
  }, []);

  const cargarArtistas = () => {
    axios.get("http://localhost:8080/api/public/artistas")
      .then((response) => {
        setTodosLosArtistas(response.data);
        setArtistasFiltrados(response.data);
      })
      .catch((error) => {
        console.error("Error cargando artistas:", error);
      });
  };

  const aplicarFiltro = () => {
    const norm = (s) => s?.toString().trim().toLowerCase() || "";
    const filtradas = todosLosArtistas.filter((artista) => {
      const nombreMatch = !filtros.nombre || norm(artista.nombre).includes(norm(filtros.nombre));
      const instrumentoMatch = !filtros.instrumento || norm(artista.instrumento).includes(norm(filtros.instrumento));
      const ciudadMatch = !filtros.ciudad || norm(artista.ciudad).includes(norm(filtros.ciudad));
      return nombreMatch && instrumentoMatch && ciudadMatch;
    });
    setArtistasFiltrados(filtradas);
  };

  // --- Manejo del Formulario ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoArtista({ ...nuevoArtista, [name]: value });
  };

  const handlePublicarArtista = (e) => {
    e.preventDefault();

    if (!nuevoArtista.nombre || !nuevoArtista.instrumento) {
      alert("Por favor completa al menos el nombre y el instrumento.");
      return;
    }

    axios.post("http://localhost:8080/api/public/artistas", nuevoArtista)
      .then((response) => {
        alert("¡Artista publicado con éxito!");
        setMostrarModal(false);
        setNuevoArtista({ nombre: "", instrumento: "", ciudad: "", descripcion: "", image: "" });
        cargarArtistas(); 
      })
      .catch((error) => {
        console.error("Error publicando artista:", error);
        alert("Hubo un error al publicar el artista.");
      });
  };

  return (
    <div className="app-container">
      <Navbar />

      <SidebarBuscarArtistas 
        filtros={filtros}
        setFiltros={setFiltros}
        aplicarFiltro={aplicarFiltro}
      />

      {artistasFiltrados.length > 0 ? (
        <ArtistasDestacados
          artistas={artistasFiltrados}
          titulo="Artistas Encontrados"
          layout="horizontal"
        />
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
            No se han aplicado filtros o no hay resultados
        </p>
      )}

      {/* --- BOTÓN FLOTANTE (+) SOLO SI ESTÁ LOGUEADO --- */}
      {usuarioLogueado && (
        <button 
          className="fab-btn" 
          onClick={() => setMostrarModal(true)}
          title="Publicar Artista"
        >
          +
        </button>
      )}

      {/* --- MODAL --- */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-x" onClick={() => setMostrarModal(false)}>✖</button>
            
            <h2>Publicar Nuevo Artista</h2>
            
            <form onSubmit={handlePublicarArtista}>
              <div className="form-group">
                <label>Nombre Artístico / Banda:</label>
                <input 
                  type="text" 
                  name="nombre" 
                  value={nuevoArtista.nombre} 
                  onChange={handleInputChange} 
                  placeholder="Ej. The Rockers" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Instrumento / Rol:</label>
                <input 
                  type="text" 
                  name="instrumento" 
                  value={nuevoArtista.instrumento} 
                  onChange={handleInputChange} 
                  placeholder="Ej. Baterista, Guitarra..." 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Ciudad:</label>
                <input 
                  type="text" 
                  name="ciudad" 
                  value={nuevoArtista.ciudad} 
                  onChange={handleInputChange} 
                  placeholder="Ej. Santiago" 
                />
              </div>

              <div className="form-group">
                <label>URL Imagen (Opcional):</label>
                <input 
                  type="text" 
                  name="image" 
                  value={nuevoArtista.image} 
                  onChange={handleInputChange} 
                  placeholder="https://..." 
                />
              </div>

              <div className="form-group">
                <label>Descripción:</label>
                <textarea 
                  name="descripcion" 
                  value={nuevoArtista.descripcion} 
                  onChange={handleInputChange} 
                  rows="3"
                  placeholder="Cuéntanos un poco sobre ti..."
                ></textarea>
              </div>

              <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit">
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}