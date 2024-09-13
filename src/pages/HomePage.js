// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/HomePage.css';
import logo from '../assets/img/logo0.png';

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const logoElement = document.querySelector('.logo img');
        let iterationCount = 0;

        const handleAnimationIteration = () => {
            iterationCount += 1;
            if (iterationCount === 1) {
                // Déclencher la redirection après la troisième itération
                navigate('/login');
            }
        };

        const handleAnimationEnd = () => {
            // Si l'animation se termine avant d'atteindre 3 itérations, rediriger immédiatement
            if (iterationCount < 2) {
                navigate('/login');
            }
        };

        // Ajouter des écouteurs d'événements
        logoElement.addEventListener('animationiteration', handleAnimationIteration);
        logoElement.addEventListener('animationend', handleAnimationEnd);

        // Cleanup
        return () => {
            logoElement.removeEventListener('animationiteration', handleAnimationIteration);
            logoElement.removeEventListener('animationend', handleAnimationEnd);
        };
    }, [navigate]);

    return (
        <div className="container">
            <div className="logo">
                <img src={logo} alt="Logo animé" />
            </div>
        </div>
    );
}

export default HomePage;
