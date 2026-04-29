import {NextFunction, Request,Response} from 'express'
import { IUserService } from "../service/auth.service";
import { checkisAValidString } from '@/helpers/checkIsValid';


const isProduction = process.env.NODE_ENV === 'production';
export class AuthUserController{
    constructor(private user:IUserService){}
    public async Login(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const { email  , password} = req.body

            const {accessToken,refreshToken} = await this.user.loginUser(email,password)

            res.cookie('token', accessToken, {
                httpOnly: true,
                secure: isProduction,
                maxAge: 15 * 60 * 1000, 
                path: '/',
                domain:'.aubertdev.com.br',
                sameSite:'none'
            })
            .cookie('refresh', refreshToken, {
                httpOnly: true,
                secure: isProduction,
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                path: '/',
                domain:'.aubertdev.com.br',
                sameSite:'none'
            });
          
            res.status(201).json({ message: "Login successfully" });
        }catch(error:any){
            next(error)
        }
    }
    public async Register(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            if(!checkisAValidString(req.body.name)){
                return res.status(422).send({message:"Invalid name. Please check and try again."});
            }
           
            const { email , name , password} = req.body
            
            await this.user.createUserAccount({name,email,password})
            res.status(201).json({ message: "User created successfully" });
        }catch(error:any){
          next(error)
        }
    }
}