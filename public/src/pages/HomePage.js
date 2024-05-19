import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ user }) => (
  <div className="home-page">
    <h1>Welcome to Wordle 1v1</h1>
    <p>Welcome to Wordle 1v1, the competitive word game where you can challenge your friends and test your word-guessing skills. Ready to start a game? Choose an option below!</p>
    {user ? (
      <>
        <Link to="/create-lobby">Create Lobby</Link>
        <Link to="/join-lobby">Join Lobby</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/game">game</Link>
      </>
    ) : (
      <Link to="/login">Login</Link>
    )}
    <Link to="/learn">Learn How to Play</Link>
  </div>
);

export default HomePage;
