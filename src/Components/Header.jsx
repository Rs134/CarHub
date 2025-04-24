import { Link } from "react-router-dom";

function Header(){
    return(
        <div className="header">
                <h2 className="logo"> CarHub </h2>
            <nav> 
                <ul className="nav-list"> 
                    <li> <Link to="/"> HOME </Link> </li>
                    <li> <Link to="/create"> CREATE </Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;