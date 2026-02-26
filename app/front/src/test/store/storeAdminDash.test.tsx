import {StoreHome} from "@/pages/store/storeHome"
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import * as useMostVisited from "@/hooks/store/useMostVisitedProducts"
import * as storeLastOrders from "@/hooks/store/useStoreHome"
import { FixtureOrders, FixtureVisitedProducs } from "../fixtures/store.fixtures"
import * as dashboardStats from "@/hooks/store/useDashboardStas"
import { mapStats } from "@/constants/dashboardStats"
import { mockBackendStats } from "./dashboardStats.test"
import userEvent from "@testing-library/user-event"


const spyMostVisited = jest.spyOn(useMostVisited,'useMostVisitedProducts')
const spyStoreLastOrders = jest.spyOn(storeLastOrders,'useStoreLastOrders')
const spyDashboardStats = jest.spyOn(dashboardStats,'useDashboardStats')

const mockSetIsOpen = jest.fn()

jest.mock("@/hooks/useSidebarOrDrawer", () => ({
  useSideBarOrDrawer: () => ({
    isOpen: false,
    setIsOpen: mockSetIsOpen,
  }),
})) 
export const mockTopVisitedProducts = {
    status:201,
    datas:FixtureVisitedProducs
}
describe("StoreDashboard",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should render the page correctly",async()=>{
        spyMostVisited.mockReturnValue({mostVisited:mockTopVisitedProducts.datas,status:201})
        spyStoreLastOrders.mockReturnValue({orders:FixtureOrders,status:201})
        spyDashboardStats.mockReturnValue({stats:mapStats(mockBackendStats)})
        
        const {getByRole,getAllByText,queryByText} = render(
            <BrowserRouter>
                <StoreHome/>
            </BrowserRouter>
        )
        const [ordersLink,mostVisitedLink] = getAllByText("ver mais")
        expect(queryByText("Visualizações")).toBeInTheDocument()
        expect(queryByText("Faturamento Mensal")).toBeInTheDocument()
        expect(queryByText("Pedidos Recebidos")).toBeInTheDocument()
        expect(queryByText("Produtos Ativos")).toBeInTheDocument()
        expect(queryByText("Cupons Ativos")).toBeInTheDocument()
        expect(queryByText("Taxa de Conversão")).toBeInTheDocument()

        expect(queryByText("Últimas Ordens")).toBeInTheDocument()
        expect(queryByText("Produtos mais visitados no mês")).toBeInTheDocument()

        expect(getAllByText("ver mais")).toHaveLength(2)
         expect(ordersLink.closest("a")).toHaveAttribute(
            "href",
            "/loja/pedidos"
        )

        expect(mostVisitedLink.closest("a")).toHaveAttribute(
            "href",
            "/loja/produtos"
        )
         const button = getByRole("button", {
            name: /open menu/i,
        })

        expect(button).toBeInTheDocument()

        await userEvent.click(button)

        expect(mockSetIsOpen).toHaveBeenCalledWith('sidebar')
        
    })
     
})