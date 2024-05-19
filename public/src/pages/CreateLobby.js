import React, { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket';

const CreateLobby = ({ user }) => {
  const [roomCode, setRoomCode] = useState('');
  const [word, setWord] = useState('');
  const [guest, setGuest] = useState(null); 
  const socket = useSocket('ws://localhost:3000/gameSocket'); 

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.action === 'lobbyCreated') {
          setRoomCode(data.roomCode);
          setWord(data.word); 
        } else if (data.action === 'guestJoined') {
          setGuest(data.guest);
        }
      };
    }
  }, [socket]);

  const handleCreateLobby = () => {
    if (socket) {
      socket.send(JSON.stringify({ action: 'createLobby' }));
    }
  };

  return (
    <div className="create-lobby-page">
      <h1>Create Lobby</h1>
      <button onClick={handleCreateLobby}>Create</button>
      {roomCode && (
        <div className="lobby-info">
          <p>Room Code: {roomCode}</p>
          <p>Host: {user.username}</p>
          {guest ? <p>Guest: {guest.username}</p> : <p>Waiting for guest...</p>}
        </div>
      )}
    </div>
  );
};

export default CreateLobby;
