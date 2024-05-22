import React from 'react';

const GameEndPopup = ({ result, word, points, onRestart }) => {
  return (
    <div className="game-end-popup">
      <h2>{result === 'win' ? 'Congratulations, You Win!' : 'Game Over, You Lose!'}</h2>
      <p>The word was: {word}</p>
      <p>Points: {points}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default GameEndPopup;
