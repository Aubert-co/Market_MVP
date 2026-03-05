import { StoreOrders } from "@/pages/store/storeOrders"
import { render, waitFor } from "@testing-library/react"
import * as service from "@/services/store/storeOrders"
import { FixtureOrders } from "@/test/fixtures/store.fixtures"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import * as storageStore from "@/storage/store.storage"

const [order] = FixtureOrders
const mockGetStoreInfo = jest.spyOn(storageStore,'getStorageStore')
const mockService = jest.spyOn(service,'getStoreOrders')
describe("when opening the order modal", ()=> {
    it("should open the product modal successfully",async()=>{
        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        });
        mockService
        .mockResolvedValue({datas:FixtureOrders,status:201,message:'sucess',currentPage:1,totalPages:5});
        
          const { getByRole,queryByText } = render(
            <MemoryRouter initialEntries={["/store/ordens"]}>
                <Routes>
                <Route path="/store/ordens" element={<StoreOrders />} />
                </Routes>
            </MemoryRouter>
        );
      
        await waitFor(()=>{
            expect(queryByText(order.product.name)).toBeInTheDocument()
        })
        const user = userEvent.setup();
        await user.click(
            getByRole("button", {
                name: new RegExp(`abrir detalhes do pedido ${order.id}`, "i"),
            })
        );
        expect( queryByText("Detalhes da ordem")).toBeInTheDocument()
    })
})

describe("when the API doesn't return data",()=>{
    it("should render the error message when the API returns 201 but there is no data",async()=>{
        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        });
        mockService
        .mockResolvedValue({datas:[],status:201,message:'sucess',currentPage:1,totalPages:5});
        
           const { queryByText} = render(
            <MemoryRouter initialEntries={["/store/ordens"]}>
                <Routes>
                <Route path="/store/ordens" element={<StoreOrders />} />
                </Routes>
            </MemoryRouter>
        );
      
        await waitFor(()=>{
            expect(queryByText("Nenhum pedido encontrado.")).toBeInTheDocument()
        })
    })
   
})