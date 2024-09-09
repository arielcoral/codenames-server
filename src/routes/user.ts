import { Router} from "express";
import { createUser, deleteUser, getUserByChatRoomID, getUserByUserName, SetIsOnline } from '../controllers/user.controllers'

const userRouter: Router = Router();
userRouter.post('/', createUser)
userRouter.get('/userName/:userName', getUserByUserName)
userRouter.get('/chatRoomID/:chatRoomID', getUserByChatRoomID)
userRouter.delete('/:userName', deleteUser)
userRouter.patch('/', SetIsOnline)
export default userRouter; 