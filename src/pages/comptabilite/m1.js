import React, { useEffect, useState } from 'react';
import './css/m1.css'; // Import your CSS file
import Header from '../../components/comptabilite/Header';
import Sidebar from '../../components/comptabilite/Sidebar';

const demandesApprouvees = [
    {
        id: 1,
        date_depart: '2024-07-23',
        heure_depart: '09:00',
        date_arrivee: '2024-07-30',
        heure_arrivee: '23:00',
        destination: 'Rabat',
        echelle: 20,
        type: 'réel',
    },
    {
        id: 2,
        date_depart: '2024-07-22',
        heure_depart: '14:00',
        date_arrivee: '2024-07-22',
        heure_arrivee: '20:00',
        destination: 'Laayoune',
        echelle: 12,
        type: 'forfaitaire',
    }
    // Add more demandes here
];

const getRemboursementParEchelle = (echelle) => {
    if (echelle >= 8 && echelle <= 12) {
        return 40;
    } else if (echelle >= 13 && echelle <= 19) {
        return 60;
    } else if (echelle >= 20 && echelle <= 22) {
        return 80;
    } else if (echelle >= 23 && echelle <= 26) {
        return 100;
    } else {
        return 30; // For echelle 8 and less
    }
};

const DemandesApprouvees = () => {
    const [demandes, setDemandes] = useState([]);

    useEffect(() => {
        // Simulate fetching data
        setDemandes(demandesApprouvees);
    }, []);

    const calculerRemboursement = (demande) => {
        const dateDepart = new Date(demande.date_depart + 'T' + demande.heure_depart);
        const dateArrivee = new Date(demande.date_arrivee + 'T' + demande.heure_arrivee);

        let totalPoints = 0;
        let pointsMatin = 0;
        let pointsApresMidi = 0;
        let pointsSoir = 0;

        const debutMatin = 0;
        const finMatin = 5;
        const debutApresMidi = 11;
        const finApresMidi = 14;
        const debutSoir = 18;
        const finSoir = 21;

        let current = new Date(dateDepart);

        let rows = '';
        while (current <= dateArrivee) {
            const currentDate = new Date(current);

            let startHour = (currentDate.toDateString() === dateDepart.toDateString()) ? dateDepart.getHours() : 0;
            let endHour = (currentDate.toDateString() === dateArrivee.toDateString()) ? dateArrivee.getHours() : 24;

            const pointsMatinJour = (startHour < finMatin && endHour >= debutMatin) ? 1 : 0;
            const pointsApresMidiJour = (startHour < finApresMidi && endHour >= debutApresMidi) ? 1 : 0;
            const pointsSoirJour = (startHour < finSoir && endHour >= debutSoir) ? 1 : 0;

            pointsMatin += pointsMatinJour;
            pointsApresMidi += pointsApresMidiJour;
            pointsSoir += pointsSoirJour;

            rows += `
                <tr>
                    <td>${currentDate.toISOString().split('T')[0]}</td>
                    <td>${(currentDate.toDateString() === dateDepart.toDateString()) ? demande.heure_depart : ''}</td>
                    <td>${(currentDate.toDateString() === dateArrivee.toDateString()) ? demande.heure_arrivee : ''}</td>
                    <td>${demande.destination}</td>
                    <td>${demande.echelle}</td>
                    <td>${pointsMatinJour}</td>
                    <td>${pointsApresMidiJour}</td>
                    <td>${pointsSoirJour}</td>
                    <td>${''}</td>
                    <td>${''}</td>
                </tr>
            `;
            current.setDate(current.getDate() + 1);
        }

        totalPoints = pointsMatin + pointsApresMidi + pointsSoir;
        const remboursementParPoint = getRemboursementParEchelle(demande.echelle);
        const remboursement = totalPoints * remboursementParPoint;

        const results = {
            demande,
            rows,
            totalPoints,
            pointsMatin,
            pointsApresMidi,
            pointsSoir,
            remboursement,
        };

        localStorage.setItem('resultatsCalcul', JSON.stringify(results));
        window.location.href = '/compta_resultats';
    };

    return (
        <>
            <Header />
            <div className="main-container">
                <Sidebar />
                <div className="container">
                    <ul className="demandes-list">
                    <h1>Demandes Approuvées</h1>
                        {demandes.map(demande => (
                            <li key={demande.id} className="demande-item">
                                <div>
                                    <p>Destination: {demande.destination}</p>
                                    <p>Date de départ: {demande.date_depart} à {demande.heure_depart}</p>
                                    <p>Date d'arrivée: {demande.date_arrivee} à {demande.heure_arrivee}</p>
                                    <p>Échelle: {demande.echelle}</p>
                                    <p>Type: {demande.type}</p>
                                </div>
                                <button onClick={() => calculerRemboursement(demande)}>Calculer Remboursement</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default DemandesApprouvees;
