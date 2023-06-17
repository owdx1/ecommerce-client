import React from "react";
import './styles/Header.css'
import { NavLink } from 'react-router-dom';

export default function Header(){
  const token = localStorage.getItem('token');

  console.log(token);

  return (
    <nav>
      <NavLink to='/'>Shop</NavLink>
      <NavLink to='/contact'>Contact</NavLink>
      {token ? (<NavLink to="/profile"> Profile </NavLink>) : (<NavLink to="/login"> Log In</NavLink>)}
    </nav>
  )
}
