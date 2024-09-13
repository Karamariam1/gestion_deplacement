import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import './css/styleforfait.css';
import Header from '../../components/manager/Header';
import Sidebar from '../../components/manager/Sidebar';

const employeesData = [
    { id: 1, name: 'Jean Dupont', status: 'Présent', forfaitBalance: 2, availability: '2024-08-01 to 2024-08-31', absences: [{ reason: 'Congé', from: '2024-07-01', to: '2024-07-15' }] },
    { id: 2, name: 'Marie Curie', status: 'Congé', forfaitBalance: 2, availability: '', absences: [{ reason: 'Congé', from: '2024-08-01', to: '2024-08-15' }] },
    { id: 3, name: 'Albert Einstein', status: 'Présent', forfaitBalance: 1, availability: '2024-08-16 to 2024-08-31', absences: [{ reason: 'Arrêt Maladie', from: '2024-07-10', to: '2024-07-20' }] },
    { id: 4, name: 'Isaac Newton', status: 'Arrêt Maladie', forfaitBalance: 2, availability: '', absences: [{ reason: 'Arrêt Maladie', from: '2024-08-05', to: '2024-08-20' }] }
];

const blockedDates = [
    '2024-08-01', '2024-08-02', '2024-08-03', '2024-08-04', '2024-08-05', '2024-08-06',
    '2024-08-14', '2024-08-20', '2024-08-21', '2024-08-24'
];

const holidayDates = ['2024-08-15', '2024-08-16'];

const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
};

const isPeriodValid = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return !blockedDates.some(date => {
        const blocked = new Date(date);
        return blocked >= start && blocked <= end;
    });
};

const ForfaitaryTravel = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [travelPeriod, setTravelPeriod] = useState([]);
    const [history, setHistory] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const handleEmployeeSelect = (event) => {
        const employeeId = parseInt(event.target.value);
        setSelectedEmployee(employeesData.find(emp => emp.id === employeeId));
        setShowDetails(true);
        setShowHistory(false);
    };

    const handleAssignTravel = () => {
        if (selectedEmployee && selectedEmployee.status === 'Présent' && selectedEmployee.forfaitBalance > 0) {
            if (travelPeriod.length === 2) {
                const startDate = formatDate(travelPeriod[0]);
                const endDate = formatDate(travelPeriod[1]);

                if (isPeriodValid(travelPeriod[0], travelPeriod[1])) {
                    setSelectedEmployee(prev => ({ ...prev, forfaitBalance: prev.forfaitBalance - 1 }));
                    setHistory(prev => [...prev, {
                        name: selectedEmployee.name,
                        period: `${startDate} to ${endDate}`,
                        attributionDate: formatDate(new Date())
                    }]);
                    setStatusMessage(`Déplacement forfaitaire attribué à ${selectedEmployee.name}. Solde restant: ${selectedEmployee.forfaitBalance - 1}`);
                    setShowDetails(false);
                    setShowHistory(true);
                } else {
                    setStatusMessage(`Impossible d'attribuer un déplacement forfaitaire pendant les jours bloqués.`);
                }
            } else {
                setStatusMessage(`Veuillez sélectionner une période valide.`);
            }
        } else {
            setStatusMessage(`Impossible d'attribuer un déplacement forfaitaire. Vérifiez le statut et le solde de l'employé.`);
        }
    };

    return (
        <>
            <Header />
            <div className="main-container">
                <Sidebar />
                <main>
                    {!showDetails && !showHistory && (
                        <div id="employee-selection-container">
                            <h1>Attribuer Déplacement Forfaitaire</h1>
                            <form id="employee-form">
                                <label htmlFor="employee-select">Sélectionner Employé</label>
                                <select id="employee-select" onChange={handleEmployeeSelect}>
                                    <option value="">Choisissez un employé</option>
                                    {employeesData.map(employee => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.name} (Solde: {employee.forfaitBalance})
                                        </option>
                                    ))}
                                </select>
                                <button type="button" onClick={() => setShowDetails(true)}>Voir les détails de l'employé</button>
                            </form>
                        </div>
                    )}

                    {showDetails && (
                        <div id="employee-details-container">
                            <button type="button" onClick={() => setShowDetails(false)}>Retour à la sélection</button>
                            <h2>Détails de l'Employé</h2>
                            <p id="employee-info">
                                Nom: {selectedEmployee?.name}, Statut: {selectedEmployee?.status}, Solde de déplacements forfaitaires: {selectedEmployee?.forfaitBalance}
                            </p>
                            <label htmlFor="travel-period">Sélectionner la période du déplacement forfaitaire:</label>
                            <Flatpickr
                                id="travel-period"
                                options={{
                                    mode: "range",
                                    dateFormat: "Y-m-d",
                                    disable: [...blockedDates, ...holidayDates],
                                    onDayCreate: (dObj, dStr, fp, dayElem) => {
                                        const date = formatDate(dayElem.dateObj);
                                        if (blockedDates.includes(date)) {
                                            dayElem.classList.add('blocked');
                                        } else if (holidayDates.includes(date)) {
                                            dayElem.classList.add('holiday');
                                        }
                                    }
                                }}
                                value={travelPeriod}
                                onChange={dates => setTravelPeriod(dates)}
                            />
                            <button type="button" onClick={handleAssignTravel}>Attribuer Déplacement Forfaitaire</button>
                            <div id="status-message">{statusMessage}</div>
                        </div>
                    )}

                    {showHistory && (
                        <div id="history-container">
                            <h2>Historique des Déplacements Forfaitaires</h2>
                            <table id="history-table" className='history-table'>
                                <thead>
                                    <tr>
                                        <th>Employé</th>
                                        <th>Période</th>
                                        <th>Date d'Attribution</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.name}</td>
                                            <td>{entry.period}</td>
                                            <td>{entry.attributionDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default ForfaitaryTravel;
