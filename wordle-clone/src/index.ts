import express from 'express';
import bodyParser from 'body-parser';

import Word from './word';
import checkGuessedWord from './word_check';
import { GuessResponse } from './types';

const app = express();
const wordManager = new Word();
const PORT = 8080;

app.use(bodyParser.urlencoded({extended: false}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/', (_, res) => {
    res.send('Hello World');
});

app.get('/guess/:word', async (req, res) => {
    const guessedWord = req.params['word'];
    const actualWord = await wordManager.getCurrentWord();
    const response: GuessResponse = {};

    try {
        response.payload = checkGuessedWord(guessedWord, actualWord);
        res.status(200);
        res.send(response);
    } catch (e) {
        res.status(300);
        response.errmsg = (e as Error).message;
        res.send(response);
    }
});
