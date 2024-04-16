import { Request, Response, NextFunction} from "express";
import { SignupModel } from '../../models/signup'

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    SignupModel.create(req.body)
        .then((user) => {
            return res.send(user);
        })
        .catch(err => console.error(err.message))
}