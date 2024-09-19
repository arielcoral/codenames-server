import { NextFunction, Request, Response} from "express";
import { UserModel } from "../models/user.model";

export const createUser = (req: Request, res: Response) => {
    const {userName, chatRoom, isOnline, createdAt} = req.body
    UserModel.create({userName, chatRoom, isOnline, createdAt})
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
export const getUsersByChatRoom = (req: Request, res: Response) => {
    const { chatRoom } = req.params;
    UserModel.find({ chatRoom })
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
export const deleteAllUsersInChatRoon = (req: Request, res: Response) => {
    const { chatRoom } = req.params
    UserModel.deleteMany({chatRoom})
    .then((user) => {
    res.send({data: user})
    })
    .catch((error) => console.log(error));
}

export const SetUserProperties = (req: Request, res: Response, next: NextFunction) => {
    const {
        userName,
        role,
        team
    } = req.body
    const filter = {userName: userName}
    const changes = {
        $set: {
            role: role,
            team: team
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

export const  deleteOldUsers = () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    UserModel.deleteMany({ createdAt: { $lt: oneHourAgo } })
    .then((data) => {
    console.log({data: data})
    })
    .catch((error) => console.log(error));
}