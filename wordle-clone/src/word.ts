import { readFile } from 'fs';
import { join } from 'path';

export default class Word {
    wordsQueue: Array<string> = [];
    _currentWord: string|null = null;
    //intervalId: NodeJS.Timer;
    
    constructor() {
        //this.intervalId = setInterval(() => {
            // TODO: impl timer
        //});
    }

    public async getCurrentWord(): Promise<string> {
        if (this._currentWord === null) {
            await this.selectNextWord();
        }

        return this._currentWord as string;
    }

    private async loadWordQueue(): Promise<null> {
        return new Promise((res, rej) => {
            const wordFile = join(__dirname, '..', '..', 'words_5.txt');

            readFile(wordFile, {encoding: 'utf8'}, (err, data) => {
                if (err) {
                    rej(err);
                }

                let words = data.trim().split('\n');

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

        this._currentWord = this.wordsQueue.pop() as string;
    }
};
