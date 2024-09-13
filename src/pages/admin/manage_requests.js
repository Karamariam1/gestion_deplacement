import React, { useState, useEffect } from 'react';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import './css/stylesmanage.css';

const ManageRequest = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [notifications, setNotifications] = useState([
        'Demande #1 soumise.',
        'Demande #2 approuvée.',
        'Demande #3 rejetée.'
    ]);
    const itemsPerPage = 5;

    const [pendingCount, setPendingCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const fetchedData = [
            { idDemande: 1, nomResponsable: 'Jean Dupont', type: 'Mission', dateDemande: '2024-07-06', etat: 'pending' },
            { idDemande: 2, nomResponsable: 'Marie Curie', type: 'Remboursement', dateDemande: '2024-07-07', etat: 'approved' },
            { idDemande: 3, nomResponsable: 'Pierre Dupont', type: 'Mission', dateDemande: '2024-07-08', etat: 'rejected' },
            { idDemande: 4, nomResponsable: 'Jean Dupont', type: 'Mission', dateDemande: '2024-07-06', etat: 'pending' },
            { idDemande: 13, nomResponsable: 'Marie Curie', type: 'Remboursement', dateDemande: '2024-07-07', etat: 'approved' },
            { idDemande: 77, nomResponsable: 'Pierre Dupont', type: 'Mission', dateDemande: '2024-07-08', etat: 'rejected' },
            // Add more data here
        ];

        setData(fetchedData);
        setFilteredData(fetchedData);
        updateStats(fetchedData);
        setTotalPages(Math.ceil(fetchedData.length / itemsPerPage));
    };

    const updateStats = (fetchedData) => {
        const pending = fetchedData.filter(item => item.etat === 'pending').length;
        const approved = fetchedData.filter(item => item.etat === 'approved').length;
        const rejected = fetchedData.filter(item => item.etat === 'rejected').length;

        setPendingCount(pending);
        setApprovedCount(approved);
        setRejectedCount(rejected);
    };

    const displayData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    };

    const setupPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i}>
                    <a href="#" className={i === currentPage ? 'active' : ''} onClick={(e) => handlePageClick(e, i)}>
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    };

    const handlePageClick = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
    };

    const filterData = (status) => {
        const filtered = data.filter(item => status === 'all' || item.etat === status);
        sortData(filtered, 'asc');
    };

    const sortData = (dataToSort, sortOrder) => {
        const sorted = dataToSort.sort((a, b) => {
            return sortOrder === 'asc'
                ? new Date(a.dateDemande) - new Date(b.dateDemande)
                : new Date(b.dateDemande) - new Date(a.dateDemande);
        });

        setFilteredData(sorted);
        setTotalPages(Math.ceil(sorted.length / itemsPerPage));
        setCurrentPage(1);
    };

    const approveRequest = (id) => {
        const updatedData = data.map(item =>
            item.idDemande === id ? { ...item, etat: 'approved' } : item
        );
        setData(updatedData);
        filterData(document.getElementById('filter-status').value);
        setNotifications([...notifications, `Demande #${id} approuvée.`]);
        updateStats(updatedData);
    };

    const rejectRequest = (id) => {
        const updatedData = data.map(item =>
            item.idDemande === id ? { ...item, etat: 'rejected' } : item
        );
        setData(updatedData);
        filterData(document.getElementById('filter-status').value);
        setNotifications([...notifications, `Demande #${id} rejetée.`]);
        updateStats(updatedData);
    };

    return (
        <>
            <Header />

            <div className="main-container">
                <Sidebar/>
                <main>
                    
                        <h1>Gestion des Demandes</h1>
                        <div className="stats">
                            <div className="stat">
                                <h3>En attente</h3>
                                <p id="pending-count">{pendingCount}</p>
                            </div>
                            <div className="stat">
                                <h3>Validées</h3>
                                <p id="approved-count">{approvedCount}</p>
                            </div>
                            <div className="stat">
                                <h3>Rejetées</h3>
                                <p id="rejected-count">{rejectedCount}</p>
                            </div>
                        </div>
                        <div className="filter-sort-container">
                            <div className="filter">
                                <label htmlFor="filter-status">Filtrer par État</label>
                                <select id="filter-status" onChange={(e) => filterData(e.target.value)}>
                                    <option value="all">Tous</option>
                                    <option value="pending">En attente</option>
                                    <option value="approved">Validées</option>
                                    <option value="rejected">Rejetées</option>
                                </select>
                            </div>
                            <div className="sort">
                                <label htmlFor="sort-date">Trier par Date</label>
                                <select id="sort-date" onChange={(e) => sortData(filteredData, e.target.value)}>
                                    <option value="asc">Ascendant</option>
                                    <option value="desc">Descendant</option>
                                </select>
                            </div>
                        </div>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID Demande</th>
                                        <th>Nom du Responsable</th>
                                        <th>Type</th>
                                        <th>Date de Demande</th>
                                        <th>État</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayData().map(item => (
                                        <tr key={item.idDemande}>
                                            <td>{item.idDemande}</td>
                                            <td>{item.nomResponsable}</td>
                                            <td>{item.type}</td>
                                            <td>{item.dateDemande}</td>
                                            <td>{item.etat}</td>
                                            <td className="actions">
                                                <button className="approve" onClick={() => approveRequest(item.idDemande)}>
                                                    Approuver
                                                </button>
                                                <button className="reject" onClick={() => rejectRequest(item.idDemande)}>
                                                    Rejeter
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            <ul>{setupPagination()}</ul>
                        </div>
                    
                </main>
            </div>
            
        </>
    );
};

export default ManageRequest;
