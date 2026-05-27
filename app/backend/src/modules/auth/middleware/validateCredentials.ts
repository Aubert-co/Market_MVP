import { NextFunction, Request, Response } from "express";
import { checkisAValidString, checkisValidEmail } from "@/helpers/checkIsValid";

export class ValidateCredentials{
    public  handler(req:Request,res:Response,next:NextFunction):any{
        if(!checkisAValidString(req.body.password)){
            res.status(422).send({message:"Invalid password. Please check and try again."});
            return;    
        }
        if(!checkisValidEmail(req.body.email)){
            res.status(422).send({message:"Invalid email. Please check and try again."})
            return;
        }
        next()
    }
}