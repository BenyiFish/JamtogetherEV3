import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarBuscarBandas from "../components/SidebarBuscarBandas";
import BandasDestacadas from "../components/BandasDestacadas";

import "../styles/buscarBandas.css";
import React from "react";
import axios from 'axios';

export default function BuscarBandas() {

  const [filtros, setFiltros] = useState({ ciudad: "", estilo: "" });


  const [bandasFiltradas, setBandasFiltradas] = useState([]);


  const [todasLasBandas, setTodasLasBandas] = useState([]);


  useEffect(() => {
 
    axios.get("http://localhost:8080/api/public/bandas") 
      .then((response) => {
       
        setTodasLasBandas(response.data); 
        setBandasFiltradas(response.data);
      })
      .catch((error) => {
        console.error("Error cargando las bandas:", error);
      });
  }, []);


  const aplicarFiltro = () => {
  
    const filtradas = todasLasBandas.filter((banda) => {
 
      const ciudadMatch =
        !filtros.ciudad ||
        banda.ciudad?.toLowerCase().includes(filtros.ciudad.trim().toLowerCase());
        
      const estiloMatch =
        !filtros.estilo ||
        banda.estilo?.toLowerCase().includes(filtros.estilo.trim().toLowerCase());

      return ciudadMatch && estiloMatch;
    });

    setBandasFiltradas(filtradas);
  };

  return (
    <div className="app-container">
      <Navbar />
      <h1>Buscar Artistas</h1>

   
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
          <p>No se han aplicado filtros o no hay resultados</p>   
      )}

      <Footer />
    </div>
  );
}