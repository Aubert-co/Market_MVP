import { Prisma, PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../helpers/ErrorMessage";

export interface IProductAdminRepository{
    createProduct(data:{category:string,name:string,description:string,
        storeId:number,price:number,stock:number,imageUrl:string
    }):Promise<void>,
    deleteProduct(storeId:number,productId:number):Promise<void>,
}

export class ProductAdminRepository  implements IProductAdminRepository{
    constructor(private prisma:PrismaClient){}

    public async createProduct(data: { category:string,name: string; description: string; storeId: number; price: number; stock: number; imageUrl: string; }): Promise<void> {
        try{
            await this.prisma.product.create({data})
        }catch(err:any){
            throw new Error()
        }
        
    }
   
    public async deleteProduct(storeId:number,productId:number):Promise<void>{
        await this.prisma.product.deleteMany({where:{id:productId,storeId}})
    }
  
    
}