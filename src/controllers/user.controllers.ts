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

export const getUserByUserName = (req: Request, res: Response) => {
    const { userName } = req.params;
    UserModel.findOne({ userName })
        .then((user) => {
            if (!user) {
                return res.status(200).send({ user: 'User not found' });
            }
            res.send({user: user});
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ message: 'An error occurred while fetching the user', error: error.message });
        });
};
export const deleteUser = (req: Request, res: Response) => {
    const { userName } = req.params
    UserModel.deleteOne({userName})
    .then((user) => {
    res.send({data: user})
    })
    .catch((error) => console.log(error));
}