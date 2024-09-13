import React, { useState, useEffect } from 'react';
import Layout from '../../components/fonctionnaire/Layout';
import './css/stylesprofile.css';
import user from '../../assets/img/image.png';

const UserProfile = () => {
    const [fullName, setFullName] = useState('Jean Dupont');
    const [affectation] = useState('Informatique');
    const [grade] = useState('Manager');
    const [email, setEmail] = useState('jean.dupont@example.com');
    const [phone, setPhone] = useState('+212 6 12 34 56 78');
    const [notifications] = useState([
        'Votre remboursement #1 est en cours de vérification.',
        'Votre remboursement #2 a été payé.',
        'Votre mission #3 a été approuvée.'
    ]);
    const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            const notificationIcon = document.getElementById('notification-icon');
            const notificationDropdown = document.getElementById('notification-dropdown');
    
            if (
                notificationIcon &&
                notificationDropdown &&
                !notificationIcon.contains(e.target) &&
                !notificationDropdown.contains(e.target)
            ) {
                setNotificationDropdownVisible(false);
            }
        };
    
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to an API or update local storage
        console.log('Form data:', { fullName, affectation, grade, email, phone });
    };

    return (
        <Layout>
            <div className="main-container">
                <nav className="side-nav">
                    <a href="/ordremission">Nouvelle Mission</a>
                    <a href="/remboursement">Demande de Remboursement</a>
                    <a href="/historique_choix">Voir Historique</a>
                </nav>
                <main>
                    <div className="container">
                        <div className="profile-card">
                            <div className="profile-header">
                                <h1>Profil Utilisateur</h1>
                                <img src={user} alt="Photo de Profil" className="profile-pic" />
                                <h2>{fullName}</h2>
                                <p>{`${grade}, ${affectation}`}</p>
                            </div>
                            <div className="profile-body">
                                <form id="profile-form" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <legend>Informations Personnelles</legend>
                                        <label htmlFor="full-name">Nom Complet</label>
                                        <input
                                            type="text"
                                            id="full-name"
                                            name="full-name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        />

                                        <label htmlFor="affectation">Affectation</label>
                                        <input
                                            type="text"
                                            id="affectation"
                                            name="affectation"
                                            value={affectation}
                                            readOnly
                                        />

                                        <label htmlFor="grade">Grade</label>
                                        <input
                                            type="text"
                                            id="grade"
                                            name="grade"
                                            value={grade}
                                            readOnly
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <legend>Coordonnées</legend>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />

                                        <label htmlFor="phone">Téléphone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </fieldset>

                                    <div className="button-container">
                                        <button type="submit">Enregistrer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <footer>
                <p>© 2024 Agence Urbaine de Laayoune</p>
            </footer>
        </Layout>
    );
};

export default UserProfile;
