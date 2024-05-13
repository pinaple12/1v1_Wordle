import mongoose from 'mongoose';

let models = {};

console.log("connecting to mongodb");

await mongoose.connect("TODO");

console.log("successfully connected to mongodb");

const userSchema = new mongoose.Schema({
    userID: Number,
    username: String,
    elo: Number,
    gamesPlayed: [Number],
    gamesWon: Number,
    gamesLost: Number,
    friends: [Number],
    requests: [Number]
})

models.User = mongoose.model('User', userSchema)

const gameSchema = new mongoose.Schema({
    gameID: Number,
    players: [Number], // should change to be usernames
    winner: Number, // user id, should honestly change to be username
    score: [Number]
})

models.Game = mongoose.model('Game', gameSchema)

console.log("mongoose models created");

export default models;