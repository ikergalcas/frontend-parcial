import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom"

import CompLogin from './pages/paginaLogin.jsx';
import CompInicial from './pages/paginaInicial.jsx';
import CompCrearEvento from "./eventos/CrearEvento.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompLogin/>}/>
        <Route path="/login" element={<CompLogin/>}/>
        <Route path="/inicio" element={<CompInicial/>}/>
        <Route path="/crearEvento" element={<CompCrearEvento/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;