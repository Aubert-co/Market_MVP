import { generateAccessToken, generateRefreshToken } from "../helpers/AuthTokens";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { IUserRepository } from "../repository/user.repository";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "types/user.types";

type ParamsCreate= Omit<User,'id'>
export interface IUserService  {
    createUserAccount({email,password,name}:ParamsCreate):Promise<void>,
    loginUser(email:string,password:string):Promise<LoginUser>,
    checkTheUserId(refreshToken:string):Promise<string>
}

type LoginUser = {
    userId:number,
    accessToken:string,
    refreshToken:string
}

export class UserService implements IUserService {
    constructor(protected user:IUserRepository){}
    public async loginUser(email:string,password:string):Promise<LoginUser>{
        
        const user = await this.user.findByEmail(email)
        if(!user)throw new ErrorMessage("Invalid email or password",400) ;

        
        const hashedPassword = user.password
        const compare = await bcrypt.compare(password,hashedPassword)
        
        if(!compare)throw new ErrorMessage("Invalid email or password",400);

        const accessToken = generateAccessToken( user.id )
        const refreshToken = generateRefreshToken( user.id )
        return {
            userId:user.id,
            accessToken,
            refreshToken
        }
    }

    public async createUserAccount({email,password,name}:ParamsCreate):Promise<void>{
       
        const findUser = await this.user.findByEmail( email )
        if(findUser){
            throw new ErrorMessage("User already exists",409)
        }
        const hashedPassword =await bcrypt.hash( password ,10)

        await this.user.createUserAccount({email,password:hashedPassword,name})
       
    }
 
   public async checkTheUserId(refreshToken:string):Promise<string>{
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as { id: string };

        const user = await this.user.findUserById(Number(decoded.id))

        if (!user) {
            throw new ErrorMessage("User not found",401) 
        }
        
        return generateAccessToken(user.id)
   }
}