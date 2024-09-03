import { NextFunction, Request, Response} from "express";
import { GamePropertiesModel } from "../models/gameProperties.model"; '../models/gameProperties.model'

export const createBoard = (req: Request, res: Response) => {
    const {
        chatRoomID,
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
        chatRoomID,
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

export const getGamePropertiesByChatRoomID = (req: Request, res: Response) => {
    const { chatRoomID } = req.params;
    GamePropertiesModel.find({ chatRoomID })
        .then((gameProperties) => {
            if (!gameProperties) {
                return res.status(200).send([]);
            }
            res.send(gameProperties);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ message: 'An error occurred while fetching the user', error: error.message });
        });
};

export const deleteGameAfterFinishing = (req: Request, res: Response) => {
    const { chatRoomID } = req.params
    GamePropertiesModel.deleteOne({chatRoomID})
    .then((user) => {
    res.send({data: user})
    })
    .catch((error) => console.log(error));
}

export const setGameProperties = (req: Request, res: Response, next: NextFunction) => {
    const {
        chatRoomID,
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

    const filter = {chatRoomID: chatRoomID}
    const changes = {
        $set: {
            chatRoomID: chatRoomID,
            gameArray: gameArray,
            firstTeamWords: firstTeamWords,
            firstTeamUnguessedWords: firstTeamUnguessedWords,
            secondTeamWords: secondTeamWords,
            civilianWords: civilianWords,
            assassinWord: assassinWord,
            turn: turn,
            firstTeam: firstTeam,
            secondTeam: secondTeam,
            codeMasterView: codeMasterView,
            guessesRemaining: guessesRemaining,
            allDisable: allDisable,
            firstTeamScore: firstTeamScore,
            secondTeamScore: secondTeamScore,
            firstTeamClues: firstTeamClues,
            secondTeamClues: secondTeamClues,
            secondTeamUnguessedWords: secondTeamUnguessedWords,
            gameOver: gameOver
        },
    };

    GamePropertiesModel.updateOne(filter, changes)
    .then(() => {
        return res.send({message: 'Succesfully!'});
    })
    .catch((error) => {
        console.log(error)
        next(error)
    });
}