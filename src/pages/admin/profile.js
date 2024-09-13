import React, { useState } from 'react';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import './css/prfl.css';

const Profile = () => {
    const [username] = useState('Admin Name');
    const [email] = useState('admin@example.com');
    const [phone, setPhone] = useState('123-456-7890');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '', visible: false });

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate form data
        if (newPassword && newPassword !== confirmPassword) {
            showFeedback('Les mots de passe ne correspondent pas.', 'error');
            return;
        }

        if (currentPassword && !newPassword) {
            showFeedback('Vous devez entrer un nouveau mot de passe.', 'error');
            return;
        }

        // Simulate form submission (replace with actual API call or server-side logic)
        setTimeout(() => {
            // Example: Simulating a successful update
            showFeedback('Informations mises à jour avec succès.', 'success');
            // Optionally reset form fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }, 1000);
    };

    const showFeedback = (message, type) => {
        setFeedback({ message, type, visible: true });
        setTimeout(() => {
            setFeedback({ message: '', type: '', visible: false });
        }, 5000); // Hide feedback after 5 seconds
    };

    return (
        <>
            <Header />

            <div className="main-container">
               <Sidebar />
                <main>
                    <div className="profile-content">
                        <h1>Mon Profil</h1>
                        <form id="profile-form" onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>Informations de Compte</legend>
                                <label htmlFor="username">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    readOnly
                                />

                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    readOnly
                                />

                                <label htmlFor="phone">Téléphone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </fieldset>

                            <fieldset>
                                <legend>Changer le Mot de Passe</legend>
                                <label htmlFor="current-password">Mot de Passe Actuel</label>
                                <input
                                    type="password"
                                    id="current-password"
                                    name="current-password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />

                                <label htmlFor="new-password">Nouveau Mot de Passe</label>
                                <input
                                    type="password"
                                    id="new-password"
                                    name="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />

                                <label htmlFor="confirm-password">Confirmer le Nouveau Mot de Passe</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </fieldset>

                            <button type="submit">Mettre à Jour</button>
                        </form>

                        {feedback.visible && (
                            <div id="feedback" className={`feedback ${feedback.type}`}>
                                {feedback.message}
                            </div>
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

export default Profile;
