import { Router} from "express";
import { createUser, deleteAllUsersInChatRoon, deleteUser, getUsersByChatRoom, getUserByUserName, SetIsOnline, SetUserProperties } from '../controllers/user.controllers'
import { createUserSchema, noBodySchema, setIsOnlineSchema, setUserPropertiesSchema } from "../middlewares/user.schema";
import { celebrate } from "celebrate";

const userRouter: Router = Router();
userRouter.post('/', celebrate(createUserSchema) ,createUser)
userRouter.get('/userName/:userName', celebrate(noBodySchema), getUserByUserName)
userRouter.get('/chatRoom/:chatRoom', celebrate(noBodySchema), getUsersByChatRoom)
userRouter.delete('/:userName', celebrate(noBodySchema), deleteUser)
userRouter.delete('/room/:chatRoom', celebrate(noBodySchema), deleteAllUsersInChatRoon)
userRouter.patch('/online', celebrate(setIsOnlineSchema), SetIsOnline)
userRouter.patch('/', celebrate(setUserPropertiesSchema), SetUserProperties)
export default userRouter;