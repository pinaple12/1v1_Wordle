import React, { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket';
import greenAvatar from '../img/green_avatar.png';
import yellowAvatar from '../img/yellow_avatar.png';
import { Link } from 'react-router-dom';

const JoinLobby = ({ user }) => {
  const [roomCode, setRoomCode] = useState('');
  const [joined, setJoined] = useState(false);
  const [host, setHost] = useState(null);
  const [guest, setGuest] = useState(user);
  const socket = useSocket('ws://localhost:3000/gameSocket');

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.action === 'guestJoined') {
          setJoined(true);
          setHost(data.host);
        } else if (data.action === 'gameStarted') {
          window.location.href = `/game?roomCode=${roomCode}`;
        }
      };
    }
  }, [socket]);

  const handleJoinLobby = () => {
    if (socket && roomCode) {
      socket.send(JSON.stringify({ action: 'joinLobby', roomCode, guestUsername: user.username }));
    }
  };

  return (
    <div className="lobby-page">
      <div className="lobby-container">
        <h1>Join Lobby</h1>
        <div className="join-lobby-inputs">
          <input 
            type="text" 
            className="room-code-input" 
            placeholder="Enter Room Code"
            value={roomCode} 
            onChange={(e) => setRoomCode(e.target.value)} 
          />
          <button className="lobby-btn-join" onClick={handleJoinLobby}>Start</button>
        </div> 
        {joined && (
          <div className="lobby-info">
            <div className="users-container">
              <div className="user">
                <img src={greenAvatar} alt="Host Avatar" />
                <span>{host ? host.username : 'Host Username'} <span className="status-dot"></span></span>
              </div>
              <div className="user">
                <img src={greenAvatar} alt="Your Avatar" />
                <span>{guest.username} <span className="status-dot"></span></span>
              </div>
            </div>
            <p>Once Your Friend Joins And Clicks Start, The Game Will Start Automatically.</p>
            <Link to={`/`} className="quit">Quit Lobby</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinLobby;
