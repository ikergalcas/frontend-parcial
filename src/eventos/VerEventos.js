import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'

const VerEventos = () => {

    const [eventos, setEventos] = useState([]);
    useEffect(() => {
        getEventos()
    }, []);

    const getEventos = async () => {
        // Hacer la solicitud para obtener eventos desde el backend
        fetch('http://localhost:4000/eventos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
          .then(data => {
                // Actualizar el estado con los eventos obtenidos
                setEventos(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener eventos:', error);
            });
    }

    const borrarEvento = async (idEvento) => {
        // Hacer la solicitud para obtener eventos desde el backend
        fetch(`http://localhost:4000/eventos/${idEvento}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
          .then(data => {
                console.log(data);
                window.location.href="/inicio"
            })
            .catch(error => {
                console.error('Error al borrar evento:', error);
            });
    }

return(
    <div>
        <div className="row">  
            {eventos.length==0 ? (
                <p> No hay eventos que cumplan con los criterios de búsqueda.</p> 
            ) : eventos.map(evento => (
                <div class="card col-md-5 m-3" >
                    <div className="card-body">
                        <img className="card-img-top" src={evento.imagen} alt={evento.titulo} style={{ objectFit: 'contain', height: '25vmin'}} />
                        <h5 className="card-title">{evento.nombre}</h5>
                        <p className="card-text">{evento.timestamp}</p>
                        <p className="card-text">{evento.lugar}</p>
                        <a href={``} className='btn btn-secondary'>Ver mas informacion</a>
                        { (JSON.parse(localStorage.getItem('objetoToken')) != undefined) ?
                        <div>
                            {(evento.organizador == JSON.parse(localStorage.getItem('objetoToken')).correo) ?
                            <div className='mt-2'>
                                <a href={``} className='btn btn-secondary'>Editar</a> 
                                <button className='btn btn-danger ms-1'>Borrar</button>
                            </div> :
                            <br></br>
                        }
                        </div>:
                        <br></br>
                        }
                        
                    </div>
                </div>
            ))}
        </div>
    </div>


    )
}

export default VerEventos