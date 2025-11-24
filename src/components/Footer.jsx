import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="containerFooter">
        <div className="footer-row">

          <div className="footer-links">
            <h4>Nosotros</h4>
            <ul>
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Política de privacidad</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contacto</h4>
            <ul>
              <li><a href="#">Mail: jamTogether@gmail.com</a></li>
              <li><a href="#">Teléfono: 123-456-7890</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Política de privacidad</h4>
            <ul>
              <li><a href="#">Política de privacidad</a></li>
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Política de cookies</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Redes Sociales</h4>
            <div className="social-link">
              <a href="#">FB</a>
              <a href="#">IG</a>
              <a href="#">TW</a>
              <a href="#">LN</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
