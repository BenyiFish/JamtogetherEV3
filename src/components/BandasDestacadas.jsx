import React, { useState } from "react";
import "../styles/bandasDestacadas.css";



export default function BandasDestacadas({ bandas, titulo = "Bandas Destacadas", layout = "vertical" }) {
  const [bandaSeleccionada, setBandaSeleccionada] = useState(null); // nueva variable para el modal

  return (
    <section className="bandas-destacadas">
      <h2 className="tituloArtistas">{titulo}</h2>

      {/* Cards */}
      <div className={`cards-container ${layout}`}>
        {bandas.map((banda) => (
          <div className={`card ${layout}`} key={banda.id}>
            <img src={banda.image} alt={banda.nombre} className="card-img" />

            {layout === "horizontal" ? (
              <div className="card-content">
                <h3 className="nombreBanda">
                  {banda.nombre} / {banda.ciudad}
                </h3>
                <h4 className="estiloBanda">{banda.estilo}</h4>
                <p className="descripcionBanda">{banda.descripcion}</p>
                {/* Al hacer clic se abre el modal */}
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

      {/* ==============================
          Ventana Emergente
         ============================== */}
      {bandaSeleccionada && (
        <div className="modal-overlay" onClick={() => setBandaSeleccionada(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setBandaSeleccionada(null)}>
              ✖
            </button>
            <img src={bandaSeleccionada.image} alt={bandaSeleccionada.nombre} className="modal-img" />
            <h2 className="tituloBanda-card">{bandaSeleccionada.nombre}</h2>
            <h4 className="estiloCiudad-card">{bandaSeleccionada.estilo} / {bandaSeleccionada.ciudad}</h4>
            <p className="descripcionBanda-card">{bandaSeleccionada.descripcion}</p>

            {/* Info extra  */}
            <div className="modal-extra">
              <p><strong>Integrantes:</strong> 4</p>
              <p><strong>Buscando:</strong> Guitarrista</p>
              <p><strong>Próximo concierto:</strong> 12 de noviembre - Santiago</p>
            </div>

            <button className="contact-btn">Contactar Banda</button>
          </div>
        </div>
      )}
    </section>
  );
}


