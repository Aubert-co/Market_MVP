import { ListProducts } from "./listProducts"
import type { Product } from "@/types/products.types"
import { ProductSection } from "@/styles/index"
import { ErrorBox } from "../errorBox"

type Props = {
    datas:Product[],
    status:number
}

export const BoxProducts = ({datas,status}:Props)=>{
    if(status > 203 || datas.length === 0 ){
        return <ErrorBox retry={true}/>
    }

    return (
        <ProductSection>
            <div className="product-container">
                <ListProducts listType={'Product'} products={datas}  />
            </div>
        </ProductSection>
        
    )
}