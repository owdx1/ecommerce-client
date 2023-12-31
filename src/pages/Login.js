import React, { useState } from 'react';
import '../styles/Login.css'
import { NavLink, useNavigate } from 'react-router-dom';


export default function Login() {
    //const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('token', token);
                setLoginSuccess(true);
                //navigate('/'); 
            } else {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
        } catch (error) {
            setError(`Failed to log in: ${error.message}`);
        }
    };

    return (
        <div className="login-container">
            
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button className="login-button" onClick={handleLogin}>
                Log In
            </button>
            {error && <p>{error}</p>} 
            <div className="registerNow">
            
                <NavLink to="/register">
                    <button className="registerButton">New here? Register now </button>
                </NavLink>
            </div>
            {loginSuccess && <NavLink to="/shop" />}
        </div>
    );
}

