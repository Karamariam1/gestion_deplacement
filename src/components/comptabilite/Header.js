import React from 'react';
import logo from '../../assets/img/logo0.png'; // Adjust the path based on your project structure
import user from '../../assets/img/image.png'; 

function Header() {
    return (
        <header id="navbar" className="navbar">
            <div className="">
                <img src={logo} alt="logo" />
            </div>
            <nav className="top-nav">
                <a href="/compta_service">Accueil</a>
                <a href="/">Log Out</a>
                <div className="user-info">
                    <a href="/compta_profil">
                        <img src={user} alt="Photo de Profil" />
                    </a>
                    <span>Jean Dupont</span>
                </div>
            </nav>
        </header>
    );
}

export default Header;
