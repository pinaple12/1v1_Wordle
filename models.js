import mongoose from 'mongoose';

let models = {};

console.log("connecting to mongodb");

await mongoose.connect("mongodb+srv://ericazqy:d6hDrcVVP5tCCNYN@cluster0.qc2c1bb.mongodb.net/wordle");

console.log("successfully connected to mongodb");

const userSchema = new mongoose.Schema({
    //userID: Number,
    username: String,
    elo: Number,
    gamesPlayed: [String], // might not need to be an array because we get games where the username is present instead
    gamesWon: Number,
    gamesLost: Number,
    friends: [String], // changed from id to username
    requests: [String] // changed from id to username
})

models.User = mongoose.model('User', userSchema)

const gameSchema = new mongoose.Schema({
    gameID: Number, // maybe unnecessary
    players: [String], // changed from id to username
    winner: String, // changed from id to username
    score: [Number]
})

models.Game = mongoose.model('Game', gameSchema)

console.log("mongoose models created");

export default models;