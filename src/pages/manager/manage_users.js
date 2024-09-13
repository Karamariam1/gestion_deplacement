import React, { useState, useEffect } from 'react';
import './css/stylesuser.css';
import Header from '../../components/manager/Header';
import Sidebar from '../../components/manager/Sidebar';


const ManageUsers = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [existingEmployees, setExistingEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState('');

    useEffect(() => {
        // Fetch data
        fetchData();
        fetchExistingEmployees();
    }, []);

    useEffect(() => {
        // Update filtered data and pagination when data changes
        const filtered = data.filter(item => item.nom.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredData(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setCurrentPage(1); // Reset to first page on filter change
    }, [data, searchQuery]);

    useEffect(() => {
        // Update pagination
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }, [filteredData, itemsPerPage]);

    const fetchData = () => {
        // Simulate fetching data
        const userData = [
            { id: 1, nom: 'Jean Dupont', email: 'jean.dupont@example.com' },
            { id: 2, nom: 'Marie Curie', email: 'marie.curie@example.com' },
            // Add more data here
        ];
        setData(userData);
    };

    const fetchExistingEmployees = () => {
        // Simulate fetching existing employees
        const employees = [
            { id: 3, nom: 'Albert Einstein', email: 'albert.einstein@example.com' },
            { id: 4, nom: 'Isaac Newton', email: 'isaac.newton@example.com' },
            // Add more employees here
        ];
        setExistingEmployees(employees);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAddExistingEmployee = () => {
        const employee = existingEmployees.find(emp => emp.id === parseInt(selectedEmployee));
        if (employee) {
            setData([...data, employee]);
        }
    };

    const handleDeleteUser = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex).map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nom}</td>
                <td>{item.email}</td>
                <td className="actions">
                    <button onClick={() => handleDeleteUser(item.id)}>Supprimer</button>
                </td>
            </tr>
        ));
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageClick(i);
                        }}
                        className={i === currentPage ? 'active' : ''}
                    >
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
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
                                placeholder="Nom d'utilisateur"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <button onClick={() => setShowAddEmployee(!showAddEmployee)}>
                            Ajouter Employé
                        </button>
                        {showAddEmployee && (
                            <div id="add-employee-container">
                                <label htmlFor="existing-employees"></label>
                                <select
                                    id="existing-employees"
                                    value={selectedEmployee}
                                    onChange={(e) => setSelectedEmployee(e.target.value)}
                                >
                                    <option value="">Sélectionner un employé</option>
                                    {existingEmployees.map(emp => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.nom} ({emp.email})
                                        </option>
                                    ))}
                                </select>
                                <button onClick={handleAddExistingEmployee}>Ajouter</button>
                            </div>
                        )}
                    </div>
                    <div className="table-container">
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
                                {renderTableRows()}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <ul>
                            {renderPagination()}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
        </>
    );
};

export default ManageUsers;