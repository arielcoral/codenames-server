export type User = {
    username: string;
    socketID: string;
}
export type clueObj = {
    clue: string;
    num: number;
}
export type role = "code-master" | "player"
export type team = "red" | "blue" | "assassin" | "civilian"
export type cardData = {
    word: string;
    team: team;
    clicked: boolean;
}
export type GameProperties = {
    gameArray?: cardData[][];
    firstTeamWords?: string[];
    firstTeamUnguessedWords?: string[];
    secondTeamWords?: string[];
    civilianWords?: string[];
    assassinWord?: string [];
    turn?: team;
    firstTeam?: team;
    secondTeam?: team;
    codeMasterView?: boolean;
    guessesRemaining?: number;
    allDisable?: boolean;
    firstTeamScore?: number;
    secondTeamScore?: number;
    firstTeamClues?: clueObj [];
    secondTeamClues?: clueObj [];
    secondTeamUnguessedWords?: string[];
    gameOver?: boolean;
};

export type message = {
    text: string;
    name: string;
    id: string;
    socketID: string | undefined;
    roomId: number;
}

export type GamePropertiesKey = keyof GameProperties;

export type Part = 'redP' | 'blueP' | 'redCM' | 'blueCM'
export type Parts = {
    redP: boolean,
    blueP: boolean,
    redCM: boolean,
    blueCM: boolean
}