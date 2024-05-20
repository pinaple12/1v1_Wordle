import React from 'react';

const Keyboard = ({ onKeyPress }) => {
  const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

  return (
    <div className="keyboard">
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => onKeyPress(key)}
          className="key"
        >
          {key}
        </button>
      ))}
      <button onClick={() => onKeyPress('ENTER')} className="key special-key">
        ENTER
      </button>
      <button onClick={() => onKeyPress('BACKSPACE')} className="key special-key">
        BACKSPACE
      </button>
    </div>
  );
};

export default Keyboard;
