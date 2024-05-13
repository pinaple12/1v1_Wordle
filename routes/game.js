import express from 'express';

var router = express.Router();

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