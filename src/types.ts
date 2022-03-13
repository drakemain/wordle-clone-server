export enum GuessedChar {
    Absent,
    Present,
    Correct
};

export type GuessedWord = [GuessedChar, GuessedChar, GuessedChar, GuessedChar, GuessedChar];

export type GuessResponse = {
    errmsg?: string,
    errcode?: ErrorCode,
    payload?: any
};

/* Errors */

export enum ErrorCode {
    None,
    GuessBadLen,
    WordNotInList
};

export class WordleError extends Error {
    code: ErrorCode = ErrorCode.None;

    constructor(msg: string, code: ErrorCode) {
        super(msg);
        this.code = code;
    }
};
