import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/my-login.css';
import './css/bootstrap.min.css';  // Importer les styles locaux
import logo from '../../assets/img/logo.jpg'; // Importer l'image du logo
// src/pages/ForgotPasswordPage.js

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isFormValidated, setIsFormValidated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            setIsFormValidated(true);
            event.stopPropagation();
        } else {
            // Handle successful form submission here
            console.log("Reset password link sent");
            navigate('/reset');  // Navigate after successful form submission
        }

        form.classList.add('was-validated');
    };

    return (
        <section className="h-100 my-login-page">
            <div className="container h-100">
                <div className="row justify-content-md-center align-items-center h-100">
                    <div className="card-wrapper">
                        <div className="brand">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="card fat">
                            <div className="card-body">
                                <h4 className="card-title">Forgot Password</h4>
                                <form className={`my-login-validation ${isFormValidated ? 'was-validated' : ''}`} onSubmit={handleSubmit} noValidate>
                                    <div className="form-group">
                                        <label htmlFor="email">E-Mail Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            autoFocus
                                        />
                                        <div className="invalid-feedback">
                                            Email is invalid
                                        </div>
                                        <div className="form-text text-muted">
                                            By clicking "Reset Password" we will send a password reset link
                                        </div>
                                    </div>

                                    <div className="form-group m-0">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Reset Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgotPasswordPage;
