import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import logo from '../logo.svg'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

function NavbarPage(props) {
  const [nombreUsuario,setNombreUsuario]=useState('')
  const [foto,setFoto]=useState('')

  useEffect(() => {
    if(localStorage.getItem('objetoToken')!=undefined){
      comprobarConexion()
      setNombreUsuario(JSON.parse(localStorage.getItem('objetoToken')).correo)
      setFoto(JSON.parse(localStorage.getItem('objetoToken')).foto)
    } else {
      setNombreUsuario("Invitado")
      setFoto('http://res.cloudinary.com/dsvcyziih/image/upload/v1702631668/ecoaffylh8jxxumqbhki.webp')
    }
}, []);


const comprobarConexion = async () => {
  // console.log(JSON.parse(localStorage.getItem('objetoToken')).tokenId)
  fetch(`https://backend-parcial-ikergalcas-projects.vercel.app/conexion/${JSON.parse(localStorage.getItem('objetoToken')).tokenId}/${JSON.parse(localStorage.getItem('objetoToken')).tokenCompleto}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.text())
      .then(data => {
            console.log(data)
            if(data=="expired" || data=="invalid token"){
              localStorage.clear()
              alert("Tu sesion ha expirado")
              window.location.href = '/login'
            }
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
}

function cerrarSesion () {
  console.log("en Cerrar sesion")
  localStorage.clear();
      // Redirige a /login
  window.location.href = '/login';
}
    return (
      <Navbar expand="lg" className="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
        <Nav className="me-auto">
          <Nav.Link href={`/inicio`} className='navbar-link' style={{marginLeft: '10vmin'}}> Home
          </Nav.Link>
          {localStorage.getItem('objetoToken') != undefined ?
          <Nav.Link href={`/crearEvento`} className='navbar-link' style={{marginLeft: '10vmin'}}> Crear evento
          </Nav.Link> :
          <br></br>
          }
        </Nav>
        <NavItem>{(nombreUsuario!='')? (nombreUsuario) : "Hola" }</NavItem>
        <Nav>
            <NavDropdown drop='start' className='me-3' title={<img src={foto} style={{ width: '6vh', borderRadius: '50%' }} alt="" />} id="basic-nav-dropdown">
            <NavDropdown.Item href="/" onClick={cerrarSesion}>Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
  }

  export default NavbarPage;