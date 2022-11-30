import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () =>{
    return(
        <div className="navbar">
            <ul className="nav-list">
                <label className="title">Proof of Luck</label>
                <Link to="/" className="nav-list-item">Home</Link>
                <Link to="/register" className="nav-list-item">Register</Link>
                <Link to="/mine" className="nav-list-item">Mine</Link>
                <Link to="/chain" className="nav-list-item">Chain</Link>
                <Link to="/miners" className="nav-list-item">Miners</Link>
            </ul>
        </div>
    );
}
export default Navbar;