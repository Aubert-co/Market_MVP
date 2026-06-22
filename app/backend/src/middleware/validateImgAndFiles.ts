import { NextFunction, Request, Response } from "express";
import { checkIsValidImage } from "@/helpers/checkIsValidImage";
import { isValidString } from "@/helpers/checkIsValid";

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

        if(!isValidString(req.body.name)){
            return res.status(422).send({message:"Invalid name. Please check and try again."});
        }
        if(!isValidString(req.body.description , {maxLength:200})){
            return res.status(422).send({message:"Invalid store description. Please check and try again."});
        }
        next()
    }
}