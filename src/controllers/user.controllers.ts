import { Request, Response} from "express";
import { UserModel } from "../models/user.model";

export const createUser = (req: Request, res: Response) => {
    const {userName, role, team} = req.body
    UserModel.create({userName, role, team})
        .then((user) => {
            return res.send({userID: user._id});
        })
        .catch(err => console.error(err.message))
}

export const getUserById = (req: Request, res: Response) => {
    const { id } = req.params
    UserModel.findById(id)
    .then((user) => {
        res.send( user)
    })
    .catch((error) => console.log(error));
}