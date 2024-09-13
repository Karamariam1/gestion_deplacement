import React from 'react';

function Sidebar() {
    return (
        <nav id="sidenav" className="side-nav">
            <h2>Navigation</h2>
            <a href="/manager_home">Accueil</a>
            <a href="/manager_choixdemande">Gérer les Demandes</a>
            <a href="/manager_users">Gérer les Utilisateurs</a>
            <a href="/manager_history">Historique des Actions</a>
            <a href="/manager_profil">Profil</a>
        </nav>
    );
}

export default Sidebar;
