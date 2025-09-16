import { usePagination } from "@/components/pagination"
import { useNavigate } from "react-router-dom"
import { Container } from "@/components/layouts/container"
import { BoxProducts } from "@/components/product/boxProducts"
import type { Product } from "@/types/products.types"
import { useState,useEffect } from "react"
import { serviceGetProducts, type GetProductsIndex } from "@/services/productsService"
import { usableFetchWithPages } from "@/services/fetchs"
import { useSyncCart } from "@/hooks/useSyncCart"


type ProductState ={
  datas: Product[];
  status: number;
  message:string
}
export const Index = ()=>{
    const navigate = useNavigate()
    const changePage = (page:number)=>{
        navigate(`/products/pages?value=${page}`)
    }
    useSyncCart()
    const {setPagesInfos,pageInfos,Pagination} = usePagination(changePage)
    const [products,setProducts] = useState<ProductState>({
        datas:[] as Product[],
        status:0,
        message:''
    })
    useEffect(() => {
        usableFetchWithPages<Product[],GetProductsIndex>({
            setPages:setPagesInfos,
            setDatas:setProducts,
            service:serviceGetProducts,
            body:{nextPage:pageInfos.currentPage}
        })
    }, [pageInfos.currentPage,setPagesInfos]);
    return (
        <Container>
            <BoxProducts datas={products.datas} status={products.status}/>
            <Pagination/>
        </Container>
    )
}