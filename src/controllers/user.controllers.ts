import { NextFunction, Request, Response} from "express";
import { UserModel } from "../models/user.model";

export const createUser = (req: Request, res: Response) => {
    const {userName, chatRoomID, role, team, isOnline} = req.body
    UserModel.create({userName, chatRoomID, role, team, isOnline})
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
export const getUserByChatRoomID = (req: Request, res: Response) => {
    const { chatRoomID } = req.params;
    UserModel.find({ chatRoomID })
        .then((users) => {
            if (!users) {
                return res.status(200).send([]);
            }
            res.send( users);
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

export const SetIsOnline = (req: Request, res: Response, next: NextFunction) => {
    const {
        userName,
        isOnline
    } = req.body
    
    const filter = {userName: userName}
    const changes = {
        $set: {
            isOnline: isOnline
        },
    };
    UserModel.updateOne(filter, changes)
    .then(() => {
        return res.send({message: 'Succesfully!'});
    })
    .catch((error) => {
        console.log(error)
        next(error)
    });
}