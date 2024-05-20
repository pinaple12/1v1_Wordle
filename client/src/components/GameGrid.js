import React from 'react';

const GameGrid = ({ guesses, feedback }) => {
  return (
    <div className="game-grid">
      {guesses.map((guess, index) => (
        <div key={index} className="guess-row">
          {guess.split('').map((letter, i) => (
            <span key={i} className={`letter ${feedback[index][i]}`}>
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
