// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => {
    
    return (
        <nav className="side-nav">
          <a href="/ordremission">Nouvelle Mission</a>
            <a href="/remboursement">Demande de Remboursement</a>
            <a href="/historique_choix">Voir Historique</a>
        </nav>
    );
};

export default Sidebar;
