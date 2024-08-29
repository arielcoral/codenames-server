
import { Router} from "express";
import { addWords, getWordsForTheGame } from "../controllers/wordBank.controllers";

const wordBankRouter: Router = Router();
wordBankRouter.post('/', addWords)
wordBankRouter.get('/', getWordsForTheGame)

export default wordBankRouter; 