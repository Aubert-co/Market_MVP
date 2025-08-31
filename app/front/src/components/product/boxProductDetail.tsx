import type { ProductDetails } from "@/types/productDetail.types"
import { Collapse } from "../collapse"
import { ListComments } from "./listComments"
import { ListProductDetail } from "./listProductDetail"
import type { Message } from "../boxMessages"
import { ProductSkeleton } from "./boxProductSkeleton"
import { useEffect, useState } from "react"
import { ErrorBox } from "../errorBox"

type Props ={
    datas:ProductDetails,
    setMessage: React.Dispatch<React.SetStateAction<Message>>,
    status:number
}
type BoxState = "loading" | "error" | "alert" | "success"
export const BoxProductDetail = ({datas,setMessage,status}:Props)=>{
     const [boxState, setBoxState] = useState<BoxState>("loading")
    
        useEffect(() => {
            if (status === 0) {
                setBoxState("loading")
                return
            }
    
            if (status > 201) {
                setBoxState("error")
                return
            }
    
            if (status <= 201 && datas.product.length === 0) {
                setBoxState("alert")
                return
            }
    
            setBoxState("success")
        }, [status, datas])

        if (boxState === "error") return <ErrorBox retry />;
            
        
        if (boxState === "alert") return <ErrorBox message="Produto não encontrado" />;
            
    return (
        <>
        {boxState === "loading" ? 
        <ProductSkeleton 
        classNameImg="product-image" 
        length={1} 
        className="product-detail"/> :(
            <>
                <ListProductDetail setMessage={setMessage}
                 ratings={datas.ratings}
                  product={datas.product}/>
                                
                <Collapse  title="Comentarios">
                    <ListComments reviews={datas.reviews} 
                        comments={datas.comments}/>
                </Collapse>
            </>
            )
        }
        </>
    )
}