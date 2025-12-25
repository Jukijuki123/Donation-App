import { Link } from "react-router-dom";

export default function Navbar() {
    const isAdmin = localStorage.getItem("admin");

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">
            Donation App
            </Link>

            <div className="d-flex ms-auto align-items-center">
            <Link className="nav-link" to="/donation/create">
                Post Donation
            </Link>

            {!isAdmin && (
                <Link className="nav-link" to="/login">
                Login
                </Link>
            )}

            {isAdmin && (
                <span className="nav-link fw-bold">Admin</span>
            )}
            </div>
        </div>
        </nav>
    );
}
