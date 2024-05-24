
import { Router} from "express";
import { createUser } from '../controllers/user.controllers'

const registerRouter: Router = Router();
registerRouter.post('/', createUser)

export default registerRouter; 