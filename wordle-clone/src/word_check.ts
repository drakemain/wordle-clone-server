import { GuessedWord, GuessedChar } from './types';

const WORDLE_WORD_LEN = 5;

export default function checkGuessedWord(guess: string, actual: string): GuessedWord {
    if (guess.length !== WORDLE_WORD_LEN || actual.length !== WORDLE_WORD_LEN) {
        throw new Error(`Invalid input! guess: ${guess}, actual ${actual}, required len: ${WORDLE_WORD_LEN}`);
    }

    const guessedWord = buildGuessedWord();

    for (let i = 0; i < WORDLE_WORD_LEN; ++i) {
        if (guess[i] === actual[i]) {
            guessedWord[i] = GuessedChar.Correct;
        } else if (actual.includes(guess[i] as string)) {
            guessedWord[i] = GuessedChar.Present;
        }
    }

    return guessedWord;
};

const buildGuessedWord = (): GuessedWord => {
    return [
        GuessedChar.Absent,
        GuessedChar.Absent,
        GuessedChar.Absent,
        GuessedChar.Absent,
        GuessedChar.Absent
    ];
};
