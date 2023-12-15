import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CompLogin = () => {
    const navigate = useNavigate()

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect (() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '249081549551-2m7g5cc6fo0vigcp6tk7u76gn43gpqab.apps.googleusercontent.com',
            callback: handleCallBackResponse
        });

        /* global google */
        google.accounts.id.renderButton(
            document.getElementById("singInDiv"), {
                'scope': 'profile email',
                'width': 240,
                'height': 70,
                'longtitle': true,
                'theme': 'dark' 
            }

        );
        
    }, []);

    function handleCallBackResponse (response){
        console.log("Encode JWT: "+  response.credential)
        fetch(`https://backend-parcial-ikergalcas-projects.vercel.app/entidades/loginToken/${response.credential}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
          .then(data => {
                // Actualizar el estado con los productos obtenidos
                if (data){
                    data.tokenCompleto= response.credential
                    localStorage.setItem('objetoToken', JSON.stringify(data));
                    window.location.href="/entidades"
                    //console.log(JSON.parse(localStorage.getItem('objetoToken')))
                }
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

    function handleSingOut (e) {
        google.accounts.id.signOut().then(function () {
            console.log('User signed out.');
            });
    }


    return (  
        <div id='singInDiv'></div>
    )
}

export default CompLogin 