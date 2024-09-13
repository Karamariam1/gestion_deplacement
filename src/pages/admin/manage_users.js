import React, { useState, useEffect } from 'react';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import './css/stylesuser.css';

const ManageUsers = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 5;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchQuery, data, currentPage]);

    const fetchData = () => {
        const fetchedData = [
            { id: 1, nom: 'Jean Dupont', email: 'jean.dupont@example.com' },
            { id: 2, nom: 'Marie Curie', email: 'marie.curie@example.com' },
            // Add more data here
        ];
        setData(fetchedData);
    };

    const filterData = () => {
        const filtered = data.filter(item =>
            item.nom.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setCurrentPage(1);
    };

    const displayData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleAddEmployee = () => {
        setShowAddForm(true);
    };

    const handleCancelAddEmployee = () => {
        setShowAddForm(false);
    };

    const handleSubmitNewEmployee = (e) => {
        e.preventDefault();
        const newId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
        setData([...data, { id: newId, nom: newName, email: newEmail }]);
        setShowAddForm(false);
        setNewName('');
        setNewEmail('');
    };

    const handleDeleteUser = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    return (
        <>
            <Header />
            <div className="main-container">
                <Sidebar />
                <main>
                    <div className="">
                        <h1>Gestion des Utilisateurs</h1>
                        <div className="filter-sort-container">
                            <div className="filter">
                                <label htmlFor="search-user">Rechercher Utilisateur</label>
                                <input
                                    type="text"
                                    id="search-user"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Nom d'utilisateur"
                                />
                            </div>
                            <button id="add-employee-btn" onClick={handleAddEmployee}>Ajouter Employé</button>
                        </div>
                        {showAddForm && (
                            <div id="add-employee-form">
                                <h2>Ajouter un Nouvel Employé</h2>
                                <form id="new-employee-form" onSubmit={handleSubmitNewEmployee}>
                                    <div>
                                        <label htmlFor="new-employee-name">Nom:</label>
                                        <input
                                            type="text"
                                            id="new-employee-name"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="new-employee-email">Email:</label>
                                        <input
                                            type="email"
                                            id="new-employee-email"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="button-container">
                                        <button type="submit">Enregistrer</button>
                                        <button type="button" onClick={handleCancelAddEmployee}>Annuler</button>
                                    </div>
                                </form>
                            </div>
                        )}
                        {!showAddForm && (
                            <>
                                <div id="table-container" className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID Utilisateur</th>
                                                <th>Nom</th>
                                                <th>Email</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayData().map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.nom}</td>
                                                    <td>{item.email}</td>
                                                    <td className="actions">
                                                        <button className="delete" onClick={() => handleDeleteUser(item.id)}>
                                                            Supprimer
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="pagination">
                                    <ul>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <li key={index + 1}>
                                                <a
                                                    href="#"
                                                    className={index + 1 === currentPage ? 'active' : ''}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageClick(index + 1);
                                                    }}
                                                >
                                                    {index + 1}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
            <footer>
                <p>© 2024 Agence Urbaine de Laayoune</p>
            </footer>
        </>
    );
};

export default ManageUsers;
