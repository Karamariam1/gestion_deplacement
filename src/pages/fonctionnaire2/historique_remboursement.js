import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './css/styles.css'; // Import your CSS file
import Header from '../../components/fonctionnaire/Header';

const HistoriqueRemboursements = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [filterAmount, setFilterAmount] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const tableBodyRef = useRef(null);
    const paginationRef = useRef(null);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        displayData();
        setupPagination();
    }, [data, currentPage, filterName, filterAmount, filterStatus]);

    const fetchData = () => {
        // Simulated data
        const fetchedData = [
            { id: 1, name: 'Jean Dupont', amount: 500, requestDate: '2024-07-01', status: 'approuvé', notes: 'Validé par le service financier' },
            { id: 2, name: 'Marie Curie', amount: 750, requestDate: '2024-06-15', status: 'en attente', notes: 'En attente de validation' },
            // Add more data here
        ];
        setData(fetchedData);
        setTotalPages(Math.ceil(fetchedData.length / itemsPerPage));
    };

    const displayData = () => {
        if (!tableBodyRef.current) return;
        
        tableBodyRef.current.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const filteredData = data.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(filterName.toLowerCase());
            const amountMatch = filterAmount === '' || item.amount.toString().includes(filterAmount);
            const statusMatch = filterStatus === '' || item.status === filterStatus;
            return nameMatch && amountMatch && statusMatch;
        });
        const currentData = filteredData.slice(startIndex, endIndex);

        currentData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.amount}</td>
                <td>${item.requestDate}</td>
                <td>${item.status}</td>
                <td>${item.notes}</td>
            `;
            tableBodyRef.current.appendChild(row);
        });
    };

    const setupPagination = () => {
        if (!paginationRef.current) return;

        paginationRef.current.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.innerHTML = `<a href="#">${i}</a>`;
            pageItem.addEventListener('click', (e) => {
                e.preventDefault();
                setCurrentPage(i);
            });
            paginationRef.current.appendChild(pageItem);
        }
        updatePagination();
    };

    const updatePagination = () => {
        const pageItems = paginationRef.current.querySelectorAll('a');
        pageItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentPage - 1) {
                item.classList.add('active');
            }
        });
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
            head: [['ID', 'Nom', 'Montant', 'Date de Demande', 'Statut', 'Notes']],
            body: data.map(item => [item.id, item.name, item.amount, item.requestDate, item.status, item.notes])
        });
        doc.save('historique_remboursements.pdf');
    };

    return (
        <>
        <Header />
        <div>
           
            <div className="main-container">
                <main>
                    <section className="historique-remboursement-section">
                        <h1>Historique des Remboursements</h1>
                        <div className="filter-sort-container">
                            <input
                                type="text"
                                id="filter-name"
                                placeholder="Filtrer par nom"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                            />
                            <input
                                type="text"
                                id="filter-amount"
                                placeholder="Filtrer par montant"
                                value={filterAmount}
                                onChange={(e) => setFilterAmount(e.target.value)}
                            />
                            <select
                                id="filter-status"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">Tous les statuts</option>
                                <option value="approuvé">Approuvé</option>
                                <option value="en attente">En attente</option>
                                <option value="rejeté">Rejeté</option>
                            </select>
                            <button onClick={exportPDF}>Exporter PDF</button>
                            <button id="export-excel">Exporter Excel</button>
                        </div>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th onClick={() => sortTable(0)}>ID</th>
                                        <th onClick={() => sortTable(1)}>Nom</th>
                                        <th onClick={() => sortTable(2)}>Montant</th>
                                        <th onClick={() => sortTable(3)}>Date de Demande</th>
                                        <th onClick={() => sortTable(4)}>Statut</th>
                                        <th onClick={() => sortTable(5)}>Notes</th>
                                    </tr>
                                </thead>
                                <tbody ref={tableBodyRef}>
                                    {/* Data rows will be inserted here by the script */}
                                </tbody>
                            </table>
                        </div>
                        <ul className="pagination" ref={paginationRef}>
                            {/* Pagination items will be inserted here by the script */}
                        </ul>
                    </section>
                </main>
            </div>
            
        </div>
        </>
    );
};

export default HistoriqueRemboursements;
