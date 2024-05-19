import React from 'react';

const LearnHowToPlay = () => (
    <div className="learn-how-to-play-page">
        <h1>How to Play Wordle 1v1</h1>
        <p>Welcome to Wordle 1v1! This guide will help you understand the rules and mechanics so you can start challenging your friends and enjoy the excitement of this competitive word game.</p>
        <h2>Game Rules:</h2>
        <h3>Objective:</h3>
        <p>The goal is to guess the hidden 5-letter word before your opponent within six attempts.</p>
        <h3>Gameplay:</h3>
        <ol>
            <li>Each player takes turns to guess a word.</li>
            <li>After each guess, the letters are highlighted in different colors to provide clues:
            <ul>
                <li><strong>GREEN:</strong> The letter is in the word and in the correct position.</li>
                <li><strong>YELLOW:</strong> The letter is in the word but in the wrong position.</li>
                <li><strong>GRAY:</strong> The letter is not in the word.</li>
            </ul>
            </li>
        </ol>
        <h3>Winning:</h3>
        <ol>
            <li>The first player to guess the word correctly wins.</li>
            <li>If both players fail to guess the word within six attempts, the game ends in a draw.</li>
        </ol>
        <h3>Scoring:</h3>
        <p>Points are awarded based on the number of attempts taken to guess the word. The fewer attempts, the higher the score:
            <ul>
            <li><strong>4 Guesses Left:</strong> 500 points</li>
            <li><strong>3 Guesses Left:</strong> 300 points</li>
            <li><strong>2 Guesses Left:</strong> 200 points</li>
            <li><strong>1 Guess Left:</strong> 100 points</li>
            <li><strong>0 Guesses Left:</strong> 0 points (Game Lost)</li>
            </ul>
        </p>
        <h3>ELO Rating:</h3>
        <p>Your performance affects your ELO rating, which measures your skill level. Winning against higher-rated players will increase your ELO rating more significantly.</p>
        <p><strong>Initial ELO Rating:</strong> Every player starts with an initial ELO rating of 0.</p>
        <p><strong>ELO Adjustment:</strong> The player's ELO rating is directly adjusted based on the points earned in each game.
            <ul>
            <li>Example Calculation:
                <ul>
                <li>Game 1: Player guesses the word with 3 guesses left. Points earned: 300.
                    <ul>
                    <li>New ELO Rating = 0 (initial) + 300 = 300</li>
                    </ul>
                </li>
                <li>Game 2: Player guesses the word with 2 guesses left. Points earned: 200.
                    <ul>
                    <li>New ELO Rating = 300 + 200 = 500</li>
                    </ul>
                </li>
                </ul>
            </li>
            </ul>
        </p>
        <h2>Tips and Strategies:</h2>
        <h3>Start with Common Words:</h3>
        <p>Use common 5-letter words for your initial guesses to cover more possibilities.</p>
        <h3>Pay Attention to Feedback:</h3>
        <p>Use the color-coded feedback to refine your guesses and eliminate incorrect letters.</p>
        <h3>Think Ahead:</h3>
        <p>Plan your guesses strategically to maximize the information you gain from each attempt.</p>
        <h3>Stay Calm:</h3>
        <p>Keep a cool head and focus on the clues provided to make the best possible guesses.</p>
    </div>
);

export default LearnHowToPlay;