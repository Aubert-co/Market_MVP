import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { usePagination } from "@/hooks/usePagination"
import {  ProductTable } from "@/components/store/productTable"
import { SearchBar } from "@/components/header/seachBar"
import {  useSelect } from "@/hooks/useSelect"
import { Controls } from "@/styles/dashboardStore.style"
import { useEffect, useState } from "react"
import type { Product } from "@/types/products.types"
import { selectMenuItem } from "@/constants/menuItems"
import {  usableFetchWithPages } from "@/services/fetchs"
import { getStoreProducts } from "@/services/admStore.services"
import type { GetStoreProducts, UpsertProducts } from "@/types/storeDashboard.types"
import { mappedCateogires } from "@/constants"
import type { Category } from "@/types/filters"

import { useModal } from "@/hooks/useModal"
import { ProductDetailModal } from "@/components/product/productDetailModal"
import {  HandlerFormUpsetProduct } from "@/components/forms/formUpsertProduct"
import { useSideBarOrDrawer } from "@/hooks/useSidebarOrDrawer"
import Sidebar from "@/components/shared/sidebar"
import { Drawer } from "@/components/shared/drawer"
import { DashboardHeader } from "@/components/store/dashboardHeader"



type StateProducts = {
    datas:Product[],
    status:number,
    message:string
}
const DATAS_UPSERT_PRODUCTS = {
    name:"",image:"",price:"",stock:"",description:"",id:0,category:""
} satisfies UpsertProducts

export const StoreProducts = ()=>{

    const changePage = ()=>{}
    const [productModal,setProductModal] = useState<{datas:Product[]}>({
        datas:[]
    })
    const {setIsOpen:setSidebarOrDrawer,isOpen:sidebarOrDrawer}=useSideBarOrDrawer()
    const  [upsertProduct,setUpsertProduct] = useState<UpsertProducts>(DATAS_UPSERT_PRODUCTS)
    const {Pagination,setPagesInfos,pageInfos} = usePagination(changePage)
    const {Select:SelectCategory,selected:category} = useSelect<Category>(
        {datas:mappedCateogires,text:'Selecione uma categoria'})
   
    const [products,setProducts] = useState<StateProducts>({
        datas:[] ,status:0,message:''
    })
    const [drawerType,setDrawerType] = useState<"create" | "update">("create")
    const {onClose:closeModalProduct,openModal:modalProduct,Modal:ModalListProduct} = useModal()
    
    useEffect(()=>{
        usableFetchWithPages<Product[],GetStoreProducts>({
            body:{category,nextPage:pageInfos.currentPage,name:''},
            setDatas:setProducts,
            service:getStoreProducts,
            setPages:setPagesInfos,
            
        })
    },[])
    const showProductModal = (product:Product[])=>{
        setProductModal({datas:product})
        modalProduct()
    }
    
    
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
    const isDrawerOpen = sidebarOrDrawer === "drawer"
    return (
        <ContainerDashboard 
            isSidebarOpen={sidebarOrDrawer==="sidebar"}
            >
                <Sidebar storeName="name" 
                    setOpen={setSidebarOrDrawer} 
                    items={selectMenuItem("Produtos")} 
                    isOpen={sidebarOrDrawer==="sidebar"}/>

                <Drawer onClose={setSidebarOrDrawer} isOpen={sidebarOrDrawer==="drawer"} >
                        <HandlerFormUpsetProduct 
                            editRefs={upsertProduct}
                            type={drawerType}
                            onCancel={setSidebarOrDrawer}
                        />
                        
                </Drawer>
            <main>
                   <DashboardHeader/>
                <Controls>
                    <SearchBar type="admSearch"/>
                    <SelectCategory/>
                    {!isDrawerOpen && <button onClick={openCreateProductDrawer}>criar produto</button>}
                </Controls>
                
                <ProductTable openModal={showProductModal} products={products.datas}/>
                <Pagination/>
                
                <ModalListProduct title="Detalhes do produto">
                    <ProductDetailModal showEditModal={openUpdateProductDrawer} products={productModal.datas}/>
                </ModalListProduct>

            
            
            </main>
        </ContainerDashboard>
    )
}