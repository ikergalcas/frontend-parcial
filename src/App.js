import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom"

import CompLogin from './pages/paginaLogin.jsx';
import CompInicial from './pages/paginaInicial.jsx';
import CompMapa from "./Componentes/mapa.js"
import CompFoto from "./Componentes/foto.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompLogin/>}/>
        <Route path="/login" element={<CompLogin/>}/>
        <Route path="/inicio" element={<CompInicial/>}/>
        <Route path="/mapa" element={<CompMapa/>}/>
        <Route path="/foto/:idEntidad" element={<CompFoto/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;