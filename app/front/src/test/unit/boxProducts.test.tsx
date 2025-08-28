import {  render } from "@testing-library/react"
import { BoxProducts } from "../../components/product/boxProducts"
import { mockProducts } from "../mock/products"
import  {BrowserRouter} from "react-router-dom"

describe('component BoxProducts',()=>{
    
    it("should render loading state when status is 0",()=>{
        const {queryByText,container} =render(<BoxProducts datas={[]} status={0}/>)
        
        expect( queryByText("Ocorreu um erro ao carregar os dados.")).not.toBeInTheDocument()
        expect( queryByText("Tentar novamente")).not.toBeInTheDocument()
        expect(container.querySelector(".product-container")).toBeInTheDocument()
    })

    it("should render ErrorBox when status is greater than 203",()=>{
        const {getByText,container} =render(<BoxProducts datas={[]} status={204}/>)
        
        expect( getByText("Ocorreu um erro ao carregar os dados.")).toBeInTheDocument()
        expect( getByText("Tentar novamente")).toBeInTheDocument()
        expect(container.querySelector(".product-container")).not.toBeInTheDocument()
    })
    it("Should not display an error when datas is empty and status is valid",()=>{
        const {container,queryByText} =render(<BoxProducts datas={[]} status={201}/>)
        
        expect( queryByText("Ocorreu um erro ao carregar os dados.")).not.toBeInTheDocument()
        expect( queryByText("Tentar novamente")).not.toBeInTheDocument()
        expect(queryByText("Sem produtos disponíveis")).toBeInTheDocument()
        
        expect(container.querySelector(".product-container")).not.toBeInTheDocument()
    })
    it("should successfully render the datas",async()=>{
        const {container,queryByText} =render(
            <BrowserRouter>
                <BoxProducts datas={mockProducts} status={201}/>
            </BrowserRouter>
        )
        
        expect( queryByText("Ocorreu um erro ao carregar os dados.")).not.toBeInTheDocument()
        expect( queryByText("Tentar novamente")).not.toBeInTheDocument()
        expect(container.querySelector(".product-container")).toBeInTheDocument()
        
       
    })
})