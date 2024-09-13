import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import './css/stats.css'; // Import your CSS file
import Header from '../../components/comptabilite/Header';
import Sidebar from '../../components/comptabilite/Sidebar';

const Statistiques = () => {
    const [totalRemboursements, setTotalRemboursements] = useState(0);
    const [totalDeplacements, setTotalDeplacements] = useState(0);
    const [dureeMoyenneDeplacements, setDureeMoyenneDeplacements] = useState(0);

    useEffect(() => {
        const demandesApprouvees = [
            {
                id: 1,
                date_depart: '2024-07-23',
                heure_depart: '09:00',
                date_arrivee: '2024-07-30',
                heure_arrivee: '23:00',
                destination: 'Rabat',
                echelle: 20,
                remboursement: 2080
            },
            {
                id: 2,
                date_depart: '2024-07-22',
                heure_depart: '14:00',
                date_arrivee: '2024-07-22',
                heure_arrivee: '20:00',
                destination: 'Casablanca',
                echelle: 12,
                remboursement: 240
            }
            // Add more demandes here if needed
        ];

        let totalRemboursements = 0;
        let totalDeplacements = demandesApprouvees.length;
        let remboursementParDestination = {};
        let remboursementParEchelle = {};
        let totalJours = 0;

        demandesApprouvees.forEach(demande => {
            totalRemboursements += demande.remboursement;

            if (!remboursementParDestination[demande.destination]) {
                remboursementParDestination[demande.destination] = 0;
            }
            remboursementParDestination[demande.destination] += demande.remboursement;

            if (!remboursementParEchelle[demande.echelle]) {
                remboursementParEchelle[demande.echelle] = 0;
            }
            remboursementParEchelle[demande.echelle] += demande.remboursement;

            const dateDepart = new Date(demande.date_depart + 'T' + demande.heure_depart);
            const dateArrivee = new Date(demande.date_arrivee + 'T' + demande.heure_arrivee);
            const diffTime = Math.abs(dateArrivee - dateDepart);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            totalJours += diffDays;
        });

        setTotalRemboursements(totalRemboursements);
        setTotalDeplacements(totalDeplacements);
        setDureeMoyenneDeplacements(totalJours / totalDeplacements);

        // Destroy existing charts before creating new ones
        const destroyChart = (id) => {
            const chart = Chart.getChart(id);
            if (chart) {
                chart.destroy();
            }
        };

        destroyChart('remboursements-par-destination');
        destroyChart('remboursements-par-echelle');

        const ctxDestination = document.getElementById('remboursements-par-destination').getContext('2d');
        new Chart(ctxDestination, {
            type: 'bar',
            data: {
                labels: Object.keys(remboursementParDestination),
                datasets: [{
                    label: 'Remboursements par Destination',
                    data: Object.values(remboursementParDestination),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const ctxEchelle = document.getElementById('remboursements-par-echelle').getContext('2d');
        new Chart(ctxEchelle, {
            type: 'bar',
            data: {
                labels: Object.keys(remboursementParEchelle),
                datasets: [{
                    label: 'Remboursements par Échelle',
                    data: Object.values(remboursementParEchelle),
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, []);


    return (
        <div>
            <Header />
            <div className="main-container">
                <Sidebar />

                <div className="">
                    <div className="statistic statistic-charts">
                        <div className="statistic-chart">
                            <h2>Remboursements par Destination</h2>
                            <canvas id="remboursements-par-destination"></canvas>
                        </div>
                        <div className="statistic-chart">
                            <h2>Remboursements par Échelle</h2>
                            <canvas id="remboursements-par-echelle"></canvas>
                        </div>
                    </div>
                    <h1>Statistiques des Remboursements</h1>
                    <div className="statistic">
                        <h2>Total des Remboursements</h2>
                        <p>{totalRemboursements} DH</p>
                    </div>
                    <div className="statistic">
                        <h2>Total des Déplacements</h2>
                        <p>{totalDeplacements}</p>
                    </div>
                    <div className="statistic">
                        <h2>Durée Moyenne des Déplacements</h2>
                        <p>{dureeMoyenneDeplacements.toFixed(2)} jours</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistiques;
