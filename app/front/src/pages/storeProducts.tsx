import { FormCreateProduct } from "@/components/forms/formCreateProduct"
import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { usePagination } from "@/components/pagination"
import {  ProductTable } from "@/components/store/productTable"
import { FaBox, FaClipboardList, FaTags, FaUsers } from "react-icons/fa"
import { Box } from "@/styles/dashboardStore.style"
import { SearchBar } from "@/components/header/seachBar"
import { useSearchByCategory } from "@/components/useSearchByCategory"
import { Controls } from "@/styles/dashboardStore.style"
import { useEffect, useState } from "react"
import { fetchStoreProducts } from "@/services/admStore.services"
import type { Product } from "@/types/products.types"

export const sideBarMenuItems =  [
  { label: "Dashboard", icon: <FaBox />,isActive:false ,linkTo:"/loja"},
  { label: "Produtos", icon: <FaClipboardList />,isActive:true,linkTo:"/loja/produtos" },
  { label: "Cupons", icon: <FaTags /> ,isActive:false,linkTo:"/loja/cupons"},
  { label: "Pedidos", icon: <FaUsers />,isActive:false,linkTo:"/loja/pedidos" },
  { label: "Configurações",isActive:false ,linkTo:"/loja/configs"}
] 
type StateProducts = {
    datas:Product[],
    status:number
}
export const StoreProducts = ()=>{
    const changePage = ()=>{}
    const {Pagination,setPagesInfos,pageInfos} = usePagination(changePage)
    const {SearhByCategory,category} = useSearchByCategory()
    const [products,setProducts] = useState<StateProducts>({
        datas:[] ,status:0
    })
    useEffect(()=>{
        fetchStoreProducts({
            setPages:setPagesInfos,
            body:{category,currentPage:1},
            setProducts:setProducts
        })
    },[category])
    return (
        <ContainerDashboard storeName="StoreName" sidebarMenuItems={sideBarMenuItems}>
            <Box>
                <Controls>
                    <SearchBar/>
                    <SearhByCategory/>
                </Controls>
                <ProductTable products={products.datas}/>
                <Pagination/>
            </Box>
           
            <FormCreateProduct storeId="13"/>
        </ContainerDashboard>
    )
}