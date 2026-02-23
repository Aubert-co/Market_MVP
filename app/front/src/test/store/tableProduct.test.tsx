import { ProductTable } from "@/components/store/productTable"
import { mockProducts } from "../fixtures/products"
import {   render } from "@testing-library/react"
import { loadImage } from "@/utils/index"
import userEvent from "@testing-library/user-event"

const openModal = jest.fn()
describe("Component ProcutTable",()=>{
    it("should render the product table correctly",async()=>{
        const {queryAllByLabelText,queryByText,getByRole} = render(
            <ProductTable openModal={openModal} products={mockProducts}/>
        )
        const categorias = queryAllByLabelText("[data-label='Categoria']")
        const price = queryAllByLabelText("[data-label='Preço']")
        const stock  = queryAllByLabelText("[data-label='Estoque']")
        const productos  = queryAllByLabelText("[data-label='Produto']")
        
        expect(queryByText("Produto")).toBeInTheDocument()
        expect(queryByText("Estoque")).toBeInTheDocument()
        expect(queryByText("Preço")).toBeInTheDocument()
        expect(queryByText("Categoria")).toBeInTheDocument()
        const button = getByRole("button", {
        name: new RegExp(
            `abrir modal do produto ${mockProducts[0].name}`,
            "i"
        )
        })
        await userEvent.click(button)
        expect(openModal).toHaveBeenCalledWith([mockProducts[0]])
        categorias.map((val,index)=>{
            const product = mockProducts[index]
            const productCell = productos[index]

        
            expect(productCell).toHaveTextContent(product.name)

           
            const img = productCell.querySelector("img")
            
            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute("src", loadImage(product.imageUrl))
            expect(img).toHaveAttribute("alt", product.name)
            expect(val).toHaveTextContent( product.category)
            expect( price[index]).toHaveTextContent( product.price.toString())
            expect(stock[index]).toHaveTextContent( product.stock.toString())
       
        })

    })
})