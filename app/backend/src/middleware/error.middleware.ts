import { NextFunction, Request, Response } from "express";
import { ErrorMessage } from "@/helpers/ErrorMessage";
import multer from "multer";
import { startLogger } from "@/lib/logger";

const logger = startLogger()
export function ErrorMiddleware  (error:any,req:Request,res:Response,next:NextFunction):any{
      
        if (error instanceof multer.MulterError) {
      
            if (error.code === 'LIMIT_FILE_SIZE') {
                logger.error({
                    message:"LIMIT FILE SIZE",
                    status:422,
                    context:"Image file size exceeds the 5MB limit"
                })
                res.status(422).json({ message: "Image file size exceeds the 5MB limit." });
                return
            }
            logger.error({
                message:"FILE UPLOAD FAILED",
                status:400
            })
            res.status(400).json({
                message: `File upload failed`
            });
            return
        }
        if(error instanceof ErrorMessage){
            res.status(error.status).json({message:error.message})
            logger.error({
                context:error.context,
                prismaError:error.prismaError,
                status:error.status,
                service:error.service,
                action:error.action,
                message:error.message
            })
            return 
        }
        logger.error({
            message:'error not registered',
            status:500
        })
        res.status(500).json({ message: 'An unexpected error occurred. Please try again later.'});
}