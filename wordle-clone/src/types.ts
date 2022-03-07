export enum GuessedChar {
    Absent,
    Present,
    Correct
};

export type GuessedWord = [GuessedChar, GuessedChar, GuessedChar, GuessedChar, GuessedChar];

export type GuessResponse = {
    errmsg?: string,
    payload?: any
};
