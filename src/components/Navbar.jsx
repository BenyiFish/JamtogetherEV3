import { NavLink } from "react-router-dom";
import logo from "../assets/homeIMG/logo.png";
import "../styles/navbar.css";
import React from "react";


export default function Navbar() {
  const goTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  return (
    <header className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>JamTogether</h2>
      </div>

      <nav className="nav-center">
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={goTop}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/buscar-bandas"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={goTop}
            >
              Explorar Bandas
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/buscar-artistas"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={goTop}
            >
              Explorar Artistas
            </NavLink>
          </li>
        </ul>
      </nav>

      <a className="cta" href="#">
        <button>Contacto</button>
      </a>
    </header>
  );
}
