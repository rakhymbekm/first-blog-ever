import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Nav.css';

const Nav = ({setAuth, isAuthenticated}) => {
    const currentPath = useLocation().pathname;

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
        // window.location.href = "http://localhost:3001/signin"; // уақытша шешім
    }

    return (
        <nav className="nav header-nav">
            <ul className="nav-list header-nav-list">
                <li className={"nav-list-item header-nav-list-item" + (currentPath == '/' || currentPath == '/admin' ? " active" : "")}>
                    <Link 
                        className={"nav-link header-nav-link" + (currentPath == '/' || currentPath == '/admin' ? " active" : "")} 
                        to={isAuthenticated && (currentPath != '/' && currentPath != '/about') ? "/admin" : "/"}>Басты бет</Link>
                </li>
                <li className={"nav-list-item header-nav-list-item" + (currentPath == '/about' || currentPath == '/new' ? " active" : "")}>
                    <Link 
                        className={"nav-link header-nav-link" + (currentPath == '/about' || currentPath == '/new' ? " active" : "")} 
                        to={isAuthenticated && (currentPath != '/' && currentPath != '/about') ? "/new" : "/about"}>
                            {isAuthenticated && (currentPath != '/' && currentPath != '/about') ? "Жаңа пост" : "Блог туралы"}</Link>
                </li>
                {
                    isAuthenticated && (currentPath != '/' && currentPath != '/about')  ?
                        <li className="nav-list-item header-nav-list-item">
                            <button 
                                onClick={logout} 
                                className="btn header-btn log-out-btn">Шығу</button>
                        </li> : null
                }
            </ul>
        </nav>
    );
}

export default Nav;