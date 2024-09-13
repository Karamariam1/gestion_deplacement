import React, { useRef, useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './css/stats.css';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';

Chart.register(...registerables);

const Stats = () => {
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Demandes Mensuelles',
            data: [30, 20, 50, 40, 60],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    };

    const barChartData = {
        labels: ['Employé 1', 'Employé 2', 'Employé 3'],
        datasets: [{
            label: 'Demandes par Employé',
            data: [5, 10, 7],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
        }]
    };

    const pieChartData = {
        labels: ['Acceptées', 'En Attente', 'Refusées'],
        datasets: [{
            data: [15, 5, 10],
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        }]
    };

    const drawCharts = () => {
        // Destroy previous charts if they exist
        if (lineChartRef.current && lineChartRef.current.chart) {
            lineChartRef.current.chart.destroy();
        }
        if (barChartRef.current && barChartRef.current.chart) {
            barChartRef.current.chart.destroy();
        }
        if (pieChartRef.current && pieChartRef.current.chart) {
            pieChartRef.current.chart.destroy();
        }

        // Create new charts
        lineChartRef.current.chart = new Chart(lineChartRef.current, {
            type: 'line',
            data: lineChartData,
        });

        barChartRef.current.chart = new Chart(barChartRef.current, {
            type: 'bar',
            data: barChartData,
        });

        pieChartRef.current.chart = new Chart(pieChartRef.current, {
            type: 'pie',
            data: pieChartData,
        });
    };

    const handleExport = () => {
        html2canvas(document.querySelector('.charts-container')).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save('rapport.pdf');
        });
    };

    const handleFilter = () => {
        console.log('Filtering data from', startDate, 'to', endDate);
    };

    useEffect(() => {
        drawCharts();
    }, []);

    return (
        <>
            <Header/>

            <div className="main-container">
                <Sidebar />

                <main>
                    <div className="charts-container">
                        <h1>Statistiques et Rapports</h1>
                        <div className="filter">
                            <label htmlFor="start-date">Date de début:</label>
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <label htmlFor="end-date">Date de fin:</label>
                            <input
                                type="date"
                                id="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <button id="filter-btn" onClick={handleFilter}>Filtrer</button>
                        </div>
                        <div className="charts">
                            <div className="chart-row">
                                <canvas id="lineChart" ref={lineChartRef}></canvas>
                                <canvas id="barChart" ref={barChartRef}></canvas>
                            </div>
                            <canvas id="pieChart" ref={pieChartRef}></canvas>
                        </div>
                        <button id="export-btn" onClick={handleExport}>Exporter en PDF</button>
                    </div>
                </main>
            </div>

            <footer>
                <p>© 2024 Agence Urbaine de Laayoune</p>
            </footer>
        </>
    );
};

export default Stats;
