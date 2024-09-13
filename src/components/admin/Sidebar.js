import React from 'react';

function Sidebar() {
    return (
        <nav id="sidenav" className="side-nav">
            <h2>Navigation</h2>
            <a href="/admin_home">Accueil</a>
            <a href="/manage_users">Gérer les Utilisateurs</a>
            <a href="/manage_requests">Gérer les Demandes</a>
            <a href="/stats">Statistiques et Rapports</a>
            <a href="/profile">Profil</a>
            
        </nav>
    );
}

export default Sidebar;
