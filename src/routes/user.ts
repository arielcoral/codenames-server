import { Router} from "express";
import { createUser, deleteAllUsersInChatRoon, deleteUser, getUserByChatRoom, getUserByUserName, SetIsOnline, SetUserProperties } from '../controllers/user.controllers'

const userRouter: Router = Router();
userRouter.post('/', createUser)
userRouter.get('/userName/:userName', getUserByUserName)
userRouter.get('/chatRoom/:chatRoom', getUserByChatRoom)
userRouter.delete('/:userName', deleteUser)
userRouter.delete('/room/:chatRoom', deleteAllUsersInChatRoon)
userRouter.patch('/online', SetIsOnline)
userRouter.patch('/', SetUserProperties)
export default userRouter; 