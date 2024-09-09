import mongoose, { Document, Schema } from "mongoose";
import { cardData, clueObj, team } from "../utils/types";

export interface GameProperties extends Document {
    id: string;
    chatRoomID?: number;
    gameArray?: cardData[][];
    firstTeamWords?: string[];
    firstTeamUnguessedWords?: string[];
    secondTeamWords?: string[];
    civilianWords?: string[];
    assassinWord?: string[];
    turn?: team;
    firstTeam?: team;
    secondTeam?: team;
    codeMasterView?: boolean;
    guessesRemaining?: number;
    allDisable?: boolean;
    firstTeamRemainingWords?: number;
    secondTeamRemainingWords?: number;
    firstTeamClues?: clueObj[];
    secondTeamClues?: clueObj[];
    secondTeamUnguessedWords?: string[];
    winner?: 'red' | 'blue' | null;
}

const cardDataSchema = new Schema<cardData>({
    word: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        enum: ['red', 'blue', 'assassin', 'civilian'],
        required: true,
    },
    clicked: {
        type: Boolean,
        required: true,
    },
});

const clueObjSchema = new Schema<clueObj>({
    clue: {
        type: String,
        required: true,
    },
    num: {
        type: Number,
        required: true,
    },
});

const gamePropertiesSchema = new Schema<GameProperties>({
    chatRoomID: {
        type: Number,
        required: false,
    },
    gameArray: {
        type: [[cardDataSchema]],
        required: false,
    },
    firstTeamWords: {
        type: [String],
        required: false,
    },
    firstTeamUnguessedWords: {
        type: [String],
        required: false,
    },
    secondTeamWords: {
        type: [String],
        required: false,
    },
    civilianWords: {
        type: [String],
        required: false,
    },
    assassinWord: {
        type: [String],
        required: false,
    },
    turn: {
        type: String,
        enum: ['red', 'blue', 'assassin', 'civilian'], // TODO: create an enum file for this
        required: false,
    },
    firstTeam: {
        type: String,
        enum: ['red', 'blue'], // TODO: create an enum file for this
        required: false,
    },
    secondTeam: {
        type: String,
        enum: ['red', 'blue'],
        required: false,
    },
    codeMasterView: {
        type: Boolean,
        required: false,
    },
    guessesRemaining: {
        type: Number,
        required: false,
    },
    allDisable: {
        type: Boolean,
        required: false,
    },
    firstTeamRemainingWords: {
        type: Number,
        required: false,
    },
    secondTeamRemainingWords: {
        type: Number,
        required: false,
    },
    firstTeamClues: {
        type: [clueObjSchema],
        required: false,
    },
    secondTeamClues: {
        type: [clueObjSchema],
        required: false,
    },
    secondTeamUnguessedWords: {
        type: [String],
        required: false,
    },
    winner: {
        type: String,
        enum: ['red', 'blue', null],
        required: false,
    }
});

export const GamePropertiesModel = mongoose.model<GameProperties>('GameProperties', gamePropertiesSchema);
