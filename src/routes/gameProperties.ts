import { Router } from "express";
import { createBoard, deleteGameAfterFinishing, getGamePropertiesByChatRoom, setGameProperties } from "../controllers/gameProperties.controllers";

const gamePropertiesRouter: Router = Router();

gamePropertiesRouter.post('/', createBoard)
gamePropertiesRouter.get('/:chatRoom', getGamePropertiesByChatRoom)
gamePropertiesRouter.delete('/:chatRoom', deleteGameAfterFinishing)
gamePropertiesRouter.patch('/', setGameProperties)

export default gamePropertiesRouter; 