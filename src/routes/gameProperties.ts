import { Router } from "express";
import { createBoard } from "../controllers/gameProperties.controllers";

const gamePropertiesRouter: Router = Router();

gamePropertiesRouter.post('/', createBoard)

export default gamePropertiesRouter; 