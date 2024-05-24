import { Request, Response} from "express";
import { SignupModule } from "../models/signup";

export const createUser = (req: Request, res: Response) => {
    const {userName, role, team} = req.body
    SignupModule.create({userName, role, team})
        .then((user) => {
            console.log("@@ user:", user)
            return res.send(user);
        })
        .catch(err => console.error(err.message))
}