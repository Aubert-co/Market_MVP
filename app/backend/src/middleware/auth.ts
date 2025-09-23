import {Request,Response,NextFunction} from 'express'
import jwt,{JwtPayload} from "jsonwebtoken";


const secret = process.env.ACCESS_TOKEN
export interface MyJwtPayload extends JwtPayload{
    id:string
}
export function Auth(req:Request,res:Response,next:NextFunction):any{
       
        if( !req.cookies || !req.cookies.token )return res.status(401).json({message: "Access Denied"});
        const token = req.cookies.token
        if(!secret)return res.status(500).json({message:'An unexpected error occurred. Please try again later. no token'});

        try{
            const decoded = jwt.verify(token, secret) as {id:number};
            if (!decoded || !decoded.id || isNaN(Number(decoded.id))) {
                return res.status(400).json({ message: 'Invalid token' });
            }
            req.user = Number(decoded.id) 
            next();
        }catch(err:any){
           return res.status(400).json({message:'Invalid token'});
 
        }
    
}
 