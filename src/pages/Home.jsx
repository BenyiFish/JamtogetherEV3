import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/hero.css"
import Footer from "../components/Footer";
import "../styles/footer.css"
import { Artistas, Bandas } from "../data/data.js";
import BandasDestacadas from "../components/BandasDestacadas";
import ArtistasDestacados from "../components/ArtistasDestacados.jsx";
import "../styles/artistasDestacados.css"
import "../styles/bandasDestacadas.css"
import "../styles/home.css"
import React from "react";

export default function Home() {
  const navigate = useNavigate(); // Hook de React Router

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

        <ArtistasDestacados artistas={Artistas} />
        <BandasDestacadas bandas={Bandas} layout="vertical" titulo="Bandas Destacadas" />
      </main>

      <Footer />
    </div>
  );
}


