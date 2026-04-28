import { prisma } from "../../lib/prisma";
import { manyUsers } from "../__fixtures__/users";
import { stores } from "../__fixtures__/stores";
import { productsByStore } from "../__fixtures__/products";
import { views } from "../__fixtures__/views";
import { orders } from "../__fixtures__/orders";

async function seed(){
    try{
        await prisma.user.createMany({
            data:manyUsers
        })
        await prisma.store.createMany({
            data:stores
        })
        await prisma.product.createMany({
            data:productsByStore
        })
        await prisma.view.createMany({
            data:views
        })
        await prisma.order.createMany({
            data:orders
        })
    }catch(err:any){
        throw new Error(err)
    }
}

seed().finally(()=>{
    process.exit()
})