import { usePagination } from "@/components/pagination"
import { useNavigate } from "react-router-dom"
import { Container } from "@/components/layouts/container"
import { BoxProducts } from "@/components/product/boxProducts"
import type { Product } from "@/types/products.types"
import { useState,useEffect } from "react"
import { serviceGetProducts } from "@/services/productsService"
import { fetchProducts } from "@/services/fetchDatas"

type ProductState ={
  datas: Product[];
  status: number;
}
export const Index = ()=>{
    const navigate = useNavigate()
    const changePage = (page:number)=>{
        navigate(`/products/pages?value=${page}`)
    }
    const {setPagesInfos,pageInfos,Pagination} = usePagination(changePage)
    const [products,setProducts] = useState<ProductState>({
        datas:[],
        status:0
    })
    useEffect(() => {
        fetchProducts({setPages:setPagesInfos,setProducts,service:serviceGetProducts,pages:pageInfos.currentPage})
    }, [pageInfos.currentPage,setPagesInfos]);
    return (
        <Container>
            <BoxProducts datas={products.datas} status={products.status}/>
            <Pagination/>
        </Container>
    )
}