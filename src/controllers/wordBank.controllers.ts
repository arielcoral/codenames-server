import { Request, Response} from "express";
import { WorkBankModel } from "../models/wordsBank.model";

export const addWords = (req: Request, res: Response) => {
    const { words } = req.body; // Assuming req.body.words is an array of words

    if (!Array.isArray(words)) {
        return res.status(400).send({ error: 'Input must be an array of words' });
    }

    // Map the array of words to an array of objects with a 'word' property
    const wordDocuments = words.map(word => ({ word }));

    WorkBankModel.insertMany(wordDocuments)
        .then((result) => {
            // Send back the inserted documents or their IDs
            const insertedIds = result.map(doc => doc._id);
            return res.send({ insertedIds });
        })
        .catch(err => {
            console.error(err.message);
            return res.status(500).send({ error: 'An error occurred while adding words' });
        });
}