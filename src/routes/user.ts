import { Router} from "express";
import { createUser, deleteAllUsersInChatRoon, deleteUser, getUserByChatRoomID, getUserByUserName, SetIsOnline } from '../controllers/user.controllers'

const userRouter: Router = Router();
userRouter.post('/', createUser)
userRouter.get('/userName/:userName', getUserByUserName)
userRouter.get('/chatRoomID/:chatRoomID', getUserByChatRoomID)
userRouter.delete('/:userName', deleteUser)
userRouter.delete('/room/:chatRoomID', deleteAllUsersInChatRoon)
userRouter.patch('/', SetIsOnline)
export default userRouter; 