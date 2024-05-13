import express from 'express';

var router = express.Router();

router.get('/myIdentity', (req, res) => { // TODO: need to handle on the frontend
    if (req.session.isAuthenticated) {
        res.json(
            {
                status: "loggedin", 
                userInfo: {
                   name: req.session.account.name, 
                   username: req.session.account.username
                }
             }
        )
    } else {
        res.json({ status: "loggedout"});
    }
})

router.get('/', async (req, res) => { // probably don't need a friends endpoint if we have this and display on the same page
    try {
        let username = req.query.username;
        res.json(await req.models.User.findOne({username: username}))
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ "status": "error", "error": error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        let username = req.session.account.username;
        let game = req.body.game;
        
        let info = await req.models.User.findOne({username: username});
        if (info) {
            info.gamesPlayed.push(game.gameID);
            if (game.winner === username) {
                info.gamesWon = info.gamesWon + 1;
                info.elo = info.elo + 10;
            } else {
                info.gamesLost = info.gamesLost + 1;
                info.elo = info.elo - 10;
            }
            await info.save();
        } else {
            const newUser = new req.models.User({
                userID: Math.random(), // TODO: we should discuss this
                username: username,
                elo: 1000,
                gamesPlayed: [game.gameID], // Initialize with the current game
                gamesWon: game.winner === username ? 1 : 0,
                gamesLost: game.winner !== username ? 1 : 0,
                friends: [],
                requests: []
            });
            await newUser.save();
        }
        res.json({ "status": "success" });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ "status": "error", "error": error.message })
    }
})

export default router;