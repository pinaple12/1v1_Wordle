import React, { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket';

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
    <div className="join-lobby-page">
      <h1>Join Lobby</h1>
      <input
        type="text"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        placeholder="Enter Room Code"
      />
      <button onClick={handleJoinLobby}>Join</button>
      {joined && (
        <div className="lobby-info">
          <p>Room Code: {roomCode}</p>
          <p>Host: {host.username}</p>
          <p>Guest: {guest.username}</p>
          <button onClick={() => socket.send(JSON.stringify({ action: 'startGame', roomCode }))}>
            Ready Up
          </button>
        </div>
      )}
    </div>
  );
};

export default JoinLobby;
