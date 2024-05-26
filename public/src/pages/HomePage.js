import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ user }) => (
  <div className="home-page">
    <h1>Welcome to Wordle 1v1 test</h1>
    <p>Welcome to Wordle 1v1, the competitive word game where you can challenge your friends and test your word-guessing skills. Ready to start a game? Choose an option below!</p>
    {user ? (
      <>
        <Link to="/create-lobby">Create Lobby (Work in Progress)</Link>
        <br />
        <Link to="/join-lobby">Join Lobby (Work in Progress)</Link>
        <br />
        <Link to={`/user/${encodeURIComponent(user.username)}`}>Profile (Work in Progress)</Link>
        <br />
        <Link to="/game">game (Try this!)</Link>
        <br />
      </>
    ) : (
      <Link to="/login">Login</Link>
    )}
    <Link to="/learn">Learn How to Play</Link>
  </div>
);

export default HomePage;
