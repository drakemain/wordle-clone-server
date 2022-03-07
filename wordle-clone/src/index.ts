import Word from './word';
import checkGuessedWord from './word_check';

const wordManager = new Word();
(async () => {
    const word = await wordManager.getCurrentWord();
    const guess1 = 'hello';
    const guess2 = 'world';

    const res1 = checkGuessedWord(guess1, word);
    const res2 = checkGuessedWord(guess2, word);

    console.log(guess1, res1);
    console.log(guess2, res2);

    console.log(`The selected word is: ${word}`);
})();
