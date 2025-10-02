import StoreAdminDash from "@/pages/storeDashboard/storeDashboard"
import { render, waitFor } from "@testing-library/react"
import * as services from '@/services/storeDashboard.service'
import { productOrdersMock } from "../fixtures"
import type { GetStoreDashboard, ProductOrder } from "@/types/storeDashboard.types"
import { BrowserRouter } from "react-router-dom"
const spyService = jest.spyOn(services,'storeDashboardService')


const ordersMock = [
    {orders:{cancelled:500,pending:519,completed:29,lastPending:productOrdersMock as ProductOrder[]}, views:{total:188}},
   
] as GetStoreDashboard[]
describe("StoreDashboard",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should render the page correctly when the service returns data with status 201",async()=>{
        spyService.mockResolvedValue({message:'Success',datas:ordersMock ,status:201})
        const {getByText,container,getAllByTestId} = render(
            <BrowserRouter>
                <StoreAdminDash/>
            </BrowserRouter>
        )
        expect( getAllByTestId("sidebar-link")).toHaveLength(5) 
        await waitFor(()=>{ 
            const boxValues = container.querySelectorAll(".box-value")
            const [completed,cancelled,pending,totlaViews] = container.querySelectorAll(".box-label")
            expect(completed).toHaveTextContent("Pedidos completados")
            expect(cancelled).toHaveTextContent("Pedidos cancelados")
            expect(pending).toHaveTextContent("Pedidos pendentes")
            expect(totlaViews).toHaveTextContent("Total de visualizações")
            expect(boxValues[0]).toHaveTextContent(ordersMock[0].orders.completed.toString())
            expect(boxValues[1]).toHaveTextContent(ordersMock[0].orders.cancelled.toString())
            expect(boxValues[2]).toHaveTextContent(ordersMock[0].orders.pending.toString())
            expect(boxValues[3]).toHaveTextContent(ordersMock[0].views.total.toString())

            expect( getByText("Últimos pedidos em aberto")).toBeInTheDocument()
            expect(container.querySelector("table")).toBeInTheDocument()
        })

    })
     it("should render the page correctly when the service returns empty data [] with status 201",async()=>{
        spyService.mockResolvedValue({message:'Success',datas:[] ,status:201})
        const {getByText,container,getAllByTestId} = render(
            <BrowserRouter>
                <StoreAdminDash/>
            </BrowserRouter>
        )
        expect( getAllByTestId("sidebar-link")).toHaveLength(5) 
        await waitFor(()=>{ 
           

            expect( getByText("Seu dashboard está vázio")).toBeInTheDocument()
            expect(container.querySelector("table")).not.toBeInTheDocument()
        },{timeout:1000})

    })
    it("should render the page correctly when the service returns data with status 500",async()=>{
        spyService.mockResolvedValue({message:'Success',datas:[] ,status:500})
        const {getByText,container,getAllByTestId} = render(
            <BrowserRouter>
                <StoreAdminDash/>
            </BrowserRouter>
        )
        expect( getAllByTestId("sidebar-link")).toHaveLength(5) 
        await waitFor(()=>{ 
           

            expect( getByText("Algo deu errado ao carregar seu dashboard")).toBeInTheDocument()
            expect(container.querySelector("table")).not.toBeInTheDocument()
        },{timeout:1000})

    })
})