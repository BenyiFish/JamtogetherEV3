import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarBuscarBandas from "../components/SidebarBuscarBandas";
import BandasDestacadas from "../components/BandasDestacadas";
import axios from "axios"; 
import "../styles/buscarBandas.css";

export default function BuscarBandas() {
  const [filtros, setFiltros] = useState({ ciudad: "", estilo: "" });
  const [bandasFiltradas, setBandasFiltradas] = useState([]);
  const [todasLasBandas, setTodasLasBandas] = useState([]);

  // --- ESTADOS PARA MODAL Y LOGIN ---
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false); // Por defecto falso

  const [nuevaBanda, setNuevaBanda] = useState({
    nombre: "",
    estilo: "",
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
    cargarBandas();
  }, []);

  const cargarBandas = () => {
    axios.get("http://localhost:8080/api/public/bandas")
      .then((response) => {
        setTodasLasBandas(response.data);
        setBandasFiltradas(response.data);
      })
      .catch((error) => {
        console.error("Error cargando bandas:", error);
      });
  };

  const aplicarFiltro = () => {
    const norm = (s) => s?.toString().trim().toLowerCase() || "";
    const filtradas = todasLasBandas.filter((banda) => {
      const ciudadMatch = !filtros.ciudad || norm(banda.ciudad).includes(norm(filtros.ciudad));
      const estiloMatch = !filtros.estilo || norm(banda.estilo).includes(norm(filtros.estilo));
      return ciudadMatch && estiloMatch;
    });
    setBandasFiltradas(filtradas);
  };

  // --- Manejo del Formulario ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaBanda({ ...nuevaBanda, [name]: value });
  };

  const handlePublicarBanda = (e) => {
    e.preventDefault();

    if (!nuevaBanda.nombre || !nuevaBanda.estilo) {
      alert("Por favor completa al menos el nombre y el estilo de la banda.");
      return;
    }

    axios.post("http://localhost:8080/api/public/bandas", nuevaBanda)
      .then((response) => {
        alert("¡Banda publicada con éxito!");
        setMostrarModal(false);
        setNuevaBanda({ nombre: "", estilo: "", ciudad: "", descripcion: "", image: "" });
        cargarBandas(); 
      })
      .catch((error) => {
        console.error("Error publicando banda:", error);
        alert("Hubo un error al publicar la banda.");
      });
  };

  return (
    <div className="app-container">
      <Navbar />
      <h1>Buscar Bandas</h1>

      <SidebarBuscarBandas
        filtros={filtros}
        setFiltros={setFiltros}
        aplicarFiltro={aplicarFiltro}
      />

      {bandasFiltradas.length > 0 ? (
        <BandasDestacadas
          bandas={bandasFiltradas}
          titulo="Bandas Encontradas"
          layout="horizontal"
        />
      ) : (      
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No se han aplicado filtros o no hay resultados
          </p>   
      )}

      {/* --- BOTÓN FLOTANTE (+) SOLO SI ESTÁ LOGUEADO --- */}
      {usuarioLogueado && (
        <button 
          className="fab-btn" 
          onClick={() => setMostrarModal(true)}
          title="Publicar Banda"
        >
          +
        </button>
      )}

      {/* --- MODAL --- */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-x" onClick={() => setMostrarModal(false)}>✖</button>
            
            <h2>Publicar Nueva Banda</h2>
            
            <form onSubmit={handlePublicarBanda}>
              <div className="form-group">
                <label>Nombre de la Banda:</label>
                <input 
                  type="text" 
                  name="nombre" 
                  value={nuevaBanda.nombre} 
                  onChange={handleInputChange} 
                  placeholder="Ej. Los Jammeadores" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Estilo Musical:</label>
                <input 
                  type="text" 
                  name="estilo" 
                  value={nuevaBanda.estilo} 
                  onChange={handleInputChange} 
                  placeholder="Ej. Rock, Jazz, Funk..." 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Ciudad:</label>
                <input 
                  type="text" 
                  name="ciudad" 
                  value={nuevaBanda.ciudad} 
                  onChange={handleInputChange} 
                  placeholder="Ej. Valparaíso" 
                />
              </div>

              <div className="form-group">
                <label>URL Imagen (Logo/Foto):</label>
                <input 
                  type="text" 
                  name="image" 
                  value={nuevaBanda.image} 
                  onChange={handleInputChange} 
                  placeholder="https://..." 
                />
              </div>

              <div className="form-group">
                <label>Descripción:</label>
                <textarea 
                  name="descripcion" 
                  value={nuevaBanda.descripcion} 
                  onChange={handleInputChange} 
                  rows="3"
                  placeholder="¿Qué tocan? ¿Buscan integrantes?"
                ></textarea>
              </div>

              <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit">
                  Publicar Banda
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