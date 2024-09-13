// OrdreMissionPage.js
import React from 'react';
import Header from '../../components/fonctionnaire/Header';
import Sidebar from '../../components/fonctionnaire/Sidebar';
import './css/styles.css';
import deplacement_icon from '../../assets/img/deplacement_icon.png';
import remboursement_icon from '../../assets/img/remboursement_icon.png';

function historique_choix() {
    return (
        <>
    <Header />
    <div className="main-container">
            <Sidebar />

        <main>
            <section className="historique-choix-section">
                <h1>Choix de l'Historique</h1>
                <p>Sélectionnez l'historique que vous souhaitez consulter.</p>
                <div className="historique-options">
                    <a href="/historique_deplacement" className="historique-button">
                        <img src={deplacement_icon} alt="Déplacements"></img>
                        <div>
                            <h2>Historique des Déplacements</h2>
                            <p>Consultez l'historique de vos déplacements et missions effectuées.</p>
                        </div>
                    </a>
                    <a href="/historique_remboursement" className="historique-button">
                        <img src={remboursement_icon} alt="Remboursements" />
                        <div>
                            <h2>Historique des Remboursements</h2>
                            <p>Consultez l'historique de vos demandes de remboursement.</p>
                        </div>
                    </a>
                </div>
            </section>
        </main>
    </div>
        </>
    );
}

export default historique_choix;
