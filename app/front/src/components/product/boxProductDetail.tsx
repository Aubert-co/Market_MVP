import type { ProductDetails } from "@/types/productDetail.types"
import { Collapse } from "../collapse"
import { ListComments } from "./listComments"
import { ListProductDetail } from "./listProductDetail"
import type { Message } from "../boxMessages"


import { RenderDataState } from "../renderDataState"
import type { Product } from "@/types/products.types"

type Props ={
    datas:ProductDetails,
    setMessage: React.Dispatch<React.SetStateAction<Message>>,
    status:number
}

export const BoxProductDetail = ({datas,setMessage,status}:Props)=>{
    return (
        <>
        <RenderDataState<Product>
        datas={datas.product}
        status={status}
        emptyMessage={"Produto não encontrado"}
        errorMessage="Ocorreu um erro ao carregar os dados."
        skeletonLoading={{classImg:'product-image',classLoading:"product-detail",
            length:1
        }}>
                <ListProductDetail setMessage={setMessage}
                    ratings={datas.ratings}
                    product={datas.product}/>
                                
                <Collapse  title="Comentarios">
                    <ListComments reviews={datas.reviews} 
                        comments={datas.comments}/>
                </Collapse>
        </RenderDataState>
       
        
        </>
    )
}