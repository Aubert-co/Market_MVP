import { useBoxMessage } from "@/components/boxMessages"
import { Container } from "@/components/layouts/container"
import { BoxProductDetail } from "@/components/product/boxProductDetail"
import { useSyncCart } from "@/hooks/useSyncCart"
import { usableFetch } from "@/services/fetchs"
import { productDetail, type ProductDetailBody } from "@/services/productDetail.service"

import { ProductStyle } from "@/styles/productDetail.style"
import type { ProductDetails } from "@/types/productDetail.types"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type ProductState = {
    datas:ProductDetails,
    status:number
}
export const ProductDetail = ()=>{
    const {productid} = useParams()
    const {BoxMessage,setMessage} = useBoxMessage({styledType:'toast'})
    
    useSyncCart()
    const [ products , setProducts] = useState<ProductState>({
        datas:{
            product:[] ,
            comments:[],
            reviews:[],
            ratings:{
                _avg:{},
                _count:{
                    rating:0
                }
            },
            
        },
        status:0
    })
    useEffect(()=>{
        if(productid){
           usableFetch<ProductDetails,ProductDetailBody>({
            setDatas:setProducts,
            service:productDetail,
            body:{productId:productid}
           })
        }
    },[productid])
  
    return(
        <Container>
            <ProductStyle>
                <BoxMessage/>
                
                <BoxProductDetail setMessage={setMessage} status={products.status} datas={products.datas} />
            </ProductStyle>
        </Container>
    )
}