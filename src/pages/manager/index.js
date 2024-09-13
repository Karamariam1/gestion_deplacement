import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import './css/styleindex.css';
import Header from '../../components/manager/Header';
import Sidebar from '../../components/manager/Sidebar';

const ManagerHome = () => {
    const [metrics, setMetrics] = useState({
        totalMissions: 45,
        ongoingReimbursements: 5,
        approvedReimbursements: 40,
    });

    const [notifications] = useState([
        { message: 'Nouvelle régulation ajoutée', type: 'info' },
        { message: 'Nouvelle demande de remboursement reçue', type: 'success' },
        { message: "Ordre de mission en attente de validation", type: "warning" }
    ]);

    const [recentActivities] = useState([
        "Soumission de la demande de remboursement par Jean Dupont",
        "Validation de l'ordre de mission par le manager",
        "Notification de nouvelle régulation"
    ]);

    const [currentTasks] = useState([
        "Préparer le rapport de mission pour Jean Dupont",
        "Soumettre les justificatifs de déplacement",
        "Réviser les demandes en attente"
    ]);

    useEffect(() => {
        // Costs per Month Chart
        const ctxCostsPerMonth = document.getElementById('costsPerMonthChart').getContext('2d');
        const costsPerMonthChart = new Chart(ctxCostsPerMonth, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Coûts Totaux par Mois',
                    data: [1000, 2000, 1500, 3000, 2500, 4000, 3500, 3000, 2000, 1500, 1000, 2500],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Frequent Destinations Chart
        const ctxFrequentDestinations = document.getElementById('frequentDestinationsChart').getContext('2d');
        const frequentDestinationsChart = new Chart(ctxFrequentDestinations, {
            type: 'bar',
            data: {
                labels: ['Paris', 'Lyon', 'Marseille', 'Nice', 'Bordeaux'],
                datasets: [{
                    label: 'Destinations les Plus Fréquentes',
                    data: [10, 15, 8, 5, 12],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Requests Status Chart
        const ctxRequestsStatus = document.getElementById('requestsStatusChart').getContext('2d');
        const requestsStatusChart = new Chart(ctxRequestsStatus, {
            type: 'pie',
            data: {
                labels: ['En Attente', 'Validées', 'Rejetées'],
                datasets: [{
                    label: 'Statut des Demandes',
                    data: [10, 5, 2],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
            },
        });

        // Cleanup function to destroy charts when component unmounts
        return () => {
            costsPerMonthChart.destroy();
            frequentDestinationsChart.destroy();
            requestsStatusChart.destroy();
        };
    }, []);

    const exportToPDF = () => {
        alert('Fonctionnalité d\'exportation en PDF en cours de développement.');
    };

    const exportToExcel = () => {
        alert('Fonctionnalité d\'exportation en Excel en cours de développement.');
    };

    return (
        <>
            <Header />

            <div className="main-container">
                <Sidebar />

                <main>
                    <section className="welcome-section">
                        <h1>Bienvenue à l'Agence Urbaine de Laayoune</h1>
                        <p>Bienvenue sur l'application de gestion des déplacements et de remboursement des déplacements de l'Agence Urbaine de Laayoune.</p>
                    </section>

                    <section className="widgets-section">
                        <div className="widget">
                            <h3>Activités Récentes</h3>
                            <ul className="recent-activities">
                                {recentActivities.map((activity, index) => (
                                    <li key={index}>{activity}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="widget">
                            <h3>Tâches en Cours</h3>
                            <ul className="current-tasks">
                                {currentTasks.map((task, index) => (
                                    <li key={index}>{task}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="widget">
                            <h3>Notifications</h3>
                            <ul className="notifications">
                                {notifications.map((notification, index) => (
                                    <li key={index} className={notification.type}>
                                        {notification.message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="widget">
                            <h3>Métriques Clés</h3>
                            <ul>
                                <li>Nombre total de missions: <span>{metrics.totalMissions}</span></li>
                                <li>Remboursements en cours: <span>{metrics.ongoingReimbursements}</span></li>
                                <li>Remboursements approuvés: <span>{metrics.approvedReimbursements}</span></li>
                            </ul>
                        </div>
                    </section>

                    <section className="stats-section">
                        <h2>Statistiques et Rapports</h2>
                        <div className="charts-grid">
                            <div className="chart-container">
                                <canvas id="costsPerMonthChart"></canvas>
                            </div>
                            <div className="chart-container">
                                <canvas id="frequentDestinationsChart"></canvas>
                            </div>
                            <div className="chart-container">
                                <canvas id="requestsStatusChart"></canvas>
                            </div>
                        </div>
                        <button id="export-pdf" onClick={exportToPDF}>Exporter en PDF</button>
                        <button id="export-excel" onClick={exportToExcel}>Exporter en Excel</button>
                    </section>
                </main>
            </div>

            
        </>
    );
};

export default ManagerHome;
