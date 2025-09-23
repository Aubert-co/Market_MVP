import { PrismaClient} from "@prisma/client";
import { ErrorMessage } from "../helpers/ErrorMessage";

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
        }catch(err:any){
            throw new ErrorMessage("An internal error occurred while trying to add the item to the cart.", 500);

        }
    }
    public async countUserCart(userId:number):Promise<number >{
        try{
            return await this.prisma.cartitem.count({
                where:{userId}
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to count cart",500)
        }
    }
    
    public async removeItem(datas:DatasId[]):Promise<void>{
        try{
            
            await this.prisma.cartitem.deleteMany({
                where:{
                    OR:datas
                }
                
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to remove a item from cart.",500)
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
        throw new ErrorMessage("Failed to get items from cart.",500)
       }
        
    }   
    public async updateCart(cartId:number,userId:number,quantity:number):Promise<void>{
        try{
            await this.prisma.cartitem.update({
                where:{id:cartId,userId},
                data:{quantity}
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to update cart items.",500)
        }
    }
    
}

 