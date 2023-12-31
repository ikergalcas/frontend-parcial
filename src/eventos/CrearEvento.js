import React, { useState, useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';
import NavbarPage from "../navbar/navbar.js";

const CompCrearEvento = () => {

    const [idEvento,setEvento]=useState('')
    const [nombre,setNombre]=useState('')
    const [timestamp,setTimestamp]=useState('')
    const [lugar,setLugar]=useState('')
    const [lat,setLat]=useState('')
    const [lon,setLon]=useState('')

    const mostrarParte2 = async(e) => {
        e.preventDefault()

        var raw = JSON.stringify({
            "timestamp": timestamp,
            "nombre": nombre,
            "lugar": lugar,
            "organizador": JSON.parse(localStorage.getItem('objetoToken')).correo
        });

        // Crear evento
        fetch('https://backend-parcial-ikergalcas-projects.vercel.app/eventos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.text())
            .then(result => {
                console.log(result)
                setEvento(result)
            })
            .catch(error => {
                console.error('Error al crear evento:', error);
            });

        

        document.getElementById('parte1').style.display = 'none';
        document.getElementById('parte2').style.display = 'block';
    }

    const subirFotoIdentificativa = async(e) => {
        e.preventDefault()
        const input = document.getElementById('archivo');
        const archivos = input.files;
        if (archivos.length>0){    
            const archivo = archivos[0];
            
            var formdata = new FormData();
            formdata.append("foto", archivo);
    
            fetch('https://backend-parcial-ikergalcas-projects.vercel.app/eventos/subirFoto', {
                    method: 'POST',
                    body : formdata
                }).then(response => response.json())
                    .then(result =>{
                        var raw = JSON.stringify({
                            "imagen" : result.imageUrl
                        });
                        console.log(result.imageUrl)
                        fetch(`https://backend-parcial-ikergalcas-projects.vercel.app/eventos/${idEvento.replace(/"/g, '')}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: raw
                        }).then(response => response.text())
                        .then(result => {
                            console.log(result)
                            console.log(idEvento)
                            window.location.href = `/inicio`;
                        })
                            .catch(error => {
                                console.error('Error al subir la imagen:', error);
                            });
                            })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });

            // Obtener lat y lon a partir de lugar
            fetch(`https://backend-parcial-ikergalcas-projects.vercel.app/eventos/ubicacion/${idEvento.replace(/"/g, '')}`)
            .then(response => response.json())
            .then(data => {
                if (data.latitude && data.longitude) {
                    // Actualizar coordenadas evento
                    var raw = JSON.stringify({
                        "lat": data.lat,
                        "lon": data.lon
                    });
                    fetch(`https://backend-parcial-ikergalcas-projects.vercel.app/eventos/${idEvento.replace(/"/g, '')}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: raw
                    }).then(response => response.json())
                        .then(result => {
                        })
                        .catch(error => {
                            console.error('Error al actualizar evento:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error al obtener coordenadas:', error);
            });
            }    
    }

return(
    <div>
        <NavbarPage></NavbarPage>
        <div className='container1'>
            <div id="parte1" className="formularioCrear">
                <h2>Información sobre el evento</h2>
                <form id="formularioParte1" onSubmit={mostrarParte2}>
                    <a>Nombre del evento:</a><br/>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} 
                    type="text" id="nombre" className="form-control" required/>
                    <br/>

                    <a>Fecha:</a><br/>
                    <input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} 
                    type="date" id="timestamp" className="form-control" required/>
                    <br/>

                    <a>Lugar:</a><br/>
                    <input value={lugar} onChange={(e) => setLugar(e.target.value)} 
                    type="text" id="precio" className="form-control" required/>
                    <br/>

                    <button className=" btn btn-secondary " type="submit" >Continuar</button>
                </form>
            </div>

            <div id="parte2" className="formularioCrear" style={{display: 'none'}}>
                <h2>Selecciona una foto para representar tu evento</h2>
                <form id="formularioParte2" onSubmit={subirFotoIdentificativa}>
                    <div style={{flexdirection: 'row'}} >
                        <a>Añade una foto:</a><br/> <br/>
                        <input type="file" className="form-control" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg"/>
                        <button className="btn btn-secondary" type="submit">Crear evento</button>
                    </div>
                </form>
            </div>        
        </div>
    </div>
    )
}

export default CompCrearEvento;