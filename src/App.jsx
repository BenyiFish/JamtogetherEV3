import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BuscarBandas from "./pages/BuscarBandas";
import BuscarArtistas from "./pages/BuscarArtistas";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProteccionRuta"; 
import ProteccionRuta from "./components/ProteccionRuta";

function App() {
  return (
    <BrowserRouter>

      <Routes> 
        <Route path="/" element={<Home/>} />
        <Route path="/buscar-bandas" element={<BuscarBandas/>} />
        <Route path="/buscar-artistas" element={<BuscarArtistas />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />


        <Route element={<ProteccionRuta soloAdmin={true} />}>
           <Route path="/admin" element={<Admin />} />
        </Route>
      
      </Routes> 

    </BrowserRouter>
  );
}

export default App;