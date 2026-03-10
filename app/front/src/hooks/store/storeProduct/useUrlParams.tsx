import { useSearchParams } from "react-router-dom"
import { checkIsAValidNumber, containsValues } from "@/utils/checkIsValid"
import { createUrlUpdater } from "@/utils"
import type { Category, CategoryOption, ProductSortOption } from "@/types/filters.types"
import type { OrderStatus } from "@/types/storeDashboard.types"
import { allCategoriesOption, PRODUCT_SORT_ARRAY } from "@/constants/filters"

export const useUrlParams = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    
    const searchQuery = searchParams.get("q") ?? undefined;
    const rawCategory = searchParams.get("categoria") 
    const urlCategory = containsValues<CategoryOption>(rawCategory,allCategoriesOption) ? rawCategory : "Todas"
    const rawOrderby = searchParams.get('orderby')
    const urlOrderby = containsValues<ProductSortOption>(rawOrderby,PRODUCT_SORT_ARRAY) ? rawOrderby : "price_asc" 
    const rawPage = searchParams.get('page') ?? undefined
    const urlPage = checkIsAValidNumber(rawPage) ? Number(rawPage) : undefined
    const updateUrlParams = createUrlUpdater(setSearchParams)

    const changePage = (newPage: number) => {
        updateUrlParams('page',newPage.toString());
    };
    const changeUrlCategory = (category:Category)=>{
        updateUrlParams('categoria',category)
    }
    const changeUrlOrderby = (orderby:ProductSortOption)=>{
        updateUrlParams('orderby',orderby)
    }
    const changeUrlOrderStatus = (orderStatus:OrderStatus)=>{
        updateUrlParams('status',orderStatus)
    }
    return {
        urlCategory,urlOrderby,searchQuery,
        changePage,changeUrlCategory,changeUrlOrderby,
        urlPage,changeUrlOrderStatus
    }
}