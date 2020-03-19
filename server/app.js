const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://meshoot:123qwe123@cluster0-a8c29.mongodb.net/graphqlLearn?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log((`connection error: ${err}`)));
dbConnection.once('open', () => console.log(('Connected to DB!')));

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started');
});