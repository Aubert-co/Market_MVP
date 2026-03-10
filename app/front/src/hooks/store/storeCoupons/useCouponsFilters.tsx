import { COUPON_STATUS_ARRAY } from "@/constants/filters"
import type { FilterCoupons } from "@/types/filters.types"
import { createUrlUpdater } from "@/utils"
import { containsValues } from "@/utils/checkIsValid"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"


export const useCouponsFilters = ()=>{
    const [searchParams,setSearchParams ] = useSearchParams()
    const updateUrlParams = createUrlUpdater(setSearchParams)

    const statusUrl = searchParams.get('status')
    const couponStatus = containsValues<FilterCoupons>(statusUrl,COUPON_STATUS_ARRAY) ? statusUrl : "all";
    
    const changePage = (newPage:number)=>{
        updateUrlParams('page',newPage.toString());
    }
    const changeCouponStatus = (filter:FilterCoupons)=>{
        updateUrlParams('status',filter)
    }
    return {
        couponStatus,changeCouponStatus,changePage
    }
}

export const useCouponSelect = ()=>{
    const {changeCouponStatus,couponStatus} = useCouponsFilters()
    const [selectOption,setOption] = useState<FilterCoupons>(couponStatus ?? "all")

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const value = e.currentTarget.value as FilterCoupons
        changeCouponStatus(value)
        setOption(value)
    }
    return {
        onChange,selectOption
    }
}