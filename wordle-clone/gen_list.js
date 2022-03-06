const fs = require('fs');

fs.readFile('./words.txt', {encoding: 'utf8'}, (err, data) => {
    const words = data.trim().split('\n');

    words.forEach((word, i) => {
        if (word.length === 5) {
            fs.appendFileSync('./words_5.txt', word + (i < words.length ? '\n' : ''));
        }
    });
});
