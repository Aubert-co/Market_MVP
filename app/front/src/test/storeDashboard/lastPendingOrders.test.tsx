import { LastPendingOrders } from "@/components/store/lastPendingOrders"
import { render } from "@testing-library/react"
import { productOrdersMock } from "../fixtures"
import { loadImage } from "@/utils"
describe("component LastPendingOrders",()=>{

    it("should successfully render the data correctly",()=>{
        const {container,getByText}  =render(
            <LastPendingOrders products={ productOrdersMock}/>
        )
        const quantidadeCell = container.querySelectorAll('[data-label="Quantidade"]');
        const totallyCell = container.querySelectorAll('[data-label="Total"]');
        const userCell = container.querySelectorAll('[data-label="Cliente"]')
        const images = container.querySelectorAll('[data-label="Produto"] img');
        expect(getByText("Últimos pedidos em aberto")).toBeInTheDocument()
        expect(getByText("Produto")).toBeInTheDocument()
        expect(getByText("Quantidade")).toBeInTheDocument()
        expect(getByText("Total")).toBeInTheDocument()
        expect(getByText("Cliente")).toBeInTheDocument()
        quantidadeCell.forEach((val,index)=>{
            const product = productOrdersMock[index]
            expect(val).toHaveTextContent( product.quantity.toString())
            expect( totallyCell[index] ).toHaveTextContent('R$ ' + product.total.toFixed(2))
            expect( userCell[index]).toHaveTextContent(product.user.name)
            expect(images[index]).toHaveAttribute('src', loadImage(product.product.imageUrl));
        })
    })
})