import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavbarPage from "../navbar/navbar.js";
import VerEventos from "../eventos/VerEventos.js";

const PaginaInicial = () => {
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid" style={{marginLeft: '9.5vmin'}}>
                <div className="row">
                    <div className="col">
                        {localStorage.getItem('objetoToken') != undefined ? 
                        <h2> Bienvenido {JSON.parse(localStorage.getItem('objetoToken')).correo}</h2> :
                        <h2> Bienvenido invitado</h2>
                        }
                        <VerEventos></VerEventos>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaInicial