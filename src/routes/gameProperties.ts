import { Router } from "express";
import { createBoard, deleteGameAfterFinishing, getGamePropertiesByChatRoomID, setGameProperties } from "../controllers/gameProperties.controllers";

const gamePropertiesRouter: Router = Router();

gamePropertiesRouter.post('/', createBoard)
gamePropertiesRouter.get('/:chatRoomID', getGamePropertiesByChatRoomID)
gamePropertiesRouter.delete('/:chatRoomID', deleteGameAfterFinishing)
gamePropertiesRouter.patch('/', setGameProperties)

export default gamePropertiesRouter; 