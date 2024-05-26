import React from 'react';
import { Link } from 'react-router-dom';
import logoTitle from '../img/logo.png';

const Navbar = ({ user }) => (
  <nav className="header"> 
    <Link to="/" className="logo-container">
      <img src={logoTitle} alt="Wordle 1v1 Logo and Title" className="logo-title"/>
    </Link>
    {user && 
      <Link to="/profile" className='profile-container'>Profile</Link>
    }

  </nav>
);

export default Navbar;