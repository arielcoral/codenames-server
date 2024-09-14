
import { Router} from "express";
import { addWords, getWordsForTheGame } from "../controllers/wordBank.controllers";
import { celebrate } from "celebrate";
import { addWordsSchema } from "../middlewares/wordBank.schema";

const wordBankRouter: Router = Router();
wordBankRouter.post('/', celebrate(addWordsSchema), addWords)
wordBankRouter.get('/', getWordsForTheGame)

export default wordBankRouter; 