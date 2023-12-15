import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CompFoto = () => {

    const {idEntidad} = useParams()

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
                        fetch(`https://backend-parcial-ikergalcas-projects.vercel.app/entidades/${idEntidad}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: raw
                        }).then(response => response.text())
                        .then(result => {
                            console.log(result)
                            window.location.href = `/foto`;
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
        <div className='container-fluid m-5'>
            <div className='row' style={{width : "20%"}}>
                <div className='col'>
                    <img src={entidad.foto} alt="" className="card-img-top img-fluid" />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                <form id="formularioParte2" onSubmit={subirFotoIdentificativa}>
                    <div style={{width:'20%'}} >
                        <input type="file" className="form-control mt-2" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg"/>
                        <button className="btn btn-secondary mt-2" type="submit" >Cambiar foto</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CompFoto