//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import NavbarPage from "../navbar/navbar.js";


const CompMapa = () => {

    const [position, setPosition] = useState([0, 0])
    const [paradas, setParadas] = useState()
    const [mostrarParadas, setMostrarParadas] = useState(false)
    const [ubicacionCargada, setUbicacionCargada] = useState(false);
    const [linea, setLinea] = useState()
    const [sentido, setSentido] = useState()

    const buscarLineaSentido = (e) => {
        e.preventDefault(); // Evita la recarga de la página al enviar el formulario
        var raw = JSON.stringify({
            "linea": linea,
            "sentido": sentido,
        })
        fetch('https://backend-parcial-ikergalcas-projects.vercel.app/paradas/linea/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
        .then(data => {
            setParadas(data)
            setMostrarParadas(true)
            console.log(data);
        })
    }

    const [nombreParada, setNombreParada] = useState()
    const buscarNombre = (e) => {
        e.preventDefault()
        var raw = JSON.stringify({
            "nombre": nombreParada
        })
        fetch('https://backend-parcial-ikergalcas-projects.vercel.app/paradas/nombre/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
        .then(data => {
            setParadas(data)
            setMostrarParadas(true)
        })
    }

    const [direccion, setDireccion] = useState()
    const buscarCercanas = (e) => {
        e.preventDefault()
        var raw = JSON.stringify({
            "direccion": direccion
        })
        fetch('https://backend-parcial-ikergalcas-projects.vercel.app/paradas/cercanas/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
        .then(data => {
            setParadas(data)
            setMostrarParadas(true)
        })
    }

    const limpiar = () => {
        setDireccion('')
        setLinea()
        setMostrarParadas(false)
        setParadas([])
        setSentido()
        setNombreParada('')
        mostrarMapa()
    }

    const mostrarMapa = () => {
        if(!ubicacionCargada) {
            fetch('https://backend-parcial-ikergalcas-projects.vercel.app/paradas/ubicacion/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => response.json())
                .then(data => {
                    setPosition([data.lat, data.lon])
                    setUbicacionCargada(true)
            })
        }
    }

    useEffect(() => {
        mostrarMapa()
    }, [])  // Con el [] hago que solo se haga un useEffect

    return (
        <div className="container">
            <div className="row">
                <div className="col 2">
                    <h2>Vista Principal</h2>
                    <div className='formulario'>
                        <h2>Seleccionar linea y sentido</h2>
                        <form className='form' onSubmit={buscarLineaSentido}>
                            <a>Linea</a>
                            <input value={linea} onChange={(e) => setLinea(e.target.value)}
                                className='form-control' required type='number' />
                            <br/>

                            <a>Sentido</a>
                            <input value={sentido} onChange={(e) => setSentido(e.target.value)}
                                className='form-control' required type='number' />
                            <br/>

                            <button className='btn btn-primary' type='submit'>Buscar</button>
                        </form>
                        <form className='form mt-2' onSubmit={limpiar}>
                            <button className='btn btn-secondary'>Limpiar</button>
                        </form>
                    </div>
                </div>
                <div className='col 9'>
                    {position[0] !== 0 && position[1] !== 0 && (
                    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                            OpenStreetMap</a> contributors'
                        />
                        {!mostrarParadas && (
                        <Marker position={position}>
                            <Popup>Marcador</Popup>
                        </Marker>
                        )}
                        
                        {paradas && paradas.map((parada, index) => (
                                <Marker
                                    key={index}
                                    position={[parada.lat, parada.lon]}
                                >
                                    <Popup>{`Parada ${parada.nombreParada}`}</Popup>
                                </Marker>
                            ))}
                    </MapContainer>)}
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className='formulario'>
                        <h2>Buscar parada por nombre</h2>
                        <form className='form' onSubmit={buscarNombre}>
                            <a>Nombre</a>
                            <input value={nombreParada} onChange={(e) => setNombreParada(e.target.value)}
                                className='form-control' required type='text' />
                            <br/>

                            <button className='btn btn-primary' type='submit'>Buscar</button>
                        </form>
                    </div>
                </div>
                <div className='col'>
                    <div className='formulario'>
                        <h2>Buscar paradas cercanas a una direccion</h2>
                        <form className='form' onSubmit={buscarCercanas}>
                            <a>Direccion</a>
                            <input value={direccion} onChange={(e) => setDireccion(e.target.value)}
                                className='form-control' required type='text' />
                            <br/>
                            <button className='btn btn-primary' type='submit'>Buscar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompMapa