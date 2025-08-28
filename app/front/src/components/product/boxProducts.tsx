import { ListProducts } from "./listProducts"
import type { Product } from "@/types/products.types"
import { ProductSection } from "@/styles/index"
import { ErrorBox } from "../errorBox"
import { ProductSkeleton } from "./boxProductSkeleton"
import { useEffect, useState } from "react"

type Props = {
    datas:Product[],
    status:number
}

type BoxState = "loading" | "error" | "alert" | "success"

export const BoxProducts = ({ datas, status }: Props) => {
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

        if (status === 201 && datas.length === 0) {
            setBoxState("alert")
            return
        }

        setBoxState("success")
    }, [status, datas])

    if (boxState === "error") return <ErrorBox retry />;
    

    if (boxState === "alert") return <ErrorBox message="Sem produtos disponíveis" />;
    

    return (
        <ProductSection>
        <div className="product-container">
            {boxState === "loading" ? 
            <ProductSkeleton length={8} className="product" />
            : 
            <ListProducts listType="Product" products={datas} />
            }
        </div>
        </ProductSection>
    )
}
