import { useContext } from "react";
import "./NavLinks.css";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
    const auth = useContext(AuthContext);
    const { isLoggedIn,logout } = useContext(AuthContext);
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    ALL USERS
                </NavLink>
            </li>
            {isLoggedIn &&
                <li>
                    <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
                </li>}
            {isLoggedIn &&
                <li>
                    <NavLink to="/places/new">NEW PLACE</NavLink>
                </li>
            }
            {!isLoggedIn &&
                <li>
                    <NavLink to="/auth">AUTHENTICATE</NavLink>
                </li>
            }

            {isLoggedIn && 
                <li>
                    <button onClick={logout}>LOGOUT</button>
                </li>
            }

        </ul>
    );
};

export default NavLinks;
