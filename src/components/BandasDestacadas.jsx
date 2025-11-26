import React, { useState } from "react";
import "../styles/bandasDestacadas.css";

export default function BandasDestacadas({ 
  bandas = [], 
  titulo = "Bandas Destacadas", 
  layout = "vertical",
  placeholderImage = "https://via.placeholder.com/300x200?text=Sin+Imagen" // Imagen de respaldo
}) {
  const [bandaSeleccionada, setBandaSeleccionada] = useState(null);

  // Función de seguridad: Si la imagen falla, pone el placeholder
  const handleImageError = (e) => {
    e.target.src = placeholderImage;
    e.target.onerror = null;
  };

  return (
    <section className="bandas-destacadas">
      <h2 className="tituloArtistas">{titulo}</h2>

      <div className={`cards-container ${layout}`}>
        {bandas.map((banda) => (
          <div className={`card ${layout}`} key={banda.id}>
            {/* Usamos banda.image o banda.imagenUrl (según venga de la BD) */}
            <img 
              src={banda.image || banda.imagenUrl || placeholderImage} 
              alt={banda.nombre} 
              className="card-img" 
              onError={handleImageError}
            />

            {layout === "horizontal" ? (
              <div className="card-content">
                <h3 className="nombreBanda">
                  {banda.nombre} / {banda.ciudad}
                </h3>
                <h4 className="estiloBanda">{banda.estilo}</h4>
                <p className="descripcionBanda">{banda.descripcion}</p>
                <button onClick={() => setBandaSeleccionada(banda)}>Ver más</button>
              </div>
            ) : (
              <>
                <h3 className="nombreBanda">{banda.nombre}</h3>
                <h4 className="estiloBanda">{banda.estilo}</h4>
                <p className="descripcionBanda">{banda.descripcion}</p>
                <button onClick={() => setBandaSeleccionada(banda)}>Ver más</button>
              </>
            )}
          </div>
        ))}
      </div>

 
      {bandaSeleccionada && (
        <div className="modal-overlay" onClick={() => setBandaSeleccionada(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setBandaSeleccionada(null)}>
              ✖
            </button>
            
            <img 
              src={bandaSeleccionada.image || bandaSeleccionada.imagenUrl || placeholderImage} 
              alt={bandaSeleccionada.nombre} 
              className="modal-img" 
              onError={handleImageError}
            />
            
            <h2 className="tituloBanda-card">{bandaSeleccionada.nombre}</h2>
            <h4 className="estiloCiudad-card">{bandaSeleccionada.estilo} / {bandaSeleccionada.ciudad}</h4>
            <p className="descripcionBanda-card">{bandaSeleccionada.descripcion}</p>

            <div className="modal-extra">
              <p><strong>Integrantes:</strong> {bandaSeleccionada.integrantes || "N/A"}</p>
              <p><strong>Buscando:</strong> {bandaSeleccionada.buscan || "No especificado"}</p>
              <p><strong>Próximo concierto:</strong> {bandaSeleccionada.concierto || "Por confirmar"}</p>
            </div>

            <button className="contact-btn">Contactar Banda</button>
          </div>
        </div>
      )}
    </section>
  );
}