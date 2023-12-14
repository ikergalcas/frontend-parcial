import NavbarPage from "../navbar/navbar.js";
import CompLogin from "../login/Login.js";

function paginaLogin() {
    return(
        <div>
            <div className="container mt-5" style={{textAlign : "center"}}>
                <div className="row">
                    <div className="col">
                        <h1>Inicio de sesion</h1>
                        <div className ='mt-5' style = {{marginLeft : '41%'}}>
                            <CompLogin></CompLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default paginaLogin