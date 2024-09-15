import { Router } from "express";
import { createBoard, deleteGameAfterFinishing, getGamePropertiesByChatRoom, setGameProperties } from "../controllers/gameProperties.controllers";
import { celebrate } from "celebrate";
import { createGamePropertiesSchema, setGamePropertiesSchema } from "../middlewares/gameProperties.schema";
import { noBodySchema } from "../middlewares/user.schema";

const gamePropertiesRouter: Router = Router();

gamePropertiesRouter.post('/', celebrate(createGamePropertiesSchema), createBoard)
gamePropertiesRouter.get('/:chatRoom', celebrate(noBodySchema), getGamePropertiesByChatRoom)
gamePropertiesRouter.delete('/:chatRoom', celebrate(noBodySchema), deleteGameAfterFinishing)
gamePropertiesRouter.patch('/', /*celebrate(setGamePropertiesSchema),*/ setGameProperties)

export default gamePropertiesRouter; 