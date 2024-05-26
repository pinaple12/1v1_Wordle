// import React from 'react';

// const Profile = () => {

//   const checkLogin = async () => {
//     let indetityInfo = await fetch('routes/user/myIdentity').then(res => res.json()).then(data => JSON.stringify(data));
//     if (indetityInfo.status === 'loggedin') {
//       return true;
//     } else {
//       return false;
//     }
//   }

//     return (
//       <div>
//       <h1>Profile</h1>
//       <div className="azure-auth-interface">
//       <a href="http://localhost:3000/signout" >Log out</a>
//       </div>
//     </div>
//     )

//   };

//   export default Profile;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ProfilePage = () => {

  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [friendUsername, setFriendUsername] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/user/${encodeURIComponent(username)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setUserInfo(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserInfo();
  }, [username]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const handleAddFriend = async () => {
    try {
      const response = await fetch('/user/friend-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ receiverUsername: friendUsername, senderUsername: userInfo.username})
      });
      if (!response.ok) {
        throw new Error('Failed to add friend');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const gameHistory = [
    { date: "5/17/2024", opponent: "[Username]", result: "WON", pointsGained: 200 },
    { date: "5/12/2024", opponent: "[Username]", result: "LOST", pointsGained: 0 }
  ];

  const leaderboard = [
    { position: 1, user: "[Username]", rating: 2100 },
    { position: 2, user: "[Username]", rating: 2100 },
    { position: 3, user: "[Username]", rating: 2100 },
    { position: 4, user: "[Username]", rating: 2100 }
  ];

  return (
    <div className="profile-page">
      <div className="header">
        <h1>{username}</h1>
      </div>
      <div className="statistics">
        <p>ELO Rating: {userInfo.elo}</p>
        <p>Games Played: {userInfo.gamesPlayed.length}</p>
        <p>Games Won: {userInfo.gamesWon}</p>
        <p>Games Lost: {userInfo.gamesLost}</p>
      </div>
      <div className="row">
        <div className="labeled-column">
          <div className='label'><strong>Friends</strong></div>
          <input 
              type="text" 
              placeholder="Enter Username Here" 
              value={friendUsername}
              onChange={e => setFriendUsername(e.target.value)} 
            />
            <button onClick={handleAddFriend}>Add Friend</button>
          <div className="column friends-list">
            {userInfo.friends.map((friend, index) => (
              <p key={index}>{friend}</p>
            ))}
          </div>
        </div>
        <div className="labeled-column">
          <div className='label'><strong>Game History</strong></div>
          <div className="column game-history">
            {gameHistory.map((game, index) => (
              <div key={index}>
                <p>Date: {game.date}</p>
                <p>Opponent: {game.opponent}</p>
                <p>Result: {game.result}</p>
                <p>Points Gained: {game.pointsGained}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="labeled-column">
          <div className='label'><strong>Leaderboard</strong></div>                    
          <div className="column leaderboard">
            {leaderboard.map((entry, index) => (
              <div key={index}>
                <p>{entry.position}. {entry.user} (ELO Rating: {entry.rating})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
    {userInfo.username === session.account.username && (
      <button className="button" onClick={() => console.log("Log Out")}>
        Log Out
      </button>
    )}
  </div>    </div>
  );
};

export default ProfilePage;
