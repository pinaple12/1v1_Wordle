import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => (
  <nav>
    <Link to="/">Home</Link>
    {user && <Link to={`/user/${encodeURIComponent(user.username)}`}>Profile</Link>}
  </nav>
);

export default Navbar;
