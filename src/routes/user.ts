
import { Router} from "express";
import { createUser, deleteUser, getAllUsers, getUserByUserName } from '../controllers/user.controllers'

const userRouter: Router = Router();
userRouter.post('/', createUser)
userRouter.get('/:userName', getUserByUserName)
userRouter.get('/', getAllUsers)
userRouter.delete('/:userName', deleteUser)

export default userRouter; 