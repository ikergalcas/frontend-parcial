import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavbarPage from "../navbar/navbar.js";
import CompFoto from "../componentes/foto.js"

const PaginaInicial = () => {

    const idEntidad = '657af6484dc899502be2832a'

    const [entidad, setEntidad] = useState([]); 
    useEffect( () => {getEntidad()}, []);

    const getEntidad = async () => {
        fetch(`https://backend-parcial-ikergalcas-projects.vercel.app/entidades/${idEntidad}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setEntidad(data);
            console.log("usuario encontrado")
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        })
    }
    
    const subirFotoIdentificativa = async(e) => {
        e.preventDefault()
        const input = document.getElementById('archivo');
        const archivos = input.files;
        if (archivos.length>0){    
            const archivo = archivos[0];
            
            var formdata = new FormData();
            formdata.append("foto", archivo);
    
            fetch('https://backend-parcial-ikergalcas-projects.vercel.app/entidades/subirFoto', {
                    method: 'POST',
                    body : formdata
                }).then(response => response.json())
                    .then(result =>{
                        var raw = JSON.stringify({
                            "foto" : result.imageUrl
                          });
                        console.log(result.imageUrl)
                        fetch(`https://backend-parcial-ikergalcas-projects.vercel.app/${idEntidad}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: raw
                        }).then(response => response.text())
                        .then(result => {
                            console.log(result)
                            window.location.href = `/entidades/`;
                        })
                            .catch(error => {
                                console.error('Error al subir la imagen:', error);
                            });
                            })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });
        }else{
            alert("Selecciona una foto");   
            console.error('No se seleccionó ningún archivo.');
        }
        
    }

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h2> Esta es nuestra pagina inicial</h2>
                        <CompFoto></CompFoto>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaInicial