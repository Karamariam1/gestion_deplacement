import React, { useEffect } from 'react';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import { Chart, registerables } from 'chart.js';
import './css/stylesindex.css';

Chart.register(...registerables);  // Register all components

const AdminHome = () => {
    useEffect(() => {
        // Simulated data for demonstration
        const totalUsers = 150;
        const totalRequests = 45;

        document.getElementById('total-users').textContent = totalUsers;
        document.getElementById('total-requests').textContent = totalRequests;

        let userStatsChart, requestStatsChart;

        const ctxUserStats = document.getElementById('userStatsChart').getContext('2d');
        userStatsChart = new Chart(ctxUserStats, {
            type: 'bar',
            data: {
                labels: ['Admins', 'Managers', 'Employés'],
                datasets: [{
                    label: 'Utilisateurs par rôle',
                    data: [10, 30, 110],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const ctxRequestStats = document.getElementById('requestStatsChart').getContext('2d');
        requestStatsChart = new Chart(ctxRequestStats, {
            type: 'pie',
            data: {
                labels: ['En Attente', 'Validées', 'Rejetées'],
                datasets: [{
                    label: 'Statut des Demandes',
                    data: [20, 15, 10],
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
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });

        // Cleanup to prevent creating multiple charts on the same canvas
        return () => {
            if (userStatsChart) userStatsChart.destroy();
            if (requestStatsChart) requestStatsChart.destroy();
        };
    }, []);

    return (
        <>
            <Header />
            <div className="main-container">
                <Sidebar />
                <main>
                    <section className="welcome-section">
                        <h1>Bienvenue, Admin</h1>
                        <p>Bienvenue sur le tableau de bord de l'administration.</p>
                    </section>

                    <section className="widgets-section">
                        <div className="widget">
                            <h3>Total Utilisateurs</h3>
                            <p id="total-users">0</p>
                        </div>
                        <div className="widget">
                            <h3>Total Demandes</h3>
                            <p id="total-requests">0</p>
                        </div>
                    </section>

                    <section className="stats-section">
                        <h2>Statistiques Clés</h2>
                        <div className="charts-grid">
                            <div className="chart-container">
                                <canvas id="userStatsChart"></canvas>
                            </div>
                            <div className="chart-container">
                                <canvas id="requestStatsChart"></canvas>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default AdminHome;
