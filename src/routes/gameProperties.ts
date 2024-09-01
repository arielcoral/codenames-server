import { Router } from "express";
import { createBoard, getGamePropertiesByChatRoomID, setGameProperties } from "../controllers/gameProperties.controllers";

const gamePropertiesRouter: Router = Router();

gamePropertiesRouter.post('/', createBoard)
gamePropertiesRouter.get('/:chatRoomID', getGamePropertiesByChatRoomID)
gamePropertiesRouter.patch('/', setGameProperties)

export default gamePropertiesRouter; 