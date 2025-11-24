import React, { useState } from "react";
import "../styles/artistasDestacados.css";

export default function ArtistasDestacados({
  artistas = [], //prop
  titulo = "Artistas Destacados", //prop
  layout = "vertical", //prop 
  placeholderImage // imagen por defecto si algún artista no trae image //prop
}) {
  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);

  return (
    <section className="bandas-destacadas">
      <h2 className="tituloArtistas">{titulo}</h2>

      {/* Cards */}
      <div className={`cards-container ${layout}`}>
        {artistas.map((artista) => (
          <div className={`card ${layout}`} key={artista.id}>
            {/* Muestra imagen solo si existe, o usa placeholder si se pasa por props */}
            {(artista.image || placeholderImage) && (
              <img
                src={artista.image || placeholderImage}
                alt={artista.nombre}
                className="card-img"
              />
            )}

            {layout === "horizontal" ? (
              <div className="card-content">
                <h3 className="nombreBanda">
                  {artista.nombre} / {artista.ciudad}
                </h3>

                <h4 className="estiloBanda">{artista.instrumento}</h4>
                <p className="descripcionBanda">{artista.descripcion}</p>

                <button onClick={() => setArtistaSeleccionado(artista)}>
                  Ver más
                </button>
              </div>
            ) : (
              <>
                <h3 className="nombreBanda">{artista.nombre}</h3>
                <h4 className="estiloBanda">{artista.instrumento}</h4>
                <p className="descripcionBanda">{artista.descripcion}</p>
                <button onClick={() => setArtistaSeleccionado(artista)}>
                  Ver más
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ==============================
          Ventana Emergente
         ============================== */}
      {artistaSeleccionado && (
        <div
          className="modal-overlay"
          onClick={() => setArtistaSeleccionado(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setArtistaSeleccionado(null)}
            >
              ✖
            </button>

            {(artistaSeleccionado.image || placeholderImage) && (
              <img
                src={artistaSeleccionado.image || placeholderImage}
                alt={artistaSeleccionado.nombre}
                className="modal-img"
              />
            )}

            <h2 className="tituloBanda-card">{artistaSeleccionado.nombre}</h2>
            <h4 className="estiloCiudad-card">
              {artistaSeleccionado.instrumento} / {artistaSeleccionado.ciudad}
            </h4>
            <p className="descripcionBanda-card">
              {artistaSeleccionado.descripcion}
            </p>

            {/* Info extra opcional */}
            <div className="modal-extra">
              <p>
                <strong>Instrumento:</strong> {artistaSeleccionado.instrumento}
              </p>
              <p>
                <strong>Ciudad:</strong> {artistaSeleccionado.ciudad}
              </p>
            </div>

            <button className="contact-btn">Contactar Artista</button>
          </div>
        </div>
      )}
    </section>
  );
}

