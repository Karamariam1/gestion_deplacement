import React, { useState, useEffect } from 'react';
import './css/history.css';
import Header from '../../components/manager/Header';
import Sidebar from '../../components/manager/Sidebar';


const History = () => {
    const [historyData] = useState([
        { date: '2024-07-01', user: 'Jean Dupont', type: 'validation', details: 'Validation de la demande #1234' },
        { date: '2024-07-02', user: 'Marie Curie', type: 'rejet', details: 'Rejet de la demande #1235' },
        // Ajouter d'autres enregistrements ici
    ]);

    const [filteredData, setFilteredData] = useState(historyData);
    const [recordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterDate, setFilterDate] = useState('');
    const [filterUser, setFilterUser] = useState('');
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        applyFilters();
    }, [filterDate, filterUser, filterType]);

    const applyFilters = () => {
        const filtered = historyData.filter(record => {
            return (!filterDate || record.date === filterDate) &&
                   (!filterUser || record.user.toLowerCase().includes(filterUser.toLowerCase())) &&
                   (!filterType || record.type === filterType);
        });
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page when filters are applied
    };

    const renderTable = (data, page) => {
        const start = (page - 1) * recordsPerPage;
        const end = start + recordsPerPage;
        const paginatedData = data.slice(start, end);

        return paginatedData.map((record, index) => (
            <tr key={index}>
                <td>{record.date}</td>
                <td>{record.user}</td>
                <td>{record.type}</td>
                <td>{record.details}</td>
            </tr>
        ));
    };

    const setupPagination = () => {
        const pageCount = Math.ceil(filteredData.length / recordsPerPage);
        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(
                <li key={i}>
                    <a href="#" onClick={(e) => handlePageChange(e, i)}>{i}</a>
                </li>
            );
        }
        return pages;
    };

    const handlePageChange = (event, page) => {
        event.preventDefault();
        setCurrentPage(page);
    };

    return (
        <>
            <Header />

            <div className="main-container">
                <Sidebar />

                <main>
                <h1>Historique des Actions</h1>
                    <section className="">
                        
                        <form id="filters-form" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="filter-date">Date:</label>
                            <input
                                type="date"
                                id="filter-date"
                                name="filter-date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                            
                            <label htmlFor="filter-user">Utilisateur:</label>
                            <input
                                type="text"
                                id="filter-user"
                                name="filter-user"
                                placeholder="Nom de l'utilisateur"
                                value={filterUser}
                                onChange={(e) => setFilterUser(e.target.value)}
                            />
                            
                            <label htmlFor="filter-type">Type d'Action:</label>
                            <select
                                id="filter-type"
                                name="filter-type"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="">Tous</option>
                                <option value="validation">Validation</option>
                                <option value="rejet">Rejet</option>
                            </select>

                            <button type="button" id="apply-filters" onClick={applyFilters}>Appliquer</button>
                        </form>
                    </section>

                    <section className="table-container">
                        <table id="history-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Utilisateur</th>
                                    <th>Type d'Action</th>
                                    <th>Détails</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTable(filteredData, currentPage)}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <ul id="pagination-controls">
                                {setupPagination()}
                            </ul>
                        </div>
                    </section>
                </main>
            </div>

            
        </>
    );
};

export default History;
