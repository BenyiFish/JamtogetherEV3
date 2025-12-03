import React, { useState } from "react";
import "../styles/artistasDestacados.css";

export default function ArtistasDestacados({
  artistas = [], 
  titulo = "Artistas Destacados", 
  layout = "vertical", 
  placeholderImage = "https://via.placeholder.com/300x200?text=Sin+Imagen"
}) {
  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);

  const handleImageError = (e) => {
    e.target.onerror = null; // evita bucles infinitos
    e.target.src = placeholderImage;
  };
  // Si la lista está vacía, mostramos un mensaje claro en pantalla.
  if (!artistas || artistas.length === 0) {
    return (
      <section className="bandas-destacadas">
        <h2 className="tituloArtistas">{titulo}</h2>
        <div style={{ textAlign: 'center', padding: '40px', color: 'white', border: '2px dashed red' }}>
          <h3>⚠️ La lista de artistas está vacía</h3>
          <p>El componente se renderizó, pero no recibió datos.</p>
          <p>Revisa la consola (F12) para ver si hubo error de conexión.</p>
        </div>
      </section>
    );
  }



  return (
    <section className="bandas-destacadas">
      <h2 className="tituloArtistas">{titulo}</h2>

      <div className={`cards-container ${layout}`}>
        {artistas.map((artista) => (
          <div className={`card ${layout}`} key={artista.id}>
            
         
            <img
              src={artista.image || placeholderImage} 
              alt={artista.nombre}
              className="card-img"
              onError={(e) => handleImageError(e, artista.nombre)}
            />
            
        

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

  
      {artistaSeleccionado && (
        <div className="modal-overlay" onClick={() => setArtistaSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setArtistaSeleccionado(null)}>✖</button>

            <img
              src={artistaSeleccionado.image || placeholderImage}
              alt={artistaSeleccionado.nombre}
              className="modal-img"
            />

            <h2 className="tituloBanda-card">{artistaSeleccionado.nombre}</h2>
            <h4 className="estiloCiudad-card">
              {artistaSeleccionado.instrumento} / {artistaSeleccionado.ciudad}
            </h4>
            <p className="descripcionBanda-card">
              {artistaSeleccionado.descripcion}
            </p>

            <div className="modal-extra">
              <p><strong>Instrumento:</strong> {artistaSeleccionado.instrumento}</p>
              <p><strong>Ciudad:</strong> {artistaSeleccionado.ciudad}</p>
            </div>

            <button className="contact-btn">Contactar Artista</button>
          </div>
        </div>
      )}
    </section>
  );
}