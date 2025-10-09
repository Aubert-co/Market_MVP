import { Container } from "@/components/layouts/container"
import { BoxProducts } from "@/components/product/boxProducts"
import { usableFetch } from "@/services/fetchs"
import { searchProduct, type BodySearch } from "@/services/productsService"
import type { Product } from "@/types/products.types"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type ProductState ={
  datas: Product[];
  status: number;
  message:string
}
export const Search  = ()=>{
    const [products,setProducts] = useState<ProductState>({
        datas:[] as Product[],status:0,message:''
    })
    const {product} = useParams()
   
    useEffect(()=>{
       usableFetch<Product[],BodySearch>({
        body:{name:product},
        service:searchProduct,
        setDatas:setProducts
       })
    },[product])
    return (
        <Container>
            <BoxProducts datas={products.datas} status={products.status}/>
          
        </Container>
    )
}