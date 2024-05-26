import express from 'express';
import enableWs from 'express-ws'; 
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';

import WebAppAuthProvider from 'msal-node-wrapper'

const authConfig = {
 auth: {
     clientId: "5c0eea2a-41fe-49e9-9980-11040673bf84",
        authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret: "RM98Q~Cl8pAF9ZoSlRVIKB4ZUwNkus0l4xuk~aVd",
        redirectUri: "/redirect"
 },


	system: {
    	loggerOptions: {
        	loggerCallback(loglevel, message, containsPii) {
            	console.log(message);
        	},
        	piiLoggingEnabled: false,
        	logLevel: 3,
    	}
	}
};



import models from './models.js';
import usersRouter from './routes/users.js';
import userRouter from './routes/user.js';
import gameRouter, { mountWs } from './routes/game.js';


import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { setDefaultHighWaterMark } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
enableWs(app); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/build')));

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "this is some secret key I am making up p8kn fwlihftrn3oinyswnwd3in4oin",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());

app.use((req, res, next) => {
    req.models = models
    next()
});

app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/games', gameRouter);
mountWs(app);

app.get('/signin', (req, res, next) => {
    return req.authContext.login({
        postLoginRedirectUri: "http://localhost:3000/", // redirect here after login
    })(req, res, next);

});
app.get('/signout', (req, res, next) => {
    return req.authContext.logout({
        postLogoutRedirectUri: "http://localhost:3000/", // redirect here after logout
    })(req, res, next);

});


app.use(authProvider.interactionErrorHandler());

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