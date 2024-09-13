// RemboursementPage.js
import React, { useEffect, useState } from 'react';
import Header from '../../components/fonctionnaire/Header';
import './css/styles.css';
import Sidebar from '../../components/fonctionnaire/Sidebar';


const RemboursementTable = () => {
  const itemsPerPage = 5; // Nombre d'éléments par page
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortDate, setSortDate] = useState('asc');

  useEffect(() => {
    // Simuler des données
    const fetchData = () => {
      const data = [
        { idRemboursement: 1, idMission: 1, nomResponsable: 'Jean Dupont', montant: '1500 MAD', lieuMission: 'Rabat', dateDemande: '2024-07-06', dateDepart: '2024-07-01 08:00', dateRetour: '2024-07-05 18:00', etat: 'submitted' },
        { idRemboursement: 2, idMission: 2, nomResponsable: 'Marie Curie', montant: '2000 MAD', lieuMission: 'Casablanca', dateDemande: '2024-07-07', dateDepart: '2024-07-02 09:00', dateRetour: '2024-07-06 19:00', etat: 'verification' },
        { idRemboursement: 3, idMission: 3, nomResponsable: 'Pierre Dupont', montant: '1700 MAD', lieuMission: 'Marrakech', dateDemande: '2024-07-08', dateDepart: '2024-07-03 10:00', dateRetour: '2024-07-07 20:00', etat: 'payment' },
        { idRemboursement: 4, idMission: 1, nomResponsable: 'Jean Dupont', montant: '1500 MAD', lieuMission: 'Rabat', dateDemande: '2024-07-06', dateDepart: '2024-07-01 08:00', dateRetour: '2024-07-05 18:00', etat: 'submitted' },
        { idRemboursement: 5, idMission: 2, nomResponsable: 'Marie Curie', montant: '2000 MAD', lieuMission: 'Casablanca', dateDemande: '2024-07-07', dateDepart: '2024-07-02 09:00', dateRetour: '2024-07-06 19:00', etat: 'verification' },
        { idRemboursement: 6, idMission: 3, nomResponsable: 'Pierre Dupont', montant: '1700 MAD', lieuMission: 'Marrakech', dateDemande: '2024-07-08', dateDepart: '2024-07-03 10:00', dateRetour: '2024-07-07 20:00', etat: 'payment' },
        { idRemboursement: 7, idMission: 1, nomResponsable: 'Jean Dupont', montant: '1500 MAD', lieuMission: 'Rabat', dateDemande: '2024-07-06', dateDepart: '2024-07-01 08:00', dateRetour: '2024-07-05 18:00', etat: 'submitted' },
        { idRemboursement: 8, idMission: 2, nomResponsable: 'Marie Curie', montant: '2000 MAD', lieuMission: 'Casablanca', dateDemande: '2024-07-07', dateDepart: '2024-07-02 09:00', dateRetour: '2024-07-06 19:00', etat: 'verification' },
        { idRemboursement: 9, idMission: 3, nomResponsable: 'Pierre Dupont', montant: '1700 MAD', lieuMission: 'Marrakech', dateDemande: '2024-07-08', dateDepart: '2024-07-03 10:00', dateRetour: '2024-07-07 20:00', etat: 'payment' },
        // Ajoutez plus de données ici
      ];
      setData(data);
      setFilteredData(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filterStatus, sortDate]);

  const displayData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);
    console.log('Current Data:', currentData); // Debugging line
    return currentData;
  };
  

  const setupPagination = () => {
    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(
        <li key={i}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
            }}
            className={i === currentPage ? 'active' : ''}
          >
            {i}
          </a>
        </li>
      );
    }
    return pageItems;
  };

  const filterData = () => {
    const filtered = data.filter((item) => {
      return filterStatus === 'all' || item.etat === filterStatus;
    });
    sortData(filtered);
  };

  const sortData = (dataToSort) => {
    const sorted = dataToSort.sort((a, b) => {
      if (sortDate === 'asc') {
        return new Date(a.dateDemande) - new Date(b.dateDemande);
      } else {
        return new Date(b.dateDemande) - new Date(a.dateDemande);
      }
    });
    setFilteredData(sorted);
    setTotalPages(Math.ceil(sorted.length / itemsPerPage));
    setCurrentPage(1); // Reset to the first page after filtering and sorting
    console.log('Filtered Data:', sorted); // Debugging line
  };
  

  return (
    <>
    <Header />
        
    <div class="main-container">
      <Sidebar />
     <main>      
     <div >
      <h1>État des Remboursements</h1>
      <div className="filter-sort-container">
        <div className="filter">
          <label htmlFor="filter-status">Filtrer par État</label>
          <select id="filter-status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Tous</option>
            <option value="submitted">Soumis</option>
            <option value="verification">En cours de vérification</option>
            <option value="payment">En paiement</option>
          </select>
        </div>
        <div className="sort">
          <label htmlFor="sort-date">Trier par Date</label>
          <select id="sort-date" value={sortDate} onChange={(e) => setSortDate(e.target.value)}>
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Remboursement</th>
              <th>ID Mission</th>
              <th>Nom du Responsable</th>
              <th>Montant</th>
              <th>Lieu de Mission</th>
              <th>Date de Demande</th>
              <th>Date de Départ</th>
              <th>Date de Retour</th>
              <th>État</th>
            </tr>
          </thead>
          <tbody>
            {displayData().map((item) => (
              <tr key={item.idRemboursement}>
                <td>{item.idRemboursement}</td>
                <td>{item.idMission}</td>
                <td>{item.nomResponsable}</td>
                <td>{item.montant}</td>
                <td>{item.lieuMission}</td>
                <td>{item.dateDemande}</td>
                <td>{item.dateDepart}</td>
                <td>{item.dateRetour}</td>
                <td>{item.etat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <ul>{setupPagination()}</ul>
      </div>
    </div>
    </main>
    </div> 
    </>
  );
};

export default RemboursementTable;
