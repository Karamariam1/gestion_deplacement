import React, { useState } from 'react';
import './css/prfl.css'; 
import Header from '../../components/comptabilite/Header';
import Sidebar from '../../components/comptabilite/Sidebar';

const Profile = () => {
    const [name, setName] = useState('Jean Dupont');
    const [email, setEmail] = useState('jean.dupont@example.com');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);

    const updateProfile = () => {
        // Simulate a successful update
        setMessage('Profil mis à jour avec succès!');
        setHistory([...history, { date: new Date().toLocaleString(), change: `Mise à jour du profil: Nom=${name}, Email=${email}`, user: name }]);
    };

    const changePassword = () => {
        if (newPassword !== confirmPassword) {
            setMessage('Les nouveaux mots de passe ne correspondent pas!');
            return;
        }

        // Simulate a successful password change
        setMessage('Mot de passe changé avec succès!');
        setHistory([...history, { date: new Date().toLocaleString(), change: 'Changement de mot de passe', user: name }]);
    };

    return (
        <>
        <Header />
        <div className="main-container">

            <Sidebar />

            <main>
                <section className="profile">
                    <h1>Profil</h1>
                    <form id="profile-form" onSubmit={(e) => { e.preventDefault(); updateProfile(); } }>
                        <label htmlFor="manager-name">Nom:</label>
                        <input
                            type="text"
                            id="manager-name"
                            name="manager-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />

                        <label htmlFor="manager-email">Email:</label>
                        <input
                            type="email"
                            id="manager-email"
                            name="manager-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />

                        <button type="submit">Mettre à jour</button>
                    </form>

                    <form id="password-form" onSubmit={(e) => { e.preventDefault(); changePassword(); } }>
                        <h2>Changer le Mot de Passe</h2>
                        <label htmlFor="current-password">Mot de passe actuel:</label>
                        <input
                            type="password"
                            id="current-password"
                            name="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required />

                        <label htmlFor="new-password">Nouveau mot de passe:</label>
                        <input
                            type="password"
                            id="new-password"
                            name="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required />

                        <label htmlFor="confirm-password">Confirmer le nouveau mot de passe:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required />

                        <button type="submit">Changer le mot de passe</button>
                    </form>

                    {message && <div id="message" style={{ color: message.includes('réussi') ? 'green' : 'red' }}>{message}</div>}
                </section>

                <section className="profile-history">
                    <h2>Historique des Modifications</h2>
                    <table id="history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Changement</th>
                                <th>Utilisateur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.date}</td>
                                    <td>{entry.change}</td>
                                    <td>{entry.user}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div></>
    );
};

export default Profile;
