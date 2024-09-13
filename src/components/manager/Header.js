import React from 'react';
import logo0 from '../../assets/img/logo0.png'; // Adjust the path based on your project structure
import user0 from '../../assets/img/image.png'; 

function Header() {
    return (
        <header id="navbar">
            <div className="brand0">
                <img src={logo0} alt="logo" />
            </div>
            <nav className="top-nav">
                <a href="/manager_home">Accueil</a>
                <a href="/">Log Out</a>
                <div className="user-info">
                    <a href="/profilmng">
                        <img src={user0} alt="Photo de Profil" />
                    </a>
                    <span>Jean Dupont</span>
                </div>
            </nav>
        </header>
    );
}

export default Header;
