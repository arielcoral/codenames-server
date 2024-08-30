import { Request, Response} from "express";
import { GamePropertiesModel } from "../models/gameProperties.model"; '../models/gameProperties.model'

export const createBoard = (req: Request, res: Response) => {
    const {
        gameArray,
        firstTeamWords,
        firstTeamUnguessedWords,
        secondTeamWords,
        civilianWords,
        assassinWord,
        turn,
        firstTeam,
        secondTeam,
        codeMasterView,
        guessesRemaining,
        allDisable,
        firstTeamScore,
        secondTeamScore,
        firstTeamClues,
        secondTeamClues,
        secondTeamUnguessedWords,
        gameOver
    } = req.body
    GamePropertiesModel.create({
        gameArray,
        firstTeamWords,
        firstTeamUnguessedWords,
        secondTeamWords,
        civilianWords,
        assassinWord,
        turn,
        firstTeam,
        secondTeam,
        codeMasterView,
        guessesRemaining,
        allDisable,
        firstTeamScore,
        secondTeamScore,
        firstTeamClues,
        secondTeamClues,
        secondTeamUnguessedWords,
        gameOver
    })
        .then((gameBoard) => {
            return res.send({gameBoardID: gameBoard._id});
        })
        .catch(err => console.error(err.message))
}