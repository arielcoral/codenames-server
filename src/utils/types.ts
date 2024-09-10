export type role = "code-master" | "player"
export type team = "red" | "blue" | "assassin" | "civilian"
export type cardData = {
    word: string;
    team: team;
    clicked: boolean;
}
export type clueObj = {
    clue: string;
    num: number;
}