import express from 'express';
import { newGame } from '../app.js';

var router = express.Router();

//Global Variables
const codesInUse = new Set();
const words = ['APPLE', 'BANAN', 'CHERRY', 'DATES', 'ELDER'];

router.get('/', async (req, res) => {
    const username = req.query.username;

    try {
        const games = await req.models.Game.find({ players: username});

        res.json(games);
    } catch (error) {
        console.error("Error fetching game data:", error);
        res.status(500).json({ "status": "error", "error": error.message });
    }
})

router.post('/', async (req, res) => {
    const players = req.body.players;
    const winner = req.body.winner;
    const score = req.body.score;

    const newGame = new req.models.Game({
        players: players,
        winner: winner,
        score: score
    });
    await newGame.save();
})

//Creates a lobby
router.post('/createLobby', async (req, res) => {
    //const creator = req.session.account.username;
    console.log(req.body);
    const creator = req.body.playerName;
    const word = getRandomWord();

    let gameCode = generateRoomCode();
    while (codesInUse.has(gameCode)) {
        gameCode = generateRoomCode();
    }

    const game = {creator, word};
    newGame(gameCode, game);

    res.status(200).send({status: 'success', gameCode, word});
});

router.ws('/gameSocket', (ws, res) => {
    console.log('connected new user');
    allSockets.gameCode = [ws];

    ws.on('message', async(msg) => {
        const socketMessage = JSON.parse(msg);
        const gameCode = socketMessage.gameCode;

        //on create, add socket with new gamecode
        if (socketMessage.action === 'create') {
            allSockets[gameCode] = [ws];
        } 

        //on join, add socket to existing gamecode
        if (socketMessage.action === 'join') {
            allSockets[gameCode].push(ws);
        }
    });

    console.log(allSockets);

})

//Generates a room code
const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
};

//Generates a random word
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

export default router;