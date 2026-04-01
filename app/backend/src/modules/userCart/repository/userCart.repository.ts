import { PrismaClient} from "@prisma/client";
import { ErrorMessage, getPrismaError } from "../../../helpers/ErrorMessage";

import { CartWithItems,DatasId } from "../types/cart.types";


export interface IUserCartRepository  {
    create(userId:number,productId:number,quantity:number):Promise<void>,
    removeItem(datas:DatasId[]):Promise<void>,
    getAllCartItems(userId:number):Promise<CartWithItems[] >,
    countUserCart(userId:number):Promise<number >,
    updateCart(cartId:number,userId:number,quantity:number):Promise<void>
}

export class UserCartRepository implements UserCartRepository{
    constructor(protected prisma:PrismaClient){}
  
     
    public async create(userId:number,productId:number,quantity:number):Promise<void>{
        try{  
            await this.prisma.cartitem.create({
                data:{
                    productId,quantity,userId
                }
            })
        }catch(err:unknown){
           
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"An internal error occurred while trying to add the item to the cart.",
                status:500,
                action:"create",
                service:"UserCartRepository",
                prismaError,
                context:{
                    userId,productId,quantity
                }
            })
        }
    }
    public async countUserCart(userId:number):Promise<number >{
        try{
            return await this.prisma.cartitem.count({
                where:{userId}
            })
        }catch(err:unknown){
            
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to count cart",
                status:500,
                action:"countUserCart",
                service:"UserCartRepository",
                prismaError,
                context:{
                    userId
                }
            })
        }
    }
    
    public async removeItem(datas:DatasId[]):Promise<void>{
        try{
            
            await this.prisma.cartitem.deleteMany({
                where:{
                    OR:datas
                }
                
            })
        }catch(err:unknown){
     
           const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to remove a item from cart.",
                status:500,
                action:"removeItem",
                service:"UserCartRepository",
                prismaError,
            })
        }
    }
    
    public async getAllCartItems(userId:number):Promise< CartWithItems[]  >{
       try{
         return await this.prisma.cartitem.findMany({
            where:{userId},
            include:{product:{
                select:{
                    stock:true,
                    price:true,
                    imageUrl:true,
                    name:true
                    }
                }
            }
        })
       }catch(err:any){
      
         const prismaError = getPrismaError(err)
        throw new ErrorMessage({
            message:"Failed to get items from cart.",
            status:500,
            action:"getAllCartItems",
            service:"UserCartRepository",
            prismaError,
        })
    }
        
    }   
    public async updateCart(cartId:number,userId:number,quantity:number):Promise<void>{
        try{
            await this.prisma.cartitem.update({
                where:{id:cartId,userId},
                data:{quantity}
            })
        }catch(err:any){
        
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to update cart items.",
                status:500,
                action:"updateCart",
                service:"UserCartRepository",
                prismaError,
            })
        }
    }
    
}

 