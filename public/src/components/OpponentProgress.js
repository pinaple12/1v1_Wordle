import React from 'react';

const OpponentProgress = ({ username, guessesLeft }) => {
  return (
    <div className="opponent-progress">
      <p>{username}</p>
      <p>Guesses Left: {guessesLeft}</p>
    </div>
  );
};

export default OpponentProgress;
