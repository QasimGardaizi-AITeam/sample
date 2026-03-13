import React from 'react';

const GameOver = ({ score, onRestart }) => {
  return (
    <div className="game-over-overlay">
      <div className="game-over-container">
        <h1>Game Over</h1>
        <p>Your score: {score}</p>
        <button onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
};

export default GameOver;