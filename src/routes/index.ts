import { Router, Request, Response, NextFunction } from "express";
import express from 'express';
import userRouter from "./user";
import gamePropertiesRouter from "./gameProperties";
import wordBankRouter from "./wordBank";

const indexRouter: Router = Router();

const logPath = (req: Request, res: Response, next: NextFunction) => { // Middleware to log every requests url path
    console.log(req.url)
    console.log(req.method)
    next()
}
indexRouter.use(express.json())
indexRouter.use(logPath)

indexRouter.use('/user', userRouter)
indexRouter.use('/gameProperties', gamePropertiesRouter)
indexRouter.use('/wordBank', wordBankRouter)


export default indexRouter;