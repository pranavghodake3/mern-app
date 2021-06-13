import './Welcome.css';
import {Link} from 'react-router-dom';

const Welcome = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarExample01"
                    aria-controls="navbarExample01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarExample01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">About</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            <div
                className="p-5 text-center bg-image">
                <div className="mask">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="text-white">
                    <h1 className="mb-3">Welcome to my twitter</h1>
                    <h4 className="mb-3">By Pranav Ghodake</h4>
                    <a className="btn btn-outline-light btn-lg" href="#!" role="button"
                        ></a
                    >
                    </div>
                </div>
                </div>
            </div>
        </header>
    )
}

export default Welcome;