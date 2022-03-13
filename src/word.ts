import { readFile } from 'fs';
import { join } from 'path';

export default class Word {
    wordsQueue: Array<string> = [];
    currentWord: string|null = null;
    validWordSet: Set<string> = new Set();
    intervalId: NodeJS.Timer;
    
    constructor() {
        // 24 hours
        const intervalLen = 24 * 60 * 60 * 1000;

        this.intervalId = setInterval(() => {
            this.selectNextWord();
        }, intervalLen);
    }

    public async getCurrentWord(): Promise<string> {
        if (this.currentWord === null) {
            await this.selectNextWord();
        }

        console.log(this.currentWord);
        return this.currentWord as string;
    }

    public isValidWord(word: string) {
        return this.validWordSet.has(word);
    }

    private async loadWordQueue(): Promise<null> {
        return new Promise((res, rej) => {
            const wordFile = join(__dirname, '..', '..', 'words_5.txt');

            readFile(wordFile, {encoding: 'utf8'}, (err, data) => {
                if (err) {
                    rej(err);
                }

                let words = data.trim().split('\n');
                this.validWordSet = new Set(words);

                while (words.length > 0) {
                    const i = Math.floor(Math.random() * words.length);
                    const word = words.splice(i, 1)[0];

                    if (word) {
                        this.wordsQueue.push(word);
                    } else {
                        const err = new Error('Went out of bounds while randomizing word queue.');
                        throw err;
                    }
                }

                res(null);
            });
        });
    }

    private async selectNextWord() {
        if (this.wordsQueue.length === 0) {
            await this.loadWordQueue();
        }

        this.currentWord = this.wordsQueue.pop() as string;
    }
};
