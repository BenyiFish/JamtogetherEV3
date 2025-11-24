import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarBuscarArtistas from "../components/SideBarBuscarArtistas";
import ArtistasDestacados from "../components/ArtistasDestacados";
import axios from "axios"; 
import "../styles/buscarBandas.css"; 
import React from "react";
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

 
  useEffect(() => {
    axios.get("http://localhost:8080/api/public/artistas")
      .then((response) => {
        setTodosLosArtistas(response.data);  
        setArtistasFiltrados(response.data); 
      })
      .catch((error) => {
        console.error("Error al cargar artistas:", error);
      });
  }, []);

 
  const aplicarFiltro = () => {
  
    const norm = (s) => s?.toString().trim().toLowerCase() || "";

   
    const filtradas = todosLosArtistas.filter((artista) => {
      
      const nombreMatch =
        !filtros.nombre || norm(artista.nombre).includes(norm(filtros.nombre));

      const instrumentoMatch =
        !filtros.instrumento ||
        norm(artista.instrumento).includes(norm(filtros.instrumento));

      const ciudadMatch =
        !filtros.ciudad || norm(artista.ciudad).includes(norm(filtros.ciudad));

      return nombreMatch && instrumentoMatch && ciudadMatch;
    });

    setArtistasFiltrados(filtradas);
  };

  return (
    <div className="app-container">
      <Navbar />

      {/* Sidebar con filtros */}
      <SidebarBuscarArtistas
        filtros={filtros}
        setFiltros={setFiltros}
        aplicarFiltro={aplicarFiltro}
      />

      {/* Resultados */}
      {artistasFiltrados.length > 0 ? (
        <ArtistasDestacados
          artistas={artistasFiltrados}
          titulo="Artistas Encontrados"
          layout="horizontal"
        />
      ) : (
        <p>No se han aplicado filtros o no hay resultados</p>
      )}

      <Footer />
    </div>
  );
}