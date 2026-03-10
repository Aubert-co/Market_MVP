import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { usePagination } from "@/hooks/usePagination"
import {  ProductTable } from "@/components/store/productTable"
import { SearchBar } from "@/components/header/seachBar"
import { Controls } from "@/styles/dashboardStore.style"
import {  useState } from "react"
import type { Product } from "@/types/products.types"
import { selectMenuItem } from "@/constants/menuItems"
import { useModal } from "@/hooks/useModal"
import { ProductDetailModal } from "@/components/product/productDetailModal"
import {  HandlerFormUpsetProduct } from "@/components/forms/formUpsertProduct"
import { useSideBarOrDrawer } from "@/hooks/useSidebarOrDrawer"
import Sidebar from "@/components/shared/sidebar"
import { Drawer } from "@/components/shared/drawer"
import { DashboardHeader } from "@/components/store/dashboardHeader"
import { userStoreProducts } from "@/hooks/store/useStoreProducts"
import { useSearch } from "@/hooks/useSearch"
import { useProductDrawer } from "@/hooks/store/storeProduct/useProductDrawer"
import { useUrlParams } from "@/hooks/store/storeProduct/useUrlParams"
import {  useSelectCategory, useSelectProductOptions } from "@/hooks/store/storeProduct/useSelectFilters"
import { getStorageStore } from "@/storage/store.storage"
import { categorySelectOptions, PRODUCT_SORT_OPTIONS } from "@/constants/filters"
import { Select } from "@/components/shared/select"
import type { CategoryOption, ProductSortOption } from "@/types/filters.types"



export const StoreProducts = ()=>{  

    const {changePage,searchQuery,urlPage} = useUrlParams()

    const {onChangeProductOrderBy,orderProductBy} = useSelectProductOptions()
    const {categories,onChangeCategory} = useSelectCategory()
  
    const [productModal,setProductModal] = useState<{datas:Product[]}>({
        datas:[]
    })
    const {setIsOpen:setSidebarOrDrawer,isOpen:sidebarOrDrawer}=useSideBarOrDrawer()
   

    const {Pagination,setPagesInfos,pageInfos} = usePagination(changePage,urlPage)

    const {searchEvent,searchProduct} = useSearch({mode:'update',initialValue:searchQuery})
   
    const {products} = userStoreProducts({
        nextPage:pageInfos,category:categories,searchProduct,
        setPagesInfos,orderby:orderProductBy
    })
    
    const {onClose:closeModalProduct,openModal:modalProduct,Modal:ModalListProduct} = useModal()
    
    const {drawerType,openCreateProductDrawer,openUpdateProductDrawer,upsertProduct} = useProductDrawer({
        closeModalProduct,
        setSidebarOrDrawer
    })
   
    const showProductModal = (product:Product[])=>{
        setProductModal({datas:product})
        modalProduct()
    }
    const storeInfo = getStorageStore()
    const titleDrawer = drawerType === "create" ? "Criar produto" : "Editar produto"

    const isDrawerOpen = sidebarOrDrawer === "drawer";
    const isSidebarOpen = sidebarOrDrawer === "sidebar";
    return (
        <ContainerDashboard 
            isSidebarOpen={isSidebarOpen}
            >
                <Sidebar storeName={storeInfo.name} 
                    setOpen={setSidebarOrDrawer} 
                    items={selectMenuItem("Produtos")} 
                    isOpen={sidebarOrDrawer==="sidebar"}/>

                <Drawer title={titleDrawer} onClose={setSidebarOrDrawer} isOpen={isDrawerOpen} >
                        <HandlerFormUpsetProduct 
                            editRefs={upsertProduct}
                            type={drawerType}
                            onCancel={setSidebarOrDrawer}
                        />
                </Drawer>
            <main>
                <DashboardHeader 
                    title="Produtos"
                    subTitle="Gerencie seu catálogo, atualize informações 
                    e acompanhe o desempenho dos seus itens."

                    />
                <Controls>
                    <SearchBar searchEvent={searchEvent} initialValue={searchQuery}/>
                    <Select<CategoryOption>
                        datas={categorySelectOptions}
                        name="select-category"
                        text="Selecione uma categoria"
                        onChange={onChangeCategory}
                        selected={categories}
                    />
                    <Select<ProductSortOption>
                        datas={PRODUCT_SORT_OPTIONS}
                        name={"select-filter"}
                        text={'Selecione um filtro'}
                        selected={orderProductBy}
                        onChange={onChangeProductOrderBy}
                    />
                    {!isDrawerOpen && <button onClick={openCreateProductDrawer}>Criar Produto</button>}
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