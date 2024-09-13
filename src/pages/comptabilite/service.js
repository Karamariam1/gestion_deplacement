import React, { useEffect, useState } from 'react';
import './css/styles.css';
import Header from '../../components/comptabilite/Header';
import Sidebar from '../../components/comptabilite/Sidebar';


const choixdemande = () => {
    
    return (
        <>
            <Header />

            <div className="main-container">
                <Sidebar />

             
        <main class="content">
            
            <section class="stats-section">
                <div class="stat">
                    <h3>Demandes en Attente</h3>
                    <p>10</p>
                </div>
                <div class="stat">
                    <h3>Demandes Approuvées</h3>
                    <p>25</p>
                </div>
                <div class="stat">
                    <h3>Total Remboursé</h3>
                    <p>50,000 DH</p>
                </div>
            </section>
            <div class="dashboard">
              
                <div class="card">
                    <h2>les demandes a traiter</h2>
                    <p>Gérer les demandes de remboursement des ordres de mission approuvées.</p>
                    <button onclick="location.href='/compta_m1'">Accéder</button>
                </div>
                <div class="card">
                    <h2>Visualiser les statistiques</h2>
                    <p>Voir les statistiques des demandes de remboursement.</p>
                    <button onclick="location.href='/compta_statistiques'">Accéder</button>
                </div>
               
            </div>
        </main>
            </div>

            
        </>
    );
};

export default choixdemande;
