import { NextFunction, Request, Response } from "express";
import { ErrorMessage } from "../helpers/ErrorMessage";
import multer from "multer";

export function ErrorMiddleware  (error:any,req:Request,res:Response,next:NextFunction):any{
      
        if (error instanceof multer.MulterError) {
      
            if (error.code === 'LIMIT_FILE_SIZE') {
                  
                res.status(422).json({ message: "Image file size exceeds the 5MB limit." });
                return
            }
         
             res.status(400).json({
                message: `File upload failed`
            });
            return
        }
        if(error instanceof ErrorMessage){
            res.status(error.status).json({message:error.message})
            return 
        }
       
        res.status(500).json({ message: 'An unexpected error occurred. Please try again later.'});
}