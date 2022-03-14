import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Header.css';
import Nav from './Nav';

const Header = ({setAuth, isAuthenticated}) => {
    const currentPath = useLocation().pathname;

    return (
        <header className="header">
			<h1 className="page-header-heading"><Link to={
                isAuthenticated && 
                (currentPath != '/' && 
                    currentPath != '/about') ? "/admin":"/"}>Simple blog</Link></h1>
            <Nav isAuthenticated={isAuthenticated} setAuth={setAuth} />
        </header>
    );
}

export default Header;
