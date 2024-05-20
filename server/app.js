import express from 'express';
import enableWs from 'express-ws'; 
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';

//import WebAppAuthProvider from 'msal-node-wrapper'

// const authConfig = {
// 	auth: {
// 		clientId: "",
//         authority: "",
//         clientSecret: "",
//         redirectUri: ""
// 	},

// 	system: {
//     	loggerOptions: {
//         	loggerCallback(loglevel, message, containsPii) {
//             	console.log(message);
//         	},
//         	piiLoggingEnabled: false,
//         	logLevel: 3,
//     	}
// 	}
// };



import models from './models.js';
import usersRouter from './routes/users.js';
import userRouter from './routes/user.js';
import gameRouter from './routes/game.js';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
enableWs(app); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

// const oneDay = 1000 * 60 * 60 * 24
// app.use(sessions({
//     secret: "this is some secret key I am making up p8kn fwlihftrn3oinyswnwd3in4oin",
//     saveUninitialized: true,
//     cookie: {maxAge: oneDay},
//     resave: false
// }))

// const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
// app.use(authProvider.authenticate());


app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/games', gameRouter);

// app.get('/signin', (req, res, next) => {
//     return req.authContext.login({
//         postLoginRedirectUri: "/", // redirect here after login
//     })(req, res, next);

// });
// app.get('/signout', (req, res, next) => {
//     return req.authContext.logout({
//         postLogoutRedirectUri: "/", // redirect here after logout
//     })(req, res, next);

// });

// app.use(authProvider.interactionErrorHandler());

let socketCounter = 0;
let allSockets = {};
const games = {};

//handler function for new game creation
//passed to game.js
export const newGame = (gameCode, game) => {
    if (games.gameCode) {
        res.status(400).send({status: 'error', error : 'existing game never deleted'});
        return;
    }
    games[gameCode] = game;
    
}

export default app;








/** 
app.ws('/gameSocket', (ws, req) => {
    let mySocketNum = socketCounter;
    socketCounter++;
    console.log("user " + mySocketNum + " connected via websocket");

    // Add this ws to the global object tracking all websockets
    allSockets[mySocketNum] = {
        socket: ws,
        name: mySocketNum
    };

    ws.on('message', async (msg) => {
        try {
            const socketMessage = JSON.parse(msg);
            if (socketMessage.action === "createLobby") {
                const roomCode = generateRoomCode();
                const word = getRandomWord(); // Generate a random word for the game
                allSockets[mySocketNum].roomCode = roomCode;
                allSockets[mySocketNum].word = word;

                ws.send(JSON.stringify({ action: 'lobbyCreated', roomCode, word }));
            }
        } catch (error) {
            console.error("Websocket message received error: " + error);
        }
    });

    ws.on('close', () => {
        delete allSockets[mySocketNum];
        console.log(`user ${mySocketNum} disconnected`);
    });
});
*/