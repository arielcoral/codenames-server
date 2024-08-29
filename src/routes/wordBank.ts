
import { Router} from "express";
import { addWords } from "../controllers/wordBank.controllers";

const wordBankRouter: Router = Router();
wordBankRouter.post('/', addWords)

export default wordBankRouter; 