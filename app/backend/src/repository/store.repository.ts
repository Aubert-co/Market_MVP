import { PrismaClient } from "@prisma/client";
import { Store } from "../types/store.types";
import { ErrorMessage } from "../helpers/ErrorMessage";
import {  ProductWithCountsAndRatings } from "../types/product.types";

export interface IStoreRepository{
    createStore(data:{storeName:string,userId:number,description:string,photo:string}):Promise<void>,
    checkStoreOwnerShip(storeId:number):Promise<any>,
    findByName(storeName:string):Promise<any>,
    selectUserStores(userId:number):Promise<Store[] | []>,
    getProductsByStoreId(storeId:number,skip:number,limit:number):Promise< ProductWithCountsAndRatings[] >
    countProductStore(storeId:number):Promise<number >,
}


export class StoreRepository implements IStoreRepository{
    
    constructor(private prisma:PrismaClient){}
 
    public async createStore(data:{storeName:string,userId:number,description:string,photo:string}):Promise<void>{
       
       try{
            await this.prisma.store.create(
                {data:{
                name:data.storeName,
                userId:data.userId,
                description:data.description,
                photo:data.photo
            }})  
       }catch(err:any){
  
        throw new ErrorMessage("Failed to create a store",409)
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
                    reviews:{
                        select:{
                            rating:true
                        }
                    }
                }
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to get products",500)
        }
    }
    public async countProductStore(storeId:number):Promise<number>{
        try{
            return await this.prisma.product.count({
                where:{storeId}
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to count store products",500)
        }
    }
}