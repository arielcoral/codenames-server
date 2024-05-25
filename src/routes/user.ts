
import { Router} from "express";
import { createUser, getUserById } from '../controllers/user.controllers'

const userRouter: Router = Router();
userRouter.post('/', createUser)
userRouter.get('/:id', getUserById)

export default userRouter; 