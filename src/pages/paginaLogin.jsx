import NavbarPage from "../navbar/navbar.js";
import CompLogin from "../login/Login.js";

function paginaLogin() {
    const entraInvitado = (e) => {
        localStorage.clear();
        window.location.href="/inicio"
    }

    return(
        <div>
            <div className="container mt-5" style={{textAlign : "center"}}>
                <div className="row">
                    <div className="col">
                        <h1>Inicio de sesion</h1>
                        <div className ='mt-5' style = {{marginLeft : '41%'}}>
                            <CompLogin></CompLogin>
                        </div>
                        <a onClick={entraInvitado} className='btn btn-secondary mt-3'>Entrar como invitado</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default paginaLogin