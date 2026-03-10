import type { Product } from "@/types/products.types";
import type { OpenSideBarOuDrawer, UpsertProducts } from "@/types/storeDashboard.types";
import { useState } from "react"

const DATAS_UPSERT_PRODUCTS = {
    name:"",image:"",price:"",stock:"",description:"",id:0,category:""
} satisfies UpsertProducts
type Params = {
    closeModalProduct:()=>void,

    setSidebarOrDrawer:(value:OpenSideBarOuDrawer)=>void
}
export const  useProductDrawer = ({closeModalProduct,setSidebarOrDrawer}:Params)=>{
    const [drawerType,setDrawerType] = useState<'create' | 'update'>('create');
    const  [upsertProduct,setUpsertProduct] = useState<UpsertProducts>(DATAS_UPSERT_PRODUCTS)
    const openUpdateProductDrawer = (product:Product)=>{
        const { imageUrl, price, stock, ...rest } = product
        setDrawerType("update")
        closeModalProduct()
        setSidebarOrDrawer('drawer')

        setUpsertProduct({
            ...rest,
            image: imageUrl,
            price: String(price),
            stock: String(stock),
        })
    }
    const  openCreateProductDrawer= ()=>{
        setDrawerType("create")
        setUpsertProduct( DATAS_UPSERT_PRODUCTS )
        setSidebarOrDrawer('drawer')
    }
    return {
        openUpdateProductDrawer,
        drawerType,setDrawerType,openCreateProductDrawer,upsertProduct
        
    }
}