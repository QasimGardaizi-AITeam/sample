import React, { useState, useEffect, useRef } from 'react';
import Bird from './components/Bird';
import Pipe from './components/Pipe';
import GameOver from './components/GameOver';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState('ready');
  const [birdY, setBirdY] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([{ id: 1, x: 800, gapY: 300 }]);
  const [score, setScore] = useState(0);
  const gameBoardRef = useRef(null);

  useEffect(() => {
    const gameLoop = () => {
      if (gameState === 'playing') {
        setBirdY((prevY) => prevY + birdVelocity);
        setBirdVelocity((prevVelocity) => prevVelocity + 0.5);
        setPipes((prevPipes) => prevPipes.map((pipe) => ({...pipe, x: pipe.x - 3 })));
        checkCollisions();
        checkScore();
      }
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, [gameState, birdY, birdVelocity, pipes, score]);

  const checkCollisions = () => {
    const birdRect = {
      top: birdY,
      bottom: birdY + 30,
      left: 500 - 15,
      right: 500 + 15,
    };

    pipes.forEach((pipe) => {
      const pipeTopRect = {
        top: 0,
        bottom: pipe.gapY,
        left: pipe.x,
        right: pipe.x + 80,
      };
      const pipeBottomRect = {
        top: pipe.gapY + 150,
        bottom: 600,
        left: pipe.x,
        right: pipe.x + 80,
      };

      if (
        birdRect.right > pipeTopRect.left &&
        birdRect.left < pipeTopRect.right &&
        birdRect.bottom > pipeTopRect.top &&
        birdRect.top < pipeTopRect.bottom
      ) {
        setGameState('gameOver');
      }
      if (
        birdRect.right > pipeBottomRect.left &&
        birdRect.left < pipeBottomRect.right &&
        birdRect.bottom > pipeBottomRect.top &&
        birdRect.top < pipeBottomRect.bottom
      ) {
        setGameState('gameOver');
      }
    });

    if (birdY < 0 || birdY > 600 - 30) {
      setGameState('gameOver');
    }
  };

  const checkScore = () => {
    pipes.forEach((pipe) => {
      if (pipe.x < 500 && pipe.x > 400) {
        setScore((prevScore) => prevScore + 1);
      }
    });
  };

  const handleJump = () => {
    if (gameState === 'playing') {
      setBirdVelocity(-8);
    }
  };

  const handleRestart = () => {
    setGameState('playing');
    setBirdY(250);
    setBirdVelocity(0);
    setPipes([{ id: 1, x: 800, gapY: 300 }]);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState]);

  useEffect(() => {
    const handleClick = () => {
      handleJump();
    };

    gameBoardRef.current.addEventListener('click', handleClick);

    return () => {
      gameBoardRef.current.removeEventListener('click', handleClick);
    };
  }, [gameState]);

  return (
    <div className="game-container">
      <div className="game-board" ref={gameBoardRef}>
        {pipes.map((pipe) => (
          <Pipe key={pipe.id} x={pipe.x} gapY={pipe.gapY} />
        ))}
        <Bird y={birdY} />
        <div className="score">Score: {score}</div>
        {gameState === 'gameOver' && (
          <GameOver score={score} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
};

export default App;