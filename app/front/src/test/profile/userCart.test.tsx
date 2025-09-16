import { Cart } from "@/components/profile/userCart"
import { fireEvent, render, waitFor } from "@testing-library/react"
import * as services from "@/services/cart.services"
import { userCartMocks } from "../mock"
import * as localS from "@/storage/cart.storage"
import { act } from "react"
import { BrowserRouter } from "react-router-dom"

const getItems = jest.spyOn(localS,'getItemsFromCart')
const mockServices = jest.spyOn(services,'getUserCart')
const mockDeleteService = jest.spyOn(services,'deleteFromCart')
describe('Component useCart',()=>{
    const setMessage = jest.fn()
     const mockFormRef: React.RefObject<HTMLInputElement | null> = {
              current: {
                value: '',
                focus: jest.fn(),
              } as unknown as HTMLInputElement,
            };
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should render the content correctly when the status is 200 and has data",async()=>{
        mockServices.mockResolvedValue({
            datas:userCartMocks,
            status:201,
            message:'Success'
        })
        getItems.mockReturnValue({
            cart:userCartMocks,
            isSaved:false,
            updatedAt:Date.now()
        })
        mockDeleteService.mockResolvedValue({
            status:201,
            message:'Success'
        })
        const {getByText,queryByText,container,queryAllByTestId} = render(
            <Cart setMessage={setMessage} formRef={mockFormRef}/>
        )
      
        expect( getByText("Meu carrinho")).toBeInTheDocument()

        await waitFor(()=>{
             expect( queryByText("Seu carrinho está vazio 🛒")).not.toBeInTheDocument()
        },{timeout:3000})
       
        const deleteBtn = queryAllByTestId("delete-item")

        expect( deleteBtn ).toHaveLength( userCartMocks.length )
        await act(async () => {
            fireEvent.click(deleteBtn[0]);
        });
        
        
        expect( setMessage ).toHaveBeenCalledTimes(1)
        expect( setMessage ).toHaveBeenCalledWith({content:"Removido do carrinho com sucesso!",type:"success"})
        
    
        expect( mockDeleteService ).toHaveBeenCalledTimes(1)

        userCartMocks.map((val,index)=>{
            const cartUpdate = container.querySelectorAll(".cart-update")
            expect( queryByText("Produto: "+val.name) ).toBeInTheDocument()
            expect( queryByText("Preço:R$"+val.price) ).toBeInTheDocument()
            expect(queryByText("Estoque: "+val.stock)).toBeInTheDocument()
            
            expect( cartUpdate[index]).toHaveTextContent( "-"+val.quantity+"+")
        })
    })
     it("should not render the cart when the status is 401",async()=>{
        mockServices.mockResolvedValue({
            datas:[],
            status:401,
            message:'Success'
        })
        getItems.mockReturnValue({
            cart:[],
            isSaved:false,
            updatedAt:Date.now()
        })

       const {getByText,queryByText,queryByTestId} = render(
            <BrowserRouter>
                <Cart setMessage={setMessage} formRef={mockFormRef}/>
            </BrowserRouter>
        )
      
        expect( getByText("Meu carrinho")).toBeInTheDocument()

        await waitFor(()=>{
            
        },{timeout:1000})
        expect( queryByText("Seu carrinho está vazio 🛒")).not.toBeInTheDocument()
        expect(queryByTestId("render-logged")).toBeInTheDocument()
    })
    it("should not display the user cart when the status is 501",async()=>{
        mockServices.mockResolvedValue({
            datas:[],
            status:501,
            message:'Success'
        })
        getItems.mockReturnValue({
            cart:[],
            isSaved:false,
            updatedAt:Date.now()
        })

       const {getByText,queryByText,queryByTestId} = render(
            <BrowserRouter>
                <Cart setMessage={setMessage} formRef={mockFormRef}/>
            </BrowserRouter>
        )
      
        expect( getByText("Meu carrinho")).toBeInTheDocument()

        await waitFor(()=>{
            
        },{timeout:1000})
        expect( queryByText("Seu carrinho está vazio 🛒")).not.toBeInTheDocument()
        expect(queryByTestId("render-logged")).not.toBeInTheDocument()
        expect(queryByText("Algo deu errado ao carregar o seu carrinho")).toBeInTheDocument()
    })
    it("should render the content correctly when the status is 200 and has no data",async()=>{
        mockServices.mockResolvedValue({
            datas:[],
            status:201,
            message:'Success'
        })
        getItems.mockReturnValue({
            cart:[],
            isSaved:false,
            updatedAt:Date.now()
        })
       
        const {getByText,queryByTestId,queryByText} = render(
            <BrowserRouter>
                <Cart setMessage={setMessage} formRef={mockFormRef}/>
            </BrowserRouter>
        )
      
        expect( getByText("Meu carrinho")).toBeInTheDocument()

        await waitFor(()=>{
           
        },{timeout:1000})
        
        expect( queryByTestId("render-empty")).toBeInTheDocument()
        expect(queryByText("Total: R$ 0"))
    })
})