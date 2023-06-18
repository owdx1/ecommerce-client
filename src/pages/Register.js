import React, { useState } from 'react'
import '../styles/Register.css'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method:'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify({username, email,password}),
      });

      if(response.ok) {
        setRegisterSuccess(true);
        //navigate('/login')

      } else {
        throw new Error(`HTTP error, status = ${response.status}`)
      }
    
    } catch (error) {
      setError(`Failed to log in: ${error.message}`);
      
    }
  };
    
  return (
    <div className='register-container'>
      <div className='form-group'>
          <label>Username:</label>
          <input 
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
      </div>
      <div className='form-group'>
          <label>Email:</label>
          <input 
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
      </div>
      <div className='form-group'>
          <label>Password:</label>
          <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
      </div> 
      <button className='register-button' onClick={handleRegister}>
        Register
      </button>   
      {error && <p>{error}</p>}
      {registerSuccess && 
        <div>
          <p>Registration Successful! Please navigate to the Login page.</p>
          <NavLink to="/login">Go to Login</NavLink>
        </div>
      }
      
  </div>
  )
}
