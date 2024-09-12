import { NextFunction, Request, Response} from "express";
import { GamePropertiesModel } from "../models/gameProperties.model"; '../models/gameProperties.model'

export const createBoard = (req: Request, res: Response) => {
    const {
        chatRoom,
        gameArray,
        firstTeamWords,
        firstTeamUnguessedWords,
        secondTeamWords,
        civilianWords,
        civilianUnguessedWords,
        assassinWord,
        turn,
        firstTeam,
        secondTeam,
        codeMasterView,
        guessesRemaining,
        allDisable,
        firstTeamRemainingWords,
        secondTeamRemainingWords,
        firstTeamClues,
        secondTeamClues,
        secondTeamUnguessedWords,
        winner
    } = req.body
    GamePropertiesModel.create({
        chatRoom,
        gameArray,
        firstTeamWords,
        firstTeamUnguessedWords,
        secondTeamWords,
        civilianWords,
        civilianUnguessedWords,
        assassinWord,
        turn,
        firstTeam,
        secondTeam,
        codeMasterView,
        guessesRemaining,
        allDisable,
        firstTeamRemainingWords: firstTeamRemainingWords,
        secondTeamRemainingWords: secondTeamRemainingWords,
        firstTeamClues,
        secondTeamClues,
        secondTeamUnguessedWords,
        winner
    })
        .then((gameBoard) => {
            return res.send({gameBoardID: gameBoard._id});
        })
        .catch(err => console.error(err.message))
}

export const getGamePropertiesByChatRoom = (req: Request, res: Response) => {
    const { chatRoom } = req.params;
    GamePropertiesModel.find({ chatRoom })
        .then((gameProperties) => {
            if (!gameProperties) {
                return res.status(200).send([]);
            }
            res.send(gameProperties);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ message: 'An error occurred while fetching the game properties', error: error.message });
        });
};

export const deleteGameAfterFinishing = (req: Request, res: Response) => {
    const { chatRoom } = req.params
    GamePropertiesModel.deleteOne({chatRoom})
    .then((user) => {
    res.send({data: user})
    })
    .catch((error) => console.log(error));
}

export const setGameProperties = (req: Request, res: Response, next: NextFunction) => {
    const {
        chatRoom,
        gameArray,
        firstTeamWords,
        firstTeamUnguessedWords,
        secondTeamWords,
        civilianWords,
        civilianUnguessedWords,
        assassinWord,
        turn,
        firstTeam,
        secondTeam,
        codeMasterView,
        guessesRemaining,
        allDisable,
        firstTeamRemainingWords,
        secondTeamRemainingWords,
        firstTeamClues,
        secondTeamClues,
        secondTeamUnguessedWords,
        winner
    } = req.body

    const filter = {chatRoom: chatRoom}
    const changes = {
        $set: {
            chatRoom: chatRoom,
            gameArray: gameArray,
            firstTeamWords: firstTeamWords,
            firstTeamUnguessedWords: firstTeamUnguessedWords,
            secondTeamWords: secondTeamWords,
            civilianWords: civilianWords,
            civilianUnguessedWords: civilianUnguessedWords,
            assassinWord: assassinWord,
            turn: turn,
            firstTeam: firstTeam,
            secondTeam: secondTeam,
            codeMasterView: codeMasterView,
            guessesRemaining: guessesRemaining,
            allDisable: allDisable,
            firstTeamRemainingWords: firstTeamRemainingWords,
            secondTeamRemainingWords: secondTeamRemainingWords,
            firstTeamClues: firstTeamClues,
            secondTeamClues: secondTeamClues,
            secondTeamUnguessedWords: secondTeamUnguessedWords,
            winner: winner
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