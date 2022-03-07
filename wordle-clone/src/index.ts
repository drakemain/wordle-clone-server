import Word from './word';

const wordManager = new Word();
(async () => {
    const word = await wordManager.getCurrentWord();
    console.log(`The selected word is: ${word}`);
})();
