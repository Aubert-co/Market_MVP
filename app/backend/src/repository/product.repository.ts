import {  PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../helpers/ErrorMessage";
import {  GetProductById, SelectedProduct, FilteredProduct,FilterProductsInput } from "../types/product.types";

export interface IProductRepository{
    createProduct(data:{category:string,name:string,description:string,
        storeId:number,price:number,stock:number,imageUrl:string
    }):Promise<void>,
    getProducts(limit:number,skip:number):Promise<SelectedProduct[]>,
    getProductById(id:number):Promise< GetProductById>,
    countProducts():Promise<number >,
    filterProducts({name,category,maxPrice,minPrice,storeId,skip,take}:FilterProductsInput):Promise<FilteredProduct[]>
}

export class ProductRepository  implements IProductRepository{
    constructor(private prisma:PrismaClient){}

    public async createProduct(data: { category:string,name: string; description: string; storeId: number; price: number; stock: number; imageUrl: string; }): Promise<void> {
        try{
            await this.prisma.product.create({data})
        }catch(err:any){
            throw new Error()
        }
        
    }
    public async getProducts(limit:number , skip:number = 0): Promise<SelectedProduct[] > {
         
        try{
            const [products, ratings] = await this.prisma.$transaction([
                this.prisma.product.findMany({
                    take: limit,
                    skip,
                    select: {
                        id: true,
                        name: true,
                        imageUrl:true,
                        price:true
                    },
                    orderBy:{
                        id:'asc'
                    }
                }),
                this.prisma.review.groupBy({
                    by: ['productId'],
                    _avg: {
                    rating: true
                    },
                    orderBy:{
                        productId:'asc'
                    }
                })
                ]);
                const ratingMap = new Map(
                    ratings.map(r => [r.productId, r._avg?.rating ?? null])
                );

                
                const productsWithRatings = products.map(product => ({
                    ...product,
                    averageRating: ratingMap.get(product.id) ?? null 
            }));  
            return productsWithRatings
        }catch(err:any){
            throw new ErrorMessage("An unexpected error occurred. Please try again later.",500)
        }
    }
   
    public async getProductById(id:number):Promise< GetProductById >{
        try{
            const product = await this.prisma.product.findUnique({
            where:{id},
            include:{
                reviews:{
                    select:{
                        rating:true
                    }
                },
                comments:{
                    select:{content:true,
                        user:{
                        select:{name:true}
                        
                    }},
                    take:5
                },
            }
            })
            const ratings = await this.prisma.review.aggregate({
                where:{productId:id},
                _avg:{rating:true},
                _count:{rating:true}
            })
            return {
                product,ratings
            }
        }catch(err:any){
            throw new ErrorMessage("Failed to find product.",500)
        }
    }
   
    public async countProducts():Promise<number >{
        return await this.prisma.product.count()
    }
    public async deleteProduct(storeId:number,productId:number):Promise<void>{
        await this.prisma.product.deleteMany({where:{id:productId,storeId}})
    }
    public async filterProducts({
        name,
        category,
        maxPrice,
        minPrice,
        storeId,
        take=10,
        skip=0
        }: FilterProductsInput): Promise<FilteredProduct[]> {
       
        return await this.prisma.product.findMany({
                where: {
                    storeId ,
                ...(name && { name: { contains: name, mode: 'insensitive' } }),
                ...(category && { category: { contains: category, mode: 'insensitive' } }),
                ...(minPrice || maxPrice
                    ? {
                        price: {
                        ...(minPrice && { gte: minPrice }),
                        ...(maxPrice && { lte: maxPrice })
                        }
                    }
                    : {})
                },
                take,
                skip
            });
        }

}