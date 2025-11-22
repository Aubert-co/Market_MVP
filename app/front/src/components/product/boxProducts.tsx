import { ListProducts } from "./listProducts"
import type { Product } from "@/types/products.types"
import { ProductSection } from "@/styles/index.style"
import { RenderDataState } from "@/components/shared/renderDataState"

type Props = {
    datas:Product[],
    status:number
}


export const BoxProducts = ({ datas, status }: Props) => {
    
    return (
        <ProductSection>
        <div className="product-container">
            <RenderDataState<Product>
                datas={datas}
                status={status}
                emptyMessage="Sem produtos disponíveis"
                errorMessage="Ocorreu um erro ao carregar os dados."
                skeletonLoading={{
                    classLoading:"product"
                    ,classImg:""
                    ,length:8
                }}
            >
                <ListProducts listType="Product" products={datas} />
            
            </RenderDataState>
        </div>
        </ProductSection>
    )
}
