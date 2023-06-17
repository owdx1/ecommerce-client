import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
                    throw new Error(`HTTP error, status = ${response.status}`);
                }
            } catch (error) {
                console.error(`Failed to fetch profile: ${error.message}`);
                navigate('/error');
            }
        };

        getProfileData();
    }, [token, navigate]); // If the token changes, this will run again

    return (
        <div>
            {user ? (
                <>
                    <h1>Profile</h1>
                    <h2>Welcome, {user}!</h2>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
