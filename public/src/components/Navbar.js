import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => (
  <nav>
    <Link to="/">Home</Link>
    {user && <Link to="/profile">Profile</Link>}
  </nav>
);

export default Navbar;
