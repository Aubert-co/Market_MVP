import { PrismaClient } from "@prisma/client"
import { ErrorMessage, getPrismaError } from "@/helpers/ErrorMessage"
import { User } from "../types/auth.types"

export interface IUserRepository{
    findByEmail(email:string): Promise< User | null>,
    createUserAccount(datas:{email:string,password:string,name:string}):Promise<void>
    findUserById(userId:number):Promise<User|null>
}


export class UserRepository implements IUserRepository {
  
    constructor(private prisma:PrismaClient){}
    public async findByEmail(email:string):Promise< User | null>{
        try{
            return await this.prisma.user.findUnique({
                where:{email}
            });
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to find an user",
                status:404,
                service:"UserRepository",
                action:"findByEmail",
                prismaError
            })
            
        }
    }
    public async createUserAccount(data:{email: string, password: string, name: string}): Promise<void> {
        try{
            await this.prisma.user.create({data})
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to create a new user",
                status:409,
                service:"UserRepository",
                action:"createUserAccount",
                prismaError
            })
          
        }
    }
    public async findUserById(userId:number):Promise<User|null>{
        try{
            return await this.prisma.user.findUnique({
                where:{id:userId}
            })
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to find an user",
                status:404,
                service:"UserRepository",
                action:"findUserById",
                prismaError
            })
          
        }
    }
   
}