import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await fetch('http://localhost:5000/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.username);
                    setToken(data.token); // Here we set the new token received
                    localStorage.setItem('token', data.token);
                } else {
                    if (response.status === 401) {
                        // if status code is 401 (Unauthorized), we remove the token
                        localStorage.removeItem('token');
                        setToken(null);
                        // and redirect to login page
                        navigate('/login');
                    } else {
                        throw new Error(`HTTP error, status = ${response.status}`);
                    }
                }
            } catch (error) {
                console.error(`Failed to fetch profile: ${error.message}`);
                navigate('/error');
            }
        };

        getProfileData();
    }, [token, navigate]); // If the token changes, this will run again

    const handleLogout = async () => {
        try {
            const decodedToken = jwt_decode(token);
            const response = await fetch('http://localhost:5000/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: decodedToken.id }),
            });

            if (response.ok) {
                localStorage.removeItem('token');
                setToken(null);
                navigate('/');
            } else {
                throw new Error(`Logout failed, status = ${response.status}`);
            }
        } catch (error) {
            console.error(`Failed to logout: ${error.message}`);
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <h1>Profile</h1>
                    <h2>Welcome, {user}!</h2>
                    <button onClick={handleLogout}>Log Out</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
