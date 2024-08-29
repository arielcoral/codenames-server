import { Request, Response} from "express";
import { WorkBankModel } from "../models/wordsBank.model";

export const addWords = (req: Request, res: Response) => {
    const { words } = req.body; 
    if (!Array.isArray(words)) {
        return res.status(400).send({ error: 'Input must be an array of words' });
    }
    const wordDocuments = words.map(word => ({ word }));
    WorkBankModel.insertMany(wordDocuments)
        .then((result) => {
            const insertedIds = result.map(doc => doc._id);
            return res.send({ insertedIds });
        })
        .catch(err => {
            console.error(err.message);
            return res.status(500).send({ error: 'An error occurred while adding words' });
        });
}
export const getWordsForTheGame = async (req: Request, res: Response) => {
    const gameWords: string [] = []
    const result = await WorkBankModel.aggregate().sample(25);
    result.forEach((obj) => {
        gameWords.push(obj.word);
    });
    res.send(gameWords)
};