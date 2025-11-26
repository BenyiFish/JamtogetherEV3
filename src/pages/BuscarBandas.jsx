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

  // Cargar desde la Base de Datos
  useEffect(() => {
    axios.get("http://localhost:8080/api/public/bandas")
      .then((response) => {
        setTodasLasBandas(response.data);
        setBandasFiltradas(response.data);
      })
      .catch((error) => {
        console.error("Error cargando bandas:", error);
      });
  }, []);

  const aplicarFiltro = () => {
    const norm = (s) => s?.toString().trim().toLowerCase() || "";
    const filtradas = todasLasBandas.filter((banda) => {
      const ciudadMatch = !filtros.ciudad || norm(banda.ciudad).includes(norm(filtros.ciudad));
      const estiloMatch = !filtros.estilo || norm(banda.estilo).includes(norm(filtros.estilo));
      return ciudadMatch && estiloMatch;
    });
    setBandasFiltradas(filtradas);
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

      <Footer />
    </div>
  );
}