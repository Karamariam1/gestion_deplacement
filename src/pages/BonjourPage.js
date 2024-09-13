// src/pages/BonjourPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function BonjourPage() {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    };
    return (
        <div>
            <Header />
            <h1>Bonjour</h1>
            <button onClick={goToHomePage}>Go to Home Page</button>
       
        </div>
    );
}

export default BonjourPage;

