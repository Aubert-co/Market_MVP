import { useSelect } from "@/hooks/useSelect";
import type {  CategoryOption, ProductSortOption } from "@/types/filters.types";
import { useUrlParams } from "./useUrlParams";
import { PRODUCT_SORT_OPTIONS } from "@/constants/filters";
import { useState } from "react";

export const useSelectFilters = ()=>{
    const {urlOrderby,changeUrlOrderby} = useUrlParams()

        
    const {Select:SelectOrderBy,selected:filterBy} = useSelect<ProductSortOption>({
        datas:PRODUCT_SORT_OPTIONS,text:'Selecione um filtro',
        name:"select-filter",cbSelected:changeUrlOrderby,
        initialValue:urlOrderby
    })
    return {
        SelectOrderBy,
        filterBy
     
    }
}
export const useSelectProductOptions = ()=>{
    const {urlOrderby,changeUrlOrderby} = useUrlParams()
    const [orderProductBy,setOrderProductBy] = useState<ProductSortOption>( urlOrderby ?? "price_asc")
    
    const onChangeProductOrderBy = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const value = e.target.value as ProductSortOption
        changeUrlOrderby(value)
        setOrderProductBy(value)
    }
    return {
        onChangeProductOrderBy,orderProductBy
    }
}
export const useSelectCategory = ()=>{
    const {urlCategory,changeUrlCategory} = useUrlParams()
    const [categories,setCategories] = useState<CategoryOption>(urlCategory ?? "Todas")

    const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const value = e.target.value as CategoryOption 
        changeUrlCategory(value)
        setCategories( value )
    }
    return {
        onChangeCategory,categories
    }
}