import React, { useState, useEffect } from 'react';
import './css/request.css';
import Header from '../../components/manager/Header';
import Sidebar from '../../components/manager/Sidebar';

const RequestsPage = () => {
    const [requestsData, setRequestsData] = useState([
        { id: 1, responsable: 'John Doe', affectation: 'IT', grade: 'A1', lieu: 'Paris', depart: '2024-07-01', retour: '2024-07-10', status: 'pending' },
        { id: 2, responsable: 'Jane Smith', affectation: 'HR', grade: 'B2', lieu: 'Lyon', depart: '2024-07-05', retour: '2024-07-12', status: 'approved' },
        // Ajouter d'autres demandes ici
    ]);

    const [filteredData, setFilteredData] = useState(requestsData);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        updateSummary();
        applyFilters(); // Initial filter application
    }, [requestsData]);

    const updateSummary = () => {
        const pendingRequests = requestsData.filter(request => request.status === 'pending').length;
        const approvedRequests = requestsData.filter(request => request.status === 'approved').length;
        const rejectedRequests = requestsData.filter(request => request.status === 'rejected').length;

        document.getElementById('pending-requests').textContent = pendingRequests;
        document.getElementById('approved-requests').textContent = approvedRequests;
        document.getElementById('rejected-requests').textContent = rejectedRequests;
    };

    const applyFilters = () => {
        const filterDate = document.getElementById('filter-date').value;
        const filterResponsable = document.getElementById('filter-responsable').value.toLowerCase();
        const filterStatus = document.getElementById('filter-status').value;

        const filtered = requestsData.filter(request => {
            return (!filterDate || request.depart === filterDate) &&
                   (!filterResponsable || request.responsable.toLowerCase().includes(filterResponsable)) &&
                   (!filterStatus || request.status === filterStatus);
        });

        setFilteredData(filtered);
        renderTable(filtered, 1);
        setupPagination(filtered);
    };

    const renderTable = (data, page) => {
        setCurrentPage(page);
    };

    const updateRequestStatus = (id, status, comment = '') => {
        setRequestsData(prevData =>
            prevData.map(request =>
                request.id === id ? { ...request, status, comment } : request
            )
        );
        applyFilters();
        updateSummary();
    };

    const setupPagination = (data) => {
        const pageCount = Math.ceil(data.length / recordsPerPage);
        const paginationControls = document.getElementById('pagination-controls');
        paginationControls.innerHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = "#";
            a.textContent = i;
            a.addEventListener('click', (event) => {
                event.preventDefault();
                renderTable(data, i);
            });
            li.appendChild(a);
            paginationControls.appendChild(li);
        }
    };

    return (
        <>
            <Header />

            <div className="main-container">
                <Sidebar />
                <main>
                    <section className="summary">
                        <div className="summary-item">
                            <h3>Demandes en Attente</h3>
                            <p id="pending-requests">0</p>
                        </div>
                        <div className="summary-item">
                            <h3>Demandes Validées</h3>
                            <p id="approved-requests">0</p>
                        </div>
                        <div className="summary-item">
                            <h3>Demandes Rejetées</h3>
                            <p id="rejected-requests">0</p>
                        </div>
                    </section>

                    <section className="">
                        <h1>Gérer les Demandes</h1>
                        <form id="filters-form" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="filter-date">Date:</label>
                            <input type="date" id="filter-date" name="filter-date" />

                            <label htmlFor="filter-responsable">Responsable:</label>
                            <input type="text" id="filter-responsable" name="filter-responsable" placeholder="Nom du responsable" />

                            <label htmlFor="filter-status">État:</label>
                            <select id="filter-status" name="filter-status">
                                <option value="">Tous</option>
                                <option value="pending">En Attente</option>
                                <option value="approved">Validée</option>
                                <option value="rejected">Rejetée</option>
                            </select>

                            <button type="button" id="apply-filters" onClick={applyFilters}>Appliquer</button>
                        </form>
                    </section>

                    <section className="table-container">
                        <table id="requests-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Responsable</th>
                                    <th>Affectation</th>
                                    <th>Grade</th>
                                    <th>Lieu de la Mission</th>
                                    <th>Date de Départ</th>
                                    <th>Date de Retour</th>
                                    <th>État</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map(request => (
                                    <tr key={request.id}>
                                        <td>{request.id}</td>
                                        <td>{request.responsable}</td>
                                        <td>{request.affectation}</td>
                                        <td>{request.grade}</td>
                                        <td>{request.lieu}</td>
                                        <td>{request.depart}</td>
                                        <td>{request.retour}</td>
                                        <td>{request.status}</td>
                                        <td>
                                            <button className="approve-btn" onClick={() => updateRequestStatus(request.id, 'approved')}>Valider</button>
                                            <button className="reject-btn" onClick={() => updateRequestStatus(request.id, 'rejected')}>Rejeter</button>
                                            <textarea className="comment" placeholder="Ajouter un commentaire..." />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <ul id="pagination-controls">
                                {/* Pagination controls will be generated by setupPagination */}
                            </ul>
                        </div>
                    </section>
                </main>
            </div>

        </>
    );
};

export default RequestsPage;
