// OrdreMissionPage.js
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Layout from '../../components/fonctionnaire/Layout';
import './css/styles.css';

function HistoriqueDeplacementPage() {
    const itemsPerPage = 5; // Number of items per page
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterName, setFilterName] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Simulated data fetch
        const fetchData = () => {
            const simulatedData = [
                { id: 1, name: 'Jean Dupont', affectation: 'Informatique', grade: 'Manager', location: 'Rabat', startDate: '2024-07-01 08:00', endDate: '2024-07-05 18:00', status: 'approuvé' },
                { id: 2, name: 'Marie Curie', affectation: 'Chimie', grade: 'Chercheur', location: 'Casablanca', startDate: '2024-06-15 09:00', endDate: '2024-06-20 17:00', status: 'en attente' },
                // Add more data here
            ];
            setData(simulatedData);
            setTotalPages(Math.ceil(simulatedData.length / itemsPerPage));
        };

        fetchData();
    }, []);

    const displayData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const filteredData = data.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(filterName.toLowerCase());
            const locationMatch = item.location.toLowerCase().includes(filterLocation.toLowerCase());
            const statusMatch = filterStatus === '' || item.status === filterStatus;
            return nameMatch && locationMatch && statusMatch;
        });

        return filteredData.slice(startIndex, startIndex + itemsPerPage).map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.affectation}</td>
                <td>{item.grade}</td>
                <td>{item.location}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.status}</td>
            </tr>
        ));
    };

    const setupPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i}>
                    <a href="#!" onClick={(e) => handlePageClick(e, i)} className={i === currentPage ? 'active' : ''}>
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    };

    const handlePageClick = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    const sortTable = (columnIndex) => {
        const sortedData = [...data].sort((a, b) => {
            const valA = Object.values(a)[columnIndex];
            const valB = Object.values(b)[columnIndex];
            if (typeof valA === 'string') {
                return valA.localeCompare(valB);
            }
            return valA - valB;
        });
        setData(sortedData);
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['ID', 'Nom', 'Affectation', 'Grade', 'Lieu', 'Date de Départ', 'Date de Retour', 'Statut']],
            body: data.map(item => [item.id, item.name, item.affectation, item.grade, item.location, item.startDate, item.endDate, item.status])
        });
        doc.save('historique_deplacements.pdf');
    };

    return (
        <Layout>
            <div>
            

            <main>
                <section className="historique-deplacement-section">
                    <h1>Historique des Déplacements</h1>
                    <div className="filter-sort-container">
                        <input type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Filtrer par nom" />
                        <input type="text" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} placeholder="Filtrer par lieu" />
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="">Tous les statuts</option>
                            <option value="approuvé">Approuvé</option>
                            <option value="en attente">En attente</option>
                            <option value="rejeté">Rejeté</option>
                        </select>
                        <button onClick={exportPDF}>Exporter PDF</button>
                        <button onClick={() => { /* Implement Excel export functionality */ }}>Exporter Excel</button>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th onClick={() => sortTable(0)}>ID</th>
                                    <th onClick={() => sortTable(1)}>Nom</th>
                                    <th onClick={() => sortTable(2)}>Affectation</th>
                                    <th onClick={() => sortTable(3)}>Grade</th>
                                    <th onClick={() => sortTable(4)}>Lieu</th>
                                    <th onClick={() => sortTable(5)}>Date de Départ</th>
                                    <th onClick={() => sortTable(6)}>Date de Retour</th>
                                    <th onClick={() => sortTable(7)}>Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayData()}
                            </tbody>
                        </table>
                    </div>
                    <ul className="pagination">
                        {setupPagination()}
                    </ul>
                </section>
            </main>

            
        </div>
        </Layout>
    );
}

export default HistoriqueDeplacementPage;
