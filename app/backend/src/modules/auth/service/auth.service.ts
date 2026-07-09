import { generateAccessToken, generateRefreshToken } from "@/helpers/AuthTokens";
import { ErrorMessage } from "@/helpers/ErrorMessage";
import { IUserRepository } from "../repository/auth.repository";
import bcrypt from 'bcrypt'
import { LoginUserResult, User } from "../types/auth.types";
import { startLogger } from "@/config/logger/logger";

type CreateAccountDTO= Omit<User,'id'>
export interface IUserService  {
    createUserAccount({email,password,name}:CreateAccountDTO):Promise<void>,
    loginUser(email:string,password:string):Promise<LoginUserResult>,
}



export class UserService implements IUserService {
    private readonly logger = startLogger()
    constructor(protected user:IUserRepository){}
    public async loginUser(email:string,password:string):Promise<LoginUserResult>{
        
        const user = await this.user.findByEmail(email)
        if(!user){
            throw new ErrorMessage({
                message:"Invalid email or password",
                status:400,
                service:"UserService",
                action:"loginUser",
            })
    
        }
        
        const hashedPassword = user.password
        const compare = await bcrypt.compare(password,hashedPassword)
        
        if(!compare){
            throw new ErrorMessage({
                message:"Invalid email or password",
                status:400,
                service:"UserService",
                action:"loginUser"
            })
         
        }
        const accessToken = generateAccessToken( user.id )
        const refreshToken = generateRefreshToken( user.id )
        this.logger.info({
            event: "user_login_success",
            message: "User logged in successfully.",
            status: 200,
            action: "loginUser",
            service: "UserService",
            userId: user.id,
        })
        return {
            userId:user.id,
            accessToken,
            refreshToken
        }
    }

    public async createUserAccount({email,password,name}:CreateAccountDTO):Promise<void>{
       
        const findUser = await this.user.findByEmail( email )
        if(findUser){
            throw new ErrorMessage({
                message:"User already exists",
                status:409,
                service:"UserService",
                action:"createUserAccount",
            })

        }
        const hashedPassword =await bcrypt.hash( password ,10)

        await this.user.createUserAccount({email,password:hashedPassword,name})
        this.logger.info({
            event: "user_account_created",
            message: "User account created successfully.",
            status: 201,
            action: "createUserAccount",
            service: "UserService",
        })
    }
 
   
}