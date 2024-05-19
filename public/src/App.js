import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LearnHowToPlay from './pages/LearnHowToPlay';
import CreateLobby from './pages/CreateLobby';
import JoinLobby from './pages/JoinLobby';
import GamePage from './pages/GamePage';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  // placeholder data for now: 
  const user_data = {
    "userID": 1,
    "username": "testuser",
    "elo": 1200,
    "gamesPlayed": [1, 2, 3],
    "gamesWon": 2,
    "gamesLost": 1,
    "friends": [
      {
        "userID": 2,
        "username": "friend1"
      },
      {
        "userID": 3,
        "username": "friend2"
      }
    ],
    "requests": []
  }
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('/api/user/myIdentity');
  //       const data = await response.json();
  //       setUser(data.userInfo);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, [user?.userID]);

  return (
    <Router>
      <Navbar user={user_data} />
      <Routes>
        <Route path="/" element={<HomePage user={user_data}/>} />
        <Route path="/learn" element={<LearnHowToPlay />} />
        <Route path="/create-lobby" element={<CreateLobby user={user_data}/>} />
        <Route path="/join-lobby" element={<JoinLobby user={user_data}/>} />
        <Route path="/game" element={<GamePage user={user_data}/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
