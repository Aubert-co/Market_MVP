import { NextFunction, Request, Response } from "express";
import { checkIsValidImage } from "../helpers/checkIsValidImage";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { isAValidString } from "../helpers";

export class ValidateImageAndFields{
    constructor(){}
    public handler(req:Request,res:Response,next:NextFunction):any{
    if (
        !req.file ||
        !checkIsValidImage({
            fileBuffer: req.file.buffer,
            mimeType: req.file.mimetype,
            originalFileName: req.file.originalname,
        })
        ) {
        return res.status(422).send({message:"Invalid or missing image file."});
    }

        if(!isAValidString(req.body.name)){
            return res.status(422).send({message:"Invalid name. Please check and try again."});
        }
        if(!isAValidString(req.body.description , 200)){
            return res.status(422).send({message:"Invalid store description. Please check and try again."});
        }
        next()
    }
}