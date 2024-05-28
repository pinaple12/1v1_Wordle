import React, { useState, useEffect } from 'react';
import greenAvatar from '../img/green_avatar.png';
import yellowAvatar from '../img/yellow_avatar.png';
import { Link } from 'react-router-dom';

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
    <div className="lobby-page">
      <div className="lobby-container">
        <h1>Create Lobby</h1>
        <button className="lobby-btn" onClick={handleCreateLobby}>Create</button>
        { roomCode && (
        <div className="lobby-info">
          <div className="room-code"><h2>Room Code: 123123</h2></div>
          <p>Share This Code With Your Friend To Invite Them To The Game.</p>
          <div className="users-container">
            <div className="user">
              <img src={greenAvatar} alt="Host Avatar" />
              <span>{user.username}<span className="status-dot"></span></span>
            </div>
            <div className="user">
              <img src={guest ? greenAvatar : yellowAvatar} alt="Friend Avatar" />
              <span>
                {guest ? `${guest.username} <span className="status-dot"></span>` : 'Waiting for guest...'}
              </span>
            </div>
          </div>
          <button className="start-btn" onClick={() => window.location.href = '/game'}>
            Start
          </button>
          <Link to={`/`} className='quit'>Quit Lobby</Link>
        </div>
        )}
      </div>
    </div>
  );
};

export default CreateLobby;


