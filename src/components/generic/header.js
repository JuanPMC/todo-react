import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";


function Header() {
    const context = useAuth()
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="navbar-brand ms-2 fs-2 fw-bold text-black" >JuanTodo</div>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                            {context.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/pepe">Home</Link></li>}
                            {context.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/list">Todos</Link></li>}
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            {context.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" onClick={() => context.logout()} to="/logout">Logout</Link></li>}
                            {!context.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )
}

export default Header;
