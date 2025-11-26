import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BandasDestacadas from "../components/BandasDestacadas";
import ArtistasDestacados from "../components/ArtistasDestacados.jsx";
import axios from "axios"; // Importamos Axios
import "../styles/hero.css";
import "../styles/footer.css";
import "../styles/artistasDestacados.css";
import "../styles/bandasDestacadas.css";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  
  // Estados para guardar los datos de la BD
  const [artistasHome, setArtistasHome] = useState([]);
  const [bandasHome, setBandasHome] = useState([]);

  useEffect(() => {
   
    axios.get("http://localhost:8080/api/public/artistas")
      .then(res => {
      
        setArtistasHome(res.data.slice(0, 5));
      })
      .catch(err => console.error("Error cargando artistas en Home:", err));


    axios.get("http://localhost:8080/api/public/bandas")
      .then(res => {
        setBandasHome(res.data.slice(0, 5));
      })
      .catch(err => console.error("Error cargando bandas en Home:", err));
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="hero-container">
          <div className="hero-content">
            <p className="hero-text">
              ¡Conecta con músicos de tu zona <br /> y forma tu próxima banda!<br />
            </p>
            <p className="hero-text2">
              JamTogether es la comunidad que conecta a guitarristas, vocalistas<br />
              y todo tipo de músicos que quieren formar proyectos reales.<br />
              Filtra por estilo, ciudad o instrumento y encuentra tu banda.<br />
            </p>
            <div className="botonera">
              <button className="btn" onClick={() => navigate("/registro")}>
                Regístrate aquí
              </button>
              <button className="btn-2" onClick={() => navigate("/login")}>
                Iniciar Sesión
              </button>
            </div>
          </div>
        </section>

    
        <ArtistasDestacados artistas={artistasHome} titulo="Artistas Destacados" />
        <BandasDestacadas bandas={bandasHome} layout="vertical" titulo="Bandas Destacadas" />
      </main>

      <Footer />
    </div>
  );
}