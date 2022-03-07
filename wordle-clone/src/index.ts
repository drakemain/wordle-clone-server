import express from 'express';
import bodyParser from 'body-parser';

import Word from './word';
import checkGuessedWord from './word_check';
import { ErrorCode, GuessResponse, WordleError } from './types';

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
        if (!wordManager.isValidWord(guessedWord)) {
            throw new WordleError('Guess is not in word list.', ErrorCode.WordNotInList);
        }

        response.payload = checkGuessedWord(guessedWord, actualWord);
        res.status(200);
        res.send(response);
    } catch (e) {
        res.status(300);

        if (e instanceof WordleError) {
            response.errcode = e.code;
            response.errmsg = e.message;
        } else {
            console.error('UNHANDLED ERROR!');
            console.error(e);
            response.errmsg = 'An error occured.';
        }

        res.send(response);
    }
});
