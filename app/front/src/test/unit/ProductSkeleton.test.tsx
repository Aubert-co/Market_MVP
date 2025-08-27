import { render } from "@testing-library/react"
import { ProductSkeleton } from "../../components/product/boxProductSkeleton"

describe("Component ProductSkeleton",()=>{

    it("should render multiple skeletons when length is greater than 1", () => {
        const className = "testing"
        const length = 3
        const { container } = render(
            <ProductSkeleton length={length} className={className} />
        )
        
        expect(container.querySelectorAll("." + className)).toHaveLength(length)
    })

    it("should render a single skeleton when length is 1", () => {
        const className = "testing"
        const length = 1
        const { container } = render(
            <ProductSkeleton length={length} className={className} />
        )
        
        expect(container.querySelectorAll("." + className)).toHaveLength(length)
    })
})