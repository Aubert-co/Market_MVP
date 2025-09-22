import { NextFunction, Request, Response } from "express";
import { isAValidString, isValidEmail } from "../helpers";

export class ValidateCredentials{
    public  handler(req:Request,res:Response,next:NextFunction):any{
        if(!isAValidString(req.body.password)){
            res.status(422).send({message:"Invalid password. Please check and try again."});
            return;    
        }
        if(!isValidEmail(req.body.email)){
            res.status(422).send({message:"Invalid email. Please check and try again."})
            return;
        }
        next()
    }
}