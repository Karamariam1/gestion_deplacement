import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import './css/choix.css';
import Header from '../../components/manager/Header';
import Sidebar from '../../components/manager/Sidebar';
import userimg from '../../assets/img/image.png';

const choixdemande = () => {
    
    return (
        <>
            <Header />

            <div className="main-container">
                <Sidebar />

                <main>
                <section class="historique-choix-section">
                <h1>Choix de l'Historique</h1>
                <p>Sélectionnez l'historique que vous souhaitez consulter.</p>
                <div class="historique-options">
                    <a href="manager_requests" class="historique-button">
                        <img src={userimg} alt="Déplacements" />
                        <div>
                            <h2>Déplacements Réels</h2>
                            <p>Consultez les déplacements réels.</p>
                        </div>
                    </a>
                    <a href="/manager_1" class="historique-button">
                        <img src={userimg} alt="Remboursements" />
                        <div>
                            <h2>Déplacements Forfaitaires</h2>
                            <p>Consultez les déplacements forfaitaires. </p>
                        </div>
                    </a>
                </div>
            </section>
                </main>
            </div>

            
        </>
    );
};

export default choixdemande;
