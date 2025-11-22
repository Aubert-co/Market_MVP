import { FormCreateProduct } from "@/components/forms/formCreateProduct"
import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { usePagination } from "@/hooks/usePagination"
import {  ProductTable } from "@/components/store/productTable"
import { Box } from "@/styles/dashboardStore.style"
import { SearchBar } from "@/components/header/seachBar"
import {  useSelect } from "@/hooks/useSelect"
import { Controls } from "@/styles/dashboardStore.style"
import { useEffect, useState } from "react"
import type { Product } from "@/types/products.types"
import { selectMenuItem } from "@/constants/menuItems"
import {  usableFetchWithPages } from "@/services/fetchs"
import { getStoreProducts } from "@/services/admStore.services"
import type { GetStoreProducts } from "@/types/storeDashboard.types"
import { mappedCateogires } from "@/constants"
import type { Category } from "@/types/filters"

type StateProducts = {
    datas:Product[],
    status:number,
    message:string
}
export const StoreProducts = ()=>{
    const changePage = ()=>{}
    const {Pagination,setPagesInfos,pageInfos} = usePagination(changePage)
    const {Select:SelectCategory,selected:category} = useSelect<Category>(
        {datas:mappedCateogires,text:'Selecione uma categoria'})
   
    const [products,setProducts] = useState<StateProducts>({
        datas:[] ,status:0,message:''
    })
    useEffect(()=>{
        usableFetchWithPages<Product[],GetStoreProducts>({
            body:{category,nextPage:pageInfos.currentPage,name:''},
            setDatas:setProducts,
            service:getStoreProducts,
            setPages:setPagesInfos,
            
        })
    },[])
    return (
        <ContainerDashboard storeName="StoreName" sidebarMenuItems={selectMenuItem("Produtos")}>
            <Box>
                <Controls>
                    <SearchBar/>
                    <SelectCategory/>
                </Controls>
                <ProductTable products={products.datas}/>
                <Pagination/>
            </Box>
           
            <FormCreateProduct />
        </ContainerDashboard>
    )
}