import React, { useState, useEffect } from 'react';

const CreateLobby = ({ user }) => {
  const [roomCode, setRoomCode] = useState('');
  const [word, setWord] = useState('');
  const [guest, setGuest] = useState(null);

  /** 
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
  }, [socket]); */

  const handleCreateLobby = async () => {
    const lobbyResponse = await fetch('/games/createLobby', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerName: 'staticUser' })
    })

    if (lobbyResponse.status !== 200) {
      return ('fatal error');
    }

    const lobbyData = await lobbyResponse.json();

    setWord(lobbyData.word);
    setRoomCode(lobbyData.gameCode);
    handleWs(lobbyData.gameCode);
  };

  const handleWs = async (gameCode) => {
    console.log('got here');

    const webSocket = new WebSocket("ws://localhost:3000/gameSockets");
    console.log('webSocket', webSocket);

    webSocket.addEventListener('open', (_event) => {
      webSocket.send(JSON.stringify({ action: 'create', gameCode}));
    });
  }

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
