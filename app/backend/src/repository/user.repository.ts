import { PrismaClient } from "@prisma/client"
import { ErrorMessage } from "../helpers/ErrorMessage"
import { User } from "types/user.types"

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
        }catch(err:any){
            throw new ErrorMessage('Failed to find an user',404);
        }
    }
    public async createUserAccount(data:{email: string, password: string, name: string}): Promise<void> {
        try{
            await this.prisma.user.create({data})
        }catch(err:any){
            throw new ErrorMessage('Failed to create a new user',409)
        }
    }
    public async findUserById(userId:number):Promise<User|null>{
        try{
            return await this.prisma.user.findUnique({
                where:{id:userId}
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to find an user",404)
        }
    }
   
}