import { usableFetchWithPages } from "@/services/fetchs"
import { getStoreProducts } from "@/services/store/storeProducts"
import type { Category, ProductSortOption } from "@/types/filters.types"
import type { Product } from "@/types/products.types"
import type { SetPages } from "@/types/services.types"
import type { GetStoreProducts } from "@/types/storeDashboard.types"
import { useEffect, useState } from "react"

type Props = {
    category:Category
    setPagesInfos:SetPages,
    nextPage:{currentPage:number}
    searchProduct?:string,
    orderby?:ProductSortOption
}
type State = {
    datas:Product[],
    status:number,
}
export const userStoreProducts = ({category,setPagesInfos,searchProduct,nextPage,orderby}:Props)=>{
    const [products,setProducts] = useState<State>({datas:[],status:0})
    
     useEffect(()=>{
            usableFetchWithPages<Product[],GetStoreProducts>({
                body:{category,nextPage:nextPage.currentPage,name:searchProduct,orderby},
                setDatas:setProducts,
                service:getStoreProducts,
                setPages:setPagesInfos,
                
            })
        },[searchProduct,category,nextPage.currentPage])

    return {products}
}