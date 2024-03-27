
import { Router} from "express";
import { createUser } from '../controllers/signup'

const registerRouter: Router = Router();
registerRouter.post('/', createUser)

export default registerRouter; 