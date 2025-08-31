import { useBoxMessage } from "@/components/boxMessages"
import { Container } from "@/components/layoutContainer"
import { BoxProductDetail } from "@/components/product/boxProductDetail"
import { fetchProductDetail } from "@/services/productDetail.service"
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
    const {BoxMessage,setMessage} = useBoxMessage()
    
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
        if(productid)fetchProductDetail({setDatas:setProducts,productId:productid})
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