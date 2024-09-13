import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/my-login.css';
import './css/bootstrap.min.css';
import logo from '../../assets/img/logo0.png';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [isFormValidated, setIsFormValidated] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handlePasswordToggle = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            setIsFormValidated(true);
            event.stopPropagation();
        } else {
            try {
                // Send login request to the backend
                const response = await axios.post('http://localhost:5000/api/login', {
                    email,
                    password
                });

                if (response.data.success) {
                    // Handle successful login (e.g., redirect to another page)
                    navigate('/index'); // Redirect to a dashboard or another page
                } else {
                    // Handle login failure
                    setError(response.data.message || 'Login failed');
                }
            } catch (error) {
                setError('l43 An error occurred. Please try again.');
            }

            form.classList.add('was-validated');
        }
    };

    useEffect(() => {
        const card = document.querySelector('.card');
        if (card) {
            card.classList.add('animate');
        }
    }, []);

    return (
        <section className="h-100 my-login-page">
            <div className="container h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="card-wrapper">
                        <div className="brand">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="card fat">
                            <div className="card-body">
                                <h4 className="card-title">Login</h4>
                                {error && <div className="alert alert-danger">{error}</div>}
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
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                id="password"
                                                type={passwordType}
                                                className="form-control"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <button type="button" onClick={handlePasswordToggle} className="btn btn-outline-secondary">
                                                {passwordType === 'password' ? 'Show' : 'Hide'}
                                            </button>
                                        </div>
                                        <div className="invalid-feedback">
                                            Password is required
                                        </div>
                                        <Link to="/forgot" className="float-right">
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <div className="form-group">
                                        <div className="custom-checkbox custom-control">
                                            <input
                                                type="checkbox"
                                                name="remember"
                                                id="remember"
                                                className="custom-control-input"
                                            />
                                            <label htmlFor="remember" className="custom-control-label">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group m-0">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Login
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

export default LoginPage;
