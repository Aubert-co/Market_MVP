import { FormCreateProduct } from "@/components/forms/formCreateProduct"
import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { usePagination } from "@/components/pagination"
import {  ProductTable } from "@/components/store/productTable"

import { Box } from "@/styles/dashboardStore.style"
import { SearchBar } from "@/components/header/seachBar"
import { useSearchByCategory } from "@/components/useSearchByCategory"
import { Controls } from "@/styles/dashboardStore.style"
import { useEffect, useState } from "react"
import { fetchStoreProducts } from "@/services/admStore.services"
import type { Product } from "@/types/products.types"
import { selectMenuItem } from "@/constants/menuItems"
import { useParams } from "react-router-dom"


type StateProducts = {
    datas:Product[],
    status:number
}
export const StoreProducts = ()=>{
    const changePage = ()=>{}
    const {Pagination,setPagesInfos,pageInfos} = usePagination(changePage)
    const {SearhByCategory,category} = useSearchByCategory()
    const {storeid} = useParams()
    const [products,setProducts] = useState<StateProducts>({
        datas:[] ,status:0
    })
    useEffect(()=>{
        fetchStoreProducts({
            setPages:setPagesInfos,
            body:{category,currentPage:pageInfos.currentPage},
            setProducts:setProducts
        })
    },[category])

    return (
        <ContainerDashboard storeName="StoreName" sidebarMenuItems={selectMenuItem("Produtos")}>
            <Box>
                <Controls>
                    <SearchBar/>
                    <SearhByCategory/>
                </Controls>
                <ProductTable products={products.datas}/>
                <Pagination/>
            </Box>
           
            <FormCreateProduct storeId={storeid}/>
        </ContainerDashboard>
    )
}