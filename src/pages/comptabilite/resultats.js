import React, { useEffect, useState } from 'react';
import './css/styles100.css'; // Import your CSS file
import Header from '../../components/comptabilite/Header';
import Sidebar from '../../components/comptabilite/Sidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const Resultats = () => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        // Fetch results from localStorage
        const savedResults = JSON.parse(localStorage.getItem('resultatsCalcul'));
        setResults(savedResults);
    }, []);

    const exporterPDF = () => {
        if (!results) return;

        const doc = new jsPDF();
        doc.text("Résultats du Remboursement", 14, 16);
        doc.autoTable({
            head: [['Date', 'Heure Départ', 'Heure Retour', 'Destination', 'Échelle', '0h-5h', '11h-14h', '18h-21h', 'Transport', 'Observations']],
            body: results.rows.split('</tr>').map(row => {
                return row.replace(/<\/?td>/g, '').replace(/<\/?th>/g, '').split('</td><td>');
            }).filter(row => row.length > 1),
            foot: [['', '', '', '', 'Total', results.pointsMatin, results.pointsApresMidi, results.pointsSoir, results.totalPoints, `${results.remboursement} DH`]]
        });
        doc.save('demandes_remboursement.pdf');
    };

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/compta_m1');
    };

    return (
        <>
            <Header />
            <div className="">
                <h1>Résultats du Remboursement</h1>
                <div id="tables-container">
                    {results && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Heure Départ</th>
                                    <th>Heure Retour</th>
                                    <th>Destination</th>
                                    <th>Échelle</th>
                                    <th>0h-5h</th>
                                    <th>11h-14h</th>
                                    <th>18h-21h</th>
                                    <th>Transport</th>
                                    <th>Observations</th>
                                </tr>
                            </thead>
                            <tbody dangerouslySetInnerHTML={{ __html: results.rows }} />
                            <tfoot>
                                <tr>
                                    <td colSpan="5">Total</td>
                                    <td>{results.pointsMatin}</td>
                                    <td>{results.pointsApresMidi}</td>
                                    <td>{results.pointsSoir}</td>
                                    <td>{results.totalPoints}</td>
                                    <td>{results.remboursement} DH</td>
                                </tr>
                            </tfoot>
                        </table>
                    )}
                </div>
                <button className="export-button" onClick={exporterPDF}>Exporter en PDF</button>
                <button onClick={goToHomePage}>Retour</button>
       
            </div>
        </>
    );
};

export default Resultats;
