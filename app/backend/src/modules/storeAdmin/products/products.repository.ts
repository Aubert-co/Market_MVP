import { Prisma, PrismaClient } from "@prisma/client";
import { GetStoreProductsDTO, productMostViewedResult, StoreProductsResults } from "./products.types";
import { ErrorMessage, getPrismaError } from "@/helpers/ErrorMessage";


export interface IProductAdminRepository{
    createProduct(data:{category:string,name:string,description:string,
        storeId:number,price:number,stock:number,imageUrl:string
    }):Promise<number>,
    desactiveProduct(storeId:number,productId:number):Promise<void>,
    countStoreProducts(storeId:number):Promise<number>
    getStoreProducts({storeId,orderBy,search,category}:GetStoreProductsDTO):Promise<StoreProductsResults>
    productMostViewed(storeId:number):Promise<productMostViewedResult[]>,
    deleteProduct(productId:number):Promise<void>
}

export class ProductAdminRepository  implements IProductAdminRepository{
    constructor(private prisma:PrismaClient){}

    public async createProduct(data: { category:string,name: string; description:
         string; storeId: number; price: number; stock: number; imageUrl: string; }): Promise<number> {
        try{
            const productId =  await this.prisma.product.create({data})
            return productId.id
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                service:"ProductAdminRepository",
                action:"createProduct",
                status:500,
                message:"Failed to create product.",
                prismaError
            })
        }
        
    }
    public async deleteProduct(productId:number){
        try{
            await this.prisma.product.delete({
                where:{id:productId}
            })
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                service:"ProductAdminRepository",
                action:"deleteProduct",
                status:500,
                message:"Failed to delete a product.",
                prismaError
            })
        }
    }
    public async countStoreProducts(storeId:number){
        const countProducts = await this.prisma.product.count({
            where:{storeId}
        })
        
        return countProducts
    }
    public async desactiveProduct(storeId:number,productId:number):Promise<void>{
        await this.prisma.product.update({
            where:{storeId,id:productId},
            data:{isActive:false}
        })
    }
    public async productMostViewed(storeId:number):Promise<productMostViewedResult[]>{
        return await this.prisma.product.findMany({
            where:{
                storeId
            },
            include:{
                _count:{
                    select:{
                        views:true
                    }
                }
            },
            orderBy:{
                views:{
                    _count:'desc'
                }
            },
            take:5,omit:{
                description:true,stock:true,
                isActive:true,storeId:true,createdAt:true,
                updatedAt:true,price:true
            }
           
        })
    }
    public async getStoreProducts({storeId,search,category,orderBy="desc",take,skip}:GetStoreProductsDTO):Promise<StoreProductsResults>{
        const where:Prisma.ProductWhereInput =  {
            storeId,
            ...(category && { category }),
            ...(search && {
                name: {
                contains: search,
                mode: 'insensitive'
                }
            })
        }
        const [products,totalItems] = await Promise.all([
            this.prisma.product.findMany({
                where,
                orderBy: {
                    createdAt: orderBy
                },
                take,
                skip
            }),
            this.prisma.product.count({
            where
        })
        ])
        return {
            datas:products,
            pageInfo:{
                totalItems
            }
        }
    }
}