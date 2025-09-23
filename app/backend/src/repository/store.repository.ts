import { PrismaClient } from "@prisma/client";
import { Store } from "../types/store.types";
import { ErrorMessage } from "../helpers/ErrorMessage";

export interface IStoreRepository{
    createStore(data:{storeName:string,userId:number,description:string,photo:string}):Promise<void>,
    checkStoreOwnerShip(storeId:number):Promise<any>,
    findByName(storeName:string):Promise<any>,
    selectUserStores(userId:number):Promise<Store[] | any>,
}


export class StoreRepository implements IStoreRepository{
    
    constructor(private prisma:PrismaClient){}
 
    public async createStore(data:{storeName:string,userId:number,description:string,photo:string}):Promise<void>{
       
       try{
             await this.prisma.store.create({data:{
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
    public async selectUserStores(userId:number):Promise<Store | any>{
        const datas = await this.prisma.store.findMany({
            where:{userId}
        })
        return datas
    }
}