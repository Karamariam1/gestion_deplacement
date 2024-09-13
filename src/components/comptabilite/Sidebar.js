import React from 'react';

function Sidebar() {
    return (
        <aside class="sidebar">
        <nav>
            <ul>
                <ul>
                    <li><a href="/compta_service">Accueil</a></li>
                    <li><a href="/compta_m1">Traiter les demandes</a></li>
                    <li><a href="/compta_statistiques">Visualiser les statistiques</a></li>
                    <li><a href="/compta_profil">Profil</a></li>
                </ul>
            </ul>
        </nav>
    </aside>
    );
}

export default Sidebar;
