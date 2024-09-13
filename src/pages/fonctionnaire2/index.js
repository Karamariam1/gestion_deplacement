// src/pages/IndexPage.js
import React from 'react';
import Header from '../../components/fonctionnaire/Header';
import Sidebar from '../../components/fonctionnaire/Sidebar';
import './css/styles.css';

const IndexPage = () => {
   
    return (
        <><Header />
        <div className="main-container">
            <Sidebar />
            <main>
                <section className="welcome-section">
                    <h1>Bienvenue à l'Agence Urbaine de Laayoune</h1>
                    <p>Bienvenue sur l'application de gestion des déplacements et de remboursement des déplacements de l'Agence Urbaine de Laayoune.</p>
                </section>

                <section className="widgets-section">
                    <div className="widget">
                        <h3>Nouvelles Régulations</h3>
                        <p>Découvrez les nouvelles régulations pour les déplacements professionnels.</p>
                    </div>
                    <div className="widget">
                        <h3>Augmentation des Indemnités</h3>
                        <p>Les indemnités de déplacement ont été augmentées de 10% à partir du mois prochain.</p>
                    </div>
                    <div className="widget">
                        <h3>Activités Récentes</h3>
                        <ul>
                            <li>Soumission de la demande de remboursement par Jean Dupont</li>
                            <li>Validation de l'ordre de mission par le manager</li>
                            <li>Notification de nouvelle régulation</li>
                        </ul>
                    </div>
                    <div className="widget">
                        <h3>Tâches en Cours</h3>
                        <ul>
                            <li>Préparer le rapport de mission pour Jean Dupont</li>
                            <li>Soumettre les justificatifs de déplacement</li>
                            <li>Réviser les demandes en attente</li>
                        </ul>
                    </div>
                    <div className="widget">
                        <h3>Notifications</h3>
                        <ul>
                            <li>Nouvelle régulation ajoutée</li>
                            <li>Nouvelle demande de remboursement reçue</li>
                            <li>Ordre de mission en attente de validation</li>
                        </ul>
                    </div>
                    <div className="widget">
                        <h3>Métriques Clés</h3>
                        <ul>
                            <li>Nombre total de missions: 45</li>
                            <li>Remboursements en cours: 5</li>
                            <li>Remboursements approuvés: 40</li>
                        </ul>
                    </div>
                </section>
            </main>
        </div></>
    
        
    );
};

export default IndexPage;
