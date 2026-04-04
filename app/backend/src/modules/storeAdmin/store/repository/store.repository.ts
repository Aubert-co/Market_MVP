import { PrismaClient } from "@prisma/client";
import { Store } from "../types/store.types";
import { ErrorMessage, getPrismaError } from "../../../../helpers/ErrorMessage";
import {  ProductWithCountsAndRatings } from "../../../products/types/product.types";

export interface IStoreRepository{
    createStore(data:{storeName:string,userId:number,description:string,photo:string}):Promise<void>,
    checkStoreOwnerShip(storeId:number):Promise<any>,
    findByName(storeName:string):Promise<any>,
    selectUserStores(userId:number):Promise<Store[] | []>,
    getProductsByStoreId(storeId:number,skip:number,limit:number):Promise< ProductWithCountsAndRatings[] >
    countProductStore(storeId:number):Promise<number >,
}


export class StoreRepository implements IStoreRepository{
    
    constructor(protected prisma:PrismaClient){}
 
    public async createStore(data:{storeName:string,userId:number,description:string,photo:string}):Promise<void>{
       
       try{
            await this.prisma.store.create(
                {data:{
                name:data.storeName,
                userId:data.userId,
                description:data.description,
                photo:data.photo
            }})  
       }catch(err:unknown){
      
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to create a store",
                status:409,
                prismaError,
                context:{
                    data
                },
                service:"StoreRepository",
                action:"createStore"
            })
        }
       
    } 
    public async checkStoreOwnerShip(storeId:number):Promise<any>{
        
        const datas =  await this.prisma.store.findUnique({
            where:{id:storeId}
        })
        return datas
     
    }
    public async findByName(storeName:string):Promise<any>{
  
        const datas = await this.prisma.store.findUnique({
            where:{name:storeName}
        })
        return datas;
        
    }
    public async selectUserStores(userId:number):Promise<Store[] | []>{
        const datas = await this.prisma.store.findMany({
            where:{userId}
        })
        return datas
    }
    public async getProductsByStoreId(storeId:number,skip:number=0,limit:number=10):Promise<ProductWithCountsAndRatings[] >{
        try{
            return await this.prisma.product.findMany({
                where:{storeId},
                skip,
                take:limit,
                include:{
                    _count:{
                        select:{views:true,comments:true,reviews:true},                   
                    },
                }
            })
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to get products",
                status:500,
                prismaError,
                context:{
                    storeId,skip,limit
                },
                service:"StoreRepository",
                action:"getProductByStoreId"
            })
        }
    }
    public async countProductStore(storeId:number):Promise<number>{
        try{
            return await this.prisma.product.count({
                where:{storeId}
            })
        }catch(err:unknown){
            const prismaError = getPrismaError("err")
            throw new ErrorMessage({
                message:"Failed to count store products",
                status:500,
                prismaError,
                action:"countProductStore",
                service:"StoreRepository",
                context:{
                    storeId
                }
            })
        }
    }
}