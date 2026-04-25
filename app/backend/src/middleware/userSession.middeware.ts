import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

export const userSessionMiddleware= (req:Request,res:Response,next:NextFunction)=>{
    let sessionId = req.cookies?.sessionId

    if(!sessionId){
        sessionId = randomUUID()
        res.cookie('sessionId',sessionId,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 365 * 24 * 60 * 60 * 1000,
            path: "/",
        })
    }
    req.sessionId = sessionId
    next()
}